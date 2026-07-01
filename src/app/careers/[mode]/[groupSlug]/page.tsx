import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import CareerDepartmentPageClient from '@/components/careers/CareerDepartmentPageClient';
import CareersBrowsePageClient from '@/components/careers/CareersBrowsePageClient';
import {
  CAREERS_DEPARTMENT_GROUPS,
  CAREERS_INTERNSHIP_GROUPS,
  getCareerGroupBySlugs,
  getCareerGroupSlug,
  getCareerRoleEntries,
  getCollapsedSubDepartment,
  getGroupsForMode,
  isCollapsedGroup,
} from '@/data/careersDepartments';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';

interface Props {
  params: Promise<{ mode: string; groupSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mode: modeSlug, groupSlug } = await params;
  const hit = getCareerGroupBySlugs(modeSlug, groupSlug);
  if (!hit) return { title: 'Not Found | Digitally Next Careers' };

  return buildMetadata({
    title: `${hit.group.code} — ${hit.group.title} | Digitally Next Careers`,
    description: `Departments inside ${hit.group.code} (${hit.group.title}) at Digitally Next. Pick a department to explore the open roles inside it.`,
    path: `/careers/${modeSlug}/${groupSlug}`,
  });
}

export function generateStaticParams() {
  const params: { mode: string; groupSlug: string }[] = [];
  for (const group of CAREERS_DEPARTMENT_GROUPS) {
    params.push({ mode: 'full-time', groupSlug: getCareerGroupSlug(group) });
  }
  for (const group of CAREERS_INTERNSHIP_GROUPS) {
    params.push({ mode: 'internship', groupSlug: getCareerGroupSlug(group) });
  }
  return params;
}

export default async function CareersGroupPage({ params }: Props) {
  const { mode: modeSlug, groupSlug } = await params;
  const hit = getCareerGroupBySlugs(modeSlug, groupSlug);
  if (!hit) notFound();

  const { group, mode } = hit;
  const path = `/careers/${modeSlug}/${groupSlug}`;
  const modeLabel = mode === 'internship' ? 'Internships' : 'Full-Time Positions';

  // ── Collapsed group (1 sub-dept) — render the dept's role list directly ──
  // No separate "pick a department" card view; the URL collapses too.
  if (isCollapsedGroup(group)) {
    const dept = getCollapsedSubDepartment(group);
    const roleEntries = getCareerRoleEntries().filter(
      (e) => e.mode === mode && e.group.id === group.id && e.department.id === dept.id
    );

    return (
      <>
        <Script id={`ld-careers-${modeSlug}-${groupSlug}`} type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(
            webPageJsonLd({
              title: `${group.code} — ${group.title} | Digitally Next Careers`,
              description: `Open roles in ${group.title} at Digitally Next.`,
              path,
            })
          )}
        </Script>
        <CareerDepartmentPageClient department={dept} mode={mode} group={group} roleEntries={roleEntries} />
      </>
    );
  }

  // ── Multi-dept group — show sub-department cards ────────────────────────
  const allGroupsForMode = getGroupsForMode(mode);
  return (
    <>
      <Script id={`ld-careers-${modeSlug}-${groupSlug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          webPageJsonLd({
            title: `${group.code} — ${group.title} | Digitally Next Careers`,
            description: `Departments inside ${group.code} (${group.title}) at Digitally Next.`,
            path,
          })
        )}
      </Script>
      <CareersBrowsePageClient
        title={group.title}
        subtitle={`${group.code} · pick a department to explore the open roles inside it.`}
        breadcrumbs={[
          { label: 'Careers', href: '/careers' },
          { label: modeLabel, href: `/careers/${modeSlug}` },
          { label: `${group.code} — ${group.title}` },
        ]}
        backLink={{ href: `/careers/${modeSlug}`, label: `Back to ${modeLabel}` }}
        searchGroups={allGroupsForMode}
        mode={mode}
        cards={group.subDepartments.map((department) => ({
          kind: 'subDepartment',
          department,
          group,
          mode,
        }))}
      />
    </>
  );
}
