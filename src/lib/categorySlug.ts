/**
 * Slugify a Sanity category title for use in URLs (e.g. /blog?tag=...).
 * "Career Talks - HR Corner" → "career-talks-hr-corner"
 *
 * Keep this as the single source of truth so the link the careers page builds
 * matches the lookup the blog page does on arrival.
 */
export function slugifyTag(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}
