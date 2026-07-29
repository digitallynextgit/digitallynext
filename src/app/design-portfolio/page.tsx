import JsonLd from '@/components/seo/JsonLd';
import DesignPortfolioClient from './DesignPortfolioClient';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';

export const metadata = buildMetadata({
  title: 'Design Portfolio | Digitally Next',
  description:
    'Website design and development portfolio from Digitally Next - WordPress, Shopify, and Next.js projects delivered for brands across India, the USA, Canada, Australia, and the Middle East.',
  path: '/design-portfolio',
});

export default function DesignPortfolioPage() {
  return (
    <>
      <JsonLd
        id="ld-design-portfolio"
        data={webPageJsonLd({
          title: 'Design Portfolio | Digitally Next',
          description: 'WordPress, Shopify, and Next.js web design and development projects delivered globally.',
          path: '/design-portfolio',
        })}
      />
      <DesignPortfolioClient />
    </>
  );
}
