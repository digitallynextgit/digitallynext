import Script from 'next/script';
import CareersCtaSection from '@/components/careers/CareersCtaSection';
import CaseStudiesList from '@/components/careers/CaseStudiesList';
import CaseStudiesHero from '@/components/case-studies/CaseStudiesHero';
import ClientLogos from '@/components/sections/ClientLogos';
import { ThemeSection } from '@/components/ui/ThemeSection.tsx';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';

export const metadata = buildMetadata({
  title: 'Case Studies | Digitally Next',
  description:
    'Explore case studies from Digitally Next — proven results across strategy, branding, performance marketing, and digital experiences.',
  path: '/case-studies',
});

export default function CaseStudiesPage() {
  return (
    <>
      <Script id="ld-case-studies" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          webPageJsonLd({
            title: 'Case Studies | Digitally Next',
            description: 'Proven client outcomes from Digitally Next across industries and channels.',
            path: '/case-studies',
          })
        )}
      </Script>
      <ThemeSection theme="light">
        <CaseStudiesHero />
      </ThemeSection>

      <ThemeSection theme="dark">
        <ClientLogos />
      </ThemeSection>
      <ThemeSection theme="light">
        <CaseStudiesList />
      </ThemeSection>
      <ThemeSection theme="light">
        <CareersCtaSection />
      </ThemeSection>
    </>
  );
}
