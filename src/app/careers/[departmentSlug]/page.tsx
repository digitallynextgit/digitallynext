import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CareerDepartmentPageClient from '@/components/careers/CareerDepartmentPageClient';
import { getCareerDepartmentBySlug, getCareerDepartmentEntries, getCareerRoleEntries } from '@/data/careersDepartments';

interface Props {
  params: Promise<{ departmentSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { departmentSlug } = await params;
  const entry = getCareerDepartmentBySlug(departmentSlug);

  if (!entry) {
    return {
      title: 'Department Not Found | Digitally Next Careers',
    };
  }

  return {
    title: `${entry.department.title} | Digitally Next Careers`,
    description: `Explore roles in ${entry.department.title} at Digitally Next.`,
    openGraph: {
      title: `${entry.department.title} | Digitally Next Careers`,
      description: `Explore roles in ${entry.department.title} at Digitally Next.`,
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return getCareerDepartmentEntries().map((entry) => ({
    departmentSlug: entry.departmentSlug,
  }));
}

export default async function CareerDepartmentPage({ params }: Props) {
  const { departmentSlug } = await params;
  const entry = getCareerDepartmentBySlug(departmentSlug);

  if (!entry) {
    notFound();
  }

  const roleEntries = getCareerRoleEntries().filter((roleEntry) => roleEntry.departmentSlug === departmentSlug);

  return <CareerDepartmentPageClient department={entry.department} mode={entry.mode} roleEntries={roleEntries} />;
}
