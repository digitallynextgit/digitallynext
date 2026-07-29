/**
 * Server-rendered JSON-LD.
 *
 * Must stay free of `"use client"` and of `next/script`: structured data has to
 * be present in the initial HTML response so Google and the AI crawlers
 * (GPTBot, PerplexityBot, ClaudeBot) see it without executing JavaScript.
 * `next/script` injects after hydration, which those crawlers never reach.
 */
export default function JsonLd({ id, data }: { id?: string; data: unknown }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // `<` is escaped so a stray "</script>" inside any string value cannot
      // close the tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
