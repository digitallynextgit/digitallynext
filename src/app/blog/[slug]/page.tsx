import type { Metadata } from 'next';
import { client } from '@/sanity/client';
import { postBySlugQuery } from '@/sanity/queries';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';

interface Props {
  params: Promise<{ slug: string }>;
}

// Minimal type for metadata — full Post type lives in BlogPostClient
interface SanityPostMeta {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  [key: string]: unknown;
}

async function getPost(slug: string): Promise<SanityPostMeta | null> {
  return client.fetch(postBySlugQuery, { slug });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Post Not Found | Digitally Next' };
  }

  return {
    title: `${post.title} | Digitally Next Blog`,
    description: post.excerpt || `Read ${post.title} on the Digitally Next blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
