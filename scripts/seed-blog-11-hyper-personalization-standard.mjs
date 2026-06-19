/**
 * Seed script - Blog 11
 * "Hyper-Personalization as the Standard"
 *
 * Usage:
 *   node scripts/seed-blog-11-hyper-personalization-standard.mjs
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

// ── Portable Text body ──
const body = [
  // ── Lede ──
  h2('The Day "Hi First Name" Stopped Being Enough'),
  p(
    "There was a point when inserting a customer's first name into a subject line felt innovative. Open rates jumped. Marketers celebrated. It felt personal in a world where most brand communications were completely generic."
  ),
  p(
    "That moment is long past. Today, email personalization at the name level does not move the needle. It barely gets noticed. Consumers have been conditioned by the best digital experiences on the planet, built by companies like Spotify, Netflix, Amazon, and Apple, to expect something much more sophisticated. They expect brands to understand them. Their context. Their preferences. Their timing. Their behavioral patterns. Their place in a decision journey."
  ),
  p(
    "Hyper-personalization is not a premium feature that growing brands aspire to. It is increasingly the baseline requirement for meaningful customer engagement. And the gap between brands delivering it and those still relying on basic segmentation is measurable in revenue, retention, and relevance."
  ),

  // ── Section 2 ──
  h2('Defining the Difference Between Personalization and Hyper-Personalization'),
  p(
    "Standard personalization uses stored static data to customize surface-level communications. Name, location, last purchase category, loyalty tier. These inputs inform simple modifications to what is essentially the same message sent to a broad audience."
  ),
  p(
    "Hyper-personalization uses real-time behavioral data, AI-driven predictive modeling, contextual signals, and declared preference data to create experiences that adapt dynamically at the individual level, across every touchpoint, continuously."
  ),
  p('The practical difference is significant.'),
  p(
    "Standard personalization tells a customer about a sale in a product category they bought from six months ago. Hyper-personalization notifies that customer about a sale on the specific product subcategory they browsed twice in the last week, at the time of day their purchase history shows they are most likely to convert, with creative that reflects the price range their behavior signals they are comfortable with."
  ),
  p(
    "Standard personalization puts a customer in an email segment based on their location. Hyper-personalization builds a dynamic profile that updates based on every click, every dwell time signal, every preference action, and every external contextual factor, and adjusts the content they see in real time to match where they actually are in their decision journey."
  ),

  // ── Section 3 ──
  h2('The Technology Infrastructure Behind Hyper-Personalization at Scale'),
  p(
    "Hyper-personalization is not just a strategy shift. It requires specific technology working in coordinated layers."
  ),
  p(
    "The first layer is real-time data infrastructure. Customer Data Platforms like Segment, Salesforce Data Cloud, Adobe Experience Platform, and mParticle unify behavioral data from web, mobile app, email, in-store, and customer service interactions into a single continuously updated customer profile. Without this unification, personalization is fragmented because each channel is working from incomplete information about the same customer."
  ),
  p(
    "The second layer is AI and machine learning modeling. Predictive algorithms analyze behavioral patterns across thousands of variables to anticipate next actions: what a customer is likely to purchase, when they are likely to churn, what content format will drive engagement, what price point they will respond to. These models run continuously, updating predictions as new behavioral data flows in."
  ),
  p(
    "The third layer is dynamic content delivery infrastructure. Personalization engines like Dynamic Yield, Salesforce Interaction Studio, and Optimizely serve different content, offers, calls to action, and in some cases pricing, dynamically based on the real-time customer profile. The same homepage can present a meaningfully different experience to fifty different visitor profiles simultaneously."
  ),

  // ── Section 4 ──
  h2('Where Hyper-Personalization Drives Measurable Results'),
  p(
    "Email marketing is the most established channel for measuring personalization impact, and the data is consistently clear. Brands using AI-driven dynamic content in email consistently report open rate improvements of 26 to 41 percent and significantly higher click-to-conversion ratios compared to segmented-but-static campaigns. The improvement compounds over time as the models learn more about individual behavioral patterns."
  ),
  p(
    "E-commerce product discovery is where the economic impact of hyper-personalization is most visible at scale. Amazon has publicly attributed 35 percent of its total revenue to its recommendation engine. That is not a supporting feature of the shopping experience. It is a core revenue infrastructure built entirely on behavioral personalization at the individual level."
  ),
  p(
    "Paid advertising has been transformed by dynamic creative optimization, which uses AI to assemble ad variants in real time, matching visual elements, copy variations, offers, and calls to action to individual user profiles within milliseconds of an ad impression being served. Brands implementing DCO consistently report 50 percent or greater improvements in ad relevance scores, with corresponding improvements in click-through and conversion efficiency."
  ),
  p(
    "Website experience personalization, where homepage content, hero banners, navigation recommendations, and calls to action adapt to visitor profiles in real time, consistently outperforms static website experiences on every conversion metric. Brands that have invested seriously in this layer report conversion rate improvements of 20 to 40 percent, driven primarily by showing visitors content that is actually relevant to where they are in their journey."
  ),

  // ── Section 5 ──
  h2('The Trust Challenge Brands Cannot Ignore'),
  p(
    "There is a fundamental tension in hyper-personalization that every brand needs to take seriously. Consumers want to feel understood by the brands they engage with. And they are simultaneously more aware of, and concerned about, how their data is being used than at any previous point in digital history."
  ),
  p(
    "Edelman's 2024 Trust Barometer research found that 71 percent of consumers will disengage from a brand if they feel their data is being used in ways that do not provide clear benefit to them. Apple's App Tracking Transparency framework, which requires explicit opt-in for cross-app tracking, saw opt-out rates above 80 percent in most markets. Consumers are not passive about this."
  ),
  p(
    "The line between \"this brand really gets me\" and \"this brand is watching everything I do\" is thin and highly subjective. Brands that cross it do not just lose a campaign. They lose trust that takes years to rebuild."
  ),
  p(
    "The solution is not to reduce personalization. It is to build personalization on a foundation of transparent value exchange. Make it clear what data you are collecting. Make the benefit to the customer explicit and genuine. Use personalization to serve customer needs rather than to maximize extraction. Personalization built on earned trust and explicit consent consistently outperforms personalization built on covert data practices, both because the data quality is higher and because the customer relationship is more durable."
  ),

  // ── Section 6 ──
  h2('What a Hyper-Personalization Roadmap Looks Like'),
  p(
    "For brands in early stages, the starting point is data unification. Before investing in sophisticated personalization tools, consolidate customer data from all channels into a single platform where a unified profile can be built and maintained. This is foundational work that unlocks everything else."
  ),
  p(
    "The second stage is behavioral segmentation that goes beyond demographics. Build dynamic segments based on engagement patterns, purchase behavior, content preferences, and lifecycle stage. These segments should update automatically as customer behavior evolves, not be refreshed manually on a quarterly schedule."
  ),
  p(
    "The third stage is channel-by-channel personalization implementation. Start with email, where the tools are most mature and the measurement is clearest. Move to on-site experience personalization once email is performing. Expand to paid media with dynamic creative as your data assets grow and your model has enough behavioral history to generate reliable predictions."
  ),
  p(
    "The fourth stage is predictive capability. Move from reacting to what customers have done to anticipating what they will do next. Predictive churn models, propensity-to-purchase scoring, and next-best-action frameworks represent the mature end of the hyper-personalization capability spectrum."
  ),
];

// ── FAQs ──
const faqsJson = JSON.stringify(
  [
    {
      question: 'What data inputs are required for hyper-personalization to work?',
      answer:
        'The core inputs are behavioral data (browse history, click patterns, content engagement, time-on-page), transactional data (purchase history, average order value, purchase frequency), contextual data (device type, location, time of day), and declared preference data (quiz responses, wish lists, explicit preferences). The more of these you can unify in real time, the more precise the personalization.',
    },
    {
      question: 'Is hyper-personalization only viable for large enterprise brands?',
      answer:
        "No. Tools like Klaviyo, Drip, Dynamic Yield, and Shopify's native AI personalization features make behavioral personalization accessible to mid-market and growth-stage brands at costs that have come down dramatically in the last three years.",
    },
    {
      question: 'How does hyper-personalization affect customer retention specifically?',
      answer:
        'McKinsey research consistently shows that personalization leaders generate 40 percent more revenue from personalization efforts than average players, with the majority of that difference driven by retention and repeat purchase improvements rather than new customer acquisition.',
    },
    {
      question: 'What is the biggest mistake brands make when implementing personalization?',
      answer:
        "Treating personalization as a technology project rather than a customer experience strategy. Technology is the enabler, but the goal is always making the customer's experience more relevant and valuable. Brands that lose sight of this end up with technically sophisticated personalization that still feels intrusive or irrelevant because it optimizes for brand metrics rather than customer value.",
    },
  ],
  null,
  2
);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 11: Hyper-Personalization as the Standard...\n');

  const authorId = await getOrCreateAuthor('Editorial Team');

  const categoryIds = await Promise.all(
    ['Strategy', 'Marketing', 'AI in Marketing'].map(getOrCreateCategory)
  );

  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/hyper-personalization-standard.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'hyper-personalization-standard.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Hyper-personalization in modern marketing - real-time data driving individual customer experiences',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/hyper-personalization-standard.jpg - skipping image');
  }

  const doc = {
    _type: 'post',
    title: 'Hyper-Personalization as the Standard',
    slug: { _type: 'slug', current: 'hyper-personalization-as-the-standard' },
    excerpt:
      'Hyper-personalization has evolved from a competitive advantage into the baseline expectation of modern consumers. Here is what it means, how it works, and what brands must do to meet the new standard.',
    publishedAt: '2026-06-16T10:00:00.000Z',
    featured: false,
    readTime: 11,
    body,
    faqsJson,
    metaTitle: 'Hyper-Personalization as the Standard',
    metaDescription:
      'Hyper-personalization has evolved from a competitive advantage into the baseline expectation of modern consumers. Here is what it means, how it works, and what brands must do to meet the new standard.',
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: hyper-personalization-as-the-standard`);
  console.log(`    URL:  /blog/hyper-personalization-as-the-standard\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
