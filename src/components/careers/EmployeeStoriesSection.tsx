'use client';

import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { useSectionTheme } from '@/context/SectionThemeContext';

/**
 * Employee stories now come from Sanity (drag-to-reorder in Studio).
 * The parent page fetches them server-side and passes them down here.
 */
export type EmployeeStory = {
  _id: string;
  title: string;
  embedUrl: string;
  /** Optional override — if absent, derived from `embedUrl`. */
  postUrl?: string | null;
};

/**
 * Turn a LinkedIn embed URL into the direct post URL that opens in a new tab.
 *   https://www.linkedin.com/embed/feed/update/urn:li:share:123?collapsed=1
 *   → https://www.linkedin.com/feed/update/urn:li:share:123
 */
function derivePostUrl(embedUrl: string): string {
  try {
    const url = new URL(embedUrl);
    url.pathname = url.pathname.replace('/embed/feed/', '/feed/');
    url.search = '';
    return url.toString();
  } catch {
    return embedUrl;
  }
}

interface EmployeeStoriesSectionProps {
  stories: EmployeeStory[];
  theme?: 'dark' | 'light';
}

export default function EmployeeStoriesSection({ stories: rawStories, theme }: EmployeeStoriesSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === 'dark';

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fill in postUrl for every story so the render layer can rely on it.
  const stories = useMemo(
    () => rawStories.map((s) => ({ ...s, postUrl: s.postUrl ?? derivePostUrl(s.embedUrl) })),
    [rawStories]
  );

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector('.story-card')?.clientWidth ?? 300;
    const gap = 24;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -(cardWidth + gap) : cardWidth + gap,
      behavior: 'smooth',
    });
  };

  if (stories.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-10 md:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2
            className={[
              'font-extrabold tracking-tight leading-none mb-4 transition-colors duration-500',
              isDark ? 'text-white' : 'text-[#1a1a1a]',
            ].join(' ')}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]">Employee Stories</span>
            <span className="text-[#0EC8C5] text-4xl sm:text-5xl md:text-7xl lg:text-8xl">.</span>
          </motion.h2>

          <motion.p
            className={[
              'text-lg lg:text-2xl font-normal mb-2 lg:mb-3 transition-colors duration-500',
              isDark ? 'text-white' : 'text-[#1a1a1a]',
            ].join(' ')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            The People Behind Our Success
          </motion.p>

          <motion.p
            className={[
              'text-base md:text-lg lg:text-xl max-w-2xl mt-5 md:mt-7 mx-auto transition-colors duration-500',
              isDark ? 'text-white/50' : 'text-[#787878]',
            ].join(' ')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Real stories, career milestones, and experiences shared by the people who make Digitally Next what it is
            today.
          </motion.p>
        </div>

        {/* Story cards (LinkedIn embeds) with navigation arrows overlaid on the container */}
        <div className="relative">
          {(['left', 'right'] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              className={[
                'absolute top-1/2 -translate-y-1/2 z-20',
                dir === 'left' ? 'left-1 lg:-left-4' : 'right-1 lg:-right-4',
                'w-10 h-10 lg:w-12 lg:h-12 rounded-full border flex items-center justify-center cursor-pointer shadow-lg',
                'hover:text-[#E53935] hover:border-[#E53935] transition-all duration-300 group',
                isDark
                  ? 'border-white/20 bg-neutral-900/90 text-white/70 hover:bg-neutral-900'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-red-50',
              ].join(' ')}
              aria-label={`Scroll ${dir}`}
            >
              <svg
                className={[
                  'w-4 h-4 transition-transform duration-300',
                  dir === 'left' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5',
                ].join(' ')}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={dir === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
                />
              </svg>
            </button>
          ))}

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className={[
              'flex gap-4 lg:gap-6 overflow-x-auto pb-4',
              '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
              '[scroll-snap-type:x_mandatory]',
            ].join(' ')}
          >
            {stories.map((story, index) => (
              <motion.div
                key={story._id}
                className={[
                  'story-card shrink-0 snap-start perspective-[1000px]',
                  // 1 / 2 / 3 cards visible at sm / md / lg+ breakpoints
                  'w-[85%] sm:w-[70%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]',
                ].join(' ')}
                custom={index}
                initial={{ opacity: 0, y: 60, scale: 0.92 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotateY: 0,
                        transition: {
                          duration: 0.7,
                          delay: index * 0.15,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      }
                    : {
                        opacity: 0,
                        y: 60,
                        scale: 0.92,
                        rotateY: index % 2 === 0 ? -8 : 8,
                      }
                }
                style={{
                  willChange: 'transform, opacity',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                }}
              >
                <div
                  className={[
                    // 504:669 matches LinkedIn's native embed dimensions so the post
                    // renders without cropping or excess whitespace.
                    'relative w-full aspect-504/669 rounded overflow-hidden group/card',
                    'transition-all duration-500 hover:shadow-lg',
                    isDark
                      ? 'border border-white/10 bg-white/5 hover:border-white/30'
                      : 'border border-gray-200 bg-gray-50 hover:border-gray-400',
                  ].join(' ')}
                >
                  <iframe
                    src={story.embedUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    title={story.title}
                  />
                  {/* "View on LinkedIn" floating link — opens the actual post in a new tab.
                      Positioned over the iframe in the top-right corner, intercepts clicks
                      only in its own small area so the rest of the iframe stays interactive.
                      Fades in on card hover to avoid covering the LinkedIn UI by default. */}
                  <Link
                    href={story.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${story.title} on LinkedIn in a new tab`}
                    className={[
                      'absolute top-2 right-2 z-10',
                      'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5',
                      'bg-black/75 text-white text-[11px] font-semibold tracking-wide',
                      'backdrop-blur-sm shadow-md',
                      'opacity-0 group-hover/card:opacity-100 focus-visible:opacity-100',
                      'transition-all duration-200 hover:bg-[#0A66C2]',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2',
                    ].join(' ')}
                  >
                    View on LinkedIn
                    <ExternalLink className="w-3 h-3" strokeWidth={2.5} aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* LinkedIn CTA */}
        <motion.div
          className="text-center mt-10 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="https://www.linkedin.com/company/digitallynext/"
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'inline-flex items-center gap-3 px-6 py-3 lg:px-8 lg:py-4 rounded-full border',
              'font-semibold text-sm tracking-wide no-underline',
              'hover:border-[#E53935] hover:text-[#E53935] transition-all duration-300 group',
              isDark ? 'border-white/20 text-white' : 'border-gray-300 text-[#1a1a1a]',
            ].join(' ')}
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Follow us on LinkedIn
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
