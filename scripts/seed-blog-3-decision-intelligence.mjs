/**
 * Seed script - Blog 3 of 3
 * "The Shift from Automation to Decision Intelligence in Marketing"
 *
 * Usage:
 *   node scripts/seed-blog-3-decision-intelligence.mjs
 *
 * Image (optional):
 *   Place decision-intelligence-marketing.jpg at public/blog/decision-intelligence-marketing.jpg
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
    children: [{ _type: 'span', _key: key(), marks: [], text: "For most of the last decade, \"AI in marketing\" meant automation. Schedule the post. Send the email. Bid on the ad. Personalise the subject line. Useful, sometimes impressive, but mostly faster ways to do what teams were already doing. That phase is ending. The next one is harder, more interesting, and far more valuable." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "It is called decision intelligence, and it is about using AI to decide, not just to execute." }],
  },

  // ── Section 1 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'What Decision Intelligence Actually Means' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Decision intelligence is the discipline of using data, models, and machine reasoning to inform the choices a marketing team makes, not just the tasks it performs. Where automation answers \"how do we do this faster,\" decision intelligence answers \"should we be doing this at all, and if so, how should we do it differently.\"" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "A simple way to picture the difference: automation is the assistant who books your meetings. Decision intelligence is the advisor who tells you which meetings are worth taking." }],
  },

  // ── Section 2 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Where It Is Already Showing Up' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Three areas have moved fastest." }],
  },
  {
    _type: 'block', _key: key(), style: 'h3', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Budget Allocation' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Marketing teams have always argued over channel splits. Decision intelligence platforms now ingest historical performance, market signals, and incrementality testing to recommend reallocations in near-real-time. The CMO does not lose authority. They just stop guessing." }],
  },
  {
    _type: 'block', _key: key(), style: 'h3', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Audience Selection' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Instead of building static segments, AI-driven systems are predicting which customers are most likely to convert, churn, or upgrade in the next thirty days, and sequencing the right message accordingly. The shift is from \"who fits this segment\" to \"who is most likely to act now.\"" }],
  },
  {
    _type: 'block', _key: key(), style: 'h3', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Creative Testing' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Generative tools produce variants. Decision intelligence layers on top to predict which variant will win for which audience before the test even runs. It does not replace testing. It makes testing a confirmation step instead of a guessing game. This ties directly to how brands are reorganising for the new search landscape, which we explored in our piece on GEO and AEO." }],
  },

  // ── Section 3 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Honest Reason Most Teams Are Not Ready' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "This part does not get said enough. Most marketing teams are not ready for decision intelligence because their data is not ready. Attribution is a mess. First-party data sits in silos. Definitions of \"lead\" and \"customer\" vary by team. You cannot bolt a decision engine onto a fragmented foundation and expect smart decisions." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The teams that are getting real value from decision intelligence in 2026 spent 2024 and 2025 cleaning up. Unified customer profiles. Cleaner event tracking. Honest, agreed-on definitions across marketing, sales, and product. That work is unglamorous. It is also the prerequisite." }],
  },

  // ── Section 4 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'How To Start Without Boiling The Ocean' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "You do not need a six-figure platform to begin. Start with one or two contained decisions where the cost of a mistake is low and the data is clean." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Pick a recurring decision your team makes manually. Maybe it is the email send time for a weekly newsletter. Maybe it is the daily ad budget split between two campaigns. Build a small model, even a spreadsheet-based one, that uses past data to recommend the choice." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Run the recommendation alongside the human decision for thirty days. Track which performs better. If the model wins consistently, give it more authority. If it loses, learn why. That is the loop." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Most useful decision intelligence in marketing today is not running on enterprise platforms. It is running on solid analytics, clean data, and a team willing to test machine recommendations against gut instinct." }],
  },

  // ── Section 5 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Skills That Will Matter Next' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Marketers in 2027 will not compete on who can run the most campaigns. They will compete on who can frame the right questions for AI to answer. That requires a different skill stack." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Strong instincts about what to measure. The ability to translate fuzzy business goals into clear, modellable decisions. Comfort with probabilistic thinking instead of binary outcomes. Honesty about when the model knows more than the marketer, and when the marketer knows more than the model." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Marketing analytics AI is not replacing marketers. It is raising the bar on what good marketing leadership looks like." }],
  },

  // ── Section 6 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'A Starting Checklist' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Before you invest in any new platform, run through these:" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Is your first-party data unified across your major channels' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Do all teams agree on the definition of a qualified lead and a customer' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Have you mapped two or three recurring decisions you make manually each week' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Do you have at least six months of clean historical data to learn from' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Is there a leader on your team who is comfortable giving a model real decision authority' }],
  },
];

// ── FAQs ──
const faqsJson = JSON.stringify([
  {
    question: "What is decision intelligence in marketing?",
    answer: "Decision intelligence is the use of data, models, and AI reasoning to inform marketing choices, not just execute tasks. It helps teams decide where to spend, which audiences to prioritise, and which creative or message will perform best, instead of relying purely on intuition or static rules.",
  },
  {
    question: "How is decision intelligence different from marketing automation?",
    answer: "Automation makes execution faster, scheduling sends, bidding on ads, personalising subject lines. Decision intelligence sits one layer up. It uses AI to recommend or make the underlying choice that automation then carries out. Automation does the work, decision intelligence picks the right work to do.",
  },
  {
    question: "Do we need an enterprise platform to get started?",
    answer: "Not at all. The most useful early use cases run on clean first-party data, a clear question, and a small predictive model, sometimes built in a spreadsheet or BI tool. Start with one recurring decision your team makes manually each week and benchmark a model against it for thirty days.",
  },
  {
    question: "What is the first decision we should hand over to a model?",
    answer: "Pick something low risk and high frequency. Email send time, daily budget split between two campaigns, or which audience segment to push a creative to next. Low risk means a wrong call does not break anything. High frequency means you build a clear track record fast.",
  },
], null, 2);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 3: Decision Intelligence...\n');

  // 1. Author
  const authorId = await getOrCreateAuthor('Editorial Team');

  // 2. Categories
  const categoryIds = await Promise.all(
    ['AI in Marketing', 'Analytics', 'Strategy'].map(getOrCreateCategory)
  );

  // 3. Image upload (optional)
  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/decision-intelligence-marketing.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'decision-intelligence-marketing.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Marketing analytics dashboard powered by AI showing budget allocation and decision recommendations',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/decision-intelligence-marketing.jpg - skipping image');
  }

  // 4. Create post
  const doc = {
    _type: 'post',
    title: 'The Shift from Automation to Decision Intelligence in Marketing',
    slug: { _type: 'slug', current: 'automation-to-decision-intelligence-marketing' },
    excerpt: "Marketing automation got us doing more, faster. Decision intelligence is the next leap. It is not about executing tasks, it is about deciding which tasks deserve to be done at all. Here is what the shift looks like and how to start.",
    publishedAt: '2026-04-29T13:00:00.000Z',
    featured: false,
    readTime: 7,
    body,
    faqsJson,
    metaTitle: 'From Automation to Decision Intelligence in Marketing | Digitally Next',
    metaDescription: "Marketing automation got us doing more, faster. Decision intelligence is the next leap - using AI to decide which tasks deserve to be done at all. Here is how to start.",
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: automation-to-decision-intelligence-marketing`);
  console.log(`    URL:  /blog/automation-to-decision-intelligence-marketing\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
