# Project Overview
- Next.js 16 app-router site with TypeScript
- Content driven via Sanity and Notion, media assets in public/

# Key Paths
- src/app: routes, layouts, API routes
- src/components: UI and page sections
- src/sanity: schemas, client, queries
- src/data: local content data
- public: static assets

# Commands
- npm run dev: start dev server
- npm run build: production build
- npm run start: serve production build
- npm run lint: ESLint
- npm run format: Prettier

# Conventions
- Use existing component patterns in src/components and app router structure in src/app
- Keep TypeScript types explicit where data shapes are defined
- Prefer server components unless client state or effects are needed
- Keep styling consistent with current Tailwind and styled-components usage

# Environment
- Set required values in .env for Sanity, Notion, and email features
