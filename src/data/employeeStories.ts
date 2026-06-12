/**
 * Employee Stories — LinkedIn post embeds for the careers page.
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
  /** Sort key — lower = shown first. Keep numbers unique. */
  order_id: number;
  /** Stable unique identifier (used as React key). */
  id: string;
  /** LinkedIn embed iframe src URL. */
  embedUrl: string;
  /** Accessible iframe title. Shown to screen readers. */
  title: string;
};

export const EMPLOYEE_STORIES: EmployeeStory[] = [
  {
    order_id: 1,
    id: 'story-1',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7467910619585880064?collapsed=1',
    title: 'Employee story 1',
  },
  {
    order_id: 2,
    id: 'story-2',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7463113248968581120?collapsed=1',
    title: 'Employee story 2',
  },
  {
    order_id: 3,
    id: 'story-3',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7423055126136954881?collapsed=1',
    title: 'Employee story 3',
  },
  {
    order_id: 4,
    id: 'story-4',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7345339931210223616?collapsed=1',
    title: 'Employee story 4',
  },
  {
    order_id: 5,
    id: 'story-5',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7465413306984542209?collapsed=1',
    title: 'Employee story 5',
  },
];

/** Returns the stories sorted by order_id (ascending). */
export function getOrderedEmployeeStories(): EmployeeStory[] {
  return [...EMPLOYEE_STORIES].sort((a, b) => a.order_id - b.order_id);
}
