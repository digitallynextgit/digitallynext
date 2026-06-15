/**
 * Seed script — Blog 16
 * "Will AI Replace the Agency Fresher? Our Honest, Optimistic Answer"
 *
 * Usage:
 *   node scripts/seed-blog-16-ai-and-the-agency-fresher.mjs
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

// Block builders
const p = (text) => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: key(), marks: [], text }],
});

const h2 = (text) => ({
  _type: 'block',
  _key: key(),
  style: 'h2',
  markDefs: [],
  children: [{ _type: 'span', _key: key(), marks: [], text }],
});

const bullet = (text, level = 1) => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  listItem: 'bullet',
  level,
  markDefs: [],
  children: [{ _type: 'span', _key: key(), marks: [], text }],
});

// ── Portable Text body ──
const body = [
  // ── Subtitle ──
  p('A straight-talk perspective on "AI & How We Hire in 2026" at Digitally Next'),

  // ── Section 1 ──
  h2('The Question Every Fresher Is Actually Asking'),
  p('It\'s not "will I get the job."'),
  p('It\'s "will the job still exist by the time I\'m good at it?"'),
  p(
    "That's the real anxiety sitting behind every fresher's application right now. And it deserves a real answer not a reassuring non-answer dressed up as optimism."
  ),
  p("So here's ours."),

  // ── Section 2 ──
  h2('What AI Is Actually Replacing'),
  p("Let's be honest about what's changing, because pretending it isn't would be worse."),
  p(
    "AI is already handling first-draft copy. It's generating social calendars, resizing creatives, writing subject line variants, summarising briefs, and pulling campaign reports in minutes. Tasks that used to take a junior half a day now take a good prompt and four minutes."
  ),
  p("That part is real. And it does affect entry-level roles but not in the way most people fear."),
  p("What AI is replacing isn't the fresher. It's the ceiling that used to cap the fresher."),

  // ── Section 3 ──
  h2('The Old Agency Fresher Role Was Already Broken'),
  p(
    "For decades, the agency entry path looked like this: spend your first year doing the work no one else wanted - reformatting decks, writing captions for campaigns you didn't design, sitting in on calls where your only job was to take notes."
  ),
  p("The theory was that you'd absorb enough by osmosis to eventually become useful."),
  p(
    "It was slow. It was often demoralising. And the skills you built were frequently the most automatable ones in the building."
  ),
  p("AI didn't break that model. It exposed how fragile it already was."),

  // ── Section 4 ──
  h2('What the Fresher Role Looks Like Now'),
  p(
    "At agencies that are adapting well, the entry-level role has fundamentally shifted, from executor of repeatable tasks to amplifier of creative judgment."
  ),
  p(
    "The fresher who thrives in 2026 isn't the one who avoids AI. It's the one who uses it faster, prompts it better, and then asks the question AI still can't: Is this actually good? Does this feel true to the brand? Would a real person respond to this?"
  ),
  p(
    "That critical layer - taste, context, cultural instinct, client empathy — is exactly what AI doesn't have. And it's exactly what a sharp fresher can develop in months, not years."
  ),

  // ── Section 5 ──
  h2("The Skills That Matter Now And Can't Be Automated"),
  bullet('Strategic curiosity - the ability to ask why a campaign exists, not just execute it'),
  bullet('Prompt fluency - knowing how to brief AI the way a good creative briefs a team'),
  bullet("Cultural reading - understanding what's landing on the internet right now, and why"),
  bullet("Client empathy - sensing what a client actually means, not just what they said in the brief"),
  bullet(
    "Taste and judgment - the editorial instinct to know when something is almost right versus actually right"
  ),
  p(
    "None of these are taught in a single course. All of them are learnable on the job - faster now than ever, because AI handles the friction that used to slow that learning down."
  ),

  // ── Section 6 ──
  h2('What This Means for Freshers Joining Digitally Next'),
  p("We're not hiring freshers to do the work AI does cheaply."),
  p(
    "We're hiring freshers to do the work AI can't do at all and to grow into the people who decide how AI gets used."
  ),
  p(
    "That means from day one, you'll be in strategy conversations, not just execution queues. You'll be building prompt libraries alongside campaign decks. You'll be expected to have opinions about what we make, and a safe space to voice them."
  ),
  p("The learning curve is steeper. The ceiling is also gone."),

  // ── Section 7 ──
  h2('Our Honest Take'),
  p(
    "AI has already redefined the agency fresher's role that ship has sailed, and we're well into navigating what comes next."
  ),
  p(
    "But \"redefine\" is not the same as \"eliminate.\" The freshers most at risk aren't the ones who joined too late, they're the ones who refuse to adapt. And the freshers who will build the most remarkable early careers? They're the ones who see AI as leverage, not a threat."
  ),
  p("The agency world doesn't need fewer curious, culturally sharp, empathetic humans."),
  p("It needs them more than ever - just doing different things than before."),
  p('Come build those things with us.'),
];

// ── FAQs ──
const faqsJson = JSON.stringify(
  [
    {
      question: 'Will AI replace freshers and entry-level roles at digital agencies in 2026?',
      answer:
        'AI has already replaced specific tasks - first-draft copy, reporting, resizing, scheduling - but not the humans who give those tasks direction and judgment. Over the past year, entry-level roles have been redefined, not eliminated. Freshers who develop prompt fluency, strategic thinking, and creative instinct will find more opportunities, not fewer, as AI absorbs the repetitive work that used to cap their growth.',
    },
    {
      question: 'What skills should a fresher build to stay relevant in an AI-driven agency right now?',
      answer:
        "The highest-value skills in 2026 are the ones AI still can't replicate: cultural reading, client empathy, creative judgment, strategic curiosity, and prompt fluency - the ability to brief and direct AI tools effectively. These compound faster now because AI removes the low-value busywork that used to slow early learning down.",
    },
    {
      question: 'Is mid-2026 a good or bad time to start a career at a digital agency?',
      answer:
        "It's one of the most interesting entry points in decades - provided you join an agency that's adapting, not just reacting. The entry-level ceiling that made the first year slow and frustrating is dissolving. Freshers today are contributing to strategy and creative direction far earlier than any previous generation could, because AI is handling the execution groundwork beneath them.",
    },
    {
      question: 'How is Digitally Next preparing freshers for an AI-first agency environment?',
      answer:
        'From day one, freshers at Digitally Next are in strategy conversations, not just execution tasks. They build prompt libraries, develop campaign thinking, and are expected and encouraged to have opinions about the work. Structured quarterly growth conversations and a culture of psychological safety mean learning happens openly, not by osmosis. The goal is professionals who direct AI with confidence, not ones replaced by it.',
    },
  ],
  null,
  2
);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 16: Will AI Replace the Agency Fresher?...\n');

  const authorId = await getOrCreateAuthor('Editorial Team');

  const categoryIds = await Promise.all(
    ['Agency Insights', 'AI in Marketing', 'Strategy'].map(getOrCreateCategory)
  );

  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/ai-and-the-agency-fresher.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'ai-and-the-agency-fresher.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Will AI replace the agency fresher — an honest, optimistic answer for the 2026 entry-level role',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/ai-and-the-agency-fresher.jpg — skipping image');
  }

  const doc = {
    _type: 'post',
    title: 'Will AI Replace the Agency Fresher? Our Honest, Optimistic Answer',
    slug: { _type: 'slug', current: 'will-ai-replace-the-agency-fresher' },
    excerpt:
      "AI is reshaping the entry-level role at every digital agency. Here is what is really being replaced, what is becoming more valuable, and what we look for in a fresher at Digitally Next in 2026.",
    publishedAt: '2026-06-21T10:00:00.000Z',
    featured: false,
    readTime: 6,
    body,
    faqsJson,
    metaTitle: 'Will AI Replace the Agency Fresher? Our Honest, Optimistic Answer',
    metaDescription:
      "AI is rewriting the agency entry-level role - it isn't eliminating it. Here is what is actually changing, what skills now matter most, and how Digitally Next hires freshers in 2026.",
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: will-ai-replace-the-agency-fresher`);
  console.log(`    URL:  /blog/will-ai-replace-the-agency-fresher\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
