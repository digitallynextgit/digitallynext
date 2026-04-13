'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useSectionTheme } from '@/context/SectionThemeContext';

interface GrowthCarouselSectionProps {
  theme?: 'dark' | 'light';
}

const carouselImages = [
  '/careers/c1.webp',
  '/careers/c2.webp',
  '/careers/c3.webp',
  '/careers/c4.webp',
  '/careers/c5.webp',
  '/careers/c6.webp',
  '/careers/c7.webp',
  '/careers/c8.webp',
  '/careers/c9.webp',
  '/careers/c10.webp',
  '/careers/c11.webp',
];
const carouselItems = Array.from({ length: 10 }, (_, i) => carouselImages[i % carouselImages.length]);

// ~80px/sec → roughly one full loop every 30–40s depending on screen width
const SCROLL_SPEED_PX_PER_SEC = 80;

export default function GrowthCarouselSection({ theme }: GrowthCarouselSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === 'dark';

  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0); // scroll offset in px
  const halfWidthRef = useRef(0); // scrollWidth / 2
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    /*
      Why requestAnimationFrame instead of CSS animation:

      CSS `animation: ... infinite` on iOS Safari causes a 1-frame flash at the
      loop reset. WebKit's compositor briefly renders the element at its natural
      (untransformed) position before re-applying the transform for the next tick.
      On Retina (2x/3x) this is perceptible as a visible "refresh".

      With rAF, the position reset (posRef -= halfWidth) happens inside the JS
      loop, BEFORE the browser paints. Safari never renders the element at
      position 0. Android Chrome is equally smooth — no regression.
    */

    const measure = () => {
      halfWidthRef.current = track.scrollWidth / 2;
    };
    measure();

    // Re-measure when breakpoints change image/margin sizes
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const tick = (now: number) => {
      if (lastTimeRef.current !== undefined) {
        const elapsed = now - lastTimeRef.current;
        posRef.current += (SCROLL_SPEED_PX_PER_SEC * elapsed) / 1000;

        // Seamless loop: subtract halfWidth when past one full copy.
        // Both copies are identical, so the visual result is continuous.
        // Happens before paint → browser never renders position 0.
        if (halfWidthRef.current > 0 && posRef.current >= halfWidthRef.current) {
          posRef.current -= halfWidthRef.current;
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
  }, []);

  return (
    <section className={['transition-colors duration-700', isDark ? 'bg-black' : 'bg-white'].join(' ')}>
      <div className="flex justify-center items-center">
        <div className="w-full pb-10 md:pb-16 lg:pb-20">
          <div className="overflow-hidden relative">
            {/* Left fade — gradient overlay, not mask-image (mask causes double compositing) */}
            <div
              className="absolute inset-y-0 left-0 z-10 pointer-events-none"
              style={{
                width: '10%',
                background: isDark
                  ? 'linear-gradient(to right, #000000, transparent)'
                  : 'linear-gradient(to right, #ffffff, transparent)',
              }}
            />
            {/* Right fade */}
            <div
              className="absolute inset-y-0 right-0 z-10 pointer-events-none"
              style={{
                width: '10%',
                background: isDark
                  ? 'linear-gradient(to left, #000000, transparent)'
                  : 'linear-gradient(to left, #ffffff, transparent)',
              }}
            />

            {/* Track — transform applied by rAF, not CSS animation */}
            <div ref={trackRef} className="flex growth-carousel-track" style={{ width: 'max-content' }}>
              {[...carouselItems, ...carouselItems].map((src, idx) => (
                <div key={`${src}-${idx}`} className="shrink-0 mr-6 md:mr-8">
                  <Image
                    src={src}
                    alt=""
                    width={360}
                    height={240}
                    loading="eager"
                    className="block h-40 sm:h-45 md:h-50 lg:h-100 w-55 sm:w-65 md:w-72.5 lg:w-125 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
