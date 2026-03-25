'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSectionTheme } from '@/context/SectionThemeContext';

interface AdacSectionProps {
  theme?: 'dark' | 'light';
}

const cards = [
  {
    title: 'What AI should touch',
    desc: "Repetitive workflows, data processing, pattern recognition — AI accelerates what doesn't need human nuance.",
    extraClass: '',
  },
  {
    title: 'What humans must own',
    desc: 'Strategy, relationships, ethical judgment, creative vision — the work that defines who we are.',
    extraClass: 'border-t lg:border-t-0 lg:border-l',
  },
  {
    title: 'Where judgment matters',
    desc: "The grey zone. Where speed and quality collide. Where the answer isn't obvious — and shouldn't be automated.",
    extraClass: 'border-t lg:border-t-0 lg:border-l',
  },
];

export default function AdacSection({ theme }: AdacSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === 'dark';
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className={['w-full transition-colors duration-700', isDark ? 'bg-black text-white' : 'bg-white text-black'].join(
        ' '
      )}
    >
      <div
        className={`h-px bg-linear-to-r from-transparent ${
          isDark ? 'via-white/10' : 'via-black/10'
        } to-transparent transition-colors duration-500`}
      />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col gap-8 md:gap-10">
          {/* Label */}
          <div className="text-[#E21F26] text-4xl sm:text-5xl lg:text-6xl font-light tracking-[0.15em]">ADAC</div>

          {/* Heading */}
          <div>
            <h2
              className={[
                'font-normal leading-[1.15] transition-colors duration-700',
                isDark ? 'text-white' : 'text-[#000000]',
              ].join(' ')}
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.975rem)' }}
            >
              How we stay intelligent
            </h2>
            <h2
              className={[
                'font-bold leading-[1.15] transition-colors duration-700',
                isDark ? 'text-white' : 'text-[#000000]',
              ].join(' ')}
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.975rem)' }}
            >
              without losing <span className="text-[#E21F26]">control</span>
            </h2>
          </div>

          {/* Subtitle */}
          <p
            className={[
              'max-w-130 font-light text-[16px] leading-[1.8] transition-colors duration-700',
              isDark ? 'text-[#737373]' : 'text-[#A1A1A1]',
            ].join(' ')}
          >
            <span className="block">We don&apos;t use AI everywhere.</span>
            <span className="block">And we don&apos;t avoid it either.</span>
            <span className="block">ADAC is how we decide:</span>
          </p>

          {/* Cards */}
          <div
            className={[
              'grid grid-cols-1 lg:grid-cols-3 transition-colors duration-700',
              isDark ? 'border border-[#2a2a2a]' : 'border border-[#E5E5E5]',
            ].join(' ')}
          >
            {cards.map(({ title, desc, extraClass }, index) => (
              <div
                key={title}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={[
                  'p-7 sm:p-8 cursor-default transition-colors duration-300',
                  isDark ? 'border-[#2a2a2a]' : 'border-[#E5E5E5]',
                  extraClass,
                  hoveredIndex === index ? 'bg-[rgba(14,200,197,0.08)]' : isDark ? 'bg-[#0a0a0a]' : 'bg-white',
                ].join(' ')}
              >
                <div
                  className="text-[20px] sm:text-[22px] font-normal leading-tight transition-colors duration-300"
                  style={{
                    color: hoveredIndex === index ? '#0EC8C5' : isDark ? '#FFFFFF' : '#000000',
                  }}
                >
                  {title}
                </div>
                <div
                  className={[
                    'mt-4 text-[14px] font-light leading-[1.7] transition-colors duration-700',
                    isDark ? 'text-[#737373]' : 'text-[#A1A1A1]',
                  ].join(' ')}
                >
                  {desc}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-12">
            <p
              className={[
                'font-light text-[15px] leading-[1.8] transition-colors duration-700',
                isDark ? 'text-[#737373]' : 'text-[#A1A1A1]',
              ].join(' ')}
            >
              <span className="block">It&apos;s how we stay modern</span>
              <span className="block">without becoming careless.</span>
            </p>

            <Link
              href="#open-positions"
              className={[
                'group inline-flex items-center gap-3 shrink-0',
                'text-xl sm:text-2xl font-normal leading-[1.3]',
                'hover:text-[#E21F26] transition-colors duration-300',
                isDark ? 'text-white' : 'text-[#000000]',
              ].join(' ')}
            >
              <Image
                src="/figma/careers/careers-arrow-link.svg"
                alt=""
                width={35}
                height={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
              Open Roles in ADAC
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
