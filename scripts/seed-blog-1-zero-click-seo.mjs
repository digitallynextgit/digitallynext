/**
 * Seed script — Blog 1 of 3
 * "How Brands Are Winning with Zero-Click SEO in 2026"
 *
 * Usage:
 *   node scripts/seed-blog-1-zero-click-seo.mjs
 *
 * Requirements:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID  in .env
 *   - NEXT_PUBLIC_SANITY_DATASET     in .env
 *   - SANITY_API_TOKEN               in .env  (needs "Editor" or "Administrator" role)
 *
 * Image:
 *   Place zero-click-seo-2026.jpg inside public/blog/ before running,
 *   or skip — the script will create the post without a main image.
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
  console.warn('⚠  Could not read .env — make sure env vars are set in your shell.');
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

// ── Helper: get or create a category by title ──
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

// ── Helper: get or create the author ──
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
    children: [{ _type: 'span', _key: key(), marks: [], text: "Search has quietly changed shape. Type a question into Google today and you will often get the answer without ever clicking a result. AI Overviews summarise. Featured snippets pull the line you needed. People also ask boxes do half the work. For a generation of marketers raised on traffic dashboards, this looks like a problem. For brands that have figured out the new game, it is the biggest opportunity in a decade." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "This is zero click SEO, and it is already redrawing what visibility means online." }],
  },

  // ── Section 1 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'What Zero Click SEO Actually Is' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Zero click SEO is the practice of optimising your content so it shows up, gets read, and influences the user even when they never visit your website. The user gets the answer on the search results page itself. You still get the brand impression, the authority signal, and often the eventual conversion later down the funnel." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Think of it as borrowing the storefront window of the world's busiest mall. Most people walk past, glance in, and remember the brand. Some come back later when they are ready to buy." }],
  },

  // ── Section 2 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Why This Is Not the Death of SEO' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "A lot of teams panicked when AI Overviews started showing up at the top of search results. They saw click-through rates dip and assumed the channel was broken. The channel is not broken. The metric is." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Click-through rate measured one thing: who came to your site. AI search visibility measures something more useful: who saw your brand in the moment they were forming an opinion. If your name is the one Google's AI cites when someone asks \"best D2C water purifier in India,\" that is worth more than a hundred bounced clicks from people who were not ready to buy." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The brands winning right now have stopped optimising purely for traffic. They are optimising for presence in the answer." }],
  },

  // ── Section 3 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'How Brands Are Actually Winning' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The brands cleaning up in 2026 share four habits." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "First, they write for the question, not the keyword. They look at what users are actually asking, in the language they are asking it, and structure content around clean, scannable answers near the top of the page." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Second, they invest heavily in structured data. Schema markup, FAQ schema, How-To schema, Product schema. AI engines are looking for context they can trust, and structured data is the easiest way to hand it to them. This connects directly to the bigger shift toward generative search, which we cover in our piece on GEO and AEO." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Third, they get cited in places AI models read. That means PR, expert roundups, Reddit threads, YouTube transcripts, and authoritative third-party publications. Generative engines pull from these sources to build their answers." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Fourth, they measure differently. Brand search volume, share of voice in AI Overviews, citation frequency in Perplexity and ChatGPT, branded direct traffic. These are the new dashboards." }],
  },

  // ── Section 4 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'What To Do This Quarter' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "If your team is still chasing rankings on a list of fifty keywords, you are playing a game that is quietly being phased out. Start with a brand visibility audit instead. Search ten core questions in your category across Google, ChatGPT, Perplexity, and Gemini. See where you show up. See where your competitors do. The gap is your roadmap." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Then rewrite your top ten existing pages with a single goal: be the answer worth quoting. Tight intros that solve the question in three sentences. Clear sub-questions as H2s. FAQ sections at the bottom. Structured data layered in." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "You will not fix this in a month. But the brands that start now will own the answer layer for the next five years." }],
  },

  // ── Section 5 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Quick Wins You Can Implement This Week' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Before you overhaul everything, lock down these basics:" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Add FAQ schema to every blog post and service page' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Rewrite meta descriptions as direct, quotable answers' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Audit your top ten pages for \"answer in the first 100 words\" structure" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Set up brand mention tracking in ChatGPT and Perplexity' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Build comparison pages around the questions your buyers actually ask' }],
  },
];

// ── FAQs ──
const faqsJson = JSON.stringify([
  {
    question: "What is zero click SEO?",
    answer: "Zero click SEO is the practice of optimising content so your brand shows up and influences the user directly on the search results page, through AI Overviews, featured snippets, knowledge panels, and people also ask boxes, even when the user never clicks through to your website.",
  },
  {
    question: "Is zero click SEO bad for traffic?",
    answer: "Click-through rates on traditional results have dropped, yes. But brand impressions, branded search volume, and assisted conversions are climbing for brands that adapt. Zero click SEO is not a loss, it is a shift in where value lands in the funnel.",
  },
  {
    question: "How do I optimise for AI Overviews and ChatGPT citations?",
    answer: "Focus on three things. Write direct answers in the first 100 words of every important page. Add structured data, especially FAQ and How-To schema. Earn mentions in third-party publications, Reddit, and YouTube, since AI engines pull heavily from these sources.",
  },
  {
    question: "What metrics should replace click-through rate in zero click SEO?",
    answer: "Track branded search volume, share of voice in AI Overviews, citation frequency in ChatGPT and Perplexity, direct branded traffic, and assisted conversion paths. These give a much truer picture of AI search visibility than session counts alone.",
  },
], null, 2);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 1: Zero-Click SEO...\n');

  // 1. Author
  const authorId = await getOrCreateAuthor('Editorial Team');

  // 2. Categories
  const categoryIds = await Promise.all(
    ['SEO', 'AI Search', 'Digital Strategy'].map(getOrCreateCategory)
  );

  // 3. Image upload (optional — place file at public/blog/zero-click-seo-2026.jpg)
  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/zero-click-seo-2026.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'zero-click-seo-2026.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Search engine results page showing AI Overview and featured snippet with brand citations',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/zero-click-seo-2026.jpg — skipping image');
  }

  // 4. Create post
  const doc = {
    _type: 'post',
    title: 'How Brands Are Winning with Zero-Click SEO in 2026',
    slug: { _type: 'slug', current: 'zero-click-seo-2026-brand-visibility' },
    excerpt: "Search has changed shape. Users now get answers directly on the results page, and click-through rates are dropping. Here is how forward-thinking brands are turning zero-click SEO into a real competitive advantage.",
    publishedAt: '2026-04-29T11:00:00.000Z',
    featured: true,
    readTime: 6,
    body,
    faqsJson,
    metaTitle: 'How Brands Are Winning with Zero-Click SEO in 2026 | Digitally Next',
    metaDescription: 'Search has changed shape. Learn how forward-thinking brands are turning zero-click SEO and AI search visibility into a real competitive advantage in 2026.',
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: zero-click-seo-2026-brand-visibility`);
  console.log(`    URL:  /blog/zero-click-seo-2026-brand-visibility\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
