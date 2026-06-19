import type { MetadataRoute } from 'next';
import { siteConfig } from '@/app/utils/seo';

// AI/LLM crawlers we explicitly welcome for Generative Engine Optimization (GEO).
// They are already allowed by the `*` rule, but listing them signals intent and
// lets us tune access per-bot later.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'Bytespider',
  'CCBot',
  'DuckAssistBot',
  'cohere-ai',
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ['/studio/', '/api/'];
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      { userAgent: AI_CRAWLERS, allow: '/', disallow },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}
