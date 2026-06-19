/**
 * Generate SEO Audit DOCX for digitallynext.com
 * Usage: node scripts/generate-seo-report.mjs
 */

import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, AlignmentType,
  BorderStyle, ShadingType, PageBreak, Header, Footer,
  PageNumberElement, VerticalAlign,
} from 'docx';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Colors ──────────────────────────────────────────────────────────────────
const C = {
  red:       'E21F26',
  teal:      '0EC8C5',
  dark:      '1A1A1A',
  lightGrey: 'F5F5F5',
  midGrey:   'E0E0E0',
  textGrey:  '555555',
  white:     'FFFFFF',
  critBg:    'FFF0F0',
  highBg:    'FFF7ED',
  medBg:     'FFFDE7',
  goodBg:    'F0FFF4',
  critText:  'CC0000',
  highText:  'B35900',
  medText:   '7A6000',
  goodText:  '1A7A2A',
  black:     '111111',
};

// ── Paragraph helpers ────────────────────────────────────────────────────────

const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 400, after: 160 },
  border: { bottom: { style: BorderStyle.THICK, size: 8, color: C.red } },
  children: [new TextRun({ text, bold: true, size: 44, color: C.red, font: 'Calibri' })],
});

const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 320, after: 120 },
  children: [new TextRun({ text, bold: true, size: 32, color: C.dark, font: 'Calibri' })],
});

const h3 = (text, color) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 240, after: 80 },
  children: [new TextRun({ text, bold: true, size: 26, color: color ?? C.dark, font: 'Calibri' })],
});

const h4 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_4,
  spacing: { before: 180, after: 60 },
  children: [new TextRun({ text, bold: true, size: 22, color: C.textGrey, font: 'Calibri' })],
});

const p = (text, opts = {}) => new Paragraph({
  spacing: { before: 80, after: 80 },
  children: [new TextRun({ text, size: 20, color: C.black, font: 'Calibri', ...opts })],
});

const bullet = (text, level = 0) => new Paragraph({
  bullet: { level },
  spacing: { before: 40, after: 40 },
  children: [new TextRun({ text, size: 20, color: C.black, font: 'Calibri' })],
});

const br = () => new Paragraph({ spacing: { before: 60, after: 60 }, children: [] });

const rule = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.midGrey } },
  spacing: { before: 160, after: 160 },
  children: [],
});

const pb = () => new Paragraph({ children: [new PageBreak()] });

// ── Table helpers ────────────────────────────────────────────────────────────

const cell = (text, { bg, bold: isBold, color, size, center } = {}) =>
  new TableCell({
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 140, right: 140 },
    shading: bg ? { type: ShadingType.CLEAR, fill: bg } : undefined,
    children: [new Paragraph({
      alignment: center ? AlignmentType.CENTER : AlignmentType.LEFT,
      children: [new TextRun({
        text: String(text),
        size: size ?? 18,
        bold: isBold ?? false,
        color: color ?? C.black,
        font: 'Calibri',
      })],
    })],
  });

// Two-column table: rows = [[label, value, 'critical'|'high'|'good'|'header'|'']]
const twoCol = (rows, widths = [3200, 6300]) => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: widths,
  borders: {
    top:          { style: BorderStyle.SINGLE, size: 4, color: C.midGrey },
    bottom:       { style: BorderStyle.SINGLE, size: 4, color: C.midGrey },
    left:         { style: BorderStyle.SINGLE, size: 4, color: C.midGrey },
    right:        { style: BorderStyle.SINGLE, size: 4, color: C.midGrey },
    insideH:      { style: BorderStyle.SINGLE, size: 2, color: C.midGrey },
    insideV:      { style: BorderStyle.SINGLE, size: 2, color: C.midGrey },
  },
  rows: rows.map(([label, value, sev], i) => {
    const bg =
      sev === 'header'   ? C.dark      :
      sev === 'critical' ? C.critBg    :
      sev === 'high'     ? C.highBg    :
      sev === 'good'     ? C.goodBg    :
      i % 2 === 0        ? C.white     : C.lightGrey;
    const tc =
      sev === 'header'   ? C.white     :
      sev === 'critical' ? C.critText  :
      sev === 'good'     ? C.goodText  : C.black;
    const vc = sev === 'header' ? C.white : (
      sev === 'critical' ? C.critText :
      sev === 'high'     ? C.highText :
      sev === 'good'     ? C.goodText : C.black
    );
    return new TableRow({
      tableHeader: sev === 'header',
      children: [
        cell(label, { bg, bold: sev === 'header', color: tc }),
        cell(value, { bg, color: vc }),
      ],
    });
  }),
});

