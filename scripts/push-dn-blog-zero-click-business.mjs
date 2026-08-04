/**
 * Push the "Zero-Click Business" blog post into Sanity.
 *
 * Created with `visible: false`, so it stays off the site (listing, homepage
 * insights, sitemap, category pages, direct URL) until someone flips the
 * toggle in the Studio.
 *
 * Idempotent: deterministic _id (the slug) via createOrReplace, so re-running
 * updates the same document instead of creating a duplicate. Warns before
 * replacing a slug that already exists.
 *
 * Run from the repo root:
 *   node scripts/push-dn-blog-zero-click-business.mjs --dry-run
 *   node scripts/push-dn-blog-zero-click-business.mjs
 *
 * Requires in .env:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 */
import { createClient } from 'next-sanity';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

try {
  process.loadEnvFile(path.resolve(process.cwd(), '.env'));
} catch {
  /* env may already be set in the shell */
}

const DRY_RUN = process.argv.includes('--dry-run');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_STUDIO_API_TOKEN;

if (!projectId || !dataset || (!token && !DRY_RUN)) {
  console.error('Missing env. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

const AUTHOR_ID = '704c8009-6b36-4ca3-93d2-07256d52207c'; // digitallynext

const CAT = {
  aeo: 'x9AkaoQOe6dzdFl4eIRovD',
  aiSearch: 'WY20wT53hxKtTStZNBQqNA',
};

// --- Portable Text helpers -------------------------------------------------
const key = () => randomUUID().replace(/-/g, '').slice(0, 12);

function block(style, content) {
  const parts = typeof content === 'string' ? [{ text: content }] : content;
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: parts.map((s) => ({ _type: 'span', _key: key(), text: s.text, marks: s.marks || [] })),
  };
}

const p = (text) => block('normal', text);
const h2 = (text) => block('h2', text);
const lead = (label, rest) => block('normal', [{ text: label, marks: ['strong'] }, { text: rest }]);

function listItem(content) {
  const parts = typeof content === 'string' ? [{ text: content }] : content;
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: parts.map((s) => ({ _type: 'span', _key: key(), text: s.text, marks: s.marks || [] })),
  };
}

const bullet = (text) => listItem(text);

