import { buildLlmsFullTxt } from '@/lib/llms';

// Regenerate at most hourly; served from cache in between.
export const revalidate = 3600;

export async function GET() {
  const body = await buildLlmsFullTxt();
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
