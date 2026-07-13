/**
 * Generators for /llms.txt and /llms-full.txt (see https://llmstxt.org).
 *
 * llms.txt      - a concise, curated markdown index of the site for LLMs.
 * llms-full.txt - the same structure but with full article content inlined,
 *                 so AI assistants can answer from Digitally Next's own words.
 *
 * Both pull live blog content from Sanity, so they stay current automatically.
 */
import { client } from '@/sanity/client';
import { siteConfig } from '@/app/utils/seo';
import { services } from '@/data/services';
import { caseStudies } from '@/data/casestudy';

const BASE = siteConfig.siteUrl;

type PostLite = {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  categories?: string[];
};

type PortableBlock = {
  _type: string;
  style?: string;
  listItem?: string;
  children?: { text?: string }[];
};

type PostFull = PostLite & {
  author?: string;
  faqsJson?: string;
  body?: PortableBlock[];
};

// GROQ as plain strings (client.fetch accepts a string query).
const POSTS_LITE_QUERY = `*[_type == "post"] | order(publishedAt desc){
  title, "slug": slug.current, excerpt, publishedAt,
  "categories": categories[]->title
}`;

const POSTS_FULL_QUERY = `*[_type == "post"] | order(publishedAt desc){
  title, "slug": slug.current, excerpt, publishedAt, faqsJson,
  "categories": categories[]->title,
  "author": author->name,
  body
}`;

/** Strip a trailing " | Digitally Next" suffix from meta titles for clean labels. */
function cleanTitle(t: string): string {
  return t.replace(/\s*[|\-–-]\s*Digitally\s*Next.*$/i, '').trim();
}

/** ISO date (YYYY-MM-DD) - avoids locale variance. */
function isoDate(d?: string): string {
  return d ? d.slice(0, 10) : '';
}

/**
 * Minimal Portable Text -> Markdown for the full-content export.
 * `headingShift` demotes body headings so they nest under the article title
 * (e.g. shift=2 turns a body H2 into "####"). Capped at 6 hashes.
 */
function ptToMarkdown(blocks?: PortableBlock[], headingShift = 0): string {
  if (!Array.isArray(blocks)) return '';
  const hashes = (level: number) => '#'.repeat(Math.min(level + headingShift, 6));
  const lines: string[] = [];
  for (const block of blocks) {
    if (block._type !== 'block') continue; // skip images, embeds, etc.
    const text = (block.children ?? [])
      .map((c) => c.text ?? '')
      .join('')
      .trim();
    if (!text) continue;
    const style = block.style ?? 'normal';
    if (block.listItem) lines.push(`- ${text}`);
    else if (style === 'h2') lines.push(`${hashes(2)} ${text}`);
    else if (style === 'h3') lines.push(`${hashes(3)} ${text}`);
    else if (style === 'h4') lines.push(`${hashes(4)} ${text}`);
    else if (style === 'blockquote') lines.push(`> ${text}`);
    else lines.push(text);
  }
  return lines.join('\n\n');
}

function faqsToMarkdown(faqsJson?: string): string {
  if (!faqsJson) return '';
  try {
    const faqs = JSON.parse(faqsJson) as { question: string; answer: string }[];
    if (!Array.isArray(faqs) || faqs.length === 0) return '';
    return ['**FAQs**', ...faqs.map((f) => `**Q: ${f.question}**\nA: ${f.answer}`)].join('\n\n');
  } catch {
    return '';
  }
}

function header(): string {
  return [
    `# ${siteConfig.siteName}`,
    '',
    `> ${siteConfig.defaultDescription} Serving global brands, Digitally Next combines brand strategy, performance marketing, SEO and AI search optimization (GEO/AEO), content, social, UI/UX design, web development, and AI enablement to turn attention into measurable growth.`,
  ].join('\n');
}

function keyPagesSection(): string {
  return [
    '## Key Pages',
    '',
    `- [Home](${BASE}/): Overview of Digitally Next, services, and client results.`,
    `- [Case Studies](${BASE}/case-studies): Client growth stories and measurable outcomes.`,
    `- [Insights / Blog](${BASE}/blog): Articles on marketing, SEO, AI search, hiring, and growth.`,
    `- [Careers](${BASE}/careers): Open roles, culture, and how we hire.`,
    `- [Contact](${BASE}/contact): Start a project or get in touch.`,
  ].join('\n');
}

function servicesSection(): string {
  const items = services.map((s) => `- [${cleanTitle(s.title)}](${BASE}/services/${s.slug}): ${s.metaDescription}`);
  return `## Services\n\n${items.join('\n')}`;
}

function caseStudiesSection(): string {
  const items = caseStudies.map(
    (c) => `- [${cleanTitle(c.metaTitle)}](${BASE}/case-studies/${c.slug}): ${c.metaDescription}`
  );
  return `## Case Studies\n\n${items.join('\n')}`;
}

function legalSection(): string {
  return ['## Legal', '', `- [Privacy Policy](${BASE}/privacy-policy)`, `- [Terms of Use](${BASE}/terms-of-use)`].join(
    '\n'
  );
}

export async function buildLlmsTxt(): Promise<string> {
  const posts = await client.fetch<PostLite[]>(POSTS_LITE_QUERY);
  const blog = posts
    .filter((p) => p.slug)
    .map((p) => `- [${p.title}](${BASE}/blog/${p.slug})${p.excerpt ? `: ${p.excerpt}` : ''}`)
    .join('\n');

  return [
    header(),
    '',
    keyPagesSection(),
    '',
    servicesSection(),
    '',
    caseStudiesSection(),
    '',
    `## Insights (Blog)\n\n${blog}`,
    '',
    legalSection(),
    '',
  ].join('\n');
}

export async function buildLlmsFullTxt(): Promise<string> {
  const posts = await client.fetch<PostFull[]>(POSTS_FULL_QUERY);
  const articles = posts
    .filter((p) => p.slug)
    .map((p) => {
      const meta = [isoDate(p.publishedAt), p.author, (p.categories ?? []).join(', ')].filter(Boolean).join(' · ');
      const parts = [`### ${p.title}`, `${BASE}/blog/${p.slug}${meta ? `  \n${meta}` : ''}`];
      if (p.excerpt) parts.push(`_${p.excerpt}_`);
      const body = ptToMarkdown(p.body, 2); // article title is ###; body H2 -> ####
      if (body) parts.push(body);
      const faqs = faqsToMarkdown(p.faqsJson);
      if (faqs) parts.push(faqs);
      return parts.join('\n\n');
    })
    .join('\n\n---\n\n');

  return [
    header(),
    '',
    'Full content export of Digitally Next for AI assistants and generative search engines.',
    '',
    keyPagesSection(),
    '',
    servicesSection(),
    '',
    caseStudiesSection(),
    '',
    '## Insights (Blog) - Full Articles',
    '',
    articles,
    '',
    legalSection(),
    '',
  ].join('\n');
}
