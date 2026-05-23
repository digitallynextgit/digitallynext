import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import CaseStudyDetailPage from '@/components/case-studies/CaseStudyDetailPage';
import { getCaseStudyBySlug } from '@/data/casestudy';
import { buildMetadata, caseStudyJsonLd } from '@/app/utils/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);

  if (!cs) {
    return { title: 'Case Study Not Found | Digitally Next' };
  }

  return buildMetadata({
    title: cs.metaTitle,
    description: cs.metaDescription,
    path: `/case-studies/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);

  if (!cs) {
    notFound();
  }

  return (
    <>
      <Script id={`ld-case-study-${slug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          caseStudyJsonLd({
            title: cs.metaTitle,
            description: cs.metaDescription,
            path: `/case-studies/${slug}`,
          })
        )}
      </Script>
      <CaseStudyDetailPage caseStudy={cs} />
    </>
  );
}
