import Script from 'next/script';
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
      <Script id="ld-home" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          webPageJsonLd({
            title: 'Digitally Next | Growth-Driven Global Digital Marketing Agency',
            description:
              'Partner with Digitally Next for strategy, branding, performance marketing, content, web development, and AI-driven decisions.',
            path: '/',
          })
        )}
      </Script>
      <HomePageClient />
    </>
  );
}
