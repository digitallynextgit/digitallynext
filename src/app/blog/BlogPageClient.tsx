'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { urlFor } from '@/sanity/image';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset: { _ref: string }; alt?: string };
  heroImageUrl?: string;
  excerpt?: string;
  publishedAt?: string;
  categories?: { _id: string; title: string }[];
  author?: { name: string; image?: { asset: { _ref: string } } };
}

interface Category {
  _id: string;
  title: string;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogPageClient({ posts, categories }: { posts: Post[]; categories: Category[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allPosts = [...posts];
  const allCategories = [...categories];

  const filteredPosts = activeCategory
    ? allPosts.filter((p) => p.categories?.some((c) => c._id === activeCategory))
    : allPosts;

  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-36 md:pt-44 pb-12 md:pb-16 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#E21F26] mb-5">Our Blog</p>
            <h1
              className="font-extrabold leading-[1.05] tracking-[-0.03em] text-black"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
            >
              Insights &amp; Ideas<span className="text-[#E21F26]">.</span>
            </h1>
            <p
              className="mt-4 text-[#787878] max-w-130 leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
            >
              Strategies, trends, and thought leadership from the Digitally Next team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category Filters ── */}
      <div className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex gap-3 flex-wrap">
          <button
            onClick={() => setActiveCategory(null)}
            className={[
              'px-5 py-2 rounded-full text-[13px] font-semibold border transition-all duration-200 cursor-pointer',
              activeCategory === null
                ? 'bg-black text-white border-black'
                : 'bg-white text-[#555555] border-black/20 hover:border-black hover:text-black',
            ].join(' ')}
          >
            All
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat._id)}
              className={[
                'px-5 py-2 rounded-full text-[13px] font-semibold border transition-all duration-200 cursor-pointer',
                activeCategory === cat._id
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-[#555555] border-black/20 hover:border-black hover:text-black',
              ].join(' ')}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* ── Post Grid ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12 md:py-16 lg:py-20">
        {filteredPosts.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <p className="text-6xl mb-4 leading-none">📝</p>
            <h3 className="text-2xl font-bold mb-2 text-black">No posts yet</h3>
            <p className="text-[#787878] text-base">We&apos;re cooking up some great content. Check back soon!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex"
              >
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="group flex flex-col w-full bg-white border border-black/10 rounded-xl overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-16/10 overflow-hidden bg-[#f5f5f5]">
                    {post.mainImage?.asset ? (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(340).url()}
                        alt={post.mainImage.alt || post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : post.heroImageUrl ? (
                      <Image
                        src={post.heroImageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#f0f0f0]">
                        <span className="text-5xl font-black text-black/5">DN</span>
                      </div>
                    )}
                    {post.categories?.[0] && (
                      <span className="absolute top-3.5 left-3.5 bg-[#E21F26] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-10">
                        {post.categories[0].title}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-4 mb-3">
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

                    <h3 className="text-[17px] font-bold leading-snug text-black mb-2.5 line-clamp-2">{post.title}</h3>

                    {post.excerpt && (
                      <p className="text-[14px] text-[#787878] leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                    )}

                    <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#E21F26] group-hover:gap-3 transition-all duration-200">
                      Read More <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
