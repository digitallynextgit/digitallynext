import JsonLd from '@/components/seo/JsonLd';
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
      <JsonLd
        id="ld-terms"
        data={webPageJsonLd({
          title: 'Terms of Use | Digitally Next',
          description: 'Terms governing access to the Digitally Next website and services.',
          path: '/terms-of-use',
        })}
      />
      <TermsOfUseClient />
    </>
  );
}
