import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import CareerDepartmentPageClient from '@/components/careers/CareerDepartmentPageClient';
import CareersBrowsePageClient from '@/components/careers/CareersBrowsePageClient';
import {
  buildCareerRoleEntries,
  CAREERS_MODES,
  findCareerGroupBySlug,
  getCareerGroupSlug,
  getCollapsedSubDepartment,
  isCollapsedGroup,
  parseCareerModeSlug,
} from '@/data/careersDepartments';
import { fetchCareersOrFallback, getCareerGroupBySlugs, loadCareers } from '@/data/careers.server';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';

interface Props {
  params: Promise<{ mode: string; groupSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mode: modeSlug, groupSlug } = await params;
  const hit = await getCareerGroupBySlugs(modeSlug, groupSlug);
  if (!hit) return { title: 'Not Found | Digitally Next Careers' };

  return buildMetadata({
    title: `${hit.group.code} - ${hit.group.title} | Digitally Next Careers`,
    description: `Departments inside ${hit.group.code} (${hit.group.title}) at Digitally Next. Pick a department to explore the open roles inside it.`,
    path: `/careers/${modeSlug}/${groupSlug}`,
  });
}

export async function generateStaticParams() {
  // Never fail the build over a careers outage - unlisted params still render
  // on demand.
  const params: { mode: string; groupSlug: string }[] = [];
  for (const mode of CAREERS_MODES) {
    for (const group of await fetchCareersOrFallback(mode)) {
      params.push({ mode, groupSlug: getCareerGroupSlug(group) });
    }
  }
  return params;
}

export default async function CareersGroupPage({ params }: Props) {
  const { mode: modeSlug, groupSlug } = await params;
  const mode = parseCareerModeSlug(modeSlug);
  if (!mode) notFound();

  // Falls back to the snapshot on an outage, so a 404 here means the group is
  // genuinely gone rather than temporarily unreachable.
  const { groups } = await loadCareers(mode);
  const group = findCareerGroupBySlug(groups, groupSlug);
  if (!group) notFound();

  const path = `/careers/${modeSlug}/${groupSlug}`;
  const modeLabel = mode === 'internship' ? 'Internships' : 'Full-Time Positions';

  // ── Collapsed group (1 sub-dept) - render the dept's role list directly ──
  // No separate "pick a department" card view; the URL collapses too.
  const collapsedDept = isCollapsedGroup(group) ? getCollapsedSubDepartment(group) : null;
  if (collapsedDept) {
    const roleEntries = buildCareerRoleEntries([group], mode).filter((e) => e.department.id === collapsedDept.id);

    return (
      <>
        <Script id={`ld-careers-${modeSlug}-${groupSlug}`} type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(
            webPageJsonLd({
              title: `${group.code} - ${group.title} | Digitally Next Careers`,
              description: `Open roles in ${group.title} at Digitally Next.`,
              path,
            })
          )}
        </Script>
        <CareerDepartmentPageClient department={collapsedDept} mode={mode} group={group} roleEntries={roleEntries} />
      </>
    );
  }

  // ── Multi-dept group - show sub-department cards ────────────────────────
  // (A group with zero published sub-departments also lands here and renders
  // the empty state.)
  const allGroupsForMode = groups;
  return (
    <>
      <Script id={`ld-careers-${modeSlug}-${groupSlug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          webPageJsonLd({
            title: `${group.code} - ${group.title} | Digitally Next Careers`,
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
          { label: `${group.code} - ${group.title}` },
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
        emptyMessage={`No open roles in ${group.code} right now.`}
      />
    </>
  );
}
