import { groq } from 'next-sanity';

// All posts for blog listing page (hidden posts filtered out).
// `visible != false` treats posts without the field as visible — no migration
// needed for existing docs.
export const allPostsQuery = groq`
  *[_type == "post" && visible != false] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    featured,
    readTime,
    "categories": categories[]->{ _id, title },
    "author": author->{ name, image }
  }
`;

// Single post by slug (returns null if the post is hidden — page shows 404).
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && visible != false][0] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    featured,
    readTime,
    faqsJson,
    metaTitle,
    metaDescription,
    body,
    "categories": categories[]->{ _id, title },
    "author": author->{ name, slug, image, bio }
  }
`;

// Latest 3 posts for homepage Insights section (hidden posts filtered out).
export const latestPostsQuery = groq`
  *[_type == "post" && visible != false] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "categories": categories[]->{ _id, title }
  }
`;

// All categories
export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title
  }
`;

// Posts by category (hidden posts filtered out).
export const postsByCategoryQuery = groq`
  *[_type == "post" && visible != false && $categoryId in categories[]._ref] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "categories": categories[]->{ _id, title },
    "author": author->{ name, image }
  }
`;

// Published employee stories in Studio-managed drag-to-reorder order.
// Used by the careers page "Employee Stories" carousel.
export const employeeStoriesQuery = groq`
  *[_type == "employeeStory" && published == true] | order(orderRank asc) {
    _id,
    title,
    embedUrl,
    postUrl
  }
`;

// All posts that carry a specific category title (e.g. "Career Talks - HR Corner"), newest first.
// Used by the careers page "People Playbook" section. Hidden posts filtered out.
export const postsByCategoryTitleQuery = groq`
  *[_type == "post" && visible != false && $title in categories[]->title] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    readTime,
    "categories": categories[]->{ _id, title },
    "author": author->{ name, image }
  }
`;
