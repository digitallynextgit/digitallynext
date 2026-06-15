import { groq } from 'next-sanity';

// All posts for blog listing page
export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
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

// Single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
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

// Latest 3 posts for homepage Insights section
export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...3] {
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

// Posts by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc) {
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

// Latest 3 posts that carry a specific category title (e.g. "Career Talks - HR Corner").
// Used by the careers page "People Playbook" section.
export const latestPostsByCategoryTitleQuery = groq`
  *[_type == "post" && $title in categories[]->title] | order(publishedAt desc)[0...3] {
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
