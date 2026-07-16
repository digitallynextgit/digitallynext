import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import CareerDepartmentPageClient from '@/components/careers/CareerDepartmentPageClient';
import CareerRolePageClient from '@/components/careers/CareerRolePageClient';
import {
  buildCareerRoleEntries,
  CAREERS_MODES,
  findCareerDepartmentBySlug,
  findCareerGroupBySlug,
  findCareerRoleBySlug,
  getCareerDepartmentSlug,
  getCareerGroupSlug,
  getCareerRoleSlug,
  getCollapsedSubDepartment,
  isCollapsedGroup,
  parseCareerModeSlug,
} from '@/data/careersDepartments';
import {
  fetchCareersOrFallback,
  getCareerDepartmentBySlugs,
  getCareerGroupBySlugs,
  loadCareers,
} from '@/data/careers.server';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';

interface Props {
  params: Promise<{ mode: string; groupSlug: string; departmentSlug: string }>;
}

/**
 * Dual-purpose route. The same URL shape (/careers/<mode>/<group>/<x>) handles:
 *   - non-collapsed groups: <x> is a department slug → render dept's role list
 *   - collapsed groups:     <x> is a role slug      → render role detail
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mode: modeSlug, groupSlug, departmentSlug } = await params;
  const path = `/careers/${modeSlug}/${groupSlug}/${departmentSlug}`;

  const groupHit = await getCareerGroupBySlugs(modeSlug, groupSlug);
  if (!groupHit) return { title: 'Not Found | Digitally Next Careers' };

  const collapsedDept = isCollapsedGroup(groupHit.group) ? getCollapsedSubDepartment(groupHit.group) : null;
  if (collapsedDept) {
    const role = findCareerRoleBySlug(collapsedDept, departmentSlug);
    if (!role) return { title: 'Role Not Found | Digitally Next Careers' };
    return buildMetadata({
      title: `${role.title} | Digitally Next Careers`,
      description: role.description?.intro ?? `Apply for ${role.title} at Digitally Next.`,
      path,
    });
  }

  const deptHit = await getCareerDepartmentBySlugs(modeSlug, groupSlug, departmentSlug);
  if (!deptHit) return { title: 'Department Not Found | Digitally Next Careers' };
  return buildMetadata({
    title: `${deptHit.department.title} | Digitally Next Careers`,
    description: `Explore roles in ${deptHit.department.title} at Digitally Next.`,
    path,
  });
}

export async function generateStaticParams() {
  const params: { mode: string; groupSlug: string; departmentSlug: string }[] = [];
  for (const mode of CAREERS_MODES) {
    for (const group of await fetchCareersOrFallback(mode)) {
      const groupSlug = getCareerGroupSlug(group);
      const collapsedDept = isCollapsedGroup(group) ? getCollapsedSubDepartment(group) : null;
      if (collapsedDept) {
        // For collapsed groups, the [departmentSlug] segment is actually a role
        // slug - pre-render one entry per role in the single sub-dept.
        for (const role of collapsedDept.roles) {
          params.push({ mode, groupSlug, departmentSlug: getCareerRoleSlug(role) });
        }
      } else {
        // For multi-dept groups, the segment is a real department slug.
        for (const dept of group.subDepartments) {
          params.push({ mode, groupSlug, departmentSlug: getCareerDepartmentSlug(dept) });
        }
      }
    }
  }
  return params;
}

export default async function CareerDepartmentOrRolePage({ params }: Props) {
  const { mode: modeSlug, groupSlug, departmentSlug } = await params;
  const path = `/careers/${modeSlug}/${groupSlug}/${departmentSlug}`;

  const mode = parseCareerModeSlug(modeSlug);
  if (!mode) notFound();

  const { groups } = await loadCareers(mode);
  const group = findCareerGroupBySlug(groups, groupSlug);
  if (!group) notFound();

  // ── Collapsed group: this slug is a role slug → render role detail ──────
  const collapsedDept = isCollapsedGroup(group) ? getCollapsedSubDepartment(group) : null;
  if (collapsedDept) {
    const role = findCareerRoleBySlug(collapsedDept, departmentSlug);
    if (!role) notFound();

    const entry = {
      group,
      department: collapsedDept,
      role,
      mode,
      groupSlug,
      departmentSlug: getCareerDepartmentSlug(collapsedDept),
      roleSlug: getCareerRoleSlug(role),
    };

    return (
      <>
        <Script
          id={`ld-role-${modeSlug}-${groupSlug}-${departmentSlug}`}
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

  // ── Multi-dept group: this slug is a department slug → render dept page ─
  const department = findCareerDepartmentBySlug(group, departmentSlug);
  if (!department) notFound();

  const roleEntries = buildCareerRoleEntries([group], mode).filter((entry) => entry.departmentSlug === departmentSlug);

  return (
    <>
      <Script id={`ld-dept-${groupSlug}-${departmentSlug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          webPageJsonLd({
            title: `${department.title} | Digitally Next Careers`,
            description: `Explore roles in ${department.title} at Digitally Next.`,
            path,
          })
        )}
      </Script>
      <CareerDepartmentPageClient department={department} mode={mode} group={group} roleEntries={roleEntries} />
    </>
  );
}
