/**
 * Seed script — Blog 6
 * "Full-Service Marketing Agency vs Specialist Agency: Which Is Right for Your Growth Stage?"
 *
 * Usage:
 *   node scripts/seed-blog-6-full-service-vs-specialist.mjs
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
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "If you have one specific, urgent problem, a specialist agency solves it faster and cheaper. If your brand needs multiple channels to work together toward a single goal, a full-service agency removes the coordination cost and the blame-game between vendors. The right answer is almost always about your stage, not your budget." }],
  },

  // ── Section 1 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Real Question Nobody Asks First' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Before creating your list, ask yourself one thing: Is my issue a marketing problem or a marketing systems problem?" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Problem is an issue in isolation. \"Our cost-per-lead on Google Ads is too high.\" \"Our Instagram is generating engagement but no conversions.\" \"We need SEO, but we don't have a content team.\"" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Systems issue is more structural. \"Our paid, organic, and CRM teams aren't coordinating.\" \"We're spending on five different channels but can't tell what's contributing to our bottom line.\" \"We're scaling and require a new marketing strategy for our next phase.\"" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Solving problems requires specialists. Solving systems requires full-service agencies. Getting this wrong is costly." }],
  },

  // ── Section 2 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'When a Specialist Agency Makes Complete Sense' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "There are growth stages where a specialist is clearly the right call:" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Pre-product-market-fit: You need to test one channel fast. A performance marketing specialist runs lean experiments better than a large team with a broader mandate." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "One broken channel: Your SEO is underperforming but everything else is working. A specialist SEO agency fixes the specific issue without touching what does not need fixing." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Technical depth over strategic breadth: You need someone who lives inside Meta Ads Manager or Google Search Console every day, not someone who oversees it from a strategy layer." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Tight budget, single outcome: Specialist agencies are usually more affordable for a single scope. You pay for execution, not overhead." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The catch: once you need more than two or three specialists, the coordination cost starts eating your results." }],
  },

  // ── Section 3 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'When a Full-Service Agency Earns Its Keep' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Full-service becomes the rational choice at a specific inflection point: when your channels need to talk to each other to produce results." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Signs you have reached that point:" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Your paid ads drive traffic that your landing pages are not converting because the messaging is misaligned' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Your content team, performance team, and CRM team are briefed separately and optimising for different things' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'You are spending time every week managing three or four agency relationships instead of running your business' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Attribution is a mess because nobody owns the full funnel' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "A full-service agency removes the coordination tax. One strategy. One brief. One team accountable for the output across channels. When that coherence is the missing ingredient, paying for it makes clear financial sense." }],
  },

  // ── Section 4 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Hidden Cost of the Wrong Choice' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Hiring a specialist when you need a system: you solve one piece and the others stay broken. You keep hiring. The stack grows. Nobody is responsible for the whole picture." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Hiring a full-service agency when you need one specific thing fixed: you pay for capability you are not using. The agency spreads attention. The specific problem gets slower, more expensive attention than a focused specialist would give it." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Both mistakes are common. Both are avoidable with an honest read of where your brand actually sits." }],
  },

  // ── Section 5 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'A Simple Way to Decide' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Ask three questions before you sign anything:" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Do I need one channel fixed or multiple channels aligned?' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Do I have the internal bandwidth to manage multiple agency relationships well?' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Is my primary challenge execution or strategy?' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "If your answers lean toward \"multiple,\" \"no,\" and \"strategy,\" a full-service agency is the more honest choice. If your answers lean toward \"one channel,\" \"yes,\" and \"execution,\" find the best specialist in that specific area." }],
  },
];

// ── FAQs ──
const faqsJson = JSON.stringify([
  {
    question: "Can a full-service agency be as good as a specialist in any single area?",
    answer: "The best ones have specialist-depth teams for each channel under one roof. Before signing, ask who will actually run your account day to day. That answer tells you everything.",
  },
  {
    question: "At what revenue stage should a brand switch to full-service?",
    answer: "There is no fixed number. The signal is when you are running two or more channels and the results feel disconnected. That coordination problem is the trigger, not the revenue figure.",
  },
  {
    question: "Is full-service more expensive than managing multiple specialists?",
    answer: "On paper, yes. In reality, once you add two to four specialist retainers plus internal management time, full-service often costs less in total, especially when misaligned channels are hurting revenue.",
  },
  {
    question: "What should I look for when evaluating a full-service agency?",
    answer: "Meet the people doing the actual work. Ask for a case study where multiple channels ran together. Ask how they attribute results across the full funnel. Vague answers there are a red flag.",
  },
  {
    question: "Can I start with a specialist and move to full-service later?",
    answer: "Yes, and often that is the smarter path. Prove one channel first. When the coordination problem shows up, bring in a full-service partner. It is a much smoother transition when you already know your numbers.",
  },
], null, 2);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 6: Full-Service vs Specialist...\n');

  const authorId = await getOrCreateAuthor('Editorial Team');

  const categoryIds = await Promise.all(
    ['Strategy', 'Agency Insights', 'Marketing'].map(getOrCreateCategory)
  );

  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/full-service-vs-specialist.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'full-service-vs-specialist.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Marketing teams collaborating across channels representing full-service agency model',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/full-service-vs-specialist.jpg — skipping image');
  }

  const doc = {
    _type: 'post',
    title: 'Full-Service Marketing Agency vs Specialist Agency: Which Is Right for Your Growth Stage?',
    slug: { _type: 'slug', current: 'full-service-vs-specialist-marketing-agency-growth-stage' },
    excerpt: "Most brands pick an agency based on budget or a referral. Very few pick based on growth stage. That mismatch is usually why the relationship underdelivers. Here is a cleaner way to think about it.",
    publishedAt: '2026-05-07T12:00:00.000Z',
    featured: false,
    readTime: 6,
    body,
    faqsJson,
    metaTitle: 'Full-Service vs Specialist Marketing Agency: Which One Do You Actually Need?',
    metaDescription: 'The answer is not about which agency type is better. It is about where your brand is right now. Here is how to make the call without getting it wrong.',
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: full-service-vs-specialist-marketing-agency-growth-stage`);
  console.log(`    URL:  /blog/full-service-vs-specialist-marketing-agency-growth-stage\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
