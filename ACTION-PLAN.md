# Action Plan - digitallynext.com

Prioritized fix list, sorted by impact ÷ effort. File paths and line numbers are clickable in your IDE.

---

## CRITICAL - Fix this week

### 1. Add `Organization` + `WebSite` JSON-LD to root layout
**File:** `src/app/layout.tsx` (after line 64, inside `<head>`)
**Effort:** 30 min
**Why:** Brand SERP features, sitelinks search box, AI-Overview entity grounding.

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://www.digitallynext.com/#org',
          name: 'Digitally Next',
          url: 'https://www.digitallynext.com',
          logo: 'https://www.digitallynext.com/logo1.webp',
          telephone: '+91-98104-09943',
          email: 'contact@digitallynext.com',
          sameAs: [
            'https://instagram.com/digitallynext',
            'https://www.youtube.com/@digitallynext',
            'https://www.linkedin.com/company/digitallynext/',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': 'https://www.digitallynext.com/#website',
          url: 'https://www.digitallynext.com',
          name: 'Digitally Next',
          publisher: { '@id': 'https://www.digitallynext.com/#org' },
        },
      ],
    }),
  }}
/>
```

### 2. Generate dynamic sitemap from data + Sanity
**File:** create `src/app/sitemap.ts`; delete `public/sitemap.xml`
**Effort:** 45 min
**Why:** Currently ~10+ pages (8 case studies, blog index, blog posts, design-portfolio, careers detail) are not in the sitemap.

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { client } from '@/sanity/client';
import { allPostsQuery } from '@/sanity/queries';
import { services } from '@/data/services';
import { caseStudies } from '@/data/casestudy';

const BASE = 'https://www.digitallynext.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<{ slug: { current: string }; publishedAt?: string }[]>(allPostsQuery);
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'weekly', priority: 1.0, lastModified: now },
    { url: `${BASE}/case-studies`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${BASE}/design-portfolio`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${BASE}/careers`, changeFrequency: 'weekly', priority: 0.7, lastModified: now },
    { url: `${BASE}/contact`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${BASE}/privacy-policy`, changeFrequency: 'yearly', priority: 0.4, lastModified: now },
    { url: `${BASE}/terms-of-use`, changeFrequency: 'yearly', priority: 0.4, lastModified: now },
  ];

  const serviceUrls = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    lastModified: now,
  }));

  const caseStudyUrls = caseStudies.map((c) => ({
    url: `${BASE}/case-studies/${c.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    lastModified: now,
  }));

  const blogUrls = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug.current}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
  }));

  return [...staticUrls, ...serviceUrls, ...caseStudyUrls, ...blogUrls];
}
```

Also create `src/app/robots.ts` for symmetry:
```ts
import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }, { userAgent: '*', disallow: '/studio/' }],
    sitemap: 'https://www.digitallynext.com/sitemap.xml',
  };
}
```
Delete `public/robots.txt` and `public/sitemap.xml` after these are merged and verified.

### 3. Replace Open Graph image
**File:** `src/app/layout.tsx:30-37`
**Effort:** 20 min design + 5 min code
**Why:** Current OG image is a 600×60 logo strip; every share preview on LinkedIn/X/WhatsApp will look broken.

Design a 1200×630 hero card (logo + tagline + brand colors). Save to `public/og/og-default.webp`. Update:
```ts
images: [{ url: '/og/og-default.webp', width: 1200, height: 630, alt: 'Digitally Next - growth-driven global digital marketing agency' }],
```
Same change for `twitter.images`.

### 4. Remove dead anchor links in footer
**File:** `src/components/layout/Footer.tsx:9-13`
**Effort:** 5 min
**Why:** `#about` and `#case-studies` anchors don't exist; bad UX + bad internal linking.

```ts
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/brand-strategy' }, // or a /services index if you build one
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
```

---

## HIGH - Fix within 2 weeks

### 5. Add `Service` schema to each services page
**File:** `src/app/services/[slug]/page.tsx`
**Effort:** 1 hr
**Why:** Service pages currently have meta but no entity markup. `Service` JSON-LD with `provider` linking to the Organization improves topical authority signals.

### 6. Add `Article` + `Person` schema to blog posts
**File:** `src/app/blog/[slug]/BlogPostClient.tsx` (or move emission to `page.tsx`)
**Effort:** 1 hr
**Why:** Sanity already stores `author`, `publishedAt`, `mainImage`, `excerpt` - wire these into JSON-LD. Required for Top Stories eligibility and AI citation preference.

### 7. Add `BreadcrumbList` schema + visible breadcrumbs
**Files:** `src/app/services/[slug]/page.tsx`, `src/app/case-studies/[slug]/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/careers/[departmentSlug]/[roleSlug]/page.tsx`
**Effort:** 2 hr (reusable Breadcrumb component + JSON-LD helper)

### 8. Switch font loading to `next/font`
**File:** `src/app/layout.tsx:58-65`, `src/app/layout.tsx:65` (`<body style={{ fontFamily: 'Stack Sans Text' }}>`)
**Effort:** 30 min
**Why:** Eliminates render-blocking external stylesheet, removes the `https://fonts.gstatic.com` origin from the critical path, FOUT-free.

```ts
import { Stack_Sans_Text } from 'next/font/google'; // verify exact import name
// or: import localFont from 'next/font/local';

const stackSans = Stack_Sans_Text({ subsets: ['latin'], weight: ['200','300','400','500','600','700'], display: 'swap' });

// then on <body>:
<body className={stackSans.className}>
```
Then remove the manual `<link rel="preconnect">` / `<link rel="stylesheet">` block.

### 9. Make homepage a server component
**File:** `src/app/page.tsx:1`
**Effort:** 1 hr
**Why:** `'use client'` at the page level forces the entire tree into the client bundle and prevents per-page metadata. Remove `'use client'`, then mark only the truly interactive children:
- `Hero` is already `'use client'` - fine.
- `InstagramReels`, `GlobalServicingModel`, animation-heavy sections - keep as client.
- Static sections (`AwardsAndRecognition`, `ProudlyWorkingWith`, `CTASection`) can stay server.
- The `useEffect` import on line 14 of `page.tsx` is unused - remove it.

### 10. Rewrite case-studies index description
**File:** `src/app/case-studies/page.tsx:9`
**Effort:** 5 min
**Current:** `'Explore case studies from Digitally Next.'`
**Suggested:** `'Real performance, brand, and platform results from Digitally Next - campaigns and product builds across InsurTech, FinTech, hearing-tech, real estate, legal, and global launches.'`

### 11. Rewrite homepage H1 for keyword alignment
**File:** `src/components/sections/Hero.tsx:67-69`
**Effort:** 15 min discussion + 5 min code
**Why:** `CAMPAIGNS.` is a great kicker but a one-word H1 wastes the strongest on-page ranking signal. Demote to a `<p>` kicker and use a query-aligned H1 below or above.

Suggestion (preserves the brand voice):
- Kicker `<p>`: `WE DON'T JUST BUILD CAMPAIGNS.`
- H1: `Digital marketing agency building what tomorrow remembers`
- Subhead `<p>`: `Strategy, brand, performance, content, and AI-driven decision systems - under one roof, for global scale.`

### 12. Reduce homepage payload
**Effort:** 4–6 hr (investigation)
**Files:** various, especially `src/components/sections/GlobalServicingModel.tsx` and animation libs in `package.json`
**Action:**
- Audit which of `framer-motion`, `motion`, `gsap`, `react-spring`, `three`, `cobe`, `dotted-map` are actually used in the homepage tree. Pick one animation lib (`framer-motion` is the most commonly imported in this codebase).
- The world-map SVG in `GlobalServicingModel` may be the largest single contributor - consider lazy-loading it (`dynamic(() => import('...'), { ssr: false })`) and rendering a static placeholder for crawlers.
- Run `next build && npx next-bundle-analyzer` (after wiring `@next/bundle-analyzer`) and address the top 3 chunks.

---

## MEDIUM - Fix within 1 month

### 13. Build `app/llms.txt` for AI crawlers
**File:** create `src/app/llms.txt/route.ts`
**Effort:** 30 min
**Format:** Markdown index of canonical URLs, one section per content type (Services, Case Studies, Blog).

### 14. Add `JobPosting` schema to careers/role pages
**File:** `src/app/careers/[departmentSlug]/[roleSlug]/page.tsx`
**Effort:** 1 hr
**Why:** Google Jobs has dedicated rich results.

### 15. Build a real `/about/team` page with `Person` schema
**Effort:** 1 day (content + design + dev)
**Why:** Major E-E-A-T lift; replaces the dead `#about` footer link; gives AI engines named, attributable experts to cite.

### 16. Improve hero/IPL banner alt text
**Files:** `src/components/sections/Hero.tsx:34`, `src/app/page.tsx:31,40`
**Effort:** 10 min

### 17. Add `og:image` per service page
**File:** `src/app/services/[slug]/page.tsx:24-29`
**Effort:** 30 min code + design time per service
Currently service pages inherit the wrong-dimension root OG image.

### 18. Verify `/studio/*` is `noindex`
**File:** `src/app/studio/layout.tsx`
**Effort:** 5 min
Confirm by curling `/studio` and checking for `<meta name="robots" content="noindex">` or add it.

### 19. Remove unused `keywords` meta
**File:** `src/app/layout.tsx:14-22`
**Effort:** 1 min
Google has ignored this since 2009. Remove for hygiene.

### 20. Add at least 240 words of crawlable prose to homepage
**File:** new section in `src/app/page.tsx`
**Effort:** 1 hr (copywriting)
Two ~120-word paragraphs: "What we do" (factual capability list) and "How we work" (the ADAC process narrative). Pure HTML, no animation gating, above the case-studies section.

---

## LOW - Backlog

### 21. Consolidate animation libs (drop `motion`, `react-spring` if unused)
### 22. Add `manifest.json` + `theme-color` meta for PWA polish
### 23. Tighten CSP - replace `'unsafe-inline'` with nonces for inline `<script>` (would need a Next.js middleware-based nonce strategy)
### 24. Convert hero `b1.webp` to AVIF with WebP fallback
### 25. Per-page Twitter cards with custom imagery
### 26. Add internal linking between related case studies (currently each case-study page sits alone)
### 27. Configure Search Console + GA4 + run `/seo google` to capture real CWV / GSC data
### 28. Add Moz or Bing Webmaster API keys + run `/seo backlinks` to baseline link profile

---

## Implementation order (suggested sprints)

**Sprint 1 (this week - ~6 hrs):**
- Items 1–4 (schema, sitemap, OG image, footer fix). Highest impact, lowest risk.

**Sprint 2 (next week - ~10 hrs):**
- Items 5–7 (per-page schema rollout) + 8 (`next/font`) + 9 (server component split).

**Sprint 3 (week 3 - ~12 hrs):**
- Items 10–12 (content rewrites + payload reduction). Bundle analysis is the unknown.

**Sprint 4 (week 4 - ~8 hrs):**
- Items 13–20 (AI readiness, careers schema, hygiene).

After Sprint 1 ships, re-run `/seo audit https://www.digitallynext.com` and expect the score to move from ~64 to ~78. After Sprint 3, target is ~85+.
