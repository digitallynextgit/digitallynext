import Script from 'next/script';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';
import CareersPageClient from './CareersPageClient';

export const metadata = buildMetadata({
  title: 'Careers | Digitally Next',
  description:
    'Join Digitally Next — a growth-driven global digital marketing agency. Explore open roles across strategy, performance, content, design, and engineering.',
  path: '/careers',
});

export default function CareersPage() {
  return (
    <>
      <Script id="ld-careers" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          webPageJsonLd({
            title: 'Careers | Digitally Next',
            description:
              'Join Digitally Next — explore open roles across strategy, performance, content, design, and engineering.',
            path: '/careers',
          })
        )}
      </Script>
      <CareersPageClient />
    </>
  );
}
