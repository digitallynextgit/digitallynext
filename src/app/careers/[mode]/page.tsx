import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import CareersBrowsePageClient from '@/components/careers/CareersBrowsePageClient';
import { getGroupsForMode, parseCareerModeSlug, type CareersMode } from '@/data/careersDepartments';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';

interface Props {
  params: Promise<{ mode: string }>;
}

const MODE_COPY: Record<CareersMode, { title: string; subtitle: string; metaTitle: string; metaDescription: string }> =
  {
    'full-time': {
      title: 'Full-Time Positions',
      subtitle:
        'Pick a group to explore the departments inside it. Each group is built around a different part of how we deliver work - strategy, AI, accounts, production, or people.',
      metaTitle: 'Full-Time Careers | Digitally Next',
      metaDescription:
        'Explore full-time openings at Digitally Next across strategy, AI, account management, marketing production, and HR. Pick a group to drill into its departments and roles.',
    },
    internship: {
      title: 'Internships',
      subtitle:
        'Start with real work, real mentorship, and real expectations. Our internships are structured to build, not busy-work.',
      metaTitle: 'Internships | Digitally Next',
      metaDescription:
        'Explore internship opportunities at Digitally Next. Real mentorship, real responsibility, real growth from day one.',
    },
  };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mode: modeSlug } = await params;
  const mode = parseCareerModeSlug(modeSlug);
  if (!mode) return { title: 'Not Found | Digitally Next Careers' };
  return buildMetadata({
    title: MODE_COPY[mode].metaTitle,
    description: MODE_COPY[mode].metaDescription,
    path: `/careers/${modeSlug}`,
  });
}

export function generateStaticParams() {
  return [{ mode: 'full-time' }, { mode: 'internship' }];
}

export default async function CareersModePage({ params }: Props) {
  const { mode: modeSlug } = await params;
  const mode = parseCareerModeSlug(modeSlug);
  if (!mode) notFound();

  const groups = getGroupsForMode(mode);
  const copy = MODE_COPY[mode];

  return (
    <>
      <Script id={`ld-careers-${modeSlug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          webPageJsonLd({
            title: copy.metaTitle,
            description: copy.metaDescription,
            path: `/careers/${modeSlug}`,
          })
        )}
      </Script>
      <CareersBrowsePageClient
        title={copy.title}
        subtitle={copy.subtitle}
        breadcrumbs={[{ label: 'Careers', href: '/careers' }, { label: copy.title }]}
        backLink={{ href: '/careers', label: 'Back to Careers' }}
        searchGroups={groups}
        mode={mode}
        cards={groups.map((group) => ({ kind: 'group', group, mode }))}
      />
    </>
  );
}
