import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CareerRolePageClient from '@/components/careers/CareerRolePageClient';
import { getCareerRoleBySlug, getCareerRoleEntries } from '@/data/careersDepartments';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCareerRoleBySlug(slug);

  if (!entry) {
    return {
      title: 'Role Not Found | Digitally Next Careers',
    };
  }

  return {
    title: `${entry.role.title} | Digitally Next Careers`,
    description: entry.role.description?.intro ?? `Apply for ${entry.role.title} at Digitally Next.`,
    openGraph: {
      title: `${entry.role.title} | Digitally Next Careers`,
      description: entry.role.description?.intro ?? `Apply for ${entry.role.title} at Digitally Next.`,
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return getCareerRoleEntries().map((entry) => ({
    slug: entry.slug,
  }));
}

export default async function CareerRolePage({ params }: Props) {
  const { slug } = await params;
  const entry = getCareerRoleBySlug(slug);

  if (!entry) {
    notFound();
  }

  return <CareerRolePageClient entry={entry} />;
}
