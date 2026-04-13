'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
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

// ~60px/sec — logos are smaller than career photos so slightly slower looks better
const SCROLL_SPEED_PX_PER_SEC = 60;

export default function ClientLogos({ theme }: ClientLogosProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === 'dark';

  const logoFiles = isDark ? logosWhite : logosBlack;
  // 4 copies for seamless loop — reset point = scrollWidth / 4 (one full set)
  const allLogos = [...logoFiles, ...logoFiles, ...logoFiles, ...logoFiles];

  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0); // scroll offset in px
  const oneSetRef = useRef(0); // scrollWidth / 4
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number | undefined>(undefined);
  const isPausedRef = useRef(false); // hover pause

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    /*
      Same rAF approach as GrowthCarouselSection:
      CSS `animation: infinite` on iOS Safari flashes at the loop reset because
      WebKit's compositor briefly renders position 0 before re-applying the
      transform. rAF resets posRef BEFORE paint — Safari never sees position 0.

      4 copies of logos → reset at scrollWidth/4 (one full set width).
      margin-right on each item (not flex gap) → -oneSet px = perfect visual seam.
    */

    const measure = () => {
      oneSetRef.current = track.scrollWidth / 4;
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const tick = (now: number) => {
      if (lastTimeRef.current !== undefined && !isPausedRef.current) {
        const elapsed = now - lastTimeRef.current;
        posRef.current += (SCROLL_SPEED_PX_PER_SEC * elapsed) / 1000;

        // Reset when one full copy has been scrolled past
        if (oneSetRef.current > 0 && posRef.current >= oneSetRef.current) {
          posRef.current -= oneSetRef.current;
        }

        track.style.transform = `translate3d(${-posRef.current}px, 0, 0)`;
      }
      lastTimeRef.current = now;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
    // Re-run when theme changes (logo set changes → new track width)
  }, [isDark]);

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

        {/*
          Marquee container:
          - No mask-image here (causes double compositing on Android with will-change child).
          - Fade effect via two absolute gradient overlay divs instead.
        */}
        <div className="overflow-hidden py-4 mt-4 relative">
          {/* Left fade overlay */}
          <div
            className="absolute inset-y-0 left-0 z-10 pointer-events-none"
            style={{
              width: '8%',
              background: isDark
                ? 'linear-gradient(to right, #000000, transparent)'
                : 'linear-gradient(to right, #ffffff, transparent)',
            }}
          />
          {/* Right fade overlay */}
          <div
            className="absolute inset-y-0 right-0 z-10 pointer-events-none"
            style={{
              width: '8%',
              background: isDark
                ? 'linear-gradient(to left, #000000, transparent)'
                : 'linear-gradient(to left, #ffffff, transparent)',
            }}
          />

          {/* Track — rAF drives the transform, not CSS animation */}
          <div
            ref={trackRef}
            className="flex client-logos-track"
            style={{ width: 'max-content' }}
            onMouseEnter={() => {
              isPausedRef.current = true;
            }}
            onMouseLeave={() => {
              isPausedRef.current = false;
            }}
          >
            {allLogos.map((logo, i) => (
              <div
                key={i}
                className={[
                  // margin-right on each item (not gap on flex) so -oneSet aligns perfectly at seam
                  'shrink-0 mr-8 flex items-center justify-center',
                  'h-24 px-5',
                  'border-2 rounded-lg hover:rounded-full',
                  'transition-all duration-500',
                  'hover:scale-105',
                  isDark ? 'border-white/50 hover:border-white/70' : 'border-black/20 hover:border-black/30',
                ].join(' ')}
                style={{
                  boxShadow: 'none',
                  transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <Image
                  src={logo}
                  alt="Client Logo"
                  width={140}
                  height={55}
                  loading="eager"
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
    </>
  );
}
