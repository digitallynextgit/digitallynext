'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useSectionTheme } from '@/context/SectionThemeContext';

interface ClientLogosProps {
  theme?: 'dark' | 'light';
}

const logosWhite = [
  '/home/client1.webp',
  '/home/client2.webp',
  '/home/client3.webp',
  '/home/client4.webp',
  '/home/client5.webp',
  '/home/client6.webp',
  '/home/client7.webp',
  '/home/client8.webp',
  '/home/client9.webp',
  '/home/client10.webp',
  '/home/client11.webp',
  '/home/client12.webp',
  '/home/client32.webp',
  '/home/client33.webp',
  '/home/client34.webp',
  '/home/client35.webp',
  '/home/client36.webp',
  '/home/client37.webp',
  '/home/client38.webp',
];

const logosBlack = [
  '/home/client13.webp',
  '/home/client14.webp',
  '/home/client15.webp',
  '/home/client16.webp',
  '/home/client17.webp',
  '/home/client18.webp',
  '/home/client19.webp',
  '/home/client20.webp',
  '/home/client21.webp',
  '/home/client22.webp',
  '/home/client23.webp',
  '/home/client24.webp',
  '/home/client25.webp',
  '/home/client26.webp',
  '/home/client27.webp',
  '/home/client28.webp',
  '/home/client29.webp',
  '/home/client30.webp',
  '/home/client31.webp',
];

// Divider — inline style instead of bg-linear-to-r (Tailwind v4 only)
function Divider({ isDark }: { isDark: boolean }) {
  return (
    <div
      style={{
        height: 1,
        background: isDark
          ? 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)'
          : 'linear-gradient(to right, transparent, rgba(0,0,0,0.1), transparent)',
        transition: 'background 0.5s',
      }}
    />
  );
}

export default function ClientLogos({ theme }: ClientLogosProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === 'dark';
  const marqueeRef = useRef<HTMLDivElement>(null);

  const logoFiles = isDark ? logosWhite : logosBlack;
  // 4 copies for seamless loop — translateX -25% = 1 full set
  const allLogos = [...logoFiles, ...logoFiles, ...logoFiles, ...logoFiles];

  return (
    <>
      <Divider isDark={isDark} />

      <section className={['py-10 md:py-16 lg:py-20 overflow-hidden', 'transition-colors duration-500'].join(' ')}>
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <AnimatedSection>
            <div className="flex justify-between items-center mb-8 flex-wrap gap-6">
              {/* Heading */}
              <p
                className={[
                  'text-2xl lg:text-4xl lg:w-[65%] w-full transition-colors duration-500',
                  isDark ? 'text-white' : 'text-black',
                ].join(' ')}
              >
                <strong className="text-2xl lg:text-4xl">Trusted</strong>{' '}
                <span className="font-light">by ambitious brands across industries and geographies.</span>
              </p>

              {/* Work With Us */}
              <Link href="/contact" className="group flex items-center gap-2 text-2xl font-medium no-underline">
                <span className="text-[#E21F26] transition-transform duration-300 ease-out group-hover:-translate-x-2">
                  <Image src="/icons/enter.svg" alt="arrow-right" width={32} height={32} />
                </span>
                <span
                  className={[
                    'mt-1 font-light hover:text-[#E21F26] transition-colors duration-500',
                    isDark ? 'text-white' : 'text-black',
                  ].join(' ')}
                >
                  Work With Us
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Marquee wrapper */}
        <div
          className="overflow-hidden py-4 mt-4"
          style={{
            // ✅ Both prefixes — Safari needs webkit
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          {/* 
            ✅ Safari fix:
            - translateZ(0) forces GPU layer — prevents jitter
            - will-change: transform — hints browser to optimize
            - animation defined inline via CSS custom property
          */}
          <div
            ref={marqueeRef}
            className="flex gap-8"
            style={{
              width: 'max-content',
              // ✅ Cross-browser animation
              animation: 'clientMarquee 45s linear infinite',
              // ✅ GPU acceleration — fixes Safari jitter
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)',
              willChange: 'transform',
              // ✅ Prevents sub-pixel blurring in Safari
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
            }}
            onMouseEnter={() => {
              if (marqueeRef.current) marqueeRef.current.style.animationPlayState = 'paused';
            }}
            onMouseLeave={() => {
              if (marqueeRef.current) marqueeRef.current.style.animationPlayState = 'running';
            }}
          >
            {allLogos.map((logo, i) => (
              <div
                key={i}
                className={[
                  'shrink-0 flex items-center justify-center',
                  'h-24 px-5',
                  'border-2 rounded-lg hover:rounded-full',
                  'transition-all duration-500',
                  'hover:scale-105',
                  isDark ? 'border-white/50 hover:border-white/70' : 'border-black/20 hover:border-black/30',
                ].join(' ')}
                style={{
                  // ✅ Safari box-shadow fix — inline instead of Tailwind arbitrary
                  boxShadow: 'none',
                  transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <Image
                  src={logo}
                  alt="Client Logo"
                  width={140}
                  height={55}
                  // ✅ Lazy load — first 8 eager, rest lazy
                  loading={i < 8 ? 'eager' : 'lazy'}
                  style={{
                    width: 'auto',
                    height: '55px',
                    maxWidth: '140px',
                    objectFit: 'contain',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider isDark={isDark} />

      {/* 
        ✅ Keyframe defined inline via style tag — works in all browsers
        including Safari, Firefox, without needing globals.css
      */}
      <style>{`
        @keyframes clientMarquee {
          0%   { transform: translateX(0) translateZ(0); }
          100% { transform: translateX(-25%) translateZ(0); }
        }
      `}</style>
    </>
  );
}
