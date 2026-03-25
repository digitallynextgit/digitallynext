'use client';

import { useSectionTheme } from '@/context/SectionThemeContext';
import type { ServiceSection, ServiceTheme } from '@/data/services';

type Props = {
  section: Extract<ServiceSection, { type: 'realBrief' }>;
  theme: ServiceTheme;
};

export default function RealBriefSection({ section, theme }: Props) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = contextTheme === 'dark';

  return (
    <section
      className={['py-10 md:py-16 lg:py-20 transition-colors duration-700', isDark ? 'bg-[#0A0A0A]' : 'bg-white'].join(
        ' '
      )}
    >
      <div className="container py-16 sm:py-20 lg:py-[120px]">
        {/* ── Two-column row ── */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start lg:gap-60">
          {/* LEFT */}
          <div className="lg:w-[380px] lg:shrink-0 lg:sticky lg:top-[100px]">
            {/* Eyebrow — service-specific accent, inline style theek hai */}
            <div className="text-[11px] font-semibold tracking-[0.22em] uppercase" style={{ color: theme.accent }}>
              {section.eyebrow}
            </div>

            {/* Heading */}
            <h2
              className={[
                'mt-5 font-extrabold leading-[1.05] tracking-[-0.03em]',
                'text-[36px] sm:text-[48px] lg:text-[60px]',
                'transition-colors duration-700',
                isDark ? 'text-white' : 'text-[#000000]',
              ].join(' ')}
            >
              {section.heading}
              <span className="text-[#E21F26]">.</span>
            </h2>

            {/* Description */}
            <p
              className={[
                'mt-5 text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-line',
                'transition-colors duration-700',
                isDark ? 'text-[#737373]' : 'text-[#787878]',
              ].join(' ')}
            >
              {section.description}
            </p>
          </div>

          {/* RIGHT: List */}
          <div className="flex-1 mt-10 lg:mt-0 min-w-0">
            <div
              className={[
                'border-t transition-colors duration-700',
                isDark ? 'border-white/10' : 'border-black/10',
              ].join(' ')}
            >
              {section.list.map((item, idx) => {
                const barColor = item.accent === 'accent' ? theme.accent : theme.accentAlt;
                return (
                  <div
                    key={idx}
                    className={[
                      'flex items-stretch gap-5 py-6 sm:py-8 border-b transition-colors duration-700',
                      isDark ? 'border-white/10' : 'border-black/10',
                    ].join(' ')}
                  >
                    {/* Left bar — service accent color */}
                    <div className="w-[3px] shrink-0 rounded-full" style={{ backgroundColor: barColor }} />
                    {/* Item text */}
                    <p
                      className={[
                        'text-base sm:text-lg lg:text-xl leading-snug transition-colors duration-700',
                        isDark ? 'text-white' : 'text-[#000000]',
                      ].join(' ')}
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Highlight Bar — inverted bg ── */}
        <div
          className={[
            'mt-12 lg:mt-16 py-6 sm:py-8 px-6 sm:px-12 text-center rounded-[3px]',
            'transition-colors duration-700',
            isDark ? 'bg-white' : 'bg-[#000000]',
          ].join(' ')}
        >
          <p
            className={[
              'text-base sm:text-lg leading-relaxed transition-colors duration-700',
              isDark ? 'text-[#000000]' : 'text-white',
            ].join(' ')}
            dangerouslySetInnerHTML={{ __html: section.highlightText }}
          />
        </div>
      </div>
    </section>
  );
}
