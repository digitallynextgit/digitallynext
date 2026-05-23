# Full SEO Audit Report — digitallynext.com

**Scan date:** 2026-05-05
**Stack detected:** Next.js 16 (App Router) + React 19, hosted on Vercel (BOM region), Sanity CMS for blog
**Business type:** Agency (digital marketing)
**Crawl scope:** 11 URLs in declared sitemap; codebase + live HTML inspection on `/`

---

## Executive Summary

### SEO Health Score: **64 / 100**

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 78 | 17.2 |
| Content Quality | 23% | 70 | 16.1 |
| On-Page SEO | 20% | 72 | 14.4 |
| Schema / Structured Data | 10% | 0 | 0.0 |
| Performance (CWV) | 10% | 50 | 5.0 |
| AI Search Readiness | 10% | 35 | 3.5 |
| Images | 5% | 76 | 3.8 |
| **Total** | **100%** | — | **~64** |

The site is technically clean (good security headers, valid canonicals, proper meta) but is leaving substantial ranking and AI-citation value on the table. Two issues drag the score down hard: **zero structured data** anywhere on the site, and a **sitemap that omits ~10 indexable pages** that already render and have unique metadata in the codebase.

### Top 5 Critical Issues

1. **Sitemap is incomplete.** `public/sitemap.xml` lists 11 URLs but the codebase ships 8 case-study detail pages, the `/blog` index, blog post detail routes, `/design-portfolio`, and the careers department/role routes — all server-rendered with unique metadata, none indexable via sitemap discovery.
2. **No structured data anywhere.** Live HTML for `/` contains no `application/ld+json` blocks. No `Organization`, `WebSite`, `BreadcrumbList`, `Service`, `Article`, or `Person` schema. This is the single biggest miss for an agency targeting brand SERP features and AI Overview citations.
3. **Open Graph image is 600×60 px (a logo strip).** Below the 1200×630 minimum recommended by Facebook/LinkedIn/Twitter. When the site URL is shared anywhere, it will render with a black-bar logo strip instead of a hero card.
4. **Homepage HTML payload is 1,152 KB** (uncompressed, served by Vercel edge cache). Most of this is inline RSC payload + an embedded SVG world map. This pushes LCP and INP risk on mobile networks and inflates first-load cost.
5. **No `llms.txt`, no `robots.txt` AI-crawler directives, no AI citability scaffolding.** GPTBot, PerplexityBot, ClaudeBot, GoogleExtended are silently allowed by the `Allow: /` rule but the site has no curated entry point for them, no FAQ schema, no semantic chunking — so even when crawled, the content is hard to cite.

### Top 5 Quick Wins (≤ 2 hrs each)

