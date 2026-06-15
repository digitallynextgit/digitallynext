/**
 * Seed script — Blog 10
 * "AI as the Foundation of Modern Marketing"
 *
 * Usage:
 *   node scripts/seed-blog-10-ai-foundation-modern-marketing.mjs
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

// Block builders — keep portable text construction terse and consistent.
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
  h2('Marketing Has a New Operating System and It Runs on AI'),
  p(
    "There was a time when AI in marketing meant a chatbot on your website or a product recommendation widget on an e-commerce page. Maybe an automated email sequence that fired when someone abandoned a cart. These were useful additions, no question. But they were additions, bolted on top of strategies that were fundamentally built by humans, for humans, using instinct as much as data."
  ),
  p('That era is over.'),
  p(
    "Today, artificial intelligence is not a feature you add to a marketing strategy. It is the infrastructure the strategy runs on. From the moment a brand identifies a potential audience to the second a campaign is adjusted mid-flight based on real-time signals, AI is embedded at every decision point. Brands that understand this are building sustainable competitive advantages. Brands that still treat AI as a nice-to-have are falling behind at a pace they may not even recognize yet."
  ),

  // ── Section 2 ──
  h2('What "AI as Foundation" Actually Means in Practice'),
  p(
    "Most marketing teams still think of AI as a productivity layer. Something that speeds up copywriting, helps schedule posts, or automates reporting. This is not wrong, but it is incomplete in a way that leads to underinvestment in the right places."
  ),
  p(
    "When we say AI is the foundation of modern marketing, we mean it is woven into every stage of the marketing value chain, not just the execution layer."
  ),
  p(
    "At the research and discovery stage, AI tools now process market signals, competitor activity, social sentiment trends, and search intent data at a scale and speed no human team could match. Brands using AI-driven market intelligence frameworks are making strategic decisions faster and with measurably greater accuracy than those still relying on quarterly reports and human intuition alone."
  ),
  p(
    "At the content creation and optimization stage, generative AI produces first drafts, A/B test variants, ad creatives, landing page copy, and product descriptions. But the more significant capability is what comes after creation: AI systems that continuously analyze what content performs, learn from those patterns, and refine output without waiting for a human to interpret data and redirect the team."
  ),
  p(
    "At the audience segmentation stage, predictive AI models do something static demographics never could. They build dynamic behavioral clusters that shift in real time based on how customers are actually behaving right now, not how a persona document described them six months ago. This allows targeting precision that traditional segmentation could not touch."
  ),
  p(
    "At the campaign execution stage, programmatic advertising, real-time bid management, dynamic budget allocation, and cross-channel sequencing all happen at millisecond speeds through AI systems. A human media buyer making manual decisions simply cannot operate at this pace or this level of variable optimization simultaneously."
  ),
  p(
    "At the measurement stage, multi-touch attribution models powered by machine learning give marketers genuinely clean visibility into what is driving revenue. This cuts through the noise of vanity metrics and the enduring confusion of last-click attribution models that have misled marketing investment decisions for years."
  ),

  // ── Section 3 ──
  h2('Why This Shift Is Structural, Not a Technology Cycle'),
  p(
    "Previous technology shifts in marketing were additive. Social media arrived and brands added social teams. Mobile rose to dominance and brands added mobile strategies. Programmatic advertising scaled up and brands added trading desks."
  ),
  p(
    "Each of these shifts added new channels and capabilities to frameworks that remained fundamentally unchanged. The underlying logic of marketing strategy, audience segmentation, messaging development, campaign planning, and measurement stayed mostly intact."
  ),
  p('AI is not additive in that way. It is rewriting the frameworks themselves.'),
  p(
    "Decision-making that once required weeks of analysis now happens in minutes. Creative testing that once demanded large production budgets and month-long timelines is now iterative overnight. Customer journey mapping that was done quarterly is now a live, continuously adjusted process. The pace of strategy itself has changed."
  ),
  p(
    "McKinsey's 2024 State of AI research found that companies with deeply integrated AI across their marketing functions see 15 to 20 percent higher marketing ROI compared to organizations still using AI in isolated, departmental pockets. That gap is not stable. As AI capabilities compound and the early movers build proprietary data advantages, the gap between integrated organizations and lagging ones will widen significantly over the next two to three years."
  ),

  // ── Section 4 ──
  h2('The Brands Demonstrating What This Looks Like'),
  p(
    "The most sophisticated marketing organizations have stopped asking whether they should invest in AI. They are asking how completely AI can be embedded into every decision they make."
  ),
  p(
    "Nike has integrated AI into its entire customer experience layer, from personalized training recommendations in its apps to dynamic product recommendations and campaign creative optimization. The marketing team's role has shifted from execution-heavy to strategy and oversight-focused. The AI handles execution; humans handle direction."
  ),
  p(
    "Spotify uses AI to drive both its product experience and its marketing strategy simultaneously, with personalized content recommendations, dynamic advertising placements, and predictive churn modeling all running through integrated AI systems. The data these systems generate feeds directly back into marketing strategy decisions."
  ),
  p(
    "Sephora has embedded AI into its beauty consultation tools, loyalty program personalization, and content recommendation engine in ways that have driven measurable improvements in customer retention and average order value. These are not pilot programs. They are core business infrastructure."
  ),
  p(
    "What these brands share is not an unlimited budget. They share a strategic decision to treat AI as foundational rather than supplemental, made early enough that they have accumulated data advantages their competitors are now struggling to close."
  ),

  // ── Section 5 ──
  h2('The Honest Challenges Brands Are Navigating'),
  p(
    "AI as a marketing foundation is not a frictionless journey. There are real challenges that brands need to plan for honestly rather than discover expensively."
  ),
  p(
    "Data quality is the most common constraint. AI systems are only as powerful as the data they learn from. Organizations with fragmented, siloed, or low-quality customer data will see fragmented, inconsistent AI performance. Fixing data infrastructure is an unsexy investment, but it is the prerequisite for everything else."
  ),
  p(
    "Team capability is the second major constraint. The biggest bottleneck to AI-powered marketing is not access to tools. It is marketers who do not know how to deploy those tools strategically. AI literacy across marketing teams is not optional anymore. It is a core competency requirement."
  ),
  p(
    "Brand voice consistency is a third real challenge. Over-automation can strip human nuance and tonal distinctiveness out of communications in ways that damage brand equity gradually. The organizations getting this right are not handing the brand to AI. They are using AI to scale their brand, with humans maintaining strategic oversight of voice, values, and creative direction."
  ),

  // ── Section 6 ──
  h2('What Marketers Need to Do Right Now'),
  p(
    "First, conduct an honest AI maturity audit. Map every stage of your marketing operation and identify where AI is being used effectively, where it is being used superficially, and where manual processes are still doing the work AI should be handling. The gaps in that map are your highest-priority investment areas."
  ),
  p(
    "Second, invest in team AI literacy at every level. This is not just for technical specialists. Account managers, content strategists, media planners, and brand leads all need working knowledge of how to use AI tools strategically within their specific functions."
  ),
  p(
    "Third, fix your data infrastructure before you invest heavily in AI tools. A best-in-class AI system running on poor data will underperform a basic system running on clean, unified data. Prioritize Customer Data Platform implementation and data governance as prerequisites."
  ),
  p(
    "Fourth, update your performance metrics. Traditional KPIs were designed for a pre-AI marketing world. Add metrics that reflect AI-era performance: personalization depth scores, predictive model accuracy rates, content iteration velocity, and real-time campaign adjustment frequency."
  ),
  p(
    "Fifth, build a governance framework for AI use. Define where AI operates autonomously, where it operates with human oversight, and where human judgment should always be primary. This is both a quality control mechanism and a brand protection mechanism."
  ),
];

// ── FAQs ──
const faqsJson = JSON.stringify(
  [
    {
      question: 'Is AI actually replacing marketing jobs?',
      answer:
        "AI is replacing repetitive, execution-heavy tasks that occupied significant portions of marketing roles. It is not replacing strategic thinking, creative direction, customer insight development, or relationship-driven functions. The net effect is a shift in how marketing talent is deployed, not a reduction in the need for skilled marketers.",
    },
    {
      question: 'Which marketing functions show the clearest ROI from AI investment?',
      answer:
        'Content personalization, paid media optimization, predictive lead scoring, email automation with dynamic content, and customer segmentation consistently produce the strongest measurable returns from AI integration.',
    },
    {
      question: 'How should a mid-sized brand with limited resources approach this?',
      answer:
        'Start with one high-impact, clearly measurable use case. Email personalization or paid media automation through tools like Google Performance Max or Meta Advantage+ are accessible starting points. Build on results rather than trying to transform everything simultaneously.',
    },
    {
      question: 'What separates brands that get good AI results from those that do not?',
      answer:
        'Data quality, team capability, and strategic intentionality. Brands that treat AI as a plug-and-play solution without investing in the data and human capability infrastructure underneath it consistently underperform expectations.',
    },
  ],
  null,
  2
);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 10: AI as the Foundation of Modern Marketing...\n');

  const authorId = await getOrCreateAuthor('Editorial Team');

  const categoryIds = await Promise.all(
    ['AI in Marketing', 'Strategy', 'Marketing'].map(getOrCreateCategory)
  );

  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/ai-foundation-modern-marketing.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'ai-foundation-modern-marketing.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Artificial intelligence as the foundation of modern marketing strategy',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/ai-foundation-modern-marketing.jpg — skipping image');
  }

  const doc = {
    _type: 'post',
    title: 'AI as the Foundation of Modern Marketing',
    slug: { _type: 'slug', current: 'ai-foundation-modern-marketing' },
    excerpt:
      'Artificial intelligence has moved from a marketing add-on to the core infrastructure powering every brand decision. Here is what that shift means and how to act on it.',
    publishedAt: '2026-06-15T10:00:00.000Z',
    featured: false,
    readTime: 12,
    body,
    faqsJson,
    metaTitle: 'AI as the Foundation of Modern Marketing',
    metaDescription:
      'Artificial intelligence has moved from a marketing add-on to the core infrastructure powering every brand decision in 2025. Here is what that shift means and how to act on it.',
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: ai-foundation-modern-marketing`);
  console.log(`    URL:  /blog/ai-foundation-modern-marketing\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
