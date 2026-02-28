# Page Design Spec — Careers: Department Modal + Role Flow (Desktop-first)

## 1) Layout
- Primary: Desktop-first centered content container (max-width ~1200px), sections stacked (hero/intro → open-modal trigger → inline role step area).
- Modal: fixed overlay + centered dialog; internal layout uses CSS Grid.
- Spacing: 8px base grid; section spacing 24–48px; modal padding 24–32px.
- Responsive behavior:
  - ≥1024px: Department cards grid = 3 columns (3x3).
  - 640–1023px: 2 columns.
  - <640px: 1 column; modal becomes near-fullscreen with safe padding.

## 2) Meta Information
- Title: Careers | Choose Department
- Description: Explore departments and roles.
- Open Graph:
  - og:title: Careers
  - og:description: Choose a department and role.

## 3) Global Styles (Design Tokens)
- Background: #FFFFFF (page), overlay rgba(0,0,0,0.5).
- Typography scale: 14 (body) / 16 (body-lg) / 20 (h3) / 28 (h2).
- Primary button: solid brand color; hover = slightly darker; disabled = 40% opacity + not-allowed.
- Card:
  - Default: 1px border neutral, 8–12px radius.
  - Hover: subtle shadow + border accent.
  - Selected: accent border (2px) + check indicator.
- Focus: visible focus ring (2px) for keyboard navigation.

## 4) Page Structure
1. Page Header (existing site nav)
2. Careers intro section (heading + short copy)
3. Department selection trigger area (primary button)
4. Role selection area (appears after department selected; can be inline section under trigger)
5. Page Footer

## 5) Sections & Components

### A) Department Selection Trigger
- Component: Primary button “Choose Department”.
- Interaction:
  - Click opens modal.
  - On modal close, focus returns to this button.

### B) Department Selection Modal (Figma 3x3 Cards)
- Dialog frame:
  - Header: Title “Choose a Department” + close (X) icon button.
  - Body: 3x3 card grid.
  - Footer: Secondary “Cancel” + Primary “Next” CTA.
- Cards (each department):
  - Elements: department name (required), optional short label (if in design).
  - States: default / hover / selected / focus.
  - Selection: single-select (radio-like).
- Close/overlay behavior:
  - Overlay click closes modal.
  - ESC closes modal.
  - Close icon closes modal.

### C) Step Transition (Department → Role)
- After selection:
  - “Next” CTA becomes enabled.
  - On “Next”, modal closes and role-selection step opens/shows.

### D) Role-Selection Step (Post Department)
- Placement: inline section on Careers page (recommended) OR second modal (if design demands; default: inline).
- Content:
  - Heading: “Roles in {Department}”.
  - Role list/cards: single-select.
- CTA:
  - Primary CTA (e.g., “View Role / Apply”) disabled/hidden until role selected.
  - Optional back action: “Change Department” link that reopens department modal.

### E) Interaction & Accessibility Guidelines
- Modal must be accessible dialog:
  - Focus trap inside modal.
  - aria-labelledby links to modal title.
  - Keyboard: Tab cycles; Enter selects CTA; ESC closes.
- Animation (light): overlay fade (150–200ms), modal scale-in (98%→