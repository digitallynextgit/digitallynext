import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import CareerRolePageClient from '@/components/careers/CareerRolePageClient';
import {
  CAREERS_MODES,
  findCareerDepartmentBySlug,
  findCareerGroupBySlug,
  findCareerRoleBySlug,
  getCareerDepartmentSlug,
  getCareerGroupSlug,
  getCareerRoleSlug,
  isCollapsedGroup,
  parseCareerModeSlug,
} from '@/data/careersDepartments';
import { fetchCareersOrFallback, getCareerRoleBySlugsFull, loadCareers } from '@/data/careers.server';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';

interface Props {
  params: Promise<{ mode: string; groupSlug: string; departmentSlug: string; roleSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mode: modeSlug, groupSlug, departmentSlug, roleSlug } = await params;
  const hit = await getCareerRoleBySlugsFull(modeSlug, groupSlug, departmentSlug, roleSlug);
  if (!hit) return { title: 'Role Not Found | Digitally Next Careers' };

  return buildMetadata({
    title: `${hit.role.title} | Digitally Next Careers`,
    description: hit.role.description?.intro ?? `Apply for ${hit.role.title} at Digitally Next.`,
    path: `/careers/${modeSlug}/${groupSlug}/${departmentSlug}/${roleSlug}`,
  });
}

export async function generateStaticParams() {
  // Only non-collapsed groups have a 4-segment role URL. Collapsed groups
  // (currently Internships, AMG, HR) put the role at /careers/<mode>/<group>/<role>
  // which is handled by the [departmentSlug] route instead.
  const params: { mode: string; groupSlug: string; departmentSlug: string; roleSlug: string }[] = [];
  for (const mode of CAREERS_MODES) {
    for (const group of await fetchCareersOrFallback(mode)) {
      if (isCollapsedGroup(group)) continue;
      for (const dept of group.subDepartments) {
        for (const role of dept.roles) {
          params.push({
            mode,
            groupSlug: getCareerGroupSlug(group),
            departmentSlug: getCareerDepartmentSlug(dept),
            roleSlug: getCareerRoleSlug(role),
          });
        }
      }
    }
  }
  return params;
}

export default async function CareerRolePage({ params }: Props) {
  const { mode: modeSlug, groupSlug, departmentSlug, roleSlug } = await params;
  const mode = parseCareerModeSlug(modeSlug);
  if (!mode) notFound();

  const { groups } = await loadCareers(mode);
  const group = findCareerGroupBySlug(groups, groupSlug);
  const department = group && findCareerDepartmentBySlug(group, departmentSlug);
  const role = department && findCareerRoleBySlug(department, roleSlug);
  if (!group || !department || !role) notFound();

  // Reconstruct the CareerRoleEntry shape the existing client expects
  const entry = { group, department, role, mode, groupSlug, departmentSlug, roleSlug };

  const path = `/careers/${modeSlug}/${groupSlug}/${departmentSlug}/${roleSlug}`;

  return (
    <>
      <Script
        id={`ld-role-${groupSlug}-${departmentSlug}-${roleSlug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(
          webPageJsonLd({
            title: `${role.title} | Digitally Next Careers`,
            description: role.description?.intro ?? `Apply for ${role.title} at Digitally Next.`,
            path,
          })
        )}
      </Script>
      <CareerRolePageClient entry={entry} />
    </>
  );
}
