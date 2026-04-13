'use client';

import Link from 'next/link';
import {
  type CareersDepartment,
  type CareersMode,
  getCareerRoleHref,
  type CareerRoleEntry,
} from '@/data/careersDepartments';

interface CareerDepartmentPageClientProps {
  department: CareersDepartment;
  mode: CareersMode;
  roleEntries: CareerRoleEntry[];
}

export default function CareerDepartmentPageClient({ department, mode, roleEntries }: CareerDepartmentPageClientProps) {
  return (
    <main className="bg-[#FAFAFA]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-20 md:px-8 md:py-28 lg:gap-10 lg:px-10 lg:py-36">
        <div className="flex flex-col gap-4">
          <Link
            href="/careers#open-positions"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-black/60 transition-colors hover:text-[#E21F26]"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Careers</span>
          </Link>

          <div className="rounded border border-[#E5E5E5] bg-white px-7 py-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <div className="flex max-w-4xl flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#FDF2F2] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#E21F26]">
                  {mode === 'internship' ? 'Internship' : 'Full-time'}
                </span>
                <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/60">
                  {department.roles.length} {department.roles.length === 1 ? 'Role' : 'Roles'}
                </span>
              </div>

              <div>
                <h1 className="text-[clamp(30px,5vw,56px)] font-extrabold leading-[1.05] tracking-tight text-black">
                  {department.title}
                </h1>
                <p className="mt-4 max-w-3xl text-[15px] leading-[1.85] text-black/70">
                  Select a role to open the full job page and submit your application.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="rounded border border-[#E5E5E5] bg-white px-7 py-7"> */}
        <div className="flex flex-col gap-3">
          {roleEntries.map((entry) => (
            <Link
              key={entry.roleSlug}
              href={getCareerRoleHref(entry)}
              className={[
                'flex w-full items-center justify-between rounded px-7 py-5 text-left transition-all duration-200 cursor-pointer',
                'bg-[rgba(226,31,38,0.04)] hover:bg-[rgba(226,31,38,0.09)]',
                'focus:outline-none focus:ring-2 focus:ring-black/20',
              ].join(' ')}
            >
              <div className="flex flex-col gap-1.5">
                <div
                  className="font-medium text-black"
                  style={{
                    fontSize: 'clamp(18px, 2.8vw, 36px)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.15,
                  }}
                >
                  {entry.role.title}
                </div>
                {entry.role.meta && (
                  <div className="text-sm font-normal capitalize text-black/55">{entry.role.meta}</div>
                )}
              </div>

              <div className="ml-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5 text-black/40 transition-all">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
        {/* </div> */}
      </section>
    </main>
  );
}