// --- Article ---------------------------------------------------------------
const ARTICLE = {
  slug: 'zero-click-business-how-brands-grow-when-nobody-visits-websites',
  title: 'The Zero-Click Business: How Brands Will Grow When Nobody Visits Websites',
  metaTitle: 'The Zero-Click Business: Growth Without Website Visits',
  metaDescription:
    'Most searches now end without a click. Learn how brands grow through AI citations, entity SEO, and AI visibility when nobody visits the website.',
  excerpt:
    'A zero-click business grows awareness, trust, and revenue even when users never visit its website, because AI search engines answer using the brand content. Win the citation, not the click.',
  publishedAt: '2026-08-04T10:00:00.000Z',
  categories: [CAT.aeo, CAT.aiSearch],
  body: [
    lead(
      'Quick Answer: ',
      `A zero-click business is a company that grows brand awareness, trust, and revenue even when users never visit its website, because AI-powered search engines like ChatGPT, Google AI Mode, Gemini, Perplexity, and Copilot deliver AI-generated answers directly using the brand's content. Success in zero-click marketing means winning the citation, not the click.`
    ),

    h2('Key Statistics'),
    bullet(
      `Bain & Company's February 2025 research found that 60% of searches now terminate without the user clicking through to another website, and that 80% of consumers rely on AI-generated results for at least 40% of their searches, a figure that has converged with SparkToro and Datos clickstream data around the same baseline.`
    ),
    bullet(
      `Google AI Overviews trigger on approximately 48% of all tracked search queries as of early 2026, marking roughly a 58% year-over-year increase, per BrightEdge data.`
    ),
    bullet(
      `Seer Interactive's measurement puts the organic click-through-rate decline at 61% on queries where AI Overviews appear, the most commonly cited figure for AI Overview impact.`
    ),
    bullet(
      `Gartner forecasts that traditional search engine volume will drop 25% by 2026 as generative AI solutions become substitute answer engines, with organic traffic decline projected to reach 50% by 2028.`
    ),
    bullet(
      `ChatGPT reached 900 million weekly active users as of OpenAI's February 27, 2026 announcement, putting it within reach of the 1 billion mark.`
    ),
    bullet(
      `Perplexity processed roughly 780 million search queries in May 2025 alone, maintaining more than 20% month-over-month query growth at the time.`
    ),

    h2('The Shift from Search Engines to AI Engines'),
    p(
      `AI search is no longer an experimental feature bolted onto Google. Conversational search through ChatGPT, Google AI Mode, Gemini, Perplexity, Claude, and Microsoft Copilot has become a primary discovery layer that sits between a question and an answer, citing a handful of sources rather than listing ten blue links. This is the search generative experience many marketers predicted years ago, now fully realized across an AI-first search landscape that includes conversational AI search as a default behavior, not a novelty. It also explains how AI search is changing digital marketing at a structural level, not just a tactical one.`
    ),

    h2('Why Website Traffic Is No Longer the Primary KPI'),
    p(
      `Why website traffic is declining across so many industries comes down to one shift: search without clicks is not a temporary glitch, it reflects a structural change in how people gather information. This website traffic decline is part of broader organic search trends that go beyond any single algorithm update, and it is exactly what marketing in the AI era needs to account for. The future of website traffic, and the future of organic search itself, now depends on being cited inside an AI generated answer rather than ranked on a results page nobody scrolls through. This is search beyond Google, since AI assistants increasingly answer questions without sending a visitor anywhere, a shift also reshaping digital marketing after AI search became mainstream.`
    ),

    h2('What Is a Zero-Click Business?'),
    p(
      `What is a zero-click business in practice? It is any brand that has restructured its marketing around AI visibility rather than pure organic traffic, and it answers the question of how brands grow without website traffic directly: by becoming the answer itself, appearing inside AI generated responses, earning AI citations, and building enough brand authority that AI systems treat the brand as a trustworthy source. How do brands grow without clicks more broadly? Through brand recall, share of voice, and demand generation that happens upstream of any single search session. This is also how businesses get customers from AI search in practice, since acquisition increasingly starts inside a chat interface rather than a search results page.`
    ),

    h2('Is SEO Dying Because of AI?'),
    p(
      `Is SEO dying because of AI, or simply evolving? The more accurate framing is SEO vs AEO, SEO vs GEO, and increasingly AEO vs GEO, not SEO replaced by AEO. Answer engine optimization and generative engine optimization extend traditional SEO rather than discarding it, and the future of SEO after AI looks far more collaborative across these disciplines than competitive. AI SEO, GEO SEO, and AEO SEO all depend on the same foundation: structured data, topical authority, and semantic SEO fundamentals like semantic search that were already central to strong SEO. The difference is that AI optimization also requires LLM optimization, or LLMO, and AI visibility optimization, or AVO, since large language models and machine learning parse content differently than traditional crawlers.`
    ),

    h2('How Do Brands Win in AI Search?'),
    p(
      `How do AI search engines recommend brands? Generally through a combination of entity SEO, E-E-A-T signals, structured data, and consistent brand mentions that reinforce a knowledge graph entry. How do businesses appear in AI answers? By publishing content that directly answers search intent, using schema markup, and maintaining digital trust through consistent brand signals across owned media and digital PR placements. How does Google AI Mode change SEO? It rewards Retrieval-Augmented Generation friendly content that a RAG pipeline can extract and cite confidently.`
    ),

    h2('The New Metrics That Matter'),
    p(
      `Can ChatGPT send traffic to websites? Occasionally, but the more important question is what is AI citation optimization, since being cited builds brand recall even without a click, which is why modern AI search optimization strategies now track citations as closely as clicks. AI share of voice, alongside traditional share of voice, is becoming a core marketing attribution metric. Brand mentions, AI discovery, organic traffic, and conversion rate now sit together as measures of marketing performance. Customer acquisition increasingly starts with an AI citation long before a customer journey reaches a landing page.`
    ),

    h2('A Practical Framework for the Zero-Click Era'),
    p(
      `How can businesses optimize for AI assistants and learn how to increase AI visibility, or more specifically AI brand visibility, across every platform that matters? Five moves form a practical AI marketing strategy for how to optimize for AI search engines broadly.`
    ),
    bullet(
      `Invest in first-party data and owned media, since these are the assets AI systems and future algorithms cannot easily replicate, and they protect organic visibility even as clicks decline.`
    ),
    bullet(
      `Build topical authority through consistent content marketing and thought leadership rather than one off posts, treating this as ongoing AI content optimization rather than a single project.`
    ),
    bullet(
      `Strengthen entity SEO with clean structured data and schema markup so knowledge graphs represent your brand accurately, and so Retrieval-Augmented Generation, or RAG, systems can extract your content reliably.`
    ),
    bullet(
      `Pursue digital PR and omnichannel marketing to generate the brand mentions that feed AI training and retrieval systems, supporting AI-powered customer acquisition over time.`
    ),
    bullet(
      `Track AI citations directly: how to get discovered in ChatGPT, how to appear in Google AI Overviews, how to appear in Perplexity AI, how to get mentioned in Gemini, and how to rank in AI search all depend on the same signal, which is how to get cited by AI in the first place, and ultimately, how do AI search engines rank websites within the answers they generate.`
    ),

    h2('Sources and Further Reading'),
    p(
      `This article draws on publicly reported statistics from SparkToro and Datos, Bain & Company, Gartner, BrightEdge, and Seer Interactive, along with reporting on OpenAI and Perplexity usage data. For platform specific guidance, review documentation from Google Search Central, OpenAI, Microsoft, and Anthropic directly, since AI search features and citation mechanics continue to change quickly through 2026.`
    ),
  ],
  faqs: [
    {
      question: 'Will websites become less important?',
      answer:
        'Websites remain important as the source AI systems cite, even though direct visits may decline for many informational queries.',
    },
    {
      question: 'What is AI visibility?',
      answer:
        'AI visibility is how often and how accurately a brand appears inside AI generated answers across platforms like ChatGPT, Gemini, and Perplexity.',
    },
    {
      question: 'Why are zero-click searches increasing?',
      answer:
        'Zero-click searches are increasing because AI Overviews and AI assistants answer more queries directly on the results page or inside a chat interface.',
    },
    {
      question: 'What is the future of digital marketing?',
      answer:
        'The future of digital marketing centers on AI visibility, brand authority, and citation optimization alongside traditional SEO and paid channels, not instead of them.',
    },
  ],
};