// Score table: rows = [[category, weight, score, weighted]]
const scoreTable = (rows) => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: [3800, 1600, 1800, 2300],
  borders: {
    top:     { style: BorderStyle.SINGLE, size: 4, color: C.midGrey },
    bottom:  { style: BorderStyle.SINGLE, size: 4, color: C.midGrey },
    left:    { style: BorderStyle.SINGLE, size: 4, color: C.midGrey },
    right:   { style: BorderStyle.SINGLE, size: 4, color: C.midGrey },
    insideH: { style: BorderStyle.SINGLE, size: 2, color: C.midGrey },
    insideV: { style: BorderStyle.SINGLE, size: 2, color: C.midGrey },
  },
  rows: rows.map(([cat, weight, score, weighted], i) => {
    const isHeader = i === 0;
    const isTot    = i === rows.length - 1;
    const num      = parseFloat(score);
    const bg       = isHeader ? C.dark : isTot ? C.dark : i % 2 === 0 ? C.white : C.lightGrey;
    const tc       = isHeader || isTot ? C.white : C.black;
    const sc       = isHeader || isTot ? C.white :
                     num >= 60 ? C.goodText :
                     num >= 40 ? C.highText : C.critText;
    return new TableRow({
      tableHeader: isHeader,
      children: [
        cell(cat,     { bg, bold: isHeader || isTot, color: tc }),
        cell(weight,  { bg, center: true, color: tc }),
        cell(score,   { bg, center: true, bold: true, color: sc }),
        cell(weighted,{ bg, center: true, color: tc }),
      ],
    });
  }),
});

// Action table: rows = [[priority, action, file]]
const actionTable = (rows) => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: [1600, 5800, 2100],
  borders: {
    top:     { style: BorderStyle.SINGLE, size: 4, color: C.midGrey },
    bottom:  { style: BorderStyle.SINGLE, size: 4, color: C.midGrey },
    left:    { style: BorderStyle.SINGLE, size: 4, color: C.midGrey },
    right:   { style: BorderStyle.SINGLE, size: 4, color: C.midGrey },
    insideH: { style: BorderStyle.SINGLE, size: 2, color: C.midGrey },
    insideV: { style: BorderStyle.SINGLE, size: 2, color: C.midGrey },
  },
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        cell('Priority', { bg: C.dark, bold: true, color: C.white }),
        cell('Action',   { bg: C.dark, bold: true, color: C.white }),
        cell('File / Location', { bg: C.dark, bold: true, color: C.white }),
      ],
    }),
    ...rows.map(([priority, action, file], i) => {
      const bg =
        priority === 'Critical' ? C.critBg :
        priority === 'High'     ? C.highBg :
        priority === 'Medium'   ? C.medBg  : C.lightGrey;
      const pc =
        priority === 'Critical' ? C.critText :
        priority === 'High'     ? C.highText :
        priority === 'Medium'   ? C.medText  : C.textGrey;
      return new TableRow({
        children: [
          cell(priority, { bg, bold: true, color: pc }),
          cell(action,   { bg }),
          cell(file,     { bg, size: 16, color: C.textGrey }),
        ],
      });
    }),
  ],
});

// ── Build document ────────────────────────────────────────────────────────────

