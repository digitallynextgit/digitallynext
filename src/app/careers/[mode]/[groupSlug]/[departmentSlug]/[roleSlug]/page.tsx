import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import CareerRolePageClient from '@/components/careers/CareerRolePageClient';
import {
  CAREERS_DEPARTMENT_GROUPS,
  CAREERS_INTERNSHIP_GROUPS,
  getCareerDepartmentSlug,
  getCareerGroupSlug,
  getCareerRoleBySlugsFull,
  getCareerRoleSlug,
  isCollapsedGroup,
} from '@/data/careersDepartments';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';

interface Props {
  params: Promise<{ mode: string; groupSlug: string; departmentSlug: string; roleSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mode: modeSlug, groupSlug, departmentSlug, roleSlug } = await params;
  const hit = getCareerRoleBySlugsFull(modeSlug, groupSlug, departmentSlug, roleSlug);
  if (!hit) return { title: 'Role Not Found | Digitally Next Careers' };

  return buildMetadata({
    title: `${hit.role.title} | Digitally Next Careers`,
    description: hit.role.description?.intro ?? `Apply for ${hit.role.title} at Digitally Next.`,
    path: `/careers/${modeSlug}/${groupSlug}/${departmentSlug}/${roleSlug}`,
  });
}

export function generateStaticParams() {
  // Only non-collapsed groups have a 4-segment role URL. Collapsed groups
  // (Internships, AMG, HR) put the role at /careers/<mode>/<group>/<role>
  // which is handled by the [departmentSlug] route instead.
  const params: { mode: string; groupSlug: string; departmentSlug: string; roleSlug: string }[] = [];
  for (const group of CAREERS_DEPARTMENT_GROUPS) {
    if (isCollapsedGroup(group)) continue;
    for (const dept of group.subDepartments) {
      for (const role of dept.roles) {
        params.push({
          mode: 'full-time',
          groupSlug: getCareerGroupSlug(group),
          departmentSlug: getCareerDepartmentSlug(dept),
          roleSlug: getCareerRoleSlug(role),
        });
      }
    }
  }
  for (const group of CAREERS_INTERNSHIP_GROUPS) {
    if (isCollapsedGroup(group)) continue;
    for (const dept of group.subDepartments) {
      for (const role of dept.roles) {
        params.push({
          mode: 'internship',
          groupSlug: getCareerGroupSlug(group),
          departmentSlug: getCareerDepartmentSlug(dept),
          roleSlug: getCareerRoleSlug(role),
        });
      }
    }
  }
  return params;
}

export default async function CareerRolePage({ params }: Props) {
  const { mode: modeSlug, groupSlug, departmentSlug, roleSlug } = await params;
  const hit = getCareerRoleBySlugsFull(modeSlug, groupSlug, departmentSlug, roleSlug);
  if (!hit) notFound();

  // Reconstruct the CareerRoleEntry shape the existing client expects
  const entry = {
    group: hit.group,
    department: hit.department,
    role: hit.role,
    mode: hit.mode,
    groupSlug,
    departmentSlug,
    roleSlug,
  };

  const path = `/careers/${modeSlug}/${groupSlug}/${departmentSlug}/${roleSlug}`;

  return (
    <>
      <Script id={`ld-role-${groupSlug}-${departmentSlug}-${roleSlug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          webPageJsonLd({
            title: `${hit.role.title} | Digitally Next Careers`,
            description: hit.role.description?.intro ?? `Apply for ${hit.role.title} at Digitally Next.`,
            path,
          })
        )}
      </Script>
      <CareerRolePageClient entry={entry} />
    </>
  );
}
