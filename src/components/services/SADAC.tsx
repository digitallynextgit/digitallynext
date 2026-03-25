'use client';

import { motion } from 'framer-motion';
import { useSectionTheme } from '@/context/SectionThemeContext';

const fadeBottomMask = {
  WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
  maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
};

const mobileFadeBottomMask = {
  WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
  maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
};

/* ===== Mobile SADAC ===== */
function MobileSADAC({ isDark }: { isDark: boolean }) {
  return (
    <div className="lg:hidden">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          className="text-[18vw] font-black leading-[0.85] tracking-tighter -mt-14 text-red-500"
          style={mobileFadeBottomMask}
        >
          ADAC
        </h2>
        <p
          className={[
            'text-2xl font-bold leading-tight mt-2 transition-colors duration-700',
            isDark ? 'text-white' : 'text-black',
          ].join(' ')}
        >
          AI Decision &<br />
          Acceleration Center
        </p>
      </motion.div>

      <motion.div
        className="relative w-full rounded overflow-hidden mb-8 aspect-[4/2.8]"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute -top-[4px] -left-[4px] -right-[4px] -bottom-[12px] w-[calc(100%+8px)] h-[calc(100%+16px)] object-cover object-top mt-[5px]"
        >
          <source src="/videos/ADAC Video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Content */}
      <motion.div
        className="mt-6 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* How decisions are governed */}
        <div className="text-center space-y-3">
          <h3
            className={[
              'text-xl font-normal transition-colors duration-700',
              isDark ? 'text-white' : 'text-black',
            ].join(' ')}
          >
            How decisions are governed
          </h3>
          <p
            className={[
              'text-sm leading-relaxed transition-colors duration-700',
              isDark ? 'text-[#A1A1A1]' : 'text-[#787878]',
            ].join(' ')}
          >
            ADAC is a dedicated internal function that governs AI usage across all work.
          </p>
        </div>

        {/* It exists to */}
        <div>
          <h3
            className={[
              'text-xl font-normal mb-4 transition-colors duration-700',
              isDark ? 'text-white' : 'text-black',
            ].join(' ')}
          >
            It exists to:
          </h3>
          <ul className="flex flex-col gap-3 text-sm leading-relaxed list-none">
            {[
              'Define where AI should and should not be applied',
              'Set clear boundaries between AI assistance and human ownership',
              'Document decision logic, not just outcomes',
              'Measure whether AI is accelerating the right thing',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#787878] shrink-0" />
                <span
                  className={['transition-colors duration-700', isDark ? 'text-[#A1A1A1]' : 'text-[#787878]'].join(' ')}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ADAC ensures box */}
        <div className={['p-6 transition-colors duration-700', isDark ? 'bg-[#111111]' : 'bg-[#FBFBFA]'].join(' ')}>
          <h3 className="text-xl font-bold text-[#0EC8C5] mb-4">ADAC ensures:</h3>
          <ul className="flex flex-col gap-3 text-sm leading-relaxed list-none">
            {['Speed without recklessness', 'Scale without sameness', 'Intelligence without abdication'].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#0EC8C5] shrink-0" />
                <span
                  className={['transition-colors duration-700', isDark ? 'text-[#A1A1A1]' : 'text-[#787878]'].join(' ')}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

/* ===== Desktop SADAC ===== */
function DesktopSADAC({ isDark }: { isDark: boolean }) {
  return (
    <div className="hidden lg:block">
      {/* Header */}
      <motion.div
        className="flex flex-row items-center justify-center gap-12 xl:gap-14 mb-14"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          className="-mt-24 text-[clamp(2rem,14vw,14rem)] font-black leading-[0.95] tracking-[-0.04em] text-red-500"
          style={fadeBottomMask}
        >
          ADAC
        </h2>
        <p
          className={[
            'text-3xl xl:text-[4rem] font-bold leading-tight transition-colors duration-700',
            isDark ? 'text-white' : 'text-black',
          ].join(' ')}
        >
          AI Decision &<br />
          Acceleration Center
        </p>
      </motion.div>

      {/* Video */}
      <motion.div
        className="relative w-full rounded overflow-hidden mb-8 aspect-[4/2.8]"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute -top-[4px] -left-[4px] -right-[4px] -bottom-[12px] w-[calc(100%+8px)] h-[calc(100%+16px)] object-cover object-top mt-[5px]"
        >
          <source src="/videos/ADAC Video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Content */}
      <motion.div
        className="max-w-[1165px] mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* How decisions are governed */}
        <div className="text-center mb-14 space-y-5">
          <h3
            className={[
              'text-[2.5rem] leading-[1.3] font-normal transition-colors duration-700',
              isDark ? 'text-white' : 'text-black',
            ].join(' ')}
          >
            How decisions are governed
          </h3>
          <p
            className={[
              'text-2xl leading-relaxed transition-colors duration-700',
              isDark ? 'text-[#A1A1A1]' : 'text-[#787878]',
            ].join(' ')}
          >
            ADAC is a dedicated internal function that governs AI usage across all work.
          </p>
        </div>

        {/* Two columns */}
        <div className="flex flex-row justify-between" style={{ gap: '120px' }}>
          {/* Left: It exists to */}
          <div className="flex-1 flex flex-col gap-10">
            <h3
              className={[
                'text-[2.5rem] leading-[1.3] font-normal transition-colors duration-700',
                isDark ? 'text-white' : 'text-black',
              ].join(' ')}
            >
              It exists to:
            </h3>
            <ul className="flex flex-col gap-4 text-lg leading-relaxed list-none">
              {[
                'Define where AI should and should not be applied',
                'Set clear boundaries between AI assistance and human ownership',
                'Document decision logic, not just outcomes',
                'Measure whether AI is accelerating the right thing',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-[#787878] shrink-0" />
                  <span
                    className={['transition-colors duration-700', isDark ? 'text-[#A1A1A1]' : 'text-[#787878]'].join(
                      ' '
                    )}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: ADAC ensures box */}
          <div
            className={[
              'flex-1 flex flex-col gap-10 self-start p-8 transition-colors duration-700',
              isDark ? 'bg-[#111111]' : 'bg-[#FBFBFA]',
            ].join(' ')}
          >
            <h3 className="text-[2.5rem] leading-[1.3] font-bold text-[#0EC8C5]">ADAC ensures:</h3>
            <ul className="flex flex-col gap-4 text-lg leading-relaxed list-none">
              {['Speed without recklessness', 'Scale without sameness', 'Intelligence without abdication'].map(
                (item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-[#0EC8C5] shrink-0" />
                    <span
                      className={['transition-colors duration-700', isDark ? 'text-[#A1A1A1]' : 'text-[#787878]'].join(
                        ' '
                      )}
                    >
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ===== Main Export ===== */
export default function SADAC() {
  const { theme } = useSectionTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className={[
        'py-24 md:py-32 overflow-hidden transition-colors duration-700',
        isDark ? 'bg-[#0A0A0A]' : 'bg-white',
      ].join(' ')}
    >
      <div className="w-[90%] lg:w-[85%] max-w-6xl mx-auto">
        <DesktopSADAC isDark={isDark} />
        <MobileSADAC isDark={isDark} />
      </div>
    </section>
  );
}
