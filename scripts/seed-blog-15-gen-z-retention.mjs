/**
 * Seed script - Blog 15
 * "Beyond the Pay check: What Actually Makes Gen Z Stay"
 *
 * Usage:
 *   node scripts/seed-blog-15-gen-z-retention.mjs
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

const h3 = (text) => ({
  _type: 'block',
  _key: key(),
  style: 'h3',
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
  p('A straight-talk guide from Digitally Next'),

  // ── Opening hook ──
  p(
    "Let's start with a number that should make every agency founder sit up - 20%."
  ),
  p(
    "That's the percentage of employees globally who said they were engaged at work in 2025. Gallup's freshest report, released just weeks ago, calls it the lowest level since 2020. And for the first time ever, it's two consecutive years of decline. No region of the world saw engagement go up. Not one."
  ),
  p(
    "From 2020 to 2025, Gen Z and younger millennials lost eight engagement points. Older millennials lost nine. Baby Boomers? Largely fine. The people building your agency's future, the ones running your reels, writing your copy, managing your clients - they're the ones checking out the most."
  ),
  p("And no, it's still not a salary problem."),

  // ── Section 2 ──
  h2("So what's actually going on?"),
  p(
    "Packages are competitive. Freshers are negotiating hard. Offers are flying. And yet people are leaving, quietly disengaging, or treating your agency like a pit stop rather than a destination."
  ),
  p(
    "A 2026 survey of 1,000+ Gen Z workers found that 63% see their current job as just a stepping stone. Sixty-three percent. That's not a talent problem. That's a culture problem."
  ),
  p("The issue isn't the package. It's everything that comes after the offer letter."),

  // ── Section 3 ──
  h2('What the data says Gen Z is actually missing:'),
  p(
    'Gen Z and younger millennials were 13 points less likely over just five years to strongly agree that "someone at work seems to care about me as a person." The percentage who felt they had opportunities to learn and grow dropped from 48% in 2020 to just 37% in 2025.'
  ),
  bullet('Feeling seen by someone at work - down sharply'),
  bullet('Growth conversations with managers - near absent'),
  bullet('Connection to what the organisation actually stands for - fading fast'),
  bullet('Feeling like their opinions move something - declining every year'),
  p("Notice what's not on that list? Salary."),
  p(
    'Deloitte\'s 2025 Gen Z Survey describes what this generation wants as a "trifecta" - money, meaning, and wellbeing. Money gets them through the door. Meaning and wellbeing decide if they stay.'
  ),
  p(
    "44% of Gen Z have turned down job offers because the company's values didn't align with their own. They're not just evaluating your package - they're evaluating your culture, your leadership, and whether you actually live what you say on your careers page."
  ),

  // ── Section 4 ──
  h2('What actually keeps them:'),

  h3('① Recognition and not the annual appraisal kind'),
  p(
    "Gallup's data shows Gen Z and younger millennials saw the steepest drops specifically in recognition and feeling cared about - and the flight risk is immediate. One genuine shoutout in a team call. One \"did everyone see what she pulled off this week?\" - that's it. Costs nothing. Changes everything."
  ),

  h3('② A visible next step, not a vague promise'),
  p(
    "70% of Gen Z graduates expect a promotion within their first 18 months. It's not entitlement - it's a desire for visible progress, structured development, and clarity about what comes next. Ambiguous career paths lose this generation fast. They want a map, not a motivational speech."
  ),

  h3('③ The feeling that someone actually cares'),
  p(
    "Gallup's 2026 report found that manager engagement dropped from 31% in 2022 to just 22% in 2025 - and disengaged managers are now the primary driver of disengaged teams. The best manager at your agency isn't the one with the sharpest briefs. It's the one who notices when someone's been quiet for two days."
  ),

  h3('④ Values they can actually see in action'),
  p(
    "44% of Gen Z would reject a job if it conflicted with their personal ethics. They want companies to live their values, not advertise them. A nice culture deck means nothing if the 11pm brief with zero context is a weekly ritual."
  ),

  h3('⑤ Psychological safety - feeling heard, not just listened to'),
  p(
    '94% of professionals across all generations say company culture directly impacts their intent to stay and for Gen Z, "culture" starts with one thing: can I say what I actually think without it being held against me? In agencies with steep hierarchy, this one quietly does the most damage.'
  ),

  // ── Section 5 ──
  h2("What we've built at Digitally Next around this:"),
  bullet("Monthly wellbeing days - not optional, it's policy now"),
  bullet('Quarterly growth conversations - not KPI reviews, actual growth talks'),
  bullet('Public recognition rituals - visible, specific, and genuine'),
  bullet(
    'Onboarding done properly, be it the first day, the feedback system, the work allocation – not just "Day one should be special"'
  ),
  p(
    "We won't pretend we've figured it all out. We're a growing agency, and we're building this in real time like everyone else."
  ),
  p(
    "But here's what the data makes impossible to ignore - $438 billion. That's what Gallup estimates the world lost in productivity in 2024 from disengaged employees. That's the cost of mistaking a good salary for a good workplace."
  ),
  p(
    "Gen Z isn't high-maintenance. They're high-clarity. Answer the real questions \"why am I here, does anyone see me, where am I going\" and they'll give you everything they've got."
  ),
];

// ── FAQs ──
const faqsJson = JSON.stringify(
  [
    {
      question: 'What does Gen Z actually want from a workplace beyond salary?',
      answer:
        "Gen Z wants three things beyond competitive pay: meaning, wellbeing, and visibility. Deloitte's 2025 Gen Z Survey describes this as a \"trifecta.\" They want to feel seen by their manager, have clear growth paths, work for companies whose values are genuine not just written on a careers page and operate in psychologically safe environments where they can speak up without consequence.",
    },
    {
      question: 'Why is Gen Z disengaging at work in 2025?',
      answer:
        "According to Gallup's 2025 report, global employee engagement has dropped to its lowest point since 2020, with Gen Z and younger millennials losing 8 engagement points over five years. The primary drivers are a lack of recognition, absent growth conversations, disengaged managers, and a disconnect from company values not salary dissatisfaction.",
    },
    {
      question: 'Would Gen Z turn down a job offer over values misalignment?',
      answer:
        "Yes. 44% of Gen Z have declined job offers because the company's values didn't align with their own. They actively evaluate culture, leadership credibility, and whether a company actually lives its stated values not just the compensation package.",
    },
    {
      question: 'How can agencies improve Gen Z retention without increasing salaries?',
      answer:
        'Five evidence-backed strategies make the biggest difference: specific real-time recognition, quarterly growth conversations separate from KPI reviews, visible career milestones, managers who genuinely check in on team wellbeing, and psychological safety where honest opinions are welcomed. None of these require a budget increase.',
    },
  ],
  null,
  2
);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 15: Beyond the Pay check - What Makes Gen Z Stay...\n');

  const authorId = await getOrCreateAuthor('Editorial Team');

  const categoryIds = await Promise.all(
    ['Agency Insights', 'Strategy'].map(getOrCreateCategory)
  );

  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/gen-z-retention-paycheck.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'gen-z-retention-paycheck.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Beyond the pay check - what actually makes Gen Z stay at agencies',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/gen-z-retention-paycheck.jpg - skipping image');
  }

  const doc = {
    _type: 'post',
    title: 'Beyond the Pay check: What Actually Makes Gen Z Stay',
    slug: { _type: 'slug', current: 'beyond-the-paycheck-what-makes-gen-z-stay' },
    excerpt:
      "Employee engagement is at its lowest since 2020 and Gen Z is leading the slide - but it isn't about salary. Here is what actually keeps them, backed by Gallup, Deloitte, and what we are building inside Digitally Next.",
    publishedAt: '2026-06-20T10:00:00.000Z',
    featured: false,
    readTime: 7,
    body,
    faqsJson,
    metaTitle: 'Beyond the Pay check: What Actually Makes Gen Z Stay',
    metaDescription:
      "Gallup says global engagement is at a five-year low and Gen Z is leading the disengagement. Salary isn't the fix. Here is a straight-talk guide to what actually keeps this generation at work.",
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: beyond-the-paycheck-what-makes-gen-z-stay`);
  console.log(`    URL:  /blog/beyond-the-paycheck-what-makes-gen-z-stay\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
