/**
 * Seed script — Blog 9
 * "Marketing Automation vs. AI Marketing: Are They the Same Thing or Completely Different?"
 *
 * Usage:
 *   node scripts/seed-blog-9-marketing-automation-vs-ai.mjs
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
  // Quick Answer
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Marketing automation is the plumbing: rule-based, if-this-then-that logic that executes predefined workflows. AI marketing is the brain: probabilistic, self-optimising, and generative. They are not the same thing and conflating them is how most brands end up with sophisticated-looking automation that still cannot respond when buyer behaviour shifts. The real question in 2026 is not which one to use but how to build the layer of intelligence that decides when each should act." }],
  },

  // ── Section 1 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Confusion Is Expensive' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "When someone says their brand does AI marketing, ask one question: does the system decide what to do next, or does it execute what a human already decided?" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "If the answer is the second one, that is automation. Powerful, necessary, but not AI." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "This distinction is not academic. Brands that have blurred it are spending on tools that cannot scale with them. The 92% of marketers who use automation are not wrong to use it. They are wrong to think they have finished the job." }],
  },

  // ── Section 2 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Automation Is the Plumbing. AI Is the Brain.' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Marketing automation runs on rules. A user subscribes, a welcome sequence fires. A user abandons a cart, a reminder goes out after 2 hours. A lead scores above 80, sales gets a notification." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "These rules are written by humans in advance. They work when the behaviour they were designed for actually occurs. The problem is that buyers increasingly do not behave in the ways the rule assumed." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "AI marketing operates on probability and pattern. It does not wait for a rule to be triggered. It reads signals across channels and predicts the most likely next action a specific user will take, then decides whether to send an email, suppress an ad, adjust a bid, or recommend a product, based on what is most likely to move that user toward a decision." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The automation system asks: did this condition occur? The AI system asks: what is the most likely path to conversion for this specific person, right now? That is not a small difference. It is the entire architecture." }],
  },

  // ── Section 3 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Where Automation Breaks' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Traditional automation breaks the moment buyer behaviour shifts unpredictably. And in 2026, that is not occasionally. It is constantly." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "A drip sequence assumes a linear journey: awareness, consideration, decision. It does not account for the user who has been in consideration for 6 months, suddenly shows high intent signals across 4 channels in one week, and is ready to buy right now. The drip is still sending them Day 14 nurture content." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "A rule-based lead scoring model does not know that a contact who visited the pricing page 3 times in 48 hours is worth more right now than a contact who downloaded a whitepaper 2 months ago. The score says otherwise." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "This is where rule-based automation fails: it is static logic applied to dynamic behaviour." }],
  },

  // ── Section 4 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Shift: From Static Workflows to Agentic Marketing' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Agentic marketing is the next stage. The system does not just execute a predefined path. It evaluates available data in real-time, selects the best action from a range of options, executes it, and updates its model based on the outcome." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Three specific shifts make this real." }],
  },
  {
    _type: 'block', _key: key(), style: 'h3', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'From drip sequences to Dynamic Intent Triggers' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Instead of sending a fixed 10-email sequence to everyone in a segment, a dynamic intent system fires communications based on what the individual is doing right now. A spike in engagement on specific content, repeated visits to a pricing page, or a shift in search behaviour all become live triggers. The system asks what this person needs next, not what the calendar says to send." }],
  },
  {
    _type: 'block', _key: key(), style: 'h3', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'From segments to Segment-of-One Personalisation' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Standard automation can personalise by segment: industry, company size, stage in funnel. AI marketing personalises at the individual level. It constructs a model of each contact based on behaviour, history, channel preference, and content affinity, and generates messaging that is specific to that one person. No automation workflow can do this at scale. AI can." }],
  },
  {
    _type: 'block', _key: key(), style: 'h3', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Decision Intelligence as the Foundation' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Before asking what to automate, the smarter question is which decisions should be automated at all. Decision Intelligence is the layer that evaluates where human judgement is required and where probabilistic AI can act faster and more accurately. It is not about replacing automation. It is about building the intelligence layer that decides which automation to trigger, when, and for whom." }],
  },

  // ── Section 5 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The ROI Gap Is Already Visible' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "92% of marketers use some form of automation. Only approximately 30% have integrated AI into their marketing stack in a meaningful way as of 2026. That 30% is seeing 3 to 4 times higher ROI on email performance and ad spend compared to automation-only programmes." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The gap is not because AI tools are better at sending emails. It is because AI systems reduce waste. They suppress spend on users who are not ready to act, concentrate budget on users who are, and continuously update both signals as behaviour changes. Automation executes spend. AI optimises it." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Marketing automation helped brands scale activity. AI marketing helps brands scale intelligence. The difference is massive." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "At Digitally Next, we help businesses move beyond static workflows toward intelligent, adaptive growth systems built for the realities of 2026." }],
  },
];

// ── FAQs ──
const faqsJson = JSON.stringify([
  {
    question: "Do we need to replace our automation tools to implement AI marketing?",
    answer: "No. AI marketing layers on top of existing automation infrastructure. The automation handles execution. The AI layer handles decision-making: when to trigger, who to include, what content to serve, and when to suppress. Most B2B teams start by adding AI-powered intent scoring and dynamic segmentation on top of their existing tools before rebuilding any workflows.",
  },
  {
    question: "What does ROI from AI marketing actually look like in practice?",
    answer: "The clearest returns appear in reduced cost per acquisition, improved email conversion rates from dynamic content, and shorter sales cycles as intent triggers surface ready buyers faster. Teams moving from automation-only to AI-integrated programmes typically see measurable improvement within 60 to 90 days of proper instrumentation.",
  },
  {
    question: "How much human oversight does an agentic AI marketing system require?",
    answer: "More than most vendors suggest. Agentic systems need human oversight at three points: strategy definition, exception handling, and periodic model review. The human-in-the-loop is not a bottleneck. It is the governance layer that keeps AI decisions accountable and aligned with actual business outcomes.",
  },
  {
    question: "Where should a B2B brand start if it wants to move from automation to AI marketing?",
    answer: "Start with intent. Build an intent model that identifies which contacts are actively in a buying cycle right now, regardless of funnel stage. This single intervention surfaces mismatches between what your automation is sending and what individual buyers actually need. It is the highest-leverage entry point and does not require replacing any existing tooling.",
  },
], null, 2);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 9: Marketing Automation vs AI Marketing...\n');

  const authorId = await getOrCreateAuthor('Editorial Team');

  const categoryIds = await Promise.all(
    ['Strategy', 'Marketing', 'Agency Insights'].map(getOrCreateCategory)
  );

  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/marketing-automation-vs-ai.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'marketing-automation-vs-ai.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Marketing automation workflow versus AI-driven marketing intelligence comparison',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/marketing-automation-vs-ai.jpg — skipping image');
  }

  const doc = {
    _type: 'post',
    title: 'Marketing Automation vs. AI Marketing: Are They the Same Thing or Completely Different?',
    slug: { _type: 'slug', current: 'marketing-automation-vs-ai-marketing-2026' },
    excerpt: "Everyone says they are doing AI marketing. Most of them are doing slightly smarter email sequences. Here is the actual difference, why it matters, and what the 30% doing it right already know.",
    publishedAt: '2026-05-08T10:00:00.000Z',
    featured: false,
    readTime: 7,
    body,
    faqsJson,
    metaTitle: 'Marketing Automation vs. AI Marketing: What Most Teams Still Get Wrong in 2026',
    metaDescription: '92% of marketers use automation. Only 30% have integrated AI. That gap explains the ROI difference. Here is what separates rule-based automation from agentic AI marketing.',
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: marketing-automation-vs-ai-marketing-2026`);
  console.log(`    URL:  /blog/marketing-automation-vs-ai-marketing-2026\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
