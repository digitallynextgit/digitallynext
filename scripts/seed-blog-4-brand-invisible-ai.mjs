/**
 * Seed script - Blog 4
 * "Your Brand Is Invisible to ChatGPT, Gemini, and Perplexity: Here Is Exactly How to Fix That"
 *
 * Usage:
 *   node scripts/seed-blog-4-brand-invisible-ai.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
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
    const [key, ...rest] = trimmed.split('=');
    if (key && !process.env[key]) {
      process.env[key] = rest.join('=').replace(/^['"]|['"]$/g, '');
    }
  }
} catch {
  console.warn('⚠  Could not read .env - make sure env vars are set in your shell.');
}

// ── Sanity client ──
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const key = () => Math.random().toString(36).slice(2, 10);

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
  console.log(`  ✓ Created category: ${title}`);
  return created._id;
}

async function getOrCreateAuthor(name) {
  const existing = await client.fetch(
    `*[_type == "author" && name == $name][0]{ _id }`,
    { name }
  );
  if (existing) {
    console.log(`  ✓ Found author: ${name}`);
    return existing._id;
  }
  const created = await client.create({ _type: 'author', name });
  console.log(`  ✓ Created author: ${name}`);
  return created._id;
}

// ── Portable Text body ──
const body = [
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Open ChatGPT right now. Search for the best brand in your category. If your name is not there, you have a problem your current SEO strategy was not built to solve. Here is what is happening and how to fix it." }],
  },

  // ── Section 1 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Quick Answer' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "AI engines do not crawl your website the way Google does. They pull from training datasets that favour independently cited, structured, and verified sources. If your brand has not shown up in those places consistently, you simply do not exist in their answers. The fix is three things: earned media, Schema.org markup, and a deliberate presence on platforms AI models actually read." }],
  },

  // ── Section 2 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Why You Are Invisible' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "It is not your content quality. It is structural." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "LLMs like GPT-4, Gemini, and Perplexity train on curated slices of the internet: Common Crawl, Wikipedia, Reddit, academic papers, and high-authority publications. Not everything makes it in. And what does make it in is ranked by how often it has been cited, verified, and discussed independently." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Three gaps make brands disappear:" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "No structured data. Without Schema.org markup, AI engines cannot confidently classify who you are or what you do." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "No citational presence. If third-party sources have not talked about you, the model has nothing to reference." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The hallucination gap. When a model knows very little about you, it either skips you or makes things up. Both are bad." }],
  },

  // ── Section 3 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Keywords Are Out. Entities Are In.' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Traditional SEO rewarded keyword matching. AI engines think in entities: verified, named concepts with consistent signals across multiple independent sources." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Google's Knowledge Graph is the most visible version of this. To appear there, your brand needs to be recognised as a real, verifiable thing, not just a website with good meta tags." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Common Crawl, one of the main training sources for most LLMs, weights structured, externally cited content heavily. One credible mention in a trusted publication does more for your AI visibility than 30 blog posts on your own domain. That is not an opinion. That is how the training data works." }],
  },

  // ── Section 4 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Three Things That Actually Fix It' }],
  },
  {
    _type: 'block', _key: key(), style: 'h3', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: '1. Earned media and PR' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Get your brand mentioned in sources AI models trust: YourStory, Inc42, Economic Times, Campaign India, relevant international publications. Every third-party citation is a verified signal that you are a real entity worth referencing. PR is no longer just reputation. It is an AI training input." }],
  },
  {
    _type: 'block', _key: key(), style: 'h3', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: '2. Schema.org markup' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Add this to every important page:" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Organisation schema: name, URL, logo, contact details' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Service schema on every service page' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'FAQ schema on every blog post' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Article schema with author credentials on editorial content' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "This is not optional anymore. It is the difference between being read as a real entity and being ignored as unstructured text." }],
  },
  {
    _type: 'block', _key: key(), style: 'h3', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: '3. A citational footprint on platforms AI reads' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Reddit, Quora, Hacker News, niche forums, and industry communities are weighted heavily in LLM training data because they represent genuine discussion. Contribute to them. Answer questions with real depth. Reference your content only when it directly helps. Over time, your brand becomes a recurring entity in the sources AI models trust most." }],
  },

  // ── Section 5 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Audit: See Where You Stand Today' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Before you build anything, run these checks:" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Search your brand in ChatGPT, Gemini, and Perplexity. Note what they say and what they get wrong." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Run your top pages through Google's Rich Results Test. Find every schema gap." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Check whether your brand returns a Knowledge Panel on Google. If not, your entity needs to be built." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Count your unique external citations using Ahrefs or Semrush. Under 50 means your footprint is too thin." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Repeat the AI search audit every 30 days. Treat it like a ranking check, because it is." }],
  },
];

// ── FAQs ──
const faqsJson = JSON.stringify([
  {
    question: "What is AEO and how is it different from SEO?",
    answer: "AEO, or Answer Engine Optimisation, is the practice of making your brand appear accurately inside AI-generated answers, not just ranked lists of links. SEO gets you on page one. AEO gets you into the answer itself. The inputs are different: AEO rewards entity presence, earned citations, and structured data over keyword volume.",
  },
  {
    question: "Why does my brand rank on Google but not show up in ChatGPT?",
    answer: "Google crawls your site continuously. LLMs train on datasets compiled at a point in time, weighted toward content that has been independently cited and verified. Your website alone is not enough. The model needs to have seen your brand across multiple credible, external sources before it will confidently reference you.",
  },
  {
    question: "What is a citational footprint?",
    answer: "It is the total pattern of references to your brand across the web outside your own domain. Every publication mention, Reddit discussion, Quora answer, and industry roundup that includes you contributes to how AI models classify and represent your brand. A thin footprint leads to omission or hallucination. A strong one leads to accurate, confident inclusion.",
  },
  {
    question: "How long does it take to show up in AI answers?",
    answer: "Schema fixes and entity registration can surface in Google's Knowledge Graph within four to eight weeks. Meaningful citational presence takes three to six months of consistent effort across earned media and platform contributions. The brands that started in early 2025 are already appearing by default. The window to build uncrowded AI visibility in most categories is closing.",
  },
  {
    question: "Where do I start if I have zero AI presence right now?",
    answer: "Start with the audit. Then pick one action from each of the three fix areas this month: pitch one PR piece, fix schema on your top five pages, and answer five Quora questions in your category with genuine depth. Small, consistent inputs compound faster in AI training cycles than one large intervention.",
  },
], null, 2);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 4: Brand Invisible to AI...\n');

  // 1. Author
  const authorId = await getOrCreateAuthor('Editorial Team');

  // 2. Categories
  const categoryIds = await Promise.all(
    ['AEO', 'AI Search', 'SEO'].map(getOrCreateCategory)
  );

  // 3. Image upload (optional)
  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/brand-invisible-ai.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'brand-invisible-ai.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'AI search interface with missing brand citation',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/brand-invisible-ai.jpg - skipping image');
  }

  // 4. Create post
  const doc = {
    _type: 'post',
    title: 'Your Brand Is Invisible to ChatGPT, Gemini, and Perplexity: Here Is Exactly How to Fix That',
    slug: { _type: 'slug', current: 'brand-visibility-chatgpt-gemini-perplexity-aeo-2026' },
    excerpt: "Open ChatGPT right now. Search for the best brand in your category. If your name is not there, you have a problem your current SEO strategy was not built to solve. Here is what is happening and how to fix it.",
    publishedAt: '2026-05-07T10:00:00.000Z',
    featured: false,
    readTime: 7,
    body,
    faqsJson,
    metaTitle: 'Your Brand Is Invisible to ChatGPT, Gemini, and Perplexity: Here Is Exactly How to Fix That',
    metaDescription: 'If your brand does not show up when someone asks ChatGPT about your category, you have an AEO problem. Here is how to fix it without starting from scratch.',
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: brand-visibility-chatgpt-gemini-perplexity-aeo-2026`);
  console.log(`    URL:  /blog/brand-visibility-chatgpt-gemini-perplexity-aeo-2026\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
