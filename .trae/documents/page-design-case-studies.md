# Page Design Spec — Case Studies (Desktop-first)

## Global Styles (applies to both pages)
- Design approach: Desktop-first, then adapt down to tablet and mobile breakpoints.
- Layout system: Hybrid CSS Grid + Flexbox.
  - Grid for page-level columns and card layouts.
  - Flexbox for header rows, tag/service chips, and button/link groups.
- Spacing: Use a consistent 8px spacing scale (8/16/24/32/48/64).
- Typography: Follow the Figma master page type scale.
  - H1 for page title/hero.
  - H2/H3 for section headings.
  - Body for paragraphs and card excerpts.
- Color & surfaces: Follow the Figma master page tokens for background, text, and accents.
  - Default background: a clean neutral (light) surface.
  - Accents: use the brand accent color for key links, focus rings, and section highlights.
- Buttons/links:
  - Primary action style reserved for “Read case study” or equivalent CTA if shown in Figma.
  - Links have clear hover/active states (underline or color shift) consistent with master page.
- Media:
  - Images use a consistent aspect ratio and corner radius consistent with the master page.
  - Use lazy-loading for listing thumbnails.

## Shared Component: Master Page Shell
- Purpose: Ensure both Case Studies listing and detail pages visually match the Figma master page.
- Structure:
  1. Top global header
     - Left: logo/brand
     - Right: primary navigation (includes “Case Studies”)
  2. Main content container
     - Max width aligned to Figma (e.g., 1200–1280px typical), centered with side padding.
  3. Global footer
     - Footer links and brand/footer content per master page.
- Responsive behavior:
  - Header nav collapses to a menu pattern at smaller widths (implementation matches master page behavior).

---

## Page 1: Case Studies (Listing)

### Meta Information
- Title: “Case Studies”
- Description: “Explore real projects and results.”
- Open Graph:
  - og:title = “Case Studies”
  - og:description = Short marketing description aligned to master page copy tone

### Page Structure
- Pattern: Stacked sections with a card grid.
- Suggested section order (match Figma master page hierarchy):
  1. Page header/hero
  2. Case studies grid
  3. Footer (from master page shell)

### Sections & Components

#### 1) Page Header / Hero
- Layout: Two-row stack (title then supporting text), aligned to the master page margins.
- Elements:
  - H1 title: “Case Studies”
  - Supporting paragraph: short intro copy
  - Optional: subtle divider or background treatment if present in Figma
- Interactions:
  - None required.

#### 2) Case Studies Grid
- Layout:
  - Desktop: CSS Grid with 3 columns (or the exact column count shown in Figma), with consistent gaps.
  - Tablet: 2 columns.
  - Mobile: 1 column.
- Card component (per case study):
  - Clickable card linking to `/case-studies/:slug`.
  - Elements (include only what the data file provides and what Figma shows):
    - Thumbnail/hero image
    - Title
    - Excerpt
    - Optional chips row: tags/services
  - States:
    - Hover: elevation or border highlight per master page
    - Focus: visible focus ring
- Empty state:
  - Message: “No case studies available.”
  - Secondary link: return to home or refresh (if master page includes such patterns).

---

## Page 2: Case Study Detail (Dynamic)

### Meta Information
- Title: “{Case Study Title} | Case Studies”
- Description: Use the excerpt (or a short derived summary) from the data file.
- Open Graph:
  - og:title = “{Case Study Title}”
  - og:description = excerpt
  - og:image = heroImageUrl (if present)

### Page Structure
- Pattern: Hero + multi-section long-form layout.
- Section spacing follows master page vertical rhythm.

### Sections & Components

#### 1) Breadcrumb / Back Link
- Placement: top of main content, above the hero.
- Content: “← Back to Case Studies” linking to `/case-studies`.

#### 2) Detail Hero
- Layout: Two-column or stacked (depending on Figma).
- Elements:
  - Title (H1)
  - Optional: tag/service chips row
  - Optional: short intro/excerpt
  - Hero image/media block

#### 3) Case Study Content Sections (Data-driven)
- Render sections in order from the single data file.
- Supported blocks (must map 1:1 to the data file):
  - Rich text section: heading + body
  - Stats section: row/grid of key metrics
  - Media section: image/video + optional caption
- Styling rules:
  - Headings and spacing match the Figma master page.
  - Media aligns to content width and uses consistent radius.

#### 4) Not-found State (Invalid Slug)
- Trigger: `/case-studies/:slug` does not match an entry in the data file.
- Layout: Centered message within the master page shell.
- Elements:
  - Title: “Case study not found”
  - Link: “Back to Case Studies”

### Responsive Behavior
- Desktop-first:
  - Maintain master page container width and margins.
  - Convert multi-column hero/stats to stacked sections on smaller breakpoints.
- Media scales fluidly and does not overflow.

### Motion / Transitions (optional)
- Subtle hover transition on listing cards (150–200ms).
- Optional fade-in for hero image if consistent with master page