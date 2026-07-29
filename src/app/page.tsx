import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';
import HomePageClient from './HomePageClient';

export const metadata = buildMetadata({
  title: 'Digitally Next | Growth-Driven Global Digital Marketing Agency',
  description:
    'Partner with Digitally Next for strategy, branding, performance marketing, content, web development, and AI-driven decisions. We transform brands digitally.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        id="ld-home"
        data={webPageJsonLd({
          title: 'Digitally Next | Growth-Driven Global Digital Marketing Agency',
          description:
            'Partner with Digitally Next for strategy, branding, performance marketing, content, web development, and AI-driven decisions.',
          path: '/',
        })}
      />
      <HomePageClient />
    </>
  );
}
