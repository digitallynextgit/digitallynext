/**
 * Retag script - set the "Career Talks - HR Corner" category as the ONLY
 * category on the two HR Corner blog posts.
 *
 * Targets:
 *  - Blog 15 → slug: beyond-the-paycheck-what-makes-gen-z-stay
 *  - Blog 16 → slug: will-ai-replace-the-agency-fresher
 *
 * Usage:
 *   node scripts/retag-hr-corner-blogs.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ── Load .env ──
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env');

try {
  const raw = readFileSync(envPath, 'utf-8');
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [k, ...rest] = trimmed.split('=');
    if (k && !process.env[k]) process.env[k] = rest.join('=').replace(/^['"]|['"]$/g, '');
  }
} catch {
  console.warn('⚠  Could not read .env - make sure env vars are set in your shell.');
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const refKey = () => Math.random().toString(36).slice(2, 10);

const NEW_CATEGORY_TITLE = 'Career Talks - HR Corner';
const TARGET_SLUGS = [
  'beyond-the-paycheck-what-makes-gen-z-stay',
  'will-ai-replace-the-agency-fresher',
];

async function getOrCreateCategory(title) {
  const existing = await client.fetch(
    `*[_type == "category" && title == $title][0]{ _id }`,
    { title }
  );
  if (existing) {
    console.log(`  ✓ Found category: ${title}`);
    return existing._id;
  }
  const created = await client.create({ _type: 'category', title });
  console.log(`  ✓ Created category: ${title}  (_id: ${created._id})`);
  return created._id;
}

async function main() {
  console.log(`🚀  Retagging blogs to "${NEW_CATEGORY_TITLE}" only…\n`);

  const newCategoryId = await getOrCreateCategory(NEW_CATEGORY_TITLE);

  for (const slug of TARGET_SLUGS) {
    console.log(`\n→ ${slug}`);
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{ _id, title }`,
      { slug }
    );
    if (!post) {
      console.log(`  ⚠  No post found for slug "${slug}" - skipped.`);
      continue;
    }

    const newCategories = [
      { _key: refKey(), _type: 'reference', _ref: newCategoryId },
    ];

    await client.patch(post._id).set({ categories: newCategories }).commit();
    console.log(`  ✓ Updated "${post.title}"  (_id: ${post._id})`);
  }

  console.log('\n✅  Done. Both posts now have a single tag: ' + NEW_CATEGORY_TITLE + '\n');
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
