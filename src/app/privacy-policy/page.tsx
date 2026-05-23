import Script from 'next/script';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';
import PrivacyPolicyClient from './PrivacyPolicyClient';

export const metadata = buildMetadata({
  title: 'Privacy Policy | Digitally Next',
  description:
    'Read the Digitally Next Privacy Policy to understand how we collect, use, and protect your information across our services.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Script id="ld-privacy" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          webPageJsonLd({
            title: 'Privacy Policy | Digitally Next',
            description: 'How Digitally Next collects, uses, and protects your information.',
            path: '/privacy-policy',
          })
        )}
      </Script>
      <PrivacyPolicyClient />
    </>
  );
}
