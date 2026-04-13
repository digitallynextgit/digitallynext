'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useSectionTheme } from '@/context/SectionThemeContext';

export default function Hero() {
  const { theme } = useSectionTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className={['sticky top-0 z-0', 'flex items-center md:items-end', 'py-10 md:pt-16 lg:pt-20'].join(' ')}
      style={{
        height: 'clamp(600px, 100vh, 1500px)',
        // Safari fix: clipPath clips the section without creating an overflow boundary.
        // overflow:hidden on a sticky element causes Safari to clip animated children
        // to their initial bounding rect.
        clipPath: 'inset(0)',
        WebkitClipPath: 'inset(0)',
      }}
    >
      {/* Background image + gradient overlay */}
      <div
        className={[
          'absolute inset-0 z-0',
          "after:content-[''] after:absolute after:inset-0 after:z-1",
          isDark
            ? 'after:bg-linear-to-b after:from-black/10 after:via-black/30 after:to-black/75'
            : 'after:bg-linear-to-b after:from-black/5 after:via-black/20 after:to-black/55',
        ].join(' ')}
      >
        <Image src="/banner/b1.webp" alt="Hero" fill className="object-cover object-center" priority />
      </div>

      {/* Content */}
      <div className="relative z-2 px-6 md:px-12 w-full max-w-7xl mx-auto">
        {/*
          Safari + Android fix:
          DO NOT set WebkitTransform as a static initial value on motion.div elements.
          Framer Motion updates transform on every animation frame — a static initial
          value forces the browser to reconcile two transform sources per frame,
          causing jitter on mobile GPUs.
          WebkitBackfaceVisibility is safe as a one-time hint (not updated per-frame).
        */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        >
          <p
            style={{ fontSize: 'clamp(3.1rem, 2.5vw, 1.35rem)' }}
            className="font-medium text-white mb-2 tracking-[0.02em] leading-[1.3] md:leading-normal"
          >
            WE DON&apos;T JUST BUILD
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        >
          <h1 className="text-[14vw] lg:text-[9.5vw] font-bold text-white mb-6 uppercase">
            CAMPAIGNS<span className="text-[#0EC8C5]">.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        >
          <p style={{ fontSize: 'clamp(1.95rem, 2vw, 1.2rem)' }} className="text-white/85 mb-10 font-light">
            We build what tomorrow will <strong className="text-white font-black">remember.</strong>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        >
          <Link
            href="/contact"
            className={[
              'inline-flex items-center gap-2 py-4 px-9',
              'text-[1.2rem] font-normal tracking-[0.12em] uppercase',
              'rounded-none cursor-pointer relative overflow-hidden',
              'transition-all duration-300 ease-out',
              'bg-[#0EC8C5] text-white',
              'hover:bg-[#E21F26] hover:-translate-y-0.5',
            ].join(' ')}
          >
            GET IN TOUCH
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