// --- Guards ----------------------------------------------------------------
/** Fail loudly rather than silently shipping a dash the brief banned. */
function assertNoDashes(a) {
  const banned = /[—–]/; // em dash, en dash
  const haystack = [
    a.title,
    a.metaTitle,
    a.metaDescription,
    a.excerpt,
    ...a.body.flatMap((b) => (b.children || []).map((c) => c.text)),
    ...a.faqs.flatMap((f) => [f.question, f.answer]),
  ];
  for (const s of haystack) {
    if (banned.test(s)) throw new Error(`Dash found in "${a.slug}": ${s.slice(0, 90)}`);
  }
}

/** The pasted source carried trailing citation labels; make sure none survived. */
function assertNoCitationArtifacts(a) {
  const artifacts = ['ShiwaforceGrowth', 'Perplexityaimagazine', 'DemandSage', 'Digital Applied Team'];
  const text = a.body.flatMap((b) => (b.children || []).map((c) => c.text)).join(' ');
  for (const bad of artifacts) {
    if (text.includes(bad)) throw new Error(`Leftover citation label in body: ${bad}`);
  }
}

function readTimeOf(a) {
  const words = a.body
    .flatMap((b) => (b.children || []).map((c) => c.text))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// --- Push ------------------------------------------------------------------
async function run() {
  assertNoDashes(ARTICLE);
  assertNoCitationArtifacts(ARTICLE);

  const a = ARTICLE;
  console.log(`${DRY_RUN ? '[DRY RUN] ' : ''}Pushing 1 post to ${projectId}/${dataset}\n`);

  const existing = DRY_RUN ? null : await client.fetch(`*[_type=="post" && slug.current==$s][0]{_id}`, { s: a.slug });

  const doc = {
    _id: a.slug,
    _type: 'post',
    title: a.title,
    slug: { _type: 'slug', current: a.slug },
    author: { _type: 'reference', _ref: AUTHOR_ID },
    categories: a.categories.map((id) => ({ _type: 'reference', _ref: id, _key: key() })),
    publishedAt: a.publishedAt,
    excerpt: a.excerpt,
    readTime: readTimeOf(a),
    featured: false,
    visible: false, // stays off the site until someone flips it in the Studio
    faqsJson: JSON.stringify(a.faqs, null, 2),
    metaTitle: a.metaTitle,
    metaDescription: a.metaDescription,
    body: a.body,
  };

  console.log(`• ${a.title}`);
  console.log(`  slug=${a.slug}`);
  console.log(
    `  visible=false  readTime=${doc.readTime}  blocks=${a.body.length}  faqs=${a.faqs.length}  ` +
      `metaTitle=${a.metaTitle.length}ch  metaDesc=${a.metaDescription.length}ch`
  );

  if (DRY_RUN) {
    console.log('\n  (dry run, nothing written)');
    console.log('Dry run complete. Re-run without --dry-run to write.');
    return;
  }

  if (existing) console.log(`  ! slug already exists (${existing._id}), replacing it`);
  const res = await client.createOrReplace(doc);
  console.log(`  saved _id=${res._id} -> /blog/${a.slug} (hidden)\n`);
  console.log(existing ? 'Done. 0 created, 1 replaced.' : 'Done. 1 created, 0 replaced.');
}

run().catch((err) => {
  console.error('\nFailed:', err.message);
  process.exit(1);
});
