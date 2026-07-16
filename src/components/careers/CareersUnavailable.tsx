'use client';

import Link from 'next/link';

interface CareersUnavailableProps {
  /** Wire up a retry button. Omitted on server-rendered pages, where the only
   *  meaningful retry is a fresh request. */
  reset?: () => void;
  /** Where "back" goes. Defaults to the careers landing page. */
  backHref?: string;
  backLabel?: string;
}

/**
 * Shown when the DNMS HRMS can't be reached.
 *
 * Deliberately distinct from the "No open roles right now" empty state: telling
 * a candidate there are no jobs when the system is simply down would cost us a
 * real application.
 */
export default function CareersUnavailable({
  reset,
  backHref = '/careers',
  backLabel = 'Back to Careers',
}: CareersUnavailableProps) {
  return (
    <main className="bg-[#FAFAFA]">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 px-6 pt-32 pb-28 text-center md:pt-36 md:pb-36">
        <h1 className="text-[clamp(26px,4vw,40px)] font-extrabold leading-[1.1] tracking-tight text-black">
          We couldn&apos;t load our open roles
        </h1>
        <p className="max-w-xl text-[15px] leading-[1.85] text-black/70">
          This one is on us, not on you - our roles are served from a system that isn&apos;t responding right now. It
          doesn&apos;t mean we&apos;re not hiring. Please try again in a moment.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {reset && (
            <button
              onClick={reset}
              className="rounded-full bg-[#E21F26] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#c41a20] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21F26] focus-visible:ring-offset-2"
            >
              Try again
            </button>
          )}
          <Link
            href={backHref}
            className="rounded-full border border-[#D8D8D8] bg-white px-6 py-2.5 text-sm font-semibold text-black/70 transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/25"
          >
            {backLabel}
          </Link>
        </div>
        <p className="mt-2 text-sm text-black/50">
          In a hurry? Send your CV to{' '}
          <a href="mailto:careers@digitallynext.com" className="font-semibold text-[#E21F26] hover:underline">
            careers@digitallynext.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
