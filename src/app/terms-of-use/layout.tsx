import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | Digitally Next',
  description:
    'Read the Digitally Next Terms of Use governing your access to and use of our website, services, and content.',
  alternates: {
    canonical: 'https://www.digitallynext.com/terms-of-use',
  },
  openGraph: {
    title: 'Terms of Use | Digitally Next',
    description:
      'Read the Digitally Next Terms of Use governing your access to and use of our website, services, and content.',
    url: 'https://www.digitallynext.com/terms-of-use',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Use | Digitally Next',
    description: 'Digitally Next Terms of Use.',
  },
};

export default function TermsOfUseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
