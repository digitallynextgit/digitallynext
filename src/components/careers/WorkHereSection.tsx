'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useSectionTheme } from '@/context/SectionThemeContext';

interface WorkHereSectionProps {
  theme?: 'dark' | 'light';
}

const rightItems = [
  {
    icon: '/figma/careers/careers-icon-direction.svg',
    iconW: 52,
    iconH: 41,
    title: 'Direction',
    desc: 'Every project has a clear brief, a defined scope, and someone accountable.',
  },
  {
    icon: '/figma/careers/careers-icon-context.svg',
    iconW: 52,
    iconH: 44,
    title: 'Context',
    desc: "You'll always know why your work matters — not just what needs to be done.",
  },
  {
    icon: '/figma/careers/careers-icon-standards.svg',
    iconW: 52,
    iconH: 44,
    title: 'Standards',
    desc: "Quality isn't negotiable. We'd rather do less, better.",
  },
];

export default function WorkHereSection({ theme }: WorkHereSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === 'dark';
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // ← added

  return (
    <section
      className={[
        'w-full flex justify-center items-center transition-colors duration-700',
        isDark ? 'bg-black' : 'bg-white',
      ].join(' ')}
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 py-12 md:py-16 lg:py-20">
        {/* Heading */}
        <h2
          className={[
            'font-normal leading-tight mb-8 md:mb-12 lg:mb-16 transition-colors duration-700',
            isDark ? 'text-white' : 'text-[#000000]',
          ].join(' ')}
          style={{ fontSize: 'clamp(1.75rem, 4vw, 47px)' }}
        >
          What It&apos;s Like to <span className="text-[#E21F26] font-semibold">Work Here</span>
          <span className="text-[#0EC8C5]">.</span>
        </h2>

        {/* Two col layout */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          {/* LEFT COL */}
          <div className="flex-1 flex flex-col gap-6">
            <p
              className={[
                'font-light text-[17px] leading-relaxed transition-colors duration-700',
                isDark ? 'text-[#A1A1A1]' : 'text-[#737373]',
              ].join(' ')}
            >
              <span className="block">We&apos;re not chaotic.</span>
              <span className="block">We&apos;re not clock-punching either.</span>
            </p>

            <p
              className={[
                'font-light text-[16px] leading-relaxed transition-colors duration-700',
                isDark ? 'text-[#737373]' : 'text-[#A1A1A1]',
              ].join(' ')}
            >
              Work here has:
            </p>

            <div className="flex flex-col gap-4">
              <p
                className={[
                  'font-light text-[16px] leading-relaxed transition-colors duration-700',
                  isDark ? 'text-[#A1A1A1]' : 'text-[#737373]',
                ].join(' ')}
              >
                <span className="block">Ideas are welcomed.</span>
                <span className="block">But they&apos;re expected to stand on something.</span>
              </p>
              <p
                className={[
                  'font-light text-[15px] leading-relaxed transition-colors duration-700',
                  isDark ? 'text-[#737373]' : 'text-[#A1A1A1]',
                ].join(' ')}
              >
                <span className="block">If you like clarity more than noise,</span>
                <span className="block">you&apos;ll feel comfortable fast.</span>
              </p>
            </div>

            <div className="mt-2">
              <Image
                src="/figma/careers/careers-workhere.webp"
                alt="Work Here"
                width={477}
                height={269}
                className="w-full h-auto rounded-[5px] object-cover"
              />
            </div>
          </div>

          {/* RIGHT COL */}
          <div className="flex-1 flex flex-col mt-6 md:mt-0">
            {rightItems.map((item, i) => (
              <div
                key={item.title}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={[
                  'flex flex-col gap-3 p-7 sm:p-8 cursor-default',
                  'transition-colors duration-300',
                  hoveredIndex === i ? 'bg-[rgba(14,200,197,0.08)]' : isDark ? 'bg-[#0a0a0a]' : 'bg-white',
                ].join(' ')}
                style={{
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  borderTopWidth: i === 0 ? '1px' : '0',
                  borderColor: isDark ? '#2a2a2a' : '#E5E5E5',
                }}
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={item.iconW}
                  height={item.iconH}
                  style={{ width: item.iconW, height: item.iconH, flexShrink: 0 }}
                />
                {/* Title color changes on hover — same as ADAC */}
                <div
                  className="text-[22px] sm:text-[24px] font-normal leading-tight transition-colors duration-300"
                  style={{
                    color: hoveredIndex === i ? '#0EC8C5' : isDark ? '#FFFFFF' : '#000000',
                  }}
                >
                  {item.title}
                </div>
                <div
                  className={[
                    'text-[15px] font-light leading-relaxed transition-colors duration-700',
                    isDark ? 'text-[#737373]' : 'text-[#A1A1A1]',
                  ].join(' ')}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
