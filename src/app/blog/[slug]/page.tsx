import type { Metadata } from 'next';
import { client } from '@/sanity/client';
import { postBySlugQuery } from '@/sanity/queries';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
// import { DUMMY_POSTS } from '../dummyPosts';

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
  [key: string]: unknown;
}

async function getPost(slug: string): Promise<SanityPostMeta | null> {
  return client.fetch(postBySlugQuery, { slug });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  // const dummy = DUMMY_POSTS.find((d) => d.slug.current === slug);
  const resolved = post ?? null;
  // const resolved = post ?? dummy;

  if (!resolved) return { title: 'Post Not Found | Digitally Next' };

  const metaTitle = (resolved as SanityPostMeta).metaTitle || `${resolved.title} | Digitally Next Blog`;
  const metaDesc = (resolved as SanityPostMeta).metaDescription || resolved.excerpt || `Read ${resolved.title} on the Digitally Next blog.`;

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      type: 'article',
      publishedTime: resolved.publishedAt,
    },
  };
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (post) return <BlogPostClient post={post} />;

  // const dummy = DUMMY_POSTS.find((d) => d.slug.current === slug);
  // if (dummy) return <BlogPostClient post={dummy} />;

  notFound();
}
