import Script from 'next/script';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';
import TermsOfUseClient from './TermsOfUseClient';

export const metadata = buildMetadata({
  title: 'Terms of Use | Digitally Next',
  description: 'Review the Digitally Next Terms of Use governing access to our website and services.',
  path: '/terms-of-use',
});

export default function TermsOfUsePage() {
  return (
    <>
      <Script id="ld-terms" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          webPageJsonLd({
            title: 'Terms of Use | Digitally Next',
            description: 'Terms governing access to the Digitally Next website and services.',
            path: '/terms-of-use',
          })
        )}
      </Script>
      <TermsOfUseClient />
    </>
  );
}
