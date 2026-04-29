/**
 * Seed script — creates one dummy blog post in Sanity with all fields.
 *
 * Usage:
 *   node scripts/seed-blog.mjs
 *
 * Requirements:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID  in .env
 *   - NEXT_PUBLIC_SANITY_DATASET     in .env
 *   - SANITY_API_TOKEN               in .env  (needs "Editor" or "Administrator" role)
 *
 * Install dependency if missing:
 *   npm install @sanity/client dotenv
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ── Load .env manually (no dotenv package needed if vars are already in shell) ──
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

// ── Sanity client (write token required) ──
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,   // ← add this to your .env
  useCdn: false,
});

// ── Helper: generate a short random key (Sanity requires _key on array items) ──
const key = () => Math.random().toString(36).slice(2, 10);

// ── Portable Text body ──
const body = [
  {
    _type: 'block', _key: key(), style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: "The digital landscape has fundamentally shifted. Brands that still treat their online presence as a series of disconnected campaigns are falling behind those who have built coherent, integrated digital ecosystems. A growth-driven strategy is no longer a differentiator — it's the entry ticket.", marks: [] }],
  },
  {
    _type: 'block', _key: key(), style: 'h2',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: 'What Growth-Driven Actually Means', marks: [] }],
  },
  {
    _type: 'block', _key: key(), style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: "Growth-driven digital strategy means every channel, every asset, and every campaign is oriented toward measurable business outcomes. Your SEO informs your paid strategy. Your content feeds your CRM. Your website is architected to convert — not just to exist.", marks: [] }],
  },
  {
    _type: 'block', _key: key(), style: 'h2',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: 'The Brands Winning in 2025', marks: [] }],
  },
  {
    _type: 'block', _key: key(), style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: "The brands winning today invested in integrated infrastructure 18–24 months ago. They built systems, not campaigns. They hired for strategy before execution. And they made data the decision-maker at every layer of their marketing — not gut instinct.", marks: [] }],
  },
  {
    _type: 'block', _key: key(), style: 'h2',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: 'How to Get Started', marks: [] }],
  },
  {
    _type: 'block', _key: key(), style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: "Start with a channel audit. Map every digital touchpoint to a business outcome. Identify where data is siloed and where integration is missing. Then build a focused 90-day plan that closes the gaps — channel by channel, system by system.", marks: [] }],
  },
  {
    _type: 'block', _key: key(), style: 'blockquote',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: "Strategy without infrastructure is just theory. Infrastructure without strategy is just noise.", marks: [] }],
  },
  {
    _type: 'block', _key: key(), style: 'h2',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: 'Key Principles to Remember', marks: [] }],
  },
  {
    _type: 'block', _key: key(), style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: 'Before you scale any channel, make sure these fundamentals are in place:', marks: [] }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: 'Clean, unified first-party data across all touchpoints', marks: [] }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: 'Attribution that connects spend to revenue — not just clicks', marks: [] }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: 'A website architected to convert, not just to present', marks: [] }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text: 'Quarterly review cycles — not annual planning locked in stone', marks: [] }],
  },
];

// ── FAQs JSON ──
const faqsJson = JSON.stringify([
  {
    question: 'What is a growth-driven digital strategy?',
    answer: "It's an approach where every digital channel, campaign, and asset is tied directly to measurable business outcomes — revenue, qualified leads, customer retention — rather than platform vanity metrics like impressions or reach.",
  },
  {
    question: 'How long does it take to see results?',
    answer: 'Foundational changes typically take 60–90 days to implement. Compounding returns from a growth-driven approach are usually visible within 6 months of consistent, data-informed execution.',
  },
  {
    question: 'Is this approach only for large brands?',
    answer: "Not at all. Mid-market and D2C brands often see the highest ROI precisely because they're lean enough to implement changes quickly without large organizational overhead.",
  },
  {
    question: 'Where do we start if our current strategy is fragmented?',
    answer: 'Start with a full channel audit — map every touchpoint to a business outcome. Identify data silos and missing integrations. Then prioritise the 2–3 highest-leverage fixes for the next 90 days.',
  },
], null, 2);

// ── Document to create ──
const doc = {
  _type: 'post',

  // ── Core content ──
  title: 'Why Your Brand Needs a Growth-Driven Digital Strategy in 2025',
  slug: { _type: 'slug', current: 'growth-driven-digital-strategy-2025' },
  excerpt: "In an era of fragmented attention, a unified digital approach isn't optional — it's essential for survival and long-term brand equity.",
  publishedAt: new Date().toISOString(),
  body,

  // ── Settings ──
  featured: true,
  readTime: 6,

  // ── FAQs (JSON paste field) ──
  faqsJson,

  // ── SEO ──
  metaTitle: 'Growth-Driven Digital Strategy in 2025 | Digitally Next Blog',
  metaDescription: "Learn why growth-driven digital strategy is the baseline for brands in 2025 — and how to build one that connects data, channels, and business outcomes.",

  // Note: author, mainImage, and categories are references.
  // To link them, fetch their _ids from Sanity first and uncomment below.
  //
  // author: { _type: 'reference', _ref: 'YOUR_AUTHOR_DOCUMENT_ID' },
  // mainImage: { _type: 'image', asset: { _type: 'reference', _ref: 'YOUR_IMAGE_ASSET_ID' } },
  // categories: [{ _type: 'reference', _ref: 'YOUR_CATEGORY_DOCUMENT_ID' }],
};

// ── Create document ──
console.log('🚀  Creating blog post in Sanity...\n');

try {
  const result = await client.create(doc);
  console.log('✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: ${doc.slug.current}`);
  console.log(`    URL:  /blog/${doc.slug.current}\n`);
} catch (err) {
  console.error('❌  Failed to create post:', err.message);
  console.error('\n   Make sure SANITY_API_TOKEN is set in your .env with Editor or Administrator role.');
  process.exit(1);
}
