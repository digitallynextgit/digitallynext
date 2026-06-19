import Script from 'next/script';
import { client } from '@/sanity/client';
import { allPostsQuery, allCategoriesQuery } from '@/sanity/queries';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';
import BlogPageClient from './BlogPageClient';

export const metadata = buildMetadata({
  title: 'Blog | Digitally Next',
  description:
    'Insights, strategies, and thought leadership from Digitally Next - your growth-driven global digital marketing partner.',
  path: '/blog',
});

// Revalidate every 60 seconds
export const revalidate = 60;

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset: { _ref: string }; alt?: string };
  excerpt?: string;
  publishedAt?: string;
  categories?: { _id: string; title: string }[];
  author?: { name: string; image?: { asset: { _ref: string } } };
}

interface Category {
  _id: string;
  title: string;
}

export default async function BlogPage() {
  const [posts, categories]: [Post[], Category[]] = await Promise.all([
    client.fetch(allPostsQuery),
    client.fetch(allCategoriesQuery),
  ]);

  return (
    <>
      <Script id="ld-blog" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          webPageJsonLd({
            title: 'Blog | Digitally Next',
            description:
              'Insights, strategies, and thought leadership from Digitally Next - your growth-driven global digital marketing partner.',
            path: '/blog',
          })
        )}
      </Script>
      <BlogPageClient posts={posts} categories={categories} />
    </>
  );
}
