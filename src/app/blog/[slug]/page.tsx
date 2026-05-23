import type { Metadata } from 'next';
import Script from 'next/script';
import { client } from '@/sanity/client';
import { postBySlugQuery } from '@/sanity/queries';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
import { buildMetadata, articleJsonLd } from '@/app/utils/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

interface SanityPostMeta {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  author?: { name: string };
  [key: string]: unknown;
}

async function getPost(slug: string): Promise<SanityPostMeta | null> {
  return client.fetch(postBySlugQuery, { slug });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: 'Post Not Found | Digitally Next' };

  const metaTitle = post.metaTitle || `${post.title} | Digitally Next Blog`;
  const metaDesc = post.metaDescription || post.excerpt || `Read ${post.title} on the Digitally Next blog.`;

  return buildMetadata({
    title: metaTitle,
    description: metaDesc,
    path: `/blog/${slug}`,
  });
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const title = post.metaTitle || `${post.title} | Digitally Next Blog`;
  const description = post.metaDescription || post.excerpt || `Read ${post.title} on the Digitally Next blog.`;

  return (
    <>
      <Script id={`ld-blog-${slug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          articleJsonLd({
            title,
            description,
            path: `/blog/${slug}`,
            datePublished: post.publishedAt,
            authorName: post.author?.name,
          })
        )}
      </Script>
      <BlogPostClient post={post} />
    </>
  );
}
