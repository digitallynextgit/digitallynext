/**
 * Seed script - Blog 7
 * "Why Hiring an Indian Digital Marketing Agency Is the Smartest Cost Decision a US or UK Brand Can Make"
 *
 * Usage:
 *   node scripts/seed-blog-7-indian-agency-us-uk.mjs
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
    children: [{ _type: 'span', _key: key(), marks: [], text: "US and UK brands that hire Indian digital marketing agencies typically get the same strategic capability and execution quality at 40 to 60% of the cost of a local equivalent. The time zone gap is an advantage, not a drawback, because your campaigns get worked on while your team sleeps. The talent pool is deep, English-fluent, and internationally trained. And the best Indian agencies are not generalists. They are specialists who have been sharpened by one of the world's most competitive digital markets." }],
  },

  // ── Section 1 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Number That Starts Every Honest Conversation' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "A mid-level paid media manager in New York or London costs $70,000 to $90,000 a year in salary alone, before benefits, overheads, and management time." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The same role, at the same skill level, in a well-run Indian agency costs $18,000 to $28,000 a year in equivalent billing." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "That gap does not reflect a quality difference. It reflects a cost-of-living difference, a talent market difference, and frankly, a perception gap that smart brands have been quietly exploiting for a decade while their competitors kept paying local rates for average output." }],
  },

  // ── Section 2 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'What You Actually Get for That Price' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "This is where most conversations go wrong. Brands hear \"lower cost\" and mentally file it under \"lower quality.\" That is the wrong frame." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Indian digital marketing has been forged in a brutally competitive domestic market. Brands here fight for customers across 22 official languages, hundreds of micro-cultures, wildly varying income segments, and some of the most saturated paid advertising environments in the world. The teams that survive and scale in that environment are not generalists. They are sharp." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "What a good Indian agency brings to a US or UK brief:" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Fluency in Google Ads, Meta, LinkedIn, programmatic, and increasingly CTV, not as a claim, but as daily practice across dozens of active accounts' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Content teams that produce at volume without sacrificing quality, because the Indian content market demands it' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Data-led decision making that is built into the workflow, not bolted on as a reporting exercise' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'A hunger to perform that is harder to find in agencies that are comfortable' }],
  },

  // ── Section 3 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Time Zone "Problem" Is Actually a Feature' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Every Western brand that has worked with an Indian agency for more than three months says the same thing. The time zone anxiety goes away fast. And what replaces it is something unexpected: momentum." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Your Indian team finishes a campaign build, a content draft, or a weekly analysis while your team sleeps. By the time your working day starts, there is already something in your inbox to react to. The feedback loop accelerates. Projects move faster. The 10-hour gap becomes a production multiplier." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The brands that struggle are the ones that try to replicate a nine-to-five overlap model. The ones that thrive treat it as an asynchronous advantage with clear handoff protocols and async-first communication." }],
  },

  // ── Section 4 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Talent Reality in 2026' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "India produces over 1.5 million engineering and business graduates every year. A significant percentage of that talent flows directly into digital, with Google, Meta, HubSpot, and Salesforce certifications as baseline, not differentiators." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The senior talent in India's top agencies has often worked on global accounts, led multi-market campaigns, and built strategies for brands that operate in the US and UK as their primary markets. They understand your customer. They have studied your market. And they charge you a fraction of what a local team would." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The perception that Indian agencies handle only \"local Indian work\" is about five years out of date." }],
  },

  // ── Section 5 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'What to Look For Before You Sign' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Not every Indian agency is the right call. Here is what separates the ones worth hiring:" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Proven work on international accounts. Ask for case studies with Western brands, not just domestic ones.' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'A dedicated account lead who communicates proactively. Async works when communication discipline is high. It falls apart when it is not.' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Transparency on team structure. Know who is actually working on your account, not just who is presenting in the pitch.' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Pricing that reflects strategy, not just execution. The cheapest option is rarely the best. The best value option is.' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Cultural familiarity with your market. A team that understands US consumer behaviour and UK brand sensibilities is different from one that has only studied it theoretically.' }],
  },

  // ── Section 6 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Honest Caveat' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Indian agencies are not a silver bullet. If your brief is vague, your feedback cycles are slow, or your internal stakeholders cannot align on goals, no agency anywhere will save you. The cost advantage only compounds when both sides show up with clarity." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "But for a US or UK brand that knows what it wants and is willing to work with a team that operates differently than a local shop, the ROI case is difficult to argue against." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "You get more hours, more output, more senior attention per pound or dollar spent, and often a strategic perspective that is less insular than a team that has only ever marketed to one geography." }],
  },
];

// ── FAQs ──
const faqsJson = JSON.stringify([
  {
    question: "Is the quality of work from Indian agencies actually comparable to UK or US agencies?",
    answer: "At the top end, yes. Consistently. The best Indian agencies work on international accounts for Fortune 500 companies, global D2C brands, and VC-backed startups. The talent pool has been trained on the same platforms, the same frameworks, and often the same certifications as Western counterparts. The gap, where one exists, is usually in cultural nuance for hyper-local campaigns, which is why the best engagements pair an Indian agency's execution with the client team's local market instinct.",
  },
  {
    question: "How do we handle the time zone difference practically?",
    answer: "The brands that handle it best build asynchronous workflows from day one. Clear daily handoff notes, shared project management tools, one weekly live call, and a defined escalation path for urgent decisions. Most Indian agencies that work with Western clients are already structured for this. The time zone difference stops feeling like a problem within the first month and starts feeling like a production advantage by month three.",
  },
  {
    question: "What should we budget for when hiring an Indian digital marketing agency?",
    answer: "A full-service retainer covering strategy, performance marketing, content, and reporting typically ranges from $3,000 to $8,000 per month for a well-structured Indian agency, depending on scope and team size. That range would buy you one mid-level in-house hire in the US or UK, with none of the overhead, management load, or downtime risk that comes with a single-person dependency.",
  },
  {
    question: "Are there risks we should account for before committing?",
    answer: "Three worth planning for. First, communication discipline: asynchronous work requires both sides to be more explicit than in-office teams. Second, knowledge transfer: make sure you own all assets, logins, and documentation from day one. Third, strategic alignment: the more context you share upfront about your brand, your customer, and your market, the faster the team produces work that fits. The risk is not about capability. It is about setup.",
  },
  {
    question: "How do we find the right Indian agency for a Western brand?",
    answer: "Look for agencies that list international clients in their portfolio and can speak fluently about Western consumer behaviour and platform nuances in the US and UK. Ask to speak directly with the strategist who will lead your account, not just the business development team. Request a paid pilot project before committing to a long-term retainer. An agency confident in its work will welcome a trial.",
  },
], null, 2);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 7: Indian Agency for US/UK Brands...\n');

  const authorId = await getOrCreateAuthor('Editorial Team');

  const categoryIds = await Promise.all(
    ['Agency Insights', 'Marketing', 'Strategy'].map(getOrCreateCategory)
  );

  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/indian-agency-us-uk.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'indian-agency-us-uk.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Cross-border collaboration between Western brand teams and Indian digital marketing agency',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/indian-agency-us-uk.jpg - skipping image');
  }

  const doc = {
    _type: 'post',
    title: 'Why Hiring an Indian Digital Marketing Agency Is the Smartest Cost Decision a US or UK Brand Can Make',
    slug: { _type: 'slug', current: 'hiring-indian-digital-marketing-agency-us-uk-brands' },
    excerpt: "It is not about finding cheap. It is about getting more for every dollar or pound you spend on marketing. Here is the honest case for hiring an Indian digital marketing agency in 2026.",
    publishedAt: '2026-05-07T13:00:00.000Z',
    featured: false,
    readTime: 8,
    body,
    faqsJson,
    metaTitle: 'Why Hiring an Indian Digital Marketing Agency Is the Smartest Cost Decision a US or UK Brand Can Make',
    metaDescription: 'It is not about finding cheap. It is about getting more for every dollar or pound you spend on marketing. Here is the honest case for hiring an Indian digital marketing agency in 2026.',
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: hiring-indian-digital-marketing-agency-us-uk-brands`);
  console.log(`    URL:  /blog/hiring-indian-digital-marketing-agency-us-uk-brands\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
