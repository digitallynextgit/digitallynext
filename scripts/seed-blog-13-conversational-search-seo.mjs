/**
 * Seed script — Blog 13
 * "Conversational Search Redefining SEO"
 *
 * Usage:
 *   node scripts/seed-blog-13-conversational-search-seo.mjs
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
  h2('SEO Is Being Rebuilt From the Ground Up'),
  p(
    "For most of the last fifteen years, SEO success could be defined with reasonable clarity. Rank in the top three positions for high-intent, high-volume keywords in your category. Build enough domain authority that your content earns those positions. Optimize titles, headers, and page structure for the signals search algorithms were known to weight. Drive organic traffic. Convert it."
  ),
  p(
    "The model worked. Whole agencies, entire SaaS categories, and major revenue streams at some of the world's most recognized digital businesses were built on this model."
  ),
  p(
    "That model is being fundamentally restructured by AI-powered search, and the pace of restructuring is accelerating in ways that most brands' SEO strategies have not yet caught up with."
  ),
  p(
    "Google's AI Overviews now appear at the top of results for hundreds of millions of queries daily, synthesizing answers without requiring a user to click through to any individual page. Perplexity has built a substantial and growing user base by offering a purely conversational search interface that generates cited, synthesized answers to complex questions. ChatGPT's search function and Microsoft Copilot are directing significant traffic and attention toward AI-generated responses rather than traditional result pages. The structure of search as an experience is changing at a pace and scale that requires a genuine strategic response, not incremental tactical adjustments."
  ),

  // ── Section 2 ──
  h2('How Conversational Search Differs From Traditional Search'),
  p(
    "To understand what is required strategically, it helps to understand precisely how conversational search works differently from the model SEO was built around."
  ),
  p(
    "In traditional search, a user types a keyword phrase, receives a ranked list of links, clicks through to individual pages, and reads the content that answers their question. The value exchange is clear: the search engine connects the user to a page, the page gets a visit, and SEO is the discipline of earning the connection."
  ),
  p(
    "In conversational search, a user types or speaks a natural language question, often a long and specific one that would have felt unnatural to type into a traditional search bar. The AI engine analyzes the question, identifies relevant sources across the web, synthesizes those sources into a coherent direct answer, attributes the sources with citations, and delivers the answer within the search interface. The user may never click through to any individual page. If they have follow-up questions, they ask them within the same conversational thread, and the AI answers with reference to the context of the entire conversation."
  ),
  p('The implications for SEO are significant at several levels.'),
  p(
    "Query length and specificity are increasing. Users who know AI engines can handle nuanced questions are asking nuanced questions. \"Best CRM\" is being replaced by \"I have a 15-person B2B sales team, we currently use spreadsheets, and our biggest problem is pipeline visibility. What CRM would actually solve that?\" The content that answers this kind of question is fundamentally different from content optimized for a two-word keyword."
  ),
  p(
    "Click-through rates on organic results are declining for information-intent queries. When an AI Overview or a Perplexity answer fully addresses the question at the top of the page, many users have no reason to click through. Google's own internal data, referenced in various industry publications, has shown significant click-through rate declines for queries where AI Overviews appear, particularly for definitional and how-to queries."
  ),
  p(
    "Being cited is becoming as important as ranking. AI engines cite sources. When Perplexity answers a question, it surfaces three to five sources. When Google's AI Overview summarizes a topic, it attributes specific claims to specific pages. Being one of the cited sources delivers visibility and credibility that can be more valuable than a position-four ranking that never gets seen because an AI Overview is above it."
  ),

  // ── Section 3 ──
  h2('Answer Engine Optimization: The Strategic Framework'),
  p(
    "Answer Engine Optimization (AEO) is the discipline of structuring content so that AI-powered search engines can extract it, trust it, and cite it in generated answers. It is not a replacement for traditional SEO. It is a layer of strategic optimization that must sit on top of a foundation of strong domain authority, technical health, and content quality."
  ),
  p('The core principles of AEO practice are distinct from traditional keyword optimization.'),
  p(
    "Direct answer structure is the most fundamental requirement. AI engines extract answers from content. They need to find clear, direct answers quickly. This means leading paragraphs and opening sentences of sections should directly answer the question being posed, before expanding into context, evidence, and nuance. Burying the answer in the third paragraph of a section because it flows better narratively is a direct AEO disadvantage."
  ),
  p(
    "Question-based heading architecture reflects how users actually formulate searches in a conversational context. A heading structured as \"What is first-party data?\" performs significantly better in AI citation contexts than a heading structured as \"First-Party Data Overview\" because it directly matches the query pattern AI engines are trained to recognize and extract answers for."
  ),
  p(
    "Semantic depth and topical completeness matter more than keyword density in AI search contexts. AI engines evaluate how comprehensively a piece of content covers a topic, including related concepts, entity associations, and contextual nuance, rather than how many times a specific keyword phrase appears. Content that covers a topic from multiple relevant angles, using natural language and related terminology, is more likely to be trusted and cited as an authoritative source."
  ),
  p(
    "Schema markup, particularly FAQ schema, HowTo schema, Article schema, and Speakable schema, helps AI engines understand the structural organization of content and identify specific sections as answer candidates. This is technical infrastructure that supports AEO performance without being visible to human readers."
  ),
  p(
    "E-E-A-T signals, representing Experience, Expertise, Authoritativeness, and Trustworthiness, have taken on even greater importance in AI search contexts because AI engines are specifically trained to evaluate and weight source credibility. Author credentials, cited original research, demonstrated domain expertise, and institutional authority signals all feed into whether an AI engine trusts your content enough to cite it as a source in a generated answer."
  ),
  p(
    "Concise, citable paragraph structure is the tactical execution element that ties AEO together. Writing in clear, self-contained paragraphs that address a single sub-question, typically in the 40 to 75 word range, creates the building blocks that AI engines extract when constructing synthesized answers. A paragraph that clearly states one important claim with supporting context is more extractable than a flowing narrative paragraph that weaves multiple ideas together elegantly but makes it difficult for an AI to identify the discrete answer it contains."
  ),

  // ── Section 4 ──
  h2('Measuring SEO Success in the AI Search Era'),
  p(
    "The metrics that defined SEO success in the traditional model need to be supplemented with new measurement approaches that capture performance in AI search contexts."
  ),
  p(
    "AI citation frequency, tracking how often your content is cited in AI-generated answers across major platforms, is an emerging but increasingly important metric. Tools for measuring this are less mature than traditional rank tracking tools, but the category is developing rapidly."
  ),
  p(
    "Zero-click search performance, analyzing how your brand and content are performing on queries where AI Overviews appear and click-through rates are depressed, helps diagnose the impact of AI search on your organic traffic patterns and informs optimization priority setting."
  ),
  p(
    "Brand mention volume in AI responses, which can be audited by systematically querying AI engines with relevant category questions and tracking how often your brand appears in generated answers, provides a proxy measure of your authority in AI search contexts."
  ),
  p(
    "Direct and branded traffic trends often reflect the downstream impact of AI visibility, as users who encounter your brand in an AI-generated answer frequently search for you directly rather than clicking through from a citation link."
  ),
];

// ── FAQs ──
const faqsJson = JSON.stringify(
  [
    {
      question: 'Is traditional SEO dead?',
      answer:
        'No. Technical SEO fundamentals, domain authority, site speed, structured data, and content quality remain foundational. What has changed is the relative importance of keyword ranking as the primary success metric. Ranking well is still necessary to be in the pool of sources AI engines draw from, but it is no longer sufficient as an outcome measure.',
    },
    {
      question: 'What is Answer Engine Optimization?',
      answer:
        'AEO is the practice of structuring and formatting content specifically so that AI-powered search engines like Google AI Overviews, Perplexity, and ChatGPT Search can extract, trust, and cite it in generated answers. It prioritizes direct answers, semantic completeness, question-based structure, and credibility signals.',
    },
    {
      question: 'How should I measure whether my content is performing in AI search?',
      answer:
        'Track branded search volume trends, direct traffic patterns, AI citation appearances (through manual auditing and emerging tracking tools), and organic click-through rate patterns by query intent category. Compare performance on queries where AI Overviews appear versus those where they do not.',
    },
    {
      question: 'Does content length affect AEO performance?',
      answer:
        'Clarity and semantic completeness matter more than length as standalone variables. However, comprehensive content in the 1,500 to 2,500 word range tends to be cited more frequently because it provides AI engines with more extractable answer material across a greater range of related sub-questions on a topic.',
    },
  ],
  null,
  2
);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 13: Conversational Search Redefining SEO...\n');

  const authorId = await getOrCreateAuthor('Editorial Team');

  const categoryIds = await Promise.all(
    ['AEO', 'AI Search', 'SEO'].map(getOrCreateCategory)
  );

  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/conversational-search-seo.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'conversational-search-seo.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Conversational AI search rebuilding SEO — query, synthesis, and cited sources in a generated answer',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/conversational-search-seo.jpg — skipping image');
  }

  const doc = {
    _type: 'post',
    title: 'Conversational Search Redefining SEO',
    slug: { _type: 'slug', current: 'conversational-search-redefining-seo' },
    excerpt:
      'AI-powered conversational search has fundamentally restructured how people discover information online. Here is what the shift means for SEO strategy and how to optimize for the new search reality.',
    publishedAt: '2026-06-18T10:00:00.000Z',
    featured: false,
    readTime: 12,
    body,
    faqsJson,
    metaTitle: 'Conversational Search Redefining SEO',
    metaDescription:
      'AI-powered conversational search has fundamentally restructured how people discover information online. Here is what the shift means for SEO strategy and how to optimize for the new search reality.',
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: conversational-search-redefining-seo`);
  console.log(`    URL:  /blog/conversational-search-redefining-seo\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
