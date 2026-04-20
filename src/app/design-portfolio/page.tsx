import type { Metadata } from 'next';
import DesignPortfolioClient from './DesignPortfolioClient';

export const metadata: Metadata = {
  title: 'Design Portfolio | Digitally Next',
  description:
    'Website design and development portfolio from Digitally Next — WordPress, Shopify, and Next.js projects delivered for brands across India, the USA, Canada, Australia, and the Middle East.',
  alternates: {
    canonical: 'https://www.digitallynext.com/design-portfolio',
  },
};

export default function DesignPortfolioPage() {
  return <DesignPortfolioClient />;
}