1. Generate `app/sitemap.ts` that emits homepage + every service slug + every case-study slug + Sanity blog posts. Replaces the static `public/sitemap.xml`.
2. Add `Organization` + `WebSite` JSON-LD to root `layout.tsx`. ~30 lines, instant rich-result eligibility for the brand SERP.
3. Replace the OG image: produce one 1200×630 PNG/WebP and update `openGraph.images` in `src/app/layout.tsx:30-37`.
4. Add `app/robots.ts` to dynamically emit `/robots.txt` with explicit `Sitemap:` line (still works but won't drift) and an `llms.txt` route at `app/llms.txt/route.ts` listing primary URLs.
5. Fix the broken `#about` and `#case-studies` anchors in `src/components/layout/Footer.tsx:9-13` — neither anchor target exists.

---

## 1. Technical SEO — Score 78 / 100

### What's working
- HTTPS enforced; valid TLS cert at `www.digitallynext.com`.
- Strong security header set in `next.config.ts:5-47`: HSTS preload (2y), X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy `strict-origin-when-cross-origin`, Permissions-Policy locking down camera/mic/geo, CSP defined.
- Canonicals are explicit and per-page on every static and dynamic route checked (`src/app/layout.tsx:46`, `src/app/contact/page.tsx:11`, `src/app/case-studies/[slug]/page.tsx:21`, etc.).
- `lang="en"` set on `<html>` (`src/app/layout.tsx:56`).
- Vercel `X-Vercel-Cache: HIT` confirms edge caching is active for the homepage.
- Next.js Image is used everywhere (75 `alt=` attributes across 41 components, no raw `<img>` tags found in `src/`).

### Issues

**[CRITICAL] Sitemap omits ~10+ indexable pages.**
`public/sitemap.xml` lists 11 URLs. Codebase analysis (`src/data/casestudy.ts:115,273,439,605,774,940,1108,1272`, `src/data/services.ts`, `src/app/blog/`, `src/app/design-portfolio/`) reveals:
- 8 case-study detail pages (`/case-studies/advent-global`, `/case-studies/neotech-genomics`, `/case-studies/signia`, `/case-studies/insurtech-pan-india`, `/case-studies/fintech-student-value-card`, `/case-studies/real-estate-advisory`, `/case-studies/legal-ip-advisory`, `/case-studies/judaica-art-gallery`) — all have `metaTitle` + `metaDescription`.
- `/blog` (index) and `/blog/[slug]` (Sanity-driven) — completely absent.
- `/design-portfolio` — absent.
- `/careers/[departmentSlug]` and `/careers/[departmentSlug]/[roleSlug]` — absent.
Google will eventually find these via internal links, but discovery latency is days-to-weeks longer and crawl budget gets wasted on the same 11 URLs.

**[HIGH] Static `public/sitemap.xml` will keep drifting.** The maintenance burden is the bug. Switch to a generated `app/sitemap.ts` that pulls case-study and service slugs from `src/data/*.ts` and blog slugs from Sanity at build time (or with `revalidate`).

**[HIGH] Static `public/robots.txt` is fine but has a subtle issue.** It points to `https://www.digitallynext.com/sitemap.xml`, which exists. Once you switch to `app/sitemap.ts`, this URL still resolves. No fix needed unless you also migrate to `app/robots.ts` for symmetry.

**[MEDIUM] CSP allows `'unsafe-inline'` and `'unsafe-eval'` for `script-src`.** Required by Microsoft Clarity (`src/app/layout.tsx:66-72`) and likely by Next.js inline RSC bootstrap. Tighten progressively with nonces — not a ranking issue, but a security hygiene improvement.

**[MEDIUM] `keywords` meta tag is set** (`src/app/layout.tsx:14-22`). Google has ignored this since 2009; harmless but signals "old SEO" to other tooling. Remove.

**[LOW] No `theme-color` meta, no `manifest.json`** for PWA/install hints. Low impact for a marketing site.

---

## 2. Content Quality — Score 70 / 100

### What's working
- Each commercial page (services, case studies, contact, careers, blog, terms, privacy) has unique `title` + `description`.
- Service titles are intent-rich ("Strategy, Brand & Growth Intelligence", "Performance, Distribution & Demand"), not just generic ("SEO Services").
- Case-study titles are specific ("Advent Global Case Study", "Signia Case Study") — good for branded queries.
- Site has E-E-A-T scaffolding: case studies (Experience), service depth pages (Expertise), team/careers pages (Authoritativeness), contact + privacy + terms (Trust).

### Issues

**[HIGH] Case-studies index `description` is single-sentence boilerplate.**
`src/app/case-studies/page.tsx:9` — `'Explore case studies from Digitally Next.'` Two-thirds the length of useful and zero keyword payload. Replace with something like: *"Real performance, brand, and platform results from Digitally Next — campaigns and product builds across InsurTech, FinTech, hearing-tech, real estate, legal, and global launches."*

**[HIGH] Hero copy is creative-led and keyword-thin.** `src/components/sections/Hero.tsx:67-70` — "CAMPAIGNS." + "We build what tomorrow will remember." is brand-voice, not query-driven. Add a subtitle paragraph or below-fold H2 that uses target query language ("digital marketing agency in India / globally", "performance marketing partner", "AI-driven brand strategy").

**[MEDIUM] Footer has dead anchor links.**
`src/components/layout/Footer.tsx:9-13` — `{ label: 'About', href: '#about' }` and `{ label: 'Case Studies', href: '#case-studies' }`. Neither `id="about"` nor `id="case-studies"` exists on the homepage sections. The `Blog` nav item is commented out. Either wire these to real anchor IDs in `src/app/page.tsx` or replace with full route paths (`/case-studies`, `/blog`).

**[MEDIUM] No `/about` page.** For an agency, this is unusual. The footer references `#about` (a homepage anchor) but a standalone `/about/team` page with bios + LinkedIn would unlock significant E-E-A-T and `Person` schema opportunity.

**[LOW] Content density on `/` is light.** WebFetch reported ~85 words of substantive prose above the global servicing model section. The page leans on sections with limited prose. For a homepage trying to rank for "digital marketing agency", target 600–1,000 words of crawlable, non-image text.

**[INFO]** `FAQPage` schema on commercial sites no longer surfaces in Google rich results (Aug 2023 restriction). Don't add it for Google. Adding a real FAQ section as plain HTML is still useful for AI citations and on-page conversion.

---

## 3. On-Page SEO — Score 72 / 100

### What's working
- Title pattern `<Page Topic> | Digitally Next` used consistently — 50–70 char range on all pages checked.
- Meta descriptions present site-wide; most are genuinely written, not auto-extracted.
- Single H1 per page (homepage H1 = `CAMPAIGNS.`).
- `Link` from `next/link` used throughout — SPA navigation with prefetch by default.

### Issues

**[HIGH] Homepage H1 = `CAMPAIGNS.`** (`src/components/sections/Hero.tsx:67-69`). It's brand-voice but the H1 is the single biggest on-page ranking signal — and a one-word noun with no qualifier wastes it. A query-aligned alternative: `Digital marketing agency that builds what tomorrow remembers` (keep the brand line as a kicker `<p>` above).

**[MEDIUM] No breadcrumb UI on services / case studies / careers.** Both for users and for `BreadcrumbList` schema. Each detail page already knows its parent — add a visible breadcrumb component and emit JSON-LD.

**[MEDIUM] Open Graph image is wrong dimension.**
`src/app/layout.tsx:30-37` ships `/logo1.webp` at `600×60`. Should be 1200×630 (2:1) per OG spec. Affects every share preview on LinkedIn, X, WhatsApp, Slack, iMessage. Quick fix: design a single 1200×630 hero card and reference it. Per-page OG images are a longer-term win.

**[MEDIUM] No `og:image`, no `twitter:image` set on most child pages.** Only the root layout sets these. Service pages (`src/app/services/[slug]/page.tsx:24-29`) define `openGraph.title`/`description` but no image — they inherit the wrong-sized root image.

**[MEDIUM] Homepage is `'use client'` (`src/app/page.tsx:1`).** Next.js will still SSR initial HTML, so meta is delivered, but the entire page hydrates as a client component. Costs bundle size and TTI. Split: keep the page as a server component, mark only the truly interactive children (`Hero`, `InstagramReels`) as client.

**[LOW] No `<link rel="alternate" hreflang>"`.** The site serves global markets (UK, USA, Canada, Australia, Middle East per `public/flags/`) but is single-locale. If you ever add `/en-gb/`, etc., wire hreflang then. No action today.

---

## 4. Schema / Structured Data — Score 0 / 100

**Live HTML for `/` contains zero `application/ld+json` blocks.** Codebase grep for `application/ld+json|JsonLd|@context|schema.org` returned zero matches across all of `src/`.

This is the single highest-leverage fix for an agency site competing for branded SERP features and AI citations.

### Recommended additions

**[CRITICAL] `Organization` schema** in root `layout.tsx`:
```ts
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Digitally Next",
  "url": "https://www.digitallynext.com",
  "logo": "https://www.digitallynext.com/logo1.webp",
  "telephone": "+91-98104-09943",
  "email": "contact@digitallynext.com",
  "sameAs": [
    "https://instagram.com/digitallynext",
    "https://www.youtube.com/@digitallynext",
    "https://www.linkedin.com/company/digitallynext/"
  ]
}
```

**[CRITICAL] `WebSite` schema with `SearchAction`** in root layout — required for Google's sitelinks search box.

**[HIGH] `Service` schema** on each `/services/[slug]` page using the existing `metaTitle`/`metaDescription`/`heroSection` data already in `src/data/services.ts`.

**[HIGH] `BreadcrumbList`** on every detail page (`/services/*`, `/case-studies/*`, `/blog/*`, `/careers/*/*`).

**[HIGH] `Article`** + `Person` (author) schema on `/blog/[slug]` — Sanity already stores author + publishedAt + image (`src/app/blog/page.tsx:18-27`). 30 lines of code.

**[MEDIUM] `CaseStudy` / `CreativeWork`** on each case-study page. Schema.org doesn't have a dedicated `CaseStudy` type yet; use `CreativeWork` with `about` and `creator` properties.

**[MEDIUM] `JobPosting`** on individual `/careers/[department]/[role]` pages — Google has a dedicated rich result for this.

**[INFO]** Skip `HowTo` (deprecated for rich results, Sept 2023). Skip `FAQPage` for Google rich results unless the site is government/healthcare (Aug 2023 restriction); plain-HTML FAQs still help AI Overviews.

---

## 5. Performance / Core Web Vitals — Score 50 / 100

No CrUX/PageSpeed Insights API credentials available locally, so this is lab + structural reasoning. Recommend running `/seo google` once Search Console + PageSpeed credentials are configured for real field data.

### Concerns

**[CRITICAL] Homepage HTML payload is 1,152,688 bytes uncompressed.** `Content-Length: 1152688` on the live response. Most marketing sites ship 100–250 KB. The biggest contributor visible in the preload list is the inlined RSC tree + likely the `dotted-map` / `cobe` SVG world map (`GlobalServicingModel.tsx`). On a typical 4G connection (3 Mbps), this is a ~3 second download before paint can begin.

**[HIGH] Hero is a full-viewport `clamp(600px, 100vh, 1500px)` background image with `object-cover`.** `src/components/sections/Hero.tsx:14-17`. `priority` is set on `/banner/b1.webp` — good. But the same section hosts a heavy `framer-motion` animation tree on every paragraph + button. LCP candidate is the H1 (`CAMPAIGNS.`) which is text — should be fast — but is rendered after a `framer-motion` opacity/y animation with 0.4s delay, which can defer LCP to 1.4s+.

**[HIGH] Heavy client-side libraries bundled into the homepage:** `framer-motion`, `gsap`, `motion`, `three`, `cobe`, `react-spring`, `dotted-map`. Several overlap (`framer-motion` + `motion` + `react-spring` are three competing animation libs). `package.json:19,21,33,36` confirms all are dependencies. Consolidate — pick one (likely `framer-motion`), drop the rest.

**[HIGH] Google Fonts loaded via `<link rel="stylesheet">`** (`src/app/layout.tsx:60-63`) instead of `next/font`. This blocks FCP and is the documented anti-pattern in the Next.js docs. Switch to:
```ts
import { Stack_Sans_Text } from 'next/font/google'; // or local
```
This gives self-hosted, preloaded, FOUT-free fonts and eliminates the third-party origin.

**[MEDIUM] 7 images preloaded above-fold** (banner, IPL banners, 5 client logos visible in HTML preview). Preloading too many images competes for the LCP candidate. Keep `priority` on `b1.webp` and the IPL desktop/mobile pair only; remove `priority` from client logos.

**[LOW] Microsoft Clarity loads with `strategy="afterInteractive"`** (`src/app/layout.tsx:67-72`). Good — doesn't block FCP. No issue.

---

## 6. Images — Score 76 / 100

### What's working
- All sources are `.webp` (audited via `public/` glob — `home/client*.webp`, `careers/c*.webp`, `case/*.webp`, `awards/a*.webp`).
- `next/image` used universally (no raw `<img>` in `src/`).
- 75 `alt=` attributes across 41 components.
- No empty `alt=""` strings detected (those are valid for decorative images, but absence here is fine).

### Issues

**[MEDIUM] Hero image has generic alt text.** `src/components/sections/Hero.tsx:34` — `alt="Hero"`. Replace with descriptive text: `alt="Digitally Next team building global brand campaigns"` or similar.

**[MEDIUM] IPL banners have generic alt.** `src/app/page.tsx:31,40` — `alt="IPL Banner"`. If this banner promotes a specific campaign or capability, the alt should say so.

**[LOW] No `sizes` audit performed** at scale. Spot-check with PageSpeed Insights once that integration is wired.

**[LOW] No AVIF.** WebP is fine for now; AVIF would shave another 10–20% but adds complexity. Defer.

---

## 7. AI Search Readiness (GEO) — Score 35 / 100

### What's working
- `Allow: /` in robots.txt — GPTBot, ClaudeBot, PerplexityBot, GoogleExtended are not blocked.
- Server-side rendered HTML (Next.js App Router) — AI crawlers can read content without JS execution.
- Per-page canonicals reduce citation ambiguity.

### Critical gaps

**[HIGH] No `/llms.txt`.** Confirmed 404. This is becoming the de facto standard for "guide LLMs to your authoritative content". For an agency, a 30-line `llms.txt` listing services, case studies, and contact is a meaningful AI-citation lift.

**[HIGH] No structured data — see Section 4.** AI Overviews and ChatGPT/Perplexity citations correlate strongly with `Organization`, `Service`, `Article`, and `FAQ` schema presence. Zero schema = the site is functionally invisible to AI grounding pipelines that filter for entity-marked content.

**[HIGH] Homepage prose is too sparse to be citable.** AI engines extract passages of 60–200 words that answer a question. The homepage has no such passages; sections are visual/animation-led. Add at least one "What we do" paragraph (~120 words, factual) and one "How we work" paragraph (~120 words) below the fold.

**[MEDIUM] No `Author`/`Person` markup, no author bios on blog/case-study pages.** AI engines preferentially cite content with named, attributable authors over anonymous corporate copy.

**[MEDIUM] No brand mention strategy detectable.** Reference `references/brand-mention-signals.md` if pursuing AI visibility — outbound mentions on Reddit, industry publications, podcast transcripts feed AI training/grounding more than backlinks do.

---

## 8. Crawl Budget / Index Bloat — Score: Pass

- 11 URLs in sitemap, ~25–30 likely indexable URLs total (counting case studies + blog posts). Well under any threshold.
- No detected pagination, faceted nav, or session-ID URL patterns.
- `/studio/[[...tool]]` (Sanity Studio) — should ideally be `noindex`. Verify.

---

## Stack-specific notes (Next.js 16)

- You're on `next@16.2.3` and `react@19.2.4`. Modern App Router conventions apply — prefer `app/sitemap.ts`, `app/robots.ts`, file-based metadata, and `next/font` over manual `<link>` tags.
- `reactCompiler: true` is on (`next.config.ts:50`) — good. This auto-memoizes, so don't manually `React.memo` unless profiling proves it's needed.
- `babel-plugin-react-compiler` is in devDependencies — unusual to ship both the SWC-based compiler config and the Babel plugin. Verify only one path is active to avoid double-compilation cost.

---

## What I did NOT verify (would need additional access/tooling)

- Real Core Web Vitals field data (CrUX) — needs `python scripts/google_auth.py` setup.
- Backlink profile — needs Moz / Bing Webmaster API keys.
- SERP positions and keyword rankings — needs DataForSEO MCP.
- Mobile rendering screenshots — Playwright not invoked.
- Actual rendered Sanity blog post count and metadata coverage.

Run `/seo google`, `/seo backlinks`, `/seo dataforseo` once those credentials are configured to fill these gaps.
