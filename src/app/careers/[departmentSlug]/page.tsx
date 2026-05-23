import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import CareerDepartmentPageClient from '@/components/careers/CareerDepartmentPageClient';
import { getCareerDepartmentBySlug, getCareerDepartmentEntries, getCareerRoleEntries } from '@/data/careersDepartments';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';

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

  return buildMetadata({
    title: `${entry.department.title} | Digitally Next Careers`,
    description: `Explore roles in ${entry.department.title} at Digitally Next.`,
    path: `/careers/${departmentSlug}`,
  });
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

  return (
    <>
      <Script id={`ld-dept-${departmentSlug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          webPageJsonLd({
            title: `${entry.department.title} | Digitally Next Careers`,
            description: `Explore roles in ${entry.department.title} at Digitally Next.`,
            path: `/careers/${departmentSlug}`,
          })
        )}
      </Script>
      <CareerDepartmentPageClient department={entry.department} mode={entry.mode} roleEntries={roleEntries} />
    </>
  );
}
