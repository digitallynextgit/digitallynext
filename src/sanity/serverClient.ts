import 'server-only';
import { createClient } from 'next-sanity';

/**
 * Tokened server-only client. Use for document types that aren't in the
 * dataset's public read allowlist (e.g. `employeeStory`), or anywhere you
 * need to bypass the CDN. Never import this from a client component.
 */
export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
