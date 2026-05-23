import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import CareerRolePageClient from '@/components/careers/CareerRolePageClient';
import { getCareerRoleBySlugs, getCareerRoleEntries } from '@/data/careersDepartments';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';

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

  return buildMetadata({
    title: `${entry.role.title} | Digitally Next Careers`,
    description: entry.role.description?.intro ?? `Apply for ${entry.role.title} at Digitally Next.`,
    path: `/careers/${departmentSlug}/${roleSlug}`,
  });
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

  return (
    <>
      <Script id={`ld-role-${departmentSlug}-${roleSlug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          webPageJsonLd({
            title: `${entry.role.title} | Digitally Next Careers`,
            description: entry.role.description?.intro ?? `Apply for ${entry.role.title} at Digitally Next.`,
            path: `/careers/${departmentSlug}/${roleSlug}`,
          })
        )}
      </Script>
      <CareerRolePageClient entry={entry} />
    </>
  );
}
