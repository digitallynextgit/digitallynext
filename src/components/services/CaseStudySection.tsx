'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ServiceSection, ServiceTheme } from '@/data/services';
import { useSectionTheme } from '@/context/SectionThemeContext';

type Props = {
  section: Extract<ServiceSection, { type: 'caseStudy' }>;
  theme: ServiceTheme;
};

export default function CaseStudySection({ section, theme }: Props) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = contextTheme === 'dark';

  return (
    <section
      className={[
        'transition-colors duration-700',
        isDark ? 'bg-[#0A0A0A] border-b border-white/10' : 'bg-[#FAFAFA] border-b border-black/10',
      ].join(' ')}
    >
      <div className="w-full max-w-[1280px] mx-auto px-8 py-10 sm:px-12 md:py-16 lg:py-20">
        <div className="flex flex-col gap-14">
          {/* ── ROW 1: Heading + CTA ── */}
          <div className="flex flex-col gap-6 lg:flex-row w-full lg:justify-between">
            {/* Heading */}
            <h2
              className={[
                'font-bold lg:w-[588px] lg:shrink-0 transition-colors duration-700',
                isDark ? 'text-white' : 'text-black',
              ].join(' ')}
              style={{ fontSize: 'clamp(26px, 3.06vw, 44px)', lineHeight: '1.16' }}
              dangerouslySetInnerHTML={{ __html: section.heading }}
            />

            {/* Desktop spacer */}
            <div className="hidden lg:block shrink-0" style={{ width: '104px' }} />

            {/* CTA */}
            <Link
              href={section.ctaHref}
              className="inline-flex flex-row items-center gap-2 group w-fit lg:w-[219px] lg:shrink-0"
            >
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="shrink-0"
              >
                <path
                  d="M2.5 2L2.5 14.5L19.5 14.5"
                  stroke="#E21F26"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.5 8.5L19.5 14.5L13.5 20.5"
                  stroke="#E21F26"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className={[
                  'group-hover:opacity-70 transition-opacity mt-1 font-normal',
                  'text-[22px] leading-[33px] transition-colors duration-700',
                  isDark ? 'text-white' : 'text-black',
                ].join(' ')}
              >
                {section.ctaLabel}
              </span>
            </Link>
          </div>

          {/* ── ROW 2: Cards ── */}
          <div className="flex flex-col gap-14 w-full lg:w-[638px] lg:mx-auto">
            {section.cards.map((card, idx) => {
              const isLink = !!card.href;
              return isLink ? (
                <Link key={idx} href={card.href!} className="flex flex-col group" style={{ gap: '36.81px' }}>
                  <CardContent card={card} isDark={isDark} />
                </Link>
              ) : (
                <div key={idx} className="flex flex-col" style={{ gap: '36.81px' }}>
                  <CardContent card={card} isDark={isDark} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CardContent ── */
type CardContentProps = {
  card: {
    imageSrc: string;
    title: string;
    description: string;
    tag: string;
  };
  isDark: boolean;
};

function CardContent({ card, isDark }: CardContentProps) {
  return (
    <>
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(220px, 29.5vw, 425px)', borderRadius: '5.18px' }}
      >
        <Image
          src={card.imageSrc}
          alt={card.title.replace(/<[^>]+>/g, '')}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 638px"
        />
      </div>

      {/* Info block */}
      <div className="flex flex-col" style={{ gap: '43.21px' }}>
        <div className="flex flex-col" style={{ gap: '13.6px' }}>
          {/* Description */}
          <p
            className={[
              'hover:text-[#E21F26] transition-colors duration-700',
              isDark ? 'text-[#A1A1A1]' : 'text-[#787878]',
            ].join(' ')}
            style={{
              fontSize: 'clamp(16px, 1.57vw, 22.58px)',
              lineHeight: '29px',
              fontWeight: 300,
            }}
          >
            {card.description}
          </p>
        </div>
      </div>
    </>
  );
}
