import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CareerRolePageClient from '@/components/careers/CareerRolePageClient';
import { getCareerRoleBySlugs, getCareerRoleEntries } from '@/data/careersDepartments';

interface Props {
  params: Promise<{ departmentSlug: string; roleSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { departmentSlug, roleSlug } = await params;
  const entry = getCareerRoleBySlugs(departmentSlug, roleSlug);

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
    departmentSlug: entry.departmentSlug,
    roleSlug: entry.roleSlug,
  }));
}

export default async function CareerRolePage({ params }: Props) {
  const { departmentSlug, roleSlug } = await params;
  const entry = getCareerRoleBySlugs(departmentSlug, roleSlug);

  if (!entry) {
    notFound();
  }

  return <CareerRolePageClient entry={entry} />;
}