const doc = new Document({
  creator: 'Claude Code - SEO Audit',
  title: 'SEO Audit Report - digitallynext.com',
  description: 'Full-site SEO audit, 11 May 2026',
  sections: [
    // ═══════════════════════════════════════════
    // COVER
    // ═══════════════════════════════════════════
    {
      properties: {},
      children: [
        br(), br(), br(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 120 },
          children: [new TextRun({ text: 'DIGITALLY NEXT', bold: true, size: 80, color: C.red, font: 'Calibri' })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 60 },
          children: [new TextRun({ text: 'digitallynext.com', size: 28, color: C.textGrey, font: 'Calibri' })],
        }),
        br(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          shading: { type: ShadingType.CLEAR, fill: C.dark },
          spacing: { before: 160, after: 160 },
          children: [new TextRun({ text: '  SEO AUDIT REPORT  ', bold: true, size: 56, color: C.white, font: 'Calibri' })],
        }),
        br(), br(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: '11 May 2026', size: 26, color: C.textGrey, font: 'Calibri' })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 40 },
          children: [new TextRun({ text: 'Business Type: Digital Marketing Agency', size: 22, color: C.textGrey, font: 'Calibri' })],
        }),
        br(), br(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'Methodology: 9 Parallel Specialised Subagents', size: 20, color: C.textGrey, italics: true, font: 'Calibri' })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'Technical  |  Content  |  Schema  |  Sitemap  |  Performance  |  Visual  |  GEO  |  SXO  |  Backlinks', size: 18, color: C.textGrey, italics: true, font: 'Calibri' })],
        }),
        br(), br(), br(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          shading: { type: ShadingType.CLEAR, fill: C.teal },
          spacing: { before: 140, after: 140 },
          children: [new TextRun({ text: '  Overall SEO Health Score:  41 / 100  ', bold: true, size: 38, color: C.white, font: 'Calibri' })],
        }),
        pb(),
      ],
    },

    // ═══════════════════════════════════════════
    // REPORT BODY
    // ═══════════════════════════════════════════
    {
      properties: {},
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.red } },
            children: [new TextRun({ text: 'Digitally Next - SEO Audit Report  |  May 2026', size: 16, color: C.textGrey, font: 'Calibri' })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.midGrey } },
            children: [
              new TextRun({ text: 'digitallynext.com  |  Confidential  |  Page ', size: 16, color: C.textGrey, font: 'Calibri' }),
              new PageNumberElement(),
            ],
          })],
        }),
      },
      children: [

        // ── 1. EXECUTIVE SUMMARY ──────────────────────────────────────────────
        h1('1. Executive Summary'),
        p('Full-site SEO audit of digitallynext.com conducted on 11 May 2026 using 9 parallel specialised subagents. Covers technical SEO, content quality (E-E-A-T), schema markup, sitemap structure, performance, visual/mobile rendering, AI search readiness (GEO/AEO), search experience optimisation (SXO), and backlink profile.'),
        br(),

        h3('Overall SEO Health Score: 41 / 100', C.critText),
        br(),
        scoreTable([
          ['Category',                    'Weight', 'Score',  'Weighted'],
          ['Technical SEO',               '22%',    '42/100', '9.2'],
          ['Content Quality (E-E-A-T)',   '23%',    '57/100', '13.1'],
          ['On-Page SEO',                 '20%',    '38/100', '7.6'],
          ['Schema / Structured Data',    '10%',     '5/100', '0.5'],
          ['Performance (CWV)*',          '10%',    '55/100', '5.5'],
          ['AI Search Readiness (GEO)',   '10%',    '34/100', '3.4'],
          ['Images',                       '5%',    '35/100', '1.75'],
          ['TOTAL',                         '-',    '41/100', '41'],
        ]),
        br(),
        p('*Performance estimated - Google API credentials not configured; no live CWV data available.', { italics: true, color: C.textGrey }),
        br(),

        h3('The Single Most Important Finding'),
        p('The site publishes 9 blog posts teaching readers how to fix AEO, GEO, schema markup, and AI search invisibility - and implements none of those fixes on its own pages. Zero JSON-LD schema, no llms.txt, blogs absent from sitemap, anonymous authors. This is simultaneously the biggest SEO gap and the strongest potential credibility signal: practicing what the agency explicitly preaches.'),
        br(),

        h3('Score Projection After Fixes'),
        twoCol([
          ['Category',                           'Current  →  Projected'],
          ['Schema / Structured Data',           '5/100  →  60+ (Week 1)',  'critical'],
          ['AI Search Readiness (GEO)',           '34/100  →  ~55 (Week 1)', 'critical'],
          ['Technical SEO',                       '42/100  →  ~65 (Week 2)', 'high'],
          ['On-Page SEO',                         '38/100  →  ~55 (Week 2)', 'high'],
          ['Overall Health Score',                '41/100  →  ~68–72 (full plan)', 'high'],
        ]),
        br(), rule(), pb(),

        // ── 2. CRITICAL ISSUES ────────────────────────────────────────────────
        h1('2. Critical Issues - Fix Immediately'),

        h2('2.1  Static Sitemap Misses 17 Live Pages'),
        p('File: public/sitemap.xml', { bold: true }),
        p('The sitemap is a hand-maintained static file listing only 11 URLs. All 9 published blog posts and all 8 individual case study detail pages are live (HTTP 200) but completely absent. Google cannot discover them via sitemap - they are only crawled when followed as internal links, which is slower and less reliable.'),
        br(),

        h4('Pages confirmed HTTP 200 but missing from sitemap:'),
        bullet('/blog', 0),
        bullet('/blog/zero-click-seo-2026-brand-visibility', 1),
        bullet('/blog/geo-aeo-ai-driven-search-strategy', 1),
        bullet('/blog/automation-to-decision-intelligence-marketing', 1),
        bullet('/blog/brand-visibility-chatgpt-gemini-perplexity-aeo-2026', 1),
        bullet('/blog/ai-marketing-trap-brands-automate-everything-brand-voice', 1),
        bullet('/blog/full-service-vs-specialist-marketing-agency-growth-stage', 1),
        bullet('/blog/hiring-indian-digital-marketing-agency-us-uk-brands', 1),
        bullet('/blog/global-brands-india-digital-marketing-failures-2026', 1),
        bullet('/blog/marketing-automation-vs-ai-marketing-2026', 1),
        bullet('/case-studies/advent-global', 0),
        bullet('/case-studies/neotech-genomics', 0),
        bullet('/case-studies/signia', 0),
        bullet('/case-studies/insurtech-pan-india', 0),
        bullet('/case-studies/fintech-student-value-card', 0),
        bullet('/case-studies/real-estate-advisory', 0),
        bullet('/case-studies/legal-ip-advisory', 0),
        bullet('/case-studies/judaica-art-gallery', 0),
        br(),

        h4('Additional sitemap issues:'),
        bullet('No <lastmod> tags on any URL - Google treats all pages as equally stale', 0),
        bullet('<changefreq> and <priority> tags present - both ignored by Google since 2023', 0),
        bullet('/design-portfolio (live, HTTP 200) missing from sitemap', 0),
        br(),

        h4('Fix: Replace public/sitemap.xml with dynamic src/app/sitemap.ts'),
        p('A Next.js Metadata API sitemap route queries Sanity for all published post slugs (with publishedAt as lastModified) and iterates caseStudies from src/data/casestudy.ts. Expected URLs after fix: ~30, growing automatically with each new blog post.'),
        br(),

        h2('2.2  Zero JSON-LD Structured Data Across Entire Site'),
        p('File: src/app/layout.tsx', { bold: true }),
        p('Confirmed across all pages: homepage, all 5 service pages, case studies, blog, and contact. No Organization, WebSite, Service, BreadcrumbList, BlogPosting, or FAQPage schema exists anywhere. The site is an entity black hole for AI models and misses every structured-data rich result.'),
        br(),
        twoCol([
          ['Schema Type',                       'Status'],
          ['Organization (homepage)',            'MISSING - Critical',          'critical'],
          ['LocalBusiness (homepage)',           'MISSING - Critical',          'critical'],
          ['Service (per service page)',         'MISSING - Critical',          'critical'],
          ['BlogPosting (blog posts)',           'MISSING - Critical',          'critical'],
          ['BreadcrumbList (interior pages)',    'MISSING',                     ''],
          ['WebSite with SearchAction',          'MISSING',                     ''],
          ['ItemList (case studies listing)',    'MISSING',                     ''],
          ['FAQPage*',                           'faqsJson exists in Sanity but never rendered as JSON-LD', ''],
        ]),
        br(),
        p('*FAQPage on commercial sites: no Google rich result benefit post-Aug 2023. AI/LLM citation benefit remains - faqsJson already exists on every post, just needs to be injected as JSON-LD.', { italics: true, color: C.textGrey }),
        br(),
        p('Adding Organization + BlogPosting + Service schema is a 1–2 day developer task. It alone raises the GEO score from 34 to approximately 52.'),
        br(),

        h2('2.3  Live Content Errors in Case Study Data'),
        p('File: src/data/casestudy.ts', { bold: true }),
        br(),
        twoCol([
          ['Error',                           'Detail'],
          ['Signia boilerplate in 5 case studies', 'Case studies 4–8 all have the Signia hearing aids description in about.quote. An InsurTech case study reads about hearing devices.', 'critical'],
          ['Lorem ipsum in live content',     'Judaica Art Gallery (id: 8) has lorem ipsum in about.quote - published on production.', 'critical'],
          ['"Mix of Strategy" placeholder',   'Every case study\'s approach.body reads "Mix of Strategy" - a two-word placeholder with no elaboration.', 'critical'],
          ['Identical approach.cards',        'All 8 case studies use the same labels: "Functional" / "Operational pursuits" regardless of client.', 'high'],
          ['Generic boilerplate listing text','Same "From ambitious startups..." sentence appears identically on all 8 case study cards.', 'high'],
        ]),
        br(),

        h2('2.4  llms.txt Missing'),
        p('File to create: public/llms.txt', { bold: true }),
        p('HTTP 404 at https://www.digitallynext.com/llms.txt. The file is read by LLM crawlers (Perplexity, GPTBot) to understand which content is authoritative. The site publishes blog posts about AI search invisibility while itself absent from the llms.txt standard - the most ironic gap in this audit.'),
        p('Fix: create public/llms.txt with brand description, service links, blog post links, contact info, and social profiles. Place the file in public/ and Next.js serves it automatically.'),
        br(), rule(), pb(),

        // ── 3. HIGH PRIORITY ──────────────────────────────────────────────────
        h1('3. High Priority - Fix Within 1 Week'),

        h2('3.1  SEO Service Page: Slug / Title Mismatch'),
        p('File: src/data/services.ts', { bold: true }),
        p('The page at /services/seo-optimization is titled "Performance, Distribution & Demand." The word "SEO" does not appear in the H1 or page title. This page cannot rank for any SEO-related query - the slug and the content are completely decoupled. The SXO audit scored the "SEO Buyer" persona at 22/100 - the weakest of all four personas evaluated.'),
        p('Fix: update service title/H1 to include "SEO" prominently, or create a dedicated /services/seo page with SEO-first title, deliverable checklist, case study metric, and "Get a free SEO audit" CTA.'),
        br(),

        h2('3.2  Anonymous Authors on All Blog Posts'),
        p('Source: Sanity CMS - Author documents', { bold: true }),
        p('All 9 published posts are attributed to "Editorial Team" - no named individual, no credentials, no bio, no LinkedIn profile. Named authorship is a direct E-E-A-T input for Google AI Overviews. The September 2025 QRG update makes author credentials a primary quality signal for how-to and informational content.'),
        p('Fix: Add real names and 2–3 sentence credential bios to Sanity Author documents. Inject Person schema on each blog post referencing the author\'s name, bio, and LinkedIn URL.'),
        br(),

        h2('3.3  Homepage Root Marked \'use client\' Unnecessarily'),
        p('File: src/app/page.tsx line 1', { bold: true }),
        p('The root homepage is marked \'use client\', shipping the entire homepage as a client JS bundle. This delays SSR text accessibility for non-JS crawlers (including some AI crawlers), increases LCP on cold traffic, and reduces the effectiveness of Next.js SSR. The useEffect import exists at page level but most interactive state lives inside individual section components. Converting the page to a server component would improve crawler access and LCP.'),
        br(),

        h2('3.4  All 5 Service Pages Show Only Advent Global as Case Proof'),
        p('File: src/data/services.ts', { bold: true }),
        p('The caseStudy section in Brand Strategy, Performance, Content, Web Development, and AI Enablement all link to the same Advent Global card. Brand Strategy should link to a brand identity case. Performance/SEO should link to Signia or InsurTech. AI Enablement needs its own proof. This is a direct E-E-A-T failure: service-specific proof is absent.'),
        br(),

        h2('3.5  All 38 Client Logos Use alt="Client Logo"'),
        p('File: src/components/sections/ClientLogos.tsx ~line 234', { bold: true }),
        p('Every logo image shares the same alt text: "Client Logo." This is a WCAG 1.1.1 accessibility violation and a missed SEO signal. Each logo should carry the actual client name: alt="Signia", alt="Neotech Genomics", etc.'),
        br(),

        h2('3.6  No /about Page Exists'),
        p('The footer links "About" to a #about anchor that resolves to nothing - no scroll target, no page. There is no /about route in src/app/. This is the single largest E-E-A-T infrastructure gap: no named team members, no founding story, no credentials page, no company history. Every quality evaluation framework treats the About page as a primary trust anchor.'),
        br(), rule(), pb(),

        // ── 4. E-E-A-T ───────────────────────────────────────────────────────
        h1('4. E-E-A-T & Content Quality Detail'),
        p('Overall Content Quality Score: 57 / 100  |  AI Citation Readiness: 28 / 100'),
        br(),
        twoCol([
          ['Dimension',                  'Score'],
          ['Experience',                 '45 / 100',  'high'],
          ['Expertise',                  '52 / 100',  'high'],
          ['Authoritativeness',          '48 / 100',  'high'],
          ['Trustworthiness',            '68 / 100',  ''],
          ['Weighted E-E-A-T Total',     '54 / 100',  'high'],
          ['Content Depth',              '52 / 100',  ''],
          ['Readability',                '65 / 100',  ''],
          ['Keyword Optimisation',       '55 / 100',  ''],
          ['AI Citation Readiness',      '28 / 100',  'critical'],
        ]),
        br(),

        h3('Genuine Differentiators - Amplify These'),
        bullet('ADAC Framework - "AI Decision & Acceleration Center" with defined governance philosophy: "Not all work needs AI. Some need judgment." No competing agency articulates this governance-first AI stance this precisely.', 0),
        bullet('Modern DAD model - "Data shapes decisions. AI accelerates execution. Digital systems deliver outcomes." Memorably structured and distinctive.', 0),
        bullet('Real case studies with measurable outcomes across 8 industries and 12+ countries.', 0),
        bullet('12-year operating history with named global client base.', 0),
        br(),

        h3('Content Depth Gaps'),
        twoCol([
          ['Page',                         'Word Count  |  Minimum'],
          ['Homepage',                     '~350–400 words  |  500 required',        'high'],
          ['Brand Strategy service',       '~680 words  |  800 required',            'high'],
          ['Performance/SEO service',      '~620 words  |  800 required',            'high'],
          ['AI Enablement service',        '~590 words  |  800 required',            'high'],
          ['Case Studies listing',         '~200 words  |  300 minimum',             'high'],
          ['Blog posts (seeded)',          '~900–1,100 words  |  1,500 for authority','high'],
        ]),
        br(),

        h3('Trustworthiness - What\'s Working'),
        bullet('Physical address: 268 Business India Complex, Uday Park, New Delhi 110049 (Privacy Policy + Terms pages)', 0),
        bullet('Phone: +91 98104 09943 - footer and contact pages', 0),
        bullet('Multiple email addresses: contact@, careers@, privacy@, legal@ properly attributed', 0),
        bullet('Privacy Policy and Terms of Use pages exist', 0),
        bullet('HTTPS confirmed', 0),
        bullet('Contact page with structured form and 2-business-day response promise', 0),
        br(),

        h3('Trustworthiness - Gaps'),
        bullet('Privacy Policy is legally skeletal - single-sentence data protection section. Fails GDPR adequacy for EU clients (Italy, Czech Republic, Switzerland).', 0),
        bullet('Footer copyright: "All Rights Reserved. Reserved." - word "Reserved" is duplicated.', 0),
        bullet('No Clutch, GoodFirms, or DesignRush review badge or profile link anywhere', 0),
        bullet('No cookie consent banner for EU visitors', 0),
        bullet('No named testimonials anywhere on the site', 0),
        br(), rule(), pb(),

        // ── 5. GEO ───────────────────────────────────────────────────────────
        h1('5. AI Search Readiness (GEO / AEO)'),
        h3('Overall GEO Score: 34 / 100', C.critText),
        br(),
        twoCol([
          ['Platform',               'Score  |  Key Blocker'],
          ['Google AI Overviews',    '28/100  -  No schema; blog absent from sitemap', 'critical'],
          ['ChatGPT / GPT-4',        '22/100  -  No entity citations; no Wikipedia/Wikidata', 'critical'],
          ['Perplexity',             '30/100  -  No llms.txt; thin external citation footprint', 'critical'],
          ['Bing Copilot',           '35/100  -  OG tags present but no structured data', 'high'],
        ]),
        br(),

        h3('AI Crawler Access'),
        p('robots.txt uses a single wildcard Allow: / - all crawlers implicitly permitted. GPTBot, ClaudeBot, PerplexityBot, CCBot, and anthropic-ai are all allowed. Adding explicit Allow directives is a low-effort intentional AI-readiness signal.'),
        br(),

        h3('Key GEO Gaps'),
        bullet('llms.txt: HTTP 404 - missing entirely', 0),
        bullet('Organization schema: not found in any file across the entire codebase', 0),
        bullet('Article / BlogPosting schema on blog posts: not found', 0),
        bullet('FAQPage JSON-LD: not rendered - faqsJson field exists in Sanity but never injected as JSON-LD', 0),
        bullet('Blog posts absent from sitemap: lowers crawl frequency, reduces AI Overview eligibility', 0),
        bullet('Named authors with credentials: none - "Editorial Team" attribution fails Sept 2025 QRG', 0),
        bullet('Wikipedia / Wikidata presence: not detected - highest-impact entity signal for LLM training', 0),
        bullet('No external citations confirmed - Clutch, GoodFirms, PR mentions all unconfirmed', 0),
        br(),

        h3('Highest-Value Asset: YouTube Channel'),
        p('YouTube channel confirmed at https://www.youtube.com/@digitallynext. YouTube transcripts are one of the highest-weighted training corpora for LLMs - channel-to-citation correlation is approximately 0.737. Publishing AEO, zero-click SEO, and AI marketing videos authored by named team members would directly generate AI engine citations. Highest single ROI content investment available.'),
        br(),

        h3('The Irony'),
        p('Blog post 4 correctly states: "One credible mention in a trusted publication does more for your AI visibility than 30 blog posts on your own domain" and "Schema.org markup is the difference between being read as a real entity and being ignored as unstructured text." The site advises what it does not practice. Correcting this is simultaneously the most impactful SEO fix and the strongest credibility signal for the agency\'s expertise claims.'),
        br(), rule(), pb(),

        // ── 6. SXO ───────────────────────────────────────────────────────────
        h1('6. Search Experience Optimisation (SXO)'),
        h3('SXO Gap Score: 52 / 100  (lower = larger gap from SERP expectations)'),
        br(),

        h2('6.1  Critical Page-Type Mismatches'),
        twoCol([
          ['Page  |  Target Query',                      'SERP Expected  →  Current  |  Match'],
          ['Homepage\n"digital marketing agency India"',  'Directory/review aggregate  →  Brand assertion hero  |  CRITICAL MISMATCH',                              'critical'],
          ['/services/seo-optimization\n"SEO agency India"', 'Dedicated SEO page (deliverables, FAQ)  →  Performance umbrella (SEO = 1 of 5)  |  CRITICAL MISMATCH','critical'],
          ['/services/brand-strategy\n"brand strategy agency"', 'Consultant page: process + results  →  Narrative only, no metrics  |  HIGH MISMATCH',             'high'],
          ['/case-studies',                               'Gallery with metrics per case  →  Static list, no metrics visible  |  HIGH MISMATCH',                    'high'],
          ['/blog',                                       'Blog index with category filter  →  Category filter + 9 posts + relevant topics  |  ALIGNED',            'good'],
        ], [3200, 6300]),
        br(),

        h2('6.2  User Persona Scoring'),
        twoCol([
          ['Persona',                                          'Score  |  Biggest Gap'],
          ['Overwhelmed Founder (D2C India, seed stage)',      '41/100  -  Homepage H1 is philosophy; persona cannot self-identify as a fit', 'high'],
          ['Marketing Head (mid-size India, consideration)',   '54/100  -  No step-by-step process; case study cards have no outcome metrics', 'high'],
          ['Global Brand (US/UK evaluating Indian agency)',    '54/100  -  No testimonial from US/UK client; no Clutch badge', 'high'],
          ['SEO Buyer (in-house SEO lead, decision stage)',    '22/100  -  SEO page titled "Performance, Distribution & Demand" - SEO not in H1', 'critical'],
        ]),
        br(),

        h2('6.3  CTA Alignment Issues'),
        p('Every CTA on the site leads to /contact. There is no middle-of-funnel conversion path:'),
        bullet('Homepage hero: "GET IN TOUCH" - too high-commitment for cold awareness traffic', 0),
        bullet('Service page hero: "Inquire Now" - appears before trust has been established', 0),
        bullet('Case studies page: "Work With Us" - missing a lower-friction option', 0),
        br(),
        p('Missing CTA layer: A MOFU (middle-of-funnel) offer - "See the Neotech Genomics case study" (specific), or a calendar embed for a 30-minute discovery call.'),
        br(), rule(), pb(),

        // ── 7. SITEMAP ────────────────────────────────────────────────────────
        h1('7. Sitemap Analysis'),
        h3('Sitemap Health Score: 38 / 100', C.critText),
        br(),
        twoCol([
          ['Check',                                'Status'],
          ['XML syntax valid',                     'PASS',                              'good'],
          ['Under 50,000 URL limit',               'PASS - 11 URLs',                   'good'],
          ['Non-200 URLs in sitemap',              'PASS - all 11 return 200',          'good'],
          ['Noindexed URLs in sitemap',            'PASS',                              'good'],
          ['lastmod tags present',                 'FAIL - zero lastmod tags',          'critical'],
          ['changefreq / priority tags',           'Present - ignored by Google since 2023', ''],
          ['/blog index in sitemap',               'FAIL - completely absent',          'critical'],
          ['All 9 blog post URLs',                 'FAIL - all absent',                 'critical'],
          ['8 case study detail pages',            'FAIL - all absent',                 'critical'],
          ['/design-portfolio',                    'FAIL - absent despite HTTP 200',    ''],
          ['Dynamic sitemap generation',           'FAIL - static public/sitemap.xml',  'critical'],
        ]),
        br(),
        h3('Root Cause'),
        p('The sitemap is a hand-maintained static file at public/sitemap.xml. It never picks up new Sanity blog posts or case studies, has no lastmod values, and will silently fall behind as content grows. Fix: create src/app/sitemap.ts as a dynamic Next.js Metadata API route.'),
        br(), rule(), pb(),

        // ── 8. BACKLINKS ──────────────────────────────────────────────────────
        h1('8. Backlink Profile Analysis'),
        h3('Backlink Health Score: INSUFFICIENT DATA', C.critText),
        p('Tier 0 - Common Crawl only. No Moz, Bing Webmaster, or DataForSEO API keys configured. A numeric score at this tier would be fabricated.'),
        br(),

        h3('Directory & Citation Gaps - Highest Priority'),
        twoCol([
          ['Platform',                            'Status  |  Priority'],
          ['Clutch.co',                           'NOT CONFIRMED  -  Critical (DA ~72, verified reviews)', 'critical'],
          ['GoodFirms',                           'NOT CONFIRMED  -  Critical (DA ~69, B2B focus)', 'critical'],
          ['Google Business Profile',             'NOT CONFIRMED  -  Critical for local discovery', 'critical'],
          ['DesignRush',                          'NOT CONFIRMED  -  High', 'high'],
          ['AgencySpotter',                       'NOT CONFIRMED  -  High', 'high'],
          ['Sortlist',                            'NOT CONFIRMED  -  High (EU market - Italy, Switzerland)', 'high'],
          ['The Drum Agency Register (UK)',       'NOT CONFIRMED  -  High (UK client targeting)', 'high'],
          ['Crunchbase',                          'NOT CONFIRMED  -  Medium (US tech credibility)', ''],
          ['HubSpot Agency Partner Directory',    'NOT CONFIRMED  -  Medium', ''],
        ]),
        br(),

        h3('Untapped High-Value Citation Opportunities'),
        bullet('Signia (WS Audiology parent - multinational, multiple DA 50+ properties): The 400% media recognition uplift outcome may exist as a co-credit. A verified agency mention on Signia\'s marketing partner page would be a significant authority signal.', 0),
        bullet('Forbes / Business Standard: The Fintech case study claims coverage in both publications. If either named Digitally Next as the agency, those citations may already exist unlinked - a link reclamation opportunity.', 0),
        bullet('TiE (The Indus Entrepreneurs, DA ~55+): The InsurTech case study mentions a TiE special mention - whether this links to the agency is unconfirmed.', 0),
        br(),

        h3('Content-Based Link Building Opportunities'),
        twoCol([
          ['Blog Topic',                                      'Link Attraction Potential'],
          ['GEO / AEO - Generative Engine Optimisation',     'Very High - emerging topic, thin competition', 'good'],
          ['Brands Invisible to AI (Blog 4)',                 'Very High - novel angle, shareable in SEO communities', 'good'],
          ['Zero-Click SEO',                                  'High - cited frequently by SEO communities', ''],
          ['Indian Agency for US/UK Brands',                  'High - practical, directory-linkable', ''],
          ['Marketing Automation vs AI Marketing',            'Medium-High', ''],
        ]),
        br(), rule(), pb(),

        // ── 9. PRIORITY ACTION PLAN ───────────────────────────────────────────
        h1('9. Prioritised Action Plan'),
        br(),

        h2('Week 1 - Developer Tasks (~2 developer-days)'),
        actionTable([
          ['Critical', 'Create src/app/sitemap.ts - dynamic, Sanity-connected. Delete public/sitemap.xml.',    'src/app/sitemap.ts (new)'],
          ['Critical', 'Add Organization JSON-LD to root layout',                                              'src/app/layout.tsx'],
          ['Critical', 'Add BlogPosting JSON-LD to all blog post pages',                                       'src/app/blog/[slug]/page.tsx'],
          ['Critical', 'Add Service + BreadcrumbList JSON-LD to service pages',                                'src/app/services/[slug]/page.tsx'],
          ['Critical', 'Create public/llms.txt with brand description, service links, blog posts, contact',    'public/llms.txt (new)'],
          ['Critical', 'Fix casestudy.ts: Signia boilerplate, lorem ipsum, "Mix of Strategy" placeholders',   'src/data/casestudy.ts'],
          ['High',     'Fix ClientLogos.tsx: replace alt="Client Logo" on all 38 logos with real client names','src/components/sections/ClientLogos.tsx'],
          ['High',     'Fix Footer.tsx: copyright duplicate word; broken #about anchor',                       'src/components/layout/Footer.tsx'],
          ['High',     'Convert homepage page.tsx from "use client" to server component',                      'src/app/page.tsx'],
        ]),
        br(),

        h2('Week 2 - Content & Editorial'),
        actionTable([
          ['High',   'Update SEO service page title/H1 to include "SEO" explicitly',                           'src/data/services.ts'],
          ['High',   'Replace "Editorial Team" authors with named individuals + bios + Person schema',         'Sanity CMS + blog/[slug]/page.tsx'],
          ['High',   'Assign service-specific case studies to each service page (5 different, not all Advent)', 'src/data/services.ts'],
          ['High',   'Rewrite case studies meta description with industries + outcomes',                        'src/app/case-studies/page.tsx'],
          ['High',   'Create /about page with team bios, founding story, credentials',                         'src/app/about/page.tsx (new)'],
          ['High',   'Fix award alt text: "Award 1/2/3" → actual award body names',                           'src/components/sections/AwardsAndRecognition.tsx'],
        ]),
        br(),

        h2('Month 1 - Authority & Conversion'),
        actionTable([
          ['High',   'Register and complete Clutch.co and GoodFirms profiles with client reviews',             'External'],
          ['High',   'Add 2–3 attributed testimonials (name, title, company, region) to homepage + service pages', 'src/data/ + components'],
          ['High',   'Create press page surfacing Forbes / Business Standard / TiE mentions',                  'src/app/press/page.tsx (new)'],
          ['Medium', 'Add MOFU CTAs: specific case study links, "Book 30-min discovery call" option',          'Site-wide components'],
          ['Medium', 'Fix KASA / C-Suite framework links (href="#" dead links)',                               'src/components/sections/GlobalServicingModel.tsx'],
          ['Medium', 'Expand Privacy Policy to GDPR adequacy for EU clients',                                  'src/app/privacy-policy/page.tsx'],
          ['Medium', 'Register on DesignRush, AgencySpotter, Sortlist, The Drum Agency Register (UK)',         'External'],
          ['Medium', 'Verify FAQ accordion renders content in SSR HTML (not hidden behind JS click)',           'src/app/blog/[slug]/BlogPostClient.tsx'],
          ['Low',    'Develop YouTube channel with AEO / GEO / AI marketing content (~0.74 LLM citation signal)','External'],
          ['Low',    'Clean up IPL banner post-season (confusing for non-Indian visitors)',                     'Homepage components'],
        ]),
        br(), rule(), pb(),

        // ── 10. SCORE PROJECTION ──────────────────────────────────────────────
        h1('10. Score Projections'),
        br(),
        twoCol([
          ['Phase',                                  'Projected Health Score'],
          ['Current state - 11 May 2026',            '41 / 100',             'critical'],
          ['After Week 1 developer tasks',           '~52 / 100',            'high'],
          ['After Week 2 content tasks',             '~60 / 100',            ''],
          ['After Month 1 full plan',                '~68–72 / 100',         'good'],
        ]),
        br(),
        p('The largest single jump (+11 points) comes from Week 1 alone - schema (10% weight, currently 5/100) and sitemap (Technical, 22% weight) are the most severely underscored categories. Both are pure code changes with no content dependencies.'),
        br(), rule(), pb(),

        // ── 11. UNLOCK MORE DATA ──────────────────────────────────────────────
        h1('11. Unlocking Additional Data'),
        br(),
        twoCol([
          ['Tool',                          'Unlocks  |  Setup'],
          ['Google API Key (PageSpeed)',    'Live CWV field data (LCP, INP, CLS)  -  Add GOOGLE_API_KEY to config', ''],
          ['Google Search Console OAuth',   'Ranking positions, impressions, indexation  -  python scripts/google_auth.py --auth', ''],
          ['GA4 Data API',                  'Organic traffic trends, conversion paths  -  OAuth via google_auth.py', ''],
          ['Moz API (free tier)',           'DA, PA, Spam Score, referring domains  -  Add MOZ_ACCESS_ID + MOZ_SECRET_KEY to .env', ''],
          ['Bing Webmaster API',            'Inbound links near-realtime  -  Add BING_WEBMASTER_API_KEY to .env', ''],
          ['DataForSEO',                    'Full backlink DB, SERP data, keyword metrics  -  Install via extensions/dataforseo/', ''],
        ]),
        br(),
        p('With Google APIs configured, running /seo google surfaces live ranking data for priority queries ("digital marketing agency India", "SEO agency India") and real Core Web Vitals from Chrome user data - the most valuable performance signal available.'),
        br(), rule(), br(),

        // ── FOOTER ────────────────────────────────────────────────────────────
        new Paragraph({
          alignment: AlignmentType.CENTER,
          shading: { type: ShadingType.CLEAR, fill: C.dark },
          spacing: { before: 120, after: 120 },
          children: [new TextRun({ text: '  digitallynext.com  |  SEO Audit Report  |  May 2026  ', bold: true, size: 22, color: C.white, font: 'Calibri' })],
        }),
        br(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'Generated by Claude Code - claude.ai/code', size: 16, color: C.textGrey, italics: true, font: 'Calibri' })],
        }),
      ],
    },
  ],
});

// ── Write ─────────────────────────────────────────────────────────────────────
const outPath = resolve(__dirname, '../digitallynext-seo-audit-2026.docx');
const buffer = await Packer.toBuffer(doc);
writeFileSync(outPath, buffer);
console.log(`\n✅  Report written to: ${outPath}`);
console.log(`    Size: ${(buffer.length / 1024).toFixed(1)} KB\n`);
