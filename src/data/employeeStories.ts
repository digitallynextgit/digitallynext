/**
 * Employee Stories - LinkedIn post embeds for the careers page.
 *
 * How to add a new story:
 *  1. Open the LinkedIn post in your browser
 *  2. Click the "···" menu on the post → "Embed this post"
 *  3. Copy the URL from inside src="..." in the iframe LinkedIn gives you
 *     (looks like https://www.linkedin.com/embed/feed/update/urn:li:share:7XXXXXXXX
 *      or       https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7XXXXXXXX)
 *  4. Add an entry below with a unique `order_id` (lower number = shown first)
 *
 * Re-ordering: just change order_id values. No code changes needed.
 */

export type EmployeeStory = {
  /** Sort key - lower = shown first. Keep numbers unique. */
  order_id: number;
  /** Stable unique identifier (used as React key). */
  id: string;
  /** LinkedIn embed iframe src URL. */
  embedUrl: string;
  /** Accessible iframe title. Shown to screen readers. */
  title: string;
  /**
   * Optional. Direct LinkedIn post URL (linkedin.com/feed/update/...) opened
   * in a new tab when the user clicks the "View on LinkedIn" link on a card.
   * If omitted, it's auto-derived from `embedUrl` — only set this explicitly
   * when you want to override the derived URL (e.g. to point to the post's
   * /posts/<slug> form instead of /feed/update/<urn>).
   */
  postUrl?: string;
};

export const EMPLOYEE_STORIES: EmployeeStory[] = [
  {
    order_id: 1, //1
    id: 'story-1',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7467910619585880064?collapsed=1',
    title: 'Employee story 1',
  },
  {
    order_id: 2, //2
    id: 'story-2',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7465413306984542209?collapsed=1',
    title: 'Employee story 2',
  },
  {
    order_id: 3, //3
    id: 'story-3',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7463113248968581120?collapsed=1',
    title: 'Employee story 3',
  },
  {
    order_id: 5, //4
    id: 'story-4',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7345339931210223616?collapsed=1',
    title: 'Employee story 4',
  },
  {
    order_id: 6, //5
    id: 'story-5',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7474362766976499713?collapsed=1',
    title: 'Employee story 5',
  },
  {
    order_id: 7, //6
    id: 'story-6',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7474014932448067584?collapsed=1',
    title: 'Employee story 6',
  },
  {
    order_id: 4, //7
    id: 'story-7',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7479565265886765056?collapsed=1',
    title: 'Employee story 7',
  },
];

/**
 * Convert a LinkedIn embed URL into the direct post URL that opens the post
 * in a new tab on linkedin.com. Strips `/embed` and the `?collapsed=1` param.
 *
 * Example:
 *   https://www.linkedin.com/embed/feed/update/urn:li:share:7467910619585880064?collapsed=1
 *   →  https://www.linkedin.com/feed/update/urn:li:share:7467910619585880064
 */
export function derivePostUrl(embedUrl: string): string {
  try {
    const url = new URL(embedUrl);
    url.pathname = url.pathname.replace('/embed/feed/', '/feed/');
    url.search = '';
    return url.toString();
  } catch {
    return embedUrl;
  }
}

/**
 * Returns the stories sorted by order_id (ascending), with `postUrl` populated
 * for every entry — either the explicit `postUrl` field if set, or auto-derived
 * from `embedUrl`. The component layer can rely on `postUrl` always being a
 * string, no fallback logic needed at the render site.
 */
export function getOrderedEmployeeStories(): Array<Required<Pick<EmployeeStory, 'postUrl'>> & EmployeeStory> {
  return [...EMPLOYEE_STORIES]
    .sort((a, b) => a.order_id - b.order_id)
    .map((s) => ({ ...s, postUrl: s.postUrl ?? derivePostUrl(s.embedUrl) }));
}
