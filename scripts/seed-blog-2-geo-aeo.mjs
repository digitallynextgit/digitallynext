/**
 * Seed script - Blog 2 of 3
 * "How Brands Are Adapting to AI-Driven Search: GEO and AEO Explained"
 *
 * Usage:
 *   node scripts/seed-blog-2-geo-aeo.mjs
 *
 * Image (optional):
 *   Place geo-aeo-ai-driven-search.jpg at public/blog/geo-aeo-ai-driven-search.jpg
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
    children: [{ _type: 'span', _key: key(), marks: [], text: "For two decades, search engine optimisation followed a simple rhythm. You wrote for keywords, you built backlinks, you waited for Google to rank you. That rhythm is breaking. Users are increasingly turning to ChatGPT, Perplexity, Gemini, and Claude to answer questions they used to type into a search bar. Google itself is showing AI-generated overviews above the traditional results." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "If your brand strategy is still built around \"rank on page one,\" you are optimising for a layer of search that is getting smaller every quarter. The new game has two names: GEO and AEO. Here is what they mean and how to start playing." }],
  },

  // ── Section 1 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'What GEO Means' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "GEO stands for Generative Engine Optimisation. It is the practice of making your brand and content visible inside the answers that generative AI tools produce. When someone asks ChatGPT \"what's the best CRM for a 50-person sales team,\" the brands cited in that response have done GEO well." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "GEO SEO is not a different language from traditional SEO. It is an evolution of it. The same fundamentals apply: clear writing, structured information, authority. What changes is the destination. You are no longer just trying to rank a URL. You are trying to become a reference that AI models pull from when they generate answers." }],
  },

  // ── Section 2 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'What AEO Means' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Answer engine optimisation is the older cousin. AEO has been around since voice search and featured snippets started shaping how Google displayed results. It is the practice of writing content so it can be lifted directly as the answer to a question." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The two overlap heavily. Most AEO best practices feed directly into GEO. AEO is more focused on the structure of your content, how clean and quotable each block of information is, while GEO is more focused on the broader signals that make AI engines trust and cite your brand. If you have already started thinking about zero click SEO, you are already on the path." }],
  },

  // ── Section 3 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'How They Actually Differ From Old-School SEO' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Traditional SEO rewarded you for matching a keyword and earning links. GEO and AEO reward you for three different things." }],
  },
  {
    _type: 'block', _key: key(), style: 'h3', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Clarity' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "AI models prefer information they can summarise without ambiguity. Long, hedged paragraphs lose to clean, declarative sentences. Write like you are answering a smart friend, not filling space." }],
  },
  {
    _type: 'block', _key: key(), style: 'h3', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Context' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Models look for content that answers a question fully, including the related sub-questions a user might ask next. Pages that cover a topic in depth, with clear sectioning, get cited more often than pages that cover one thin angle." }],
  },
  {
    _type: 'block', _key: key(), style: 'h3', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Credibility Signals Beyond Backlinks' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "AI engines weight mentions in trusted publications, user-generated platforms like Reddit and Quora, and authoritative directories. A backlink still matters, but a citation in a respected review or a popular Reddit thread now carries unique weight." }],
  },

  // ── Section 4 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'A Practical Playbook For The Next 90 Days' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Start with content audits, but with a new lens. For every important page, ask one question: would an AI engine quote this paragraph? If the answer is no, the content is too rambling, too brand-voicey, or too thin." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Restructure your top twenty pages around clear questions. Each H2 should be a question your customer actually asks. Each opening paragraph should give a direct answer in under sixty words. Then expand." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Build out comparison content aggressively. AI engines love comparison queries. \"X vs Y,\" \"best X for Y,\" \"alternatives to X.\" Every category leader in 2027 will own a strong cluster of comparison pages." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Get on the platforms AI models scrape. That means Reddit threads, niche forums, YouTube transcripts, and credible roundup articles in your space. PR is becoming a GEO channel." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Measure the right things. Track citations in ChatGPT, Perplexity, and Google AI Overviews. Track branded query volume. Track which pages drive assisted conversions, not just last-click sessions. For more on the analytical shift this requires, see our piece on decision intelligence in marketing." }],
  },

  // ── Section 5 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Mindset Shift' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The brands that adapt fastest will treat AI engines the way smart brands treated Google in 2010. Not as adversaries, not as channels to manipulate, but as new readers with their own preferences. Write for them like you write for a sharp, sceptical journalist who has thirty seconds to decide whether your content is worth quoting. That is the bar now." }],
  },

  // ── Section 6 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'What To Audit Before Anything Else' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "A simple GEO and AEO readiness check before you commit budget:" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Does your top content answer the core question in the first 100 words' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Is your information structured with clear H2s, lists, and tables where appropriate' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Do you have schema markup on every important page' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Are you cited in third-party content beyond your own domain' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Do you track AI citations alongside traditional rankings' }],
  },
];

// ── FAQs ──
const faqsJson = JSON.stringify([
  {
    question: "What is the difference between GEO and AEO?",
    answer: "AEO is about structuring content so it can be lifted as a direct answer, mostly within traditional search engines. GEO is broader, focused on becoming a reference that generative AI tools like ChatGPT, Perplexity, and Gemini cite when they create answers. AEO is a building block of GEO.",
  },
  {
    question: "Is traditional SEO still relevant in 2026?",
    answer: "Yes, but it is no longer enough on its own. The fundamentals of clear writing, technical hygiene, authority, and structured data are now the foundation for both Google rankings and AI citations. Brands that abandon SEO entirely will lose the base layer that GEO and AEO are built on.",
  },
  {
    question: "How do AI engines decide which brands to cite?",
    answer: "Three signals dominate. Clarity of the content itself, depth of coverage on the topic, and the credibility of mentions across the wider web, including third-party publications, Reddit, Quora, YouTube, and authoritative directories. Backlinks still matter, but they are no longer the only currency.",
  },
  {
    question: "Where should we start if we want to improve our GEO and AEO?",
    answer: "Start with your top twenty pages. Rewrite each one to answer a clear customer question in the first 100 words, structure with question-led H2s, and add FAQ schema. In parallel, build a small PR push to earn mentions on platforms AI engines scrape, like industry publications and credible Reddit communities.",
  },
], null, 2);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 2: GEO and AEO...\n');

  // 1. Author
  const authorId = await getOrCreateAuthor('Editorial Team');

  // 2. Categories
  const categoryIds = await Promise.all(
    ['SEO', 'Generative Search', 'Digital Strategy'].map(getOrCreateCategory)
  );

  // 3. Image upload (optional)
  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/geo-aeo-ai-driven-search.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'geo-aeo-ai-driven-search.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Generative AI search interface showing brand citations across answer engines',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/geo-aeo-ai-driven-search.jpg - skipping image');
  }

  // 4. Create post
  const doc = {
    _type: 'post',
    title: 'How Brands Are Adapting to AI-Driven Search: GEO and AEO Explained',
    slug: { _type: 'slug', current: 'geo-aeo-ai-driven-search-strategy' },
    excerpt: "SEO is no longer about ranking on Google alone. ChatGPT, Perplexity, Gemini, and AI Overviews are reshaping how people find brands. Here is what GEO and AEO mean and how to adapt without scrapping your existing strategy.",
    publishedAt: '2026-04-29T12:00:00.000Z',
    featured: true,
    readTime: 7,
    body,
    faqsJson,
    metaTitle: 'GEO and AEO Explained: How Brands Adapt to AI-Driven Search | Digitally Next',
    metaDescription: 'ChatGPT, Perplexity, and Gemini are reshaping how people find brands. Learn what GEO and AEO mean and how to adapt your SEO strategy for AI-driven search in 2026.',
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: geo-aeo-ai-driven-search-strategy`);
  console.log(`    URL:  /blog/geo-aeo-ai-driven-search-strategy\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
