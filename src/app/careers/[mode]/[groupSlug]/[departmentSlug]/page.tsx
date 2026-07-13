import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import CareerDepartmentPageClient from '@/components/careers/CareerDepartmentPageClient';
import CareerRolePageClient from '@/components/careers/CareerRolePageClient';
import {
  CAREERS_DEPARTMENT_GROUPS,
  CAREERS_INTERNSHIP_GROUPS,
  getCareerDepartmentBySlugs,
  getCareerDepartmentSlug,
  getCareerGroupBySlugs,
  getCareerGroupSlug,
  getCareerRoleEntries,
  getCareerRoleSlug,
  getCollapsedSubDepartment,
  isCollapsedGroup,
} from '@/data/careersDepartments';
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

  const groupHit = getCareerGroupBySlugs(modeSlug, groupSlug);
  if (!groupHit) return { title: 'Not Found | Digitally Next Careers' };

  if (isCollapsedGroup(groupHit.group)) {
    const dept = getCollapsedSubDepartment(groupHit.group);
    const role = dept.roles.find((r) => getCareerRoleSlug(r) === departmentSlug);
    if (!role) return { title: 'Role Not Found | Digitally Next Careers' };
    return buildMetadata({
      title: `${role.title} | Digitally Next Careers`,
      description: role.description?.intro ?? `Apply for ${role.title} at Digitally Next.`,
      path,
    });
  }

  const deptHit = getCareerDepartmentBySlugs(modeSlug, groupSlug, departmentSlug);
  if (!deptHit) return { title: 'Department Not Found | Digitally Next Careers' };
  return buildMetadata({
    title: `${deptHit.department.title} | Digitally Next Careers`,
    description: `Explore roles in ${deptHit.department.title} at Digitally Next.`,
    path,
  });
}

export function generateStaticParams() {
  const params: { mode: string; groupSlug: string; departmentSlug: string }[] = [];
  const pushAll = (groups: typeof CAREERS_DEPARTMENT_GROUPS, mode: 'full-time' | 'internship') => {
    for (const group of groups) {
      const groupSlug = getCareerGroupSlug(group);
      if (isCollapsedGroup(group)) {
        // For collapsed groups, the [departmentSlug] segment is actually a role
        // slug - pre-render one entry per role in the single sub-dept.
        const dept = getCollapsedSubDepartment(group);
        for (const role of dept.roles) {
          params.push({ mode, groupSlug, departmentSlug: getCareerRoleSlug(role) });
        }
      } else {
        // For multi-dept groups, the segment is a real department slug.
        for (const dept of group.subDepartments) {
          params.push({ mode, groupSlug, departmentSlug: getCareerDepartmentSlug(dept) });
        }
      }
    }
  };
  pushAll(CAREERS_DEPARTMENT_GROUPS, 'full-time');
  pushAll(CAREERS_INTERNSHIP_GROUPS, 'internship');
  return params;
}

export default async function CareerDepartmentOrRolePage({ params }: Props) {
  const { mode: modeSlug, groupSlug, departmentSlug } = await params;
  const path = `/careers/${modeSlug}/${groupSlug}/${departmentSlug}`;

  const groupHit = getCareerGroupBySlugs(modeSlug, groupSlug);
  if (!groupHit) notFound();

  // ── Collapsed group: this slug is a role slug → render role detail ──────
  if (isCollapsedGroup(groupHit.group)) {
    const dept = getCollapsedSubDepartment(groupHit.group);
    const role = dept.roles.find((r) => getCareerRoleSlug(r) === departmentSlug);
    if (!role) notFound();

    const entry = {
      group: groupHit.group,
      department: dept,
      role,
      mode: groupHit.mode,
      groupSlug,
      departmentSlug: getCareerDepartmentSlug(dept),
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
  const deptHit = getCareerDepartmentBySlugs(modeSlug, groupSlug, departmentSlug);
  if (!deptHit) notFound();

  const roleEntries = getCareerRoleEntries().filter(
    (entry) => entry.mode === deptHit.mode && entry.groupSlug === groupSlug && entry.departmentSlug === departmentSlug
  );

  return (
    <>
      <Script id={`ld-dept-${groupSlug}-${departmentSlug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          webPageJsonLd({
            title: `${deptHit.department.title} | Digitally Next Careers`,
            description: `Explore roles in ${deptHit.department.title} at Digitally Next.`,
            path,
          })
        )}
      </Script>
      <CareerDepartmentPageClient
        department={deptHit.department}
        mode={deptHit.mode}
        group={deptHit.group}
        roleEntries={roleEntries}
      />
    </>
  );
}
