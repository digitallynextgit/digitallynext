'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import PositionSearchBar from '@/components/careers/PositionSearchBar';
import {
  type CareersDepartment,
  type CareersDepartmentGroup,
  type CareersMode,
  type CareersTone,
  getCareerGroupHref,
  getCareerDepartmentHref,
} from '@/data/careersDepartments';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

type CardConfig =
  | { kind: 'group'; group: CareersDepartmentGroup; mode: CareersMode }
  | { kind: 'subDepartment'; department: CareersDepartment; group: CareersDepartmentGroup; mode: CareersMode };

interface CareersBrowsePageClientProps {
  title: string;
  /** Sub-heading shown under the title. */
  subtitle: string;
  /** Breadcrumb trail (last item is the current page, no href). */
  breadcrumbs: BreadcrumbItem[];
  /** Optional back button shown above the title. */
  backLink?: { href: string; label: string };
  /** Groups to feed the search bar (all groups for the current mode). */
  searchGroups: CareersDepartmentGroup[];
  /** Mode (drives URL building for search results). */
  mode: CareersMode;
  /** Cards rendered in the grid. */
  cards: CardConfig[];
}

function toneClasses(tone: CareersTone) {
  if (tone === 'red') {
    return {
      bg: 'bg-[#FDF2F2]',
      bgHover: 'hover:bg-[#fae8e8]',
      text: 'text-[#E21F26]',
      ring: 'ring-[#E21F26]',
    };
  }
  return {
    bg: 'bg-[#F1FBFB]',
    bgHover: 'hover:bg-[#e3f7f7]',
    text: 'text-[#16B8B8]',
    ring: 'ring-[#16B8B8]',
  };
}

export default function CareersBrowsePageClient({
  title,
  subtitle,
  breadcrumbs,
  backLink,
  searchGroups,
  mode,
  cards,
}: CareersBrowsePageClientProps) {
  const router = useRouter();

  return (
    <main className="bg-[#FAFAFA]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pt-32 md:pt-36 pb-20 md:px-8 md:pb-28 lg:gap-10 lg:px-10 lg:pb-36">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-xs font-semibold tracking-wide text-black/50">
          <ol className="flex flex-wrap items-center gap-1.5">
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return (
                <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                  {crumb.href && !isLast ? (
                    <Link href={crumb.href} className="hover:text-black transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? 'text-black' : ''}>{crumb.label}</span>
                  )}
                  {!isLast && (
                    <span aria-hidden="true" className="text-black/30">
                      /
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Header block */}
        <div className="flex flex-col gap-4">
          {backLink && (
            <Link
              href={backLink.href}
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#E21F26] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#c41a20] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21F26] focus-visible:ring-offset-2"
            >
              <ChevronLeft
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              {backLink.label}
            </Link>
          )}
          <div className="rounded border border-[#E5E5E5] bg-white px-7 py-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <div className="flex max-w-4xl flex-col gap-4">
              <h1 className="text-[clamp(30px,5vw,56px)] font-extrabold leading-[1.05] tracking-tight text-black">
                {title}
              </h1>
              <p className="max-w-3xl text-[15px] leading-[1.85] text-black/70">{subtitle}</p>
            </div>
          </div>
        </div>

        {/* Search bar — same component used inside the old modal, now on the page */}
        <div className="w-full">
          <PositionSearchBar groups={searchGroups} mode={mode} onSelectPosition={(href) => router.push(href)} />
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            if (card.kind === 'group') {
              const tone = toneClasses(card.group.tone);
              const href = getCareerGroupHref(card.group, card.mode);
              const subCount = card.group.subDepartments.length;
              return (
                <Link
                  key={card.group.id}
                  href={href}
                  className={[
                    'group flex min-h-41 flex-col justify-between rounded p-6 text-left transition-all duration-200 cursor-pointer md:min-h-75',
                    tone.bg,
                    tone.bgHover,
                    `hover:ring-1 ${tone.ring}`,
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black/25',
                  ].join(' ')}
                >
                  <div className="flex flex-col gap-1.5">
                    <div className={['text-xs font-bold uppercase tracking-[0.16em] opacity-70', tone.text].join(' ')}>
                      {card.group.code}
                    </div>
                    <div
                      className={[
                        'text-[clamp(18px,2.2vw,28px)] font-extrabold leading-[1.1] tracking-tight',
                        tone.text,
                      ].join(' ')}
                    >
                      {card.group.title}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-black/60">
                    {subCount === 1 ? card.group.jobsLabel : `${card.group.jobsLabel} · ${subCount} departments`}
                  </div>
                </Link>
              );
            }

            // sub-department card
            const tone = toneClasses(card.department.tone);
            const href = getCareerDepartmentHref(card.department, card.group, card.mode);
            const roleCount = card.department.roles.length;
            return (
              <Link
                key={card.department.id}
                href={href}
                className={[
                  'group flex min-h-41 flex-col justify-between rounded p-6 text-left transition-all duration-200 cursor-pointer md:min-h-75',
                  tone.bg,
                  tone.bgHover,
                  `hover:ring-1 ${tone.ring}`,
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-black/25',
                ].join(' ')}
              >
                <div
                  className={[
                    'text-[clamp(18px,2.2vw,28px)] font-extrabold leading-[1.1] tracking-tight',
                    tone.text,
                  ].join(' ')}
                >
                  {card.department.title}
                </div>
                <div className="text-sm font-semibold text-black/60">
                  {card.department.jobsLabel} · {roleCount} {roleCount === 1 ? 'role' : 'roles'}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
