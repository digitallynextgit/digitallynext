/**
 * Seed script - Blog 8
 * "Why Global Brands Entering India Fail at Digital Marketing - and the 4 Mistakes That Are Almost Always Responsible"
 *
 * Usage:
 *   node scripts/seed-blog-8-global-brands-india.mjs
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
    children: [{ _type: 'span', _key: key(), marks: [], text: "India is not a single market. It is 20+ distinct cultural and linguistic sub-markets operating simultaneously, with different content formats, payment behaviours, delivery expectations, and trust architectures. Global brands fail here not because their product is wrong but because their digital go-to-market strategy is a Western template applied to a continent-scale civilisation. The four mistakes below account for the majority of those failures." }],
  },

  // ── Section 1 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The First Problem: India Is Not A Single Market' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Most global brands enter India with one website, one creative direction, one language, and one funnel. Their market research said India has 800 million internet users. What the research did not say is that those 800 million users speak 22 scheduled languages, operate across 5 distinct income and aspiration tiers, and make purchase decisions based on trust signals that a global brand's performance marketing playbook was never designed to generate." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Treating India as a single addressable market is the foundational error. Everything else flows from it." }],
  },

  // ── Mistake 1 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Mistake 1: The Vernacular Blind Spot' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "By 2026, 60% of digital searches in India occur in regional languages or via voice. Hindi, Tamil, Telugu, Marathi, Kannada, and Bengali are not secondary languages in their geographies. They are the primary language of commerce, content consumption, and purchase intent." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Global brands investing in English-first digital content are invisible to the majority of India's high-growth markets. Tier 2 and Tier 3 cities, where 65% of India's new internet users live, are overwhelmingly non-English-first in their digital behaviour." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The mistake is not failing to translate. It is failing to understand that language is not a cosmetic layer over the same content. A Tamil buyer in Coimbatore and an English-first buyer in Bengaluru are making decisions through entirely different cultural and emotional frameworks. The same value proposition, translated, does not work. It needs to be rebuilt for each context." }],
  },

  // ── Mistake 2 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Mistake 2: The High-Fidelity Fallacy' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Global brands arrive in India with a production budget and a brief for a cinematic brand film. The film is beautiful. The engagement is minimal." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "India's Gen Z and Alpha consumers, the segment with the fastest-growing purchasing power, have developed a sophisticated rejection reflex for polished corporate content. The format they trust is raw, creator-led, UGC-style video shot on a phone, often in a regional language, often by someone who looks and sounds like them." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The brands winning in India in 2026 are not outspending on production. They are outperforming on authenticity. A 45-second Reel shot in a Pune apartment by a micro-creator with 80,000 followers is consistently outconverting a six-figure brand film in the same category." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The high-fidelity fallacy is the belief that production quality is a proxy for brand credibility. In India's current content ecosystem, it is often the opposite signal." }],
  },

  // ── Mistake 3 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Mistake 3: The Quick Commerce Disconnect' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "India has built the world's most sophisticated quick commerce infrastructure. 10-minute delivery via Blinkit, Zepto, and Swiggy Instamart now influences not just purchase behaviour but purchase expectation. UPI processed over 100 billion transactions in 2024. ONDC is restructuring e-commerce distribution at the infrastructure level." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Global brands entering India with a standard e-commerce playbook, optimised for a 3 to 5 day delivery window and card-based payments, are entering a market that has already moved past both assumptions." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The marketing disconnect is specific: a brand running awareness campaigns that drive traffic to a website checkout optimised for international payment flows is losing conversions to a competitor whose product is available for UPI checkout and 10-minute delivery in the same category. The marketing investment is generating intent that someone else is capturing." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Integrating with India's commerce infrastructure is not a logistics decision. It is a marketing decision." }],
  },

  // ── Mistake 4 ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Mistake 4: The Performance-Only Trap' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The most common global brand entry budget in India allocates 85 to 90% to bottom-funnel performance marketing. Meta ads, Google Performance Max, Amazon Sponsored Products. The logic is measurable, defensible, and almost always wrong in the Indian market." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Indian consumers, particularly in the Rs. 2,000 to Rs. 15,000 product category, make purchase decisions based on trust signals that performance ads do not generate. Founder credibility, community proof, category education, and what practitioners call the KASA model: Know, Admire, Stick, Advocate." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The brands building sustainable India businesses in 2026 are investing in founder authority on LinkedIn and YouTube, community-led growth through WhatsApp and creator networks, and category education content that builds understanding before asking for the sale. Performance ads convert existing intent. This content creates it." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "A brand with no India brand equity and 90% of budget in performance ads is paying to reach people who have never heard of them and asking them to trust a checkout page. The math rarely works." }],
  },

  // ── Fix Section ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Fix: From Translation to Transcreation' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The strategic shift is from translation to transcreation: using AI-driven cultural intelligence to rebuild the brand's voice, offer, and funnel architecture for each India sub-market, not translate one version into multiple languages." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "This means separate content strategies for Hindi-belt, South India, and metro-English markets. It means creator programs built around regional micro-communities, not national influencers. It means commerce integration that matches how each city's consumers already prefer to pay and receive. And it means a brand presence built on earned trust, not just purchased visibility." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Global brands do not fail in India because the opportunity is small. They fail because they copy-paste global playbooks into one of the most complex digital ecosystems in the world." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "At Digitally Next, we help international brands localize strategy, decode Indian consumer behavior, and build growth systems that actually translate across markets, platforms, languages, and buying patterns. Because scaling into India is not about spending more. It is about adapting faster." }],
  },
];

// ── FAQs ──
const faqsJson = JSON.stringify([
  {
    question: "How long does it take to build a viable India digital presence for a global brand?",
    answer: "A credible baseline with measurable brand recall and sustainable CAC takes 6 to 9 months when built correctly. Brands compressing this with performance-only spend typically pay 3 to 4 times more per acquisition without building the trust infrastructure needed for repeat purchase.",
  },
  {
    question: "Which regional markets in India should a global brand prioritise first?",
    answer: "It depends on the category. For premium consumer goods, metro Hindi-belt cities and Bengaluru are strong entry points. For mass market D2C, Maharashtra and Tamil Nadu offer the best digital infrastructure and creator ecosystems. No single answer applies across all categories.",
  },
  {
    question: "Does a global brand need separate content teams for regional languages?",
    answer: "Not from day one. The most efficient model combines a central brand strategy team with a regional creator network. AI transcreation tools accelerate production but still require human cultural review before publishing.",
  },
  {
    question: "What is the single highest-ROI change a global brand can make on entry into India?",
    answer: "Integrate with UPI and at least one quick commerce platform before running paid campaigns. The gap between generated intent and completed purchase is most often a payment and delivery friction problem, not a marketing problem.",
  },
], null, 2);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 8: Global Brands India...\n');

  const authorId = await getOrCreateAuthor('Editorial Team');

  const categoryIds = await Promise.all(
    ['Strategy', 'Marketing', 'Agency Insights'].map(getOrCreateCategory)
  );

  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/global-brands-india.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'global-brands-india.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Global brand strategy meeting for India market entry',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/global-brands-india.jpg - skipping image');
  }

  const doc = {
    _type: 'post',
    title: 'Why Global Brands Entering India Fail at Digital Marketing - and the 4 Mistakes That Are Almost Always Responsible',
    slug: { _type: 'slug', current: 'global-brands-india-digital-marketing-failures-2026' },
    excerpt: "India is not a single market. It is 20+ distinct cultural and linguistic sub-markets operating simultaneously. Global brands fail here not because their product is wrong but because their digital go-to-market strategy is a Western template applied to a continent-scale civilisation.",
    publishedAt: '2026-05-07T14:00:00.000Z',
    featured: false,
    readTime: 8,
    body,
    faqsJson,
    metaTitle: 'Why Global Brands Fail in India\'s Digital Market - and the 4 Mistakes That Keep Repeating',
    metaDescription: 'Most global brands enter India with a Western template and a translated website. Here is why that fails, what it costs, and what India-first digital strategy actually looks like in 2026.',
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: global-brands-india-digital-marketing-failures-2026`);
  console.log(`    URL:  /blog/global-brands-india-digital-marketing-failures-2026\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
