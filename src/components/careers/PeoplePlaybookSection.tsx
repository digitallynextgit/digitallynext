'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { urlFor } from '@/sanity/image';
import { slugifyTag } from '@/lib/categorySlug';

export interface PlaybookPost {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset: { _ref: string }; alt?: string };
  excerpt?: string;
  publishedAt?: string;
  readTime?: number;
  categories?: { _id: string; title: string }[];
  author?: { name: string };
}

interface PeoplePlaybookSectionProps {
  posts: PlaybookPost[];
}

const HR_CORNER_TAG = 'Career Talks - HR Corner';
const VIEW_ALL_HREF = `/blog?tag=${slugifyTag(HR_CORNER_TAG)}`;

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function PeoplePlaybookSection({ posts }: PeoplePlaybookSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector<HTMLElement>('.playbook-card');
    const cardWidth = card?.clientWidth ?? 320;
    const gap = 28; // matches gap-7
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -(cardWidth + gap) : cardWidth + gap,
      behavior: 'smooth',
    });
  };

  // No posts → render nothing. Avoids an empty section on the careers page.
  if (!posts || posts.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex max-w-3xl flex-col gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-extrabold leading-[1.05] tracking-[-0.03em] text-black"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              The People Playbook<span className="text-[#E21F26]">.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15px] leading-relaxed text-[#787878] md:text-[16px]"
            >
              Stories, insights and lessons on careers, culture, hiring and growth at Digitally Next.
            </motion.p>
          </div>

          {/* View all (desktop) */}
          <Link
            href={VIEW_ALL_HREF}
            className="group hidden shrink-0 items-center gap-2 self-end rounded-full border border-black/20 px-5 py-2.5 text-[13px] font-semibold text-black transition-all duration-200 hover:border-[#E21F26] hover:text-[#E21F26] md:inline-flex"
          >
            View All
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Cards carousel */}
        <div className="relative mt-10">
          {/* Navigation arrows overlaid on the container (like the LinkedIn carousel) */}
          {posts.length > 1 &&
            (['left', 'right'] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                className={[
                  'absolute top-1/2 z-20 -translate-y-1/2',
                  dir === 'left' ? 'left-1 lg:-left-4' : 'right-1 lg:-right-4',
                  'flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg lg:h-12 lg:w-12',
                  'text-gray-600 transition-all duration-300 hover:border-[#E21F26] hover:bg-red-50 hover:text-[#E21F26]',
                ].join(' ')}
                aria-label={`Scroll ${dir}`}
              >
                {dir === 'left' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            ))}

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className={[
              // Horizontal-only scroll: lock the vertical axis so wheel-scrolling
              // over the carousel scrolls the page, not the container. py gives
              // room for the card hover lift/shadow; overscroll-x-contain stops
              // horizontal over-scroll from triggering browser back-navigation.
              'flex gap-7 overflow-x-auto overflow-y-hidden overscroll-x-contain py-3',
              '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
              '[scroll-snap-type:x_mandatory]',
            ].join(' ')}
          >
            {posts.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="playbook-card flex w-[85%] shrink-0 snap-start sm:w-[70%] md:w-[calc(50%-14px)] lg:w-[calc(33.333%-19px)]"
              >
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="group flex w-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* Image */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-[#f5f5f5]">
                    {post.mainImage?.asset ? (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(340).url()}
                        alt={post.mainImage.alt || post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#f0f0f0]">
                        <span className="text-5xl font-black text-black/5">DN</span>
                      </div>
                    )}
                    {post.categories?.[0] && (
                      <span className="absolute left-3.5 top-3.5 z-10 rounded-full bg-[#E21F26] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                        {post.categories[0].title}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center gap-4">
                      {post.author && (
                        <span className="flex items-center gap-1.5 text-[12px] text-[#A1A1A1]">
                          <User size={12} />
                          {post.author.name}
                        </span>
                      )}
                      {post.publishedAt && (
                        <span className="flex items-center gap-1.5 text-[12px] text-[#A1A1A1]">
                          <Calendar size={12} />
                          {formatDate(post.publishedAt)}
                        </span>
                      )}
                    </div>

                    <h3 className="mb-2.5 line-clamp-2 text-[17px] font-bold leading-snug text-black">{post.title}</h3>

                    {post.excerpt && (
                      <p className="mb-4 line-clamp-3 text-[14px] leading-relaxed text-[#787878]">{post.excerpt}</p>
                    )}

                    <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#E21F26] transition-all duration-200 group-hover:gap-3">
                      Read More <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View all (mobile) */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href={VIEW_ALL_HREF}
            className="group inline-flex items-center gap-2 rounded-full border border-black/20 px-6 py-3 text-[13px] font-semibold text-black transition-all duration-200 hover:border-[#E21F26] hover:text-[#E21F26]"
          >
            View All
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
