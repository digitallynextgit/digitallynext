/**
 * Seed script — Blog 12
 * "First-Party Data Strategies Replacing Third-Party Tracking"
 *
 * Usage:
 *   node scripts/seed-blog-12-first-party-data-strategies.mjs
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

// ── Portable Text body ──
const body = [
  // ── Lede ──
  h2('The Data Model That Powered Digital Advertising for Twenty Years Just Broke'),
  p(
    "For two decades, third-party cookies were the invisible infrastructure of digital advertising. They silently tracked users across websites, built behavioral profiles from browsing history, and powered remarketing campaigns that followed potential customers from site to site with precision that felt almost predictive."
  ),
  p(
    "Marketers built entire strategies around this infrastructure. Retargeting budgets. Lookalike audiences built on third-party behavioral data. Cross-site frequency management. Attribution models that connected a purchase back through a chain of touchpoints spread across weeks of browsing activity."
  ),
  p('Then the infrastructure started collapsing.'),
  p(
    "Google's deprecation of third-party cookies in Chrome, Apple's App Tracking Transparency framework that required explicit opt-in for cross-app tracking (with opt-out rates above 80 percent in most markets), Safari's Intelligent Tracking Prevention, and the escalating weight of GDPR, CCPA, and similar privacy regulations globally have dismantled the third-party data ecosystem in ways that are not reversible."
  ),
  p(
    "Brands that spent the last two years waiting for a workaround are now realizing there is no workaround. There is only rebuilding. And the brands that started rebuilding early now have data assets that represent a genuine and durable competitive moat."
  ),

  // ── Section 2 ──
  h2('Why First-Party Data Is Structurally Superior'),
  p(
    "First-party data is information that customers share directly with your brand through owned interactions: purchases, account creation, email subscriptions, app usage, loyalty program enrollment, surveys, and direct service interactions."
  ),
  p(
    "Compared to third-party data, it has structural advantages that are not marginal."
  ),
  p(
    "It is accurate because it comes directly from the customer, not inferred from behavioral signals observed on third-party platforms where the customer's intent and context are often ambiguous. When someone tells you their preferences directly, you have higher-quality information than when an algorithm guesses at preferences from browsing patterns."
  ),
  p(
    "It is consented because customers knowingly provided it through a direct relationship with your brand. This reduces regulatory exposure dramatically and, more importantly, means the customer has a relationship with you that creates an expectation of value in exchange for their data, which improves the quality of the data you receive."
  ),
  p(
    "It is durable because it does not disappear when a browser updates its privacy architecture or when a platform changes its data-sharing terms. You own it. It lives in your systems and continues to be useful regardless of what happens in the broader technology ecosystem."
  ),
  p(
    "It is exclusive because your competitors cannot buy it. Third-party data is available to any brand willing to pay for it, which means targeting based on third-party behavioral data provides no differentiation. First-party data built through genuine customer relationships is proprietary by nature."
  ),

  // ── Section 3 ──
  h2('Five First-Party Data Strategies That Work'),
  p(
    "Gated content and value exchange programs are among the most effective tools for building first-party data assets at scale. The critical variable is the genuine quality of what you are offering. A superficial checklist or a generic guide will not motivate meaningful data sharing. A substantive industry report, an interactive assessment tool, a proprietary research study, or a genuinely useful calculator will. The brands building the strongest first-party data assets through content are those investing in content that has enough inherent value that customers would consider paying for it, then offering it free in exchange for contact information and preference data."
  ),
  p(
    "Loyalty and rewards programs are arguably the highest-quality first-party data mechanism available because they capture declared preference data at scale. When customers enroll in a loyalty program, they tell you directly what categories they buy in, how frequently, what price points they engage with, what promotions motivate them, and what communication channels they prefer. Starbucks' loyalty program is a foundational element of its entire marketing strategy, not just a customer retention mechanism, precisely because it generates the data infrastructure that powers personalization, offer strategy, and product development simultaneously."
  ),
  p(
    "Interactive experiences and decision tools generate rich preference data while delivering genuine utility to the customer. Skin assessment quizzes that lead to product recommendations. Style preference tools that learn aesthetic sensibilities through a series of visual choices. Financial planning calculators that collect goals and circumstances while providing genuinely useful outputs. These tools create a natural and transparent value exchange: the customer gets a useful result, the brand gets structured preference data that would be impossible to infer from passive behavioral observation."
  ),
  p(
    "Progressive profiling through email and SMS sequences solves the data collection friction problem. Rather than asking customers to provide extensive information at the point of acquisition, which increases abandonment rates, progressive profiling collects small amounts of information at each subsequent interaction. Over several touchpoints, you build a complete and accurate customer profile without ever creating a moment where the data request felt burdensome or intrusive."
  ),
  p(
    "Owned communities and direct dialogue channels are the most underutilized first-party data mechanism in most brands' arsenals. Discord servers, membership forums, customer advisory programs, and community platforms generate qualitative data about customer needs, pain points, evolving preferences, and the language customers use to describe their problems. This qualitative intelligence informs not just targeting strategy but creative strategy, product development, and brand positioning in ways that behavioral data alone cannot."
  ),

  // ── Section 4 ──
  h2('Building the Infrastructure That Makes First-Party Data Usable'),
  p(
    "Collecting first-party data is only half the challenge. The other half is building the infrastructure that makes it actionable."
  ),
  p(
    "Customer Data Platforms are the foundational technology requirement. Without a CDP, first-party data lives in silos: your email platform does not talk to your CRM, which does not talk to your paid media platform, which does not talk to your on-site personalization engine. The result is that every channel is working with incomplete information about the same customer, and the cumulative value of your first-party data is dramatically lower than it should be."
  ),
  p(
    "Server-side tagging replaces browser-based event tracking with server-side data collection, capturing behavioral signals more accurately while removing dependence on browser environments that may block or limit client-side tracking. This is a technical investment but one that meaningfully improves data completeness and quality."
  ),
  p(
    "Data clean rooms allow brands to match their first-party data against publisher and platform data for targeting and measurement purposes, without sharing raw customer records. Google's PAIR framework and Meta's Advanced Matching use this technology to enable privacy-safe audience matching between brand first-party data and platform user bases."
  ),
  p(
    "Consent management platforms are the governance layer that ensures every data collection point is compliant with applicable privacy regulations, consent records are maintained accurately, and customer data rights requests can be fulfilled promptly. This is not optional infrastructure. It is foundational to operating a sustainable first-party data strategy in a regulated environment."
  ),

  // ── Section 5 ──
  h2('The Competitive Window That Is Closing'),
  p(
    "The brands that started building first-party data infrastructure three to four years ago now have behavioral history, preference records, and predictive model training data that brands starting today will need years to replicate."
  ),
  p(
    "The window for closing that gap is not infinite. Every quarter that passes without serious investment in first-party data strategy is a quarter of data compound advantage that accrues to more forward-thinking competitors. The urgency is not abstract."
  ),
  p(
    "Boston Consulting Group research found that brands using first-party data for digital advertising achieve a 2.9 times revenue uplift compared to those relying on third-party targeting. That differential is driven by data accuracy, audience quality, and the personalization precision that only first-party data can enable."
  ),
];

// ── FAQs ──
const faqsJson = JSON.stringify(
  [
    {
      question: 'What is the practical first step for a brand starting to build a first-party data strategy?',
      answer:
        'Audit what first-party data you already have and where it lives. Most brands are sitting on significant underutilized first-party data assets spread across disconnected systems. Understanding what you have and unifying it is the highest-ROI first step before building new collection mechanisms.',
    },
    {
      question: 'How does first-party data improve paid advertising performance specifically?',
      answer:
        'First-party data uploaded to platforms like Google (Customer Match) and Meta (Custom Audiences) enables targeting of known customers, exclusion of recent converters from acquisition campaigns, and construction of lookalike audiences based on your best customers. The audience quality is significantly higher than third-party behavioral audiences because it is built on verified customer relationships.',
    },
    {
      question: 'What are the regulatory requirements for first-party data collection?',
      answer:
        'GDPR in Europe, CCPA and CPRA in California, LGPD in Brazil, and equivalent frameworks in dozens of other jurisdictions require transparent consent for data collection, accessible privacy policies, data minimization practices, and the ability to fulfill data access and deletion requests. A consent management platform is the practical tool for managing compliance across these frameworks.',
    },
    {
      question: 'Can small brands build meaningful first-party data assets?',
      answer:
        'Yes. The mechanisms, gated content, email list building, loyalty programs, and interactive tools, are accessible at any budget level. What matters is starting deliberately and consistently, not the scale of initial investment.',
    },
  ],
  null,
  2
);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 12: First-Party Data Strategies...\n');

  const authorId = await getOrCreateAuthor('Editorial Team');

  const categoryIds = await Promise.all(
    ['Strategy', 'Marketing', 'Analytics'].map(getOrCreateCategory)
  );

  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/first-party-data-strategies.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'first-party-data-strategies.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'First-party data strategies replacing third-party cookies — customer data flowing into brand-owned systems',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/first-party-data-strategies.jpg — skipping image');
  }

  const doc = {
    _type: 'post',
    title: 'First-Party Data Strategies Replacing Third-Party Tracking',
    slug: { _type: 'slug', current: 'first-party-data-strategies-replacing-third-party-tracking' },
    excerpt:
      'Third-party cookies are gone. Here is how brands are building first-party data strategies that deliver superior targeting, richer insights, and full regulatory compliance.',
    publishedAt: '2026-06-17T10:00:00.000Z',
    featured: false,
    readTime: 12,
    body,
    faqsJson,
    metaTitle: 'First-Party Data Strategies Replacing Third-Party Tracking',
    metaDescription:
      'Third-party cookies are gone. Here is how brands are building first-party data strategies that deliver superior targeting, richer insights, and full regulatory compliance.',
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: first-party-data-strategies-replacing-third-party-tracking`);
  console.log(`    URL:  /blog/first-party-data-strategies-replacing-third-party-tracking\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
