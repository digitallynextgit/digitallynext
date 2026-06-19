import type { Metadata } from 'next';

export const siteConfig = {
  siteName: 'DigitallyNext',
  siteUrl: 'https://www.digitallynext.com',
  defaultDescription:
    'DigitallyNext is an AD agency offering end-to-end digital marketing solutions - SEO, performance marketing, content, social, and UX.',
  defaultKeywords: [
    'DigitallyNext',
    'digital marketing',
    'SEO',
    'SEM',
    'social media',
    'content marketing',
    'case studies',
    'blog',
  ],
  defaultOgImage: '/logo1.webp',
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[] | string;
  images?: string[];
}): Metadata {
  const imageUrls = (opts.images && opts.images.length ? opts.images : [siteConfig.defaultOgImage]).map((p) =>
    absoluteUrl(p)
  );
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords ?? siteConfig.defaultKeywords,
    alternates: { canonical: absoluteUrl(opts.path) },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: absoluteUrl(opts.path),
      siteName: siteConfig.siteName,
      type: 'website',
      images: imageUrls,
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: imageUrls,
    },
    robots: { index: true, follow: true },
    metadataBase: new URL(siteConfig.siteUrl),
  };
}

// JSON-LD builders
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    logo: absoluteUrl('/logo.webp'),
  };
}

export function webPageJsonLd(input: { title: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.title,
    url: absoluteUrl(input.path),
    description: input.description,
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  authorName?: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    image: input.image ? absoluteUrl(input.image) : undefined,
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.datePublished,
    author: input.authorName ? { '@type': 'Person', name: input.authorName } : undefined,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.webp') },
    },
    keywords: input.tags,
  };
}

export function newsArticleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  authorName?: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: input.title,
    description: input.description,
    image: input.image ? absoluteUrl(input.image) : undefined,
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.datePublished,
    author: input.authorName ? { '@type': 'Person', name: input.authorName } : undefined,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.webp') },
    },
    keywords: input.tags,
  };
}

export function caseStudyJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  industry?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: input.title,
    description: input.description,
    image: input.image ? absoluteUrl(input.image) : undefined,
    url: absoluteUrl(input.path),
    about: input.industry,
    isPartOf: { '@type': 'WebSite', name: siteConfig.siteName, url: siteConfig.siteUrl },
  };
}
