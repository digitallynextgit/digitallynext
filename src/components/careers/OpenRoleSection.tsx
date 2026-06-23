'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSectionTheme } from '@/context/SectionThemeContext';

interface OpenRolesSectionProps {
  theme?: 'dark' | 'light';
}

const CARDS = [
  {
    title: 'Full-Time Positions',
    desc: 'Join a team that values clarity, ownership, and craft. Roles across strategy, digital, data, and AI.',
    linkLabel: 'Full-Time Roles',
    href: '/careers/full-time',
  },
  {
    title: 'Internships',
    desc: 'Start with real work, real mentorship, and real expectations. Our internships are structured to build, not busy-work.',
    linkLabel: 'Internship Roles',
    href: '/careers/internship',
  },
] as const;

export default function OpenRolesSection({ theme }: OpenRolesSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === 'dark';

  return (
    <section
      id="open-positions"
      className={['w-full transition-colors duration-700', isDark ? 'bg-black' : 'bg-[#FAFAFA]'].join(' ')}
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col gap-8 md:gap-10">
          {/* Top row - heading + tagline */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
            <div className="flex flex-col gap-4">
              <h2
                className={[
                  'font-normal leading-[1.15] transition-colors duration-700',
                  isDark ? 'text-white' : 'text-black',
                ].join(' ')}
                style={{ fontSize: 'clamp(1.75rem, 4vw, 47px)' }}
              >
                Open Roles<span className="text-[#E21F26]">.</span>
              </h2>
              <p
                className={[
                  'font-light text-[16px] leading-relaxed transition-colors duration-700',
                  isDark ? 'text-[#737373]' : 'text-[#A1A1A1]',
                ].join(' ')}
              >
                <span className="block">If this feels like your kind of place,</span>
                <span className="block">start here:</span>
              </p>
            </div>

            <div
              className={[
                'text-[14px] font-bold leading-snug transition-colors duration-700 shrink-0',
                isDark ? 'text-white' : 'text-black',
              ].join(' ')}
            >
              No hype. Just an{' '}
              <span className="text-[#E21F26] uppercase text-2xl sm:text-3xl block">honest start.</span>
            </div>
          </div>

          {/* Cards — now direct Links to the new mode landing pages */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {CARDS.map(({ title, desc, linkLabel, href }, index) => (
              <Link
                key={title}
                href={href}
                className={[
                  'group flex flex-col gap-4 p-8 sm:p-10 transition-colors duration-700',
                  isDark
                    ? 'bg-[#111111] border border-[#2a2a2a] hover:border-[#E21F26]'
                    : 'bg-white border border-[#E5E5E5] hover:border-[#E21F26]',
                  index === 1 ? 'border-t-0 md:border-t md:border-l-0' : '',
                ].join(' ')}
              >
                <div
                  className={[
                    'text-[26px] sm:text-[32px] font-normal leading-tight transition-colors duration-700',
                    isDark ? 'text-white' : 'text-[#0A0A0A]',
                  ].join(' ')}
                >
                  {title}
                </div>
                <p
                  className={[
                    'text-[15px] font-light leading-relaxed transition-colors duration-700',
                    isDark ? 'text-[#737373]' : 'text-[#A1A1A1]',
                  ].join(' ')}
                >
                  {desc}
                </p>
                <span
                  className={[
                    'mt-2 inline-flex items-center gap-3 w-fit',
                    'text-[14px] font-normal transition-colors duration-300',
                    isDark ? 'text-white' : 'text-black',
                  ].join(' ')}
                >
                  <Image
                    src="/figma/careers/careers-arrow-link.svg"
                    alt=""
                    width={19}
                    height={10}
                    style={{ width: 'auto', height: 'auto' }}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                  <span className="group-hover:text-[#E21F26] transition-colors duration-300">{linkLabel}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* CV section */}
          <div className="flex flex-col items-center gap-4 pt-2">
            <p
              className={[
                'text-[16px] font-normal leading-snug text-center transition-colors duration-700',
                isDark ? 'text-white' : 'text-black',
              ].join(' ')}
            >
              Or send us your CV at
            </p>
            <Link
              href="mailto:careers@digitallynext.com"
              className={[
                'inline-flex items-center justify-center rounded border',
                'px-8 py-2 text-[15px] font-normal leading-snug',
                'transition-colors duration-300',
                isDark
                  ? 'border-white/40 text-white hover:text-[#E21F26] hover:border-[#E21F26] hover:bg-[#E21F26]'
                  : 'border-[#787878] text-[#E21F26] hover:border-[#E21F26] hover:bg-[#E21F26] hover:text-white',
              ].join(' ')}
            >
              careers@digitallynext.com
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
