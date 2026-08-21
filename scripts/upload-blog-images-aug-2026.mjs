/**
 * Upload the hero images for the 6-15 Aug 2026 blog batch and attach them to
 * their posts.
 *
 * Reads ./webp, which contains one .webp per post named exactly after that
 * post's slug. Each file is uploaded as a Sanity image asset and then attached
 * to the matching post.
 *
 * IMPORTANT: this uses `patch().set()` on the `mainImage.asset` path, NOT
 * createOrReplace. Only that one field is written, so the existing
 * `mainImage.alt`, the body, the FAQs, and the `visible: false` flag are all
 * left exactly as they are. Posts stay hidden.
 *
 * Idempotent in the sense that re-running re-uploads and re-attaches; it will
 * not duplicate or damage a post. It WILL create a second asset in the media
 * library on each run, so avoid running it repeatedly for no reason.
 *
 * Run from the repo root:
 *   node scripts/upload-blog-images-aug-2026.mjs --dry-run
 *   node scripts/upload-blog-images-aug-2026.mjs
 *
 * Requires in .env:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 */
import { createClient } from 'next-sanity';
import fs from 'node:fs';
import path from 'node:path';

try {
  process.loadEnvFile(path.resolve(process.cwd(), '.env'));
} catch {
  /* env may already be set in the shell */
}

const DRY_RUN = process.argv.includes('--dry-run');
const IMAGE_DIR = path.resolve(process.cwd(), 'webp');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_STUDIO_API_TOKEN;

if (!projectId || !dataset || (!token && !DRY_RUN)) {
  console.error('Missing env. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

/**
 * Read a WebP header well enough to report dimensions before uploading.
 *
 * Worth doing up front: the blog hero renders at 1920 wide, so anything much
 * narrower than that upscales and looks soft. Better to find out here than
 * after ten uploads.
 */
function webpSize(buf) {
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') return null;
  const fourCC = buf.toString('ascii', 12, 16);
  if (fourCC === 'VP8X') {
    return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
  }
  if (fourCC === 'VP8 ') {
    return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  }
  if (fourCC === 'VP8L') {
    const b = buf.readUInt32LE(21);
    return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
  }
  return null;
}

async function run() {
  if (!fs.existsSync(IMAGE_DIR)) {
    console.error(`Image directory not found: ${IMAGE_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(IMAGE_DIR)
    .filter((f) => f.toLowerCase().endsWith('.webp'))
    .sort();

  if (!files.length) {
    console.error(`No .webp files in ${IMAGE_DIR}`);
    process.exit(1);
  }

  console.log(`${DRY_RUN ? '[DRY RUN] ' : ''}Attaching ${files.length} images in ${projectId}/${dataset}\n`);

  // Resolve every slug to a real post BEFORE uploading anything, so a typo in a
  // filename fails the whole run rather than leaving half the batch attached.
  const planned = [];
  for (const file of files) {
    const slug = path.basename(file, path.extname(file));
    const post = await client.fetch(`*[_type=="post" && slug.current==$s][0]{_id, title, visible, "alt": mainImage.alt}`, {
      s: slug,
    });
    if (!post) {
      console.error(`No post found for slug "${slug}" (file ${file}). Nothing has been uploaded. Fix the filename.`);
      process.exit(1);
    }
    planned.push({ file, slug, post });
  }

  let attached = 0;
  for (const { file, slug, post } of planned) {
    const filePath = path.join(IMAGE_DIR, file);
    const buf = fs.readFileSync(filePath);
    const size = webpSize(buf);
    const dims = size ? `${size.width}x${size.height}` : 'unknown';
    const kb = Math.round(buf.length / 1024);

    console.log(`• ${post.title.slice(0, 62)}`);
    console.log(`  slug=${slug}`);
    console.log(`  file=${file}  ${dims}  ${kb}KB`);
    console.log(`  alt="${(post.alt || '').slice(0, 60)}"  visible=${post.visible}`);

    if (size && size.width < 1920) {
      console.log(`  ! ${size.width}px wide; the hero renders at 1920px so this will upscale and soften`);
    }

    if (DRY_RUN) {
      console.log('  (dry run, nothing uploaded)\n');
      continue;
    }

    const asset = await client.assets.upload('image', buf, {
      filename: file,
      contentType: 'image/webp',
    });

    // Set ONLY the asset reference. mainImage.alt, body, faqs, visible and every
    // other field are untouched by a path-scoped patch.
    await client
      .patch(post._id)
      .set({ 'mainImage._type': 'image', 'mainImage.asset': { _type: 'reference', _ref: asset._id } })
      .commit();

    attached++;
    console.log(`  attached asset=${asset._id}\n`);
  }

  if (DRY_RUN) {
    console.log('Dry run complete. Re-run without --dry-run to upload.');
    return;
  }
  console.log(`Done. ${attached} images attached. No other field was modified; all posts remain hidden.`);
}

run().catch((err) => {
  console.error('\nFailed:', err.message);
  process.exit(1);
});
