import { defineField, defineType } from 'sanity';

/**
 * LinkedIn embed post shown in the Employee Stories carousel on /careers.
 *
 * Manual order numbers were retired in favor of drag-to-reorder via the
 * `orderable-document-list` plugin - the plugin writes to `orderRank` behind
 * the scenes; you only ever drag rows in Studio.
 */
export default defineType({
  name: 'employeeStory',
  title: 'Employee Story',
  type: 'document',
  // `orderRank` is defined by @sanity/orderable-document-list via
  // `orderRankField({ type: 'employeeStory' })` on the desk structure side.
  // We register it here as an actual field so it survives GROQ sort + type gen.
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Used as the iframe accessibility title and shown in Studio previews. Not visible to end users.',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'embedUrl',
      title: 'LinkedIn Embed URL',
      type: 'url',
      description:
        'From LinkedIn: click "···" on the post → "Embed this post" → copy the URL from inside src="…". Should start with https://www.linkedin.com/embed/feed/update/urn:li:share:… or …:ugcPost:…',
      validation: (Rule) =>
        Rule.required()
          .uri({ scheme: ['https'] })
          .custom((value) => {
            if (!value) return true;
            return /^https:\/\/www\.linkedin\.com\/embed\/feed\/update\/urn:li:(share|ugcPost):\d+/.test(value)
              ? true
              : 'Must be a LinkedIn embed URL - /embed/feed/update/urn:li:share:… or …:ugcPost:…';
          }),
    }),
    defineField({
      name: 'postUrl',
      title: 'Post URL (optional override)',
      type: 'url',
      description:
        'Direct LinkedIn URL opened when a user clicks "View on LinkedIn". Leave blank to auto-derive from Embed URL.',
      validation: (Rule) => Rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Uncheck to hide this story from the site without deleting it.',
      initialValue: true,
    }),
    // Managed by @sanity/orderable-document-list - drag rows in Studio to change order.
    defineField({
      name: 'orderRank',
      type: 'string',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      embedUrl: 'embedUrl',
      published: 'published',
    },
    prepare({ title, embedUrl, published }) {
      // Extract the trailing URN so it's identifiable in the list even if titles collide.
      const urnMatch = typeof embedUrl === 'string' ? embedUrl.match(/urn:li:(?:share|ugcPost):(\d+)/) : null;
      const urn = urnMatch ? urnMatch[1] : 'no URN';
      return {
        title: title || 'Untitled story',
        subtitle: `${published === false ? '(hidden) ' : ''}${urn}`,
      };
    },
  },
});
