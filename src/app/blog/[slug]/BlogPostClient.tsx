'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ChevronDown, User } from 'lucide-react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/image';

interface FaqItem {
  question: string;
  answer: string;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset: { _ref: string }; alt?: string };
  heroImageUrl?: string;
  excerpt?: string;
  publishedAt?: string;
  readTime?: number;
  faqsJson?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  categories?: { _id: string; title: string }[];
  author?: {
    name: string;
    slug?: { current: string };
    image?: { asset: { _ref: string } };
    bio?: string;
  };
}

function parseFaqs(json?: string): FaqItem[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) return parsed as FaqItem[];
  } catch { /* invalid JSON — silently ignore */ }
  return [];
}

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractHeadings(body: any[]): TocItem[] {
  return body
    .filter((b) => b.style === 'h2' || b.style === 'h3')
    .map((b) => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      id: slugify((b.children ?? []).map((c: any) => c.text).join('')),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      text: (b.children ?? []).map((c: any) => c.text).join(''),
      level: (b.style === 'h2' ? 2 : 3) as 2 | 3,
    }));
}

function makePortableComponents(isDummy: boolean): PortableTextComponents {
  return {
    types: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      image: ({ value }: { value: any }) => {
        if (!value?.asset?._ref) return null;
        return (
          <figure className="my-8">
            <Image src={urlFor(value).width(1200).url()} alt={value.alt || 'Blog image'} width={1200} height={675} className="w-full h-auto rounded-xl" />
            {value.caption && <figcaption className="text-center text-[13px] text-[#A1A1A1] mt-3 italic">{value.caption}</figcaption>}
          </figure>
        );
      },
    },
    marks: {
      link: ({ children, value }) => {
        const rel = !value.href?.startsWith('/') ? 'noopener noreferrer' : undefined;
        const target = !value.href?.startsWith('/') ? '_blank' : undefined;
        return <a href={value.href} target={target} rel={rel} className="text-[#E21F26] underline underline-offset-2">{children}</a>;
      },
      code: ({ children }) => (
        <code className="bg-[#f5f5f5] text-[#E21F26] px-1.5 py-0.5 rounded text-[0.9em] font-mono">{children}</code>
      ),
    },
    block: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      h2: ({ children, value }: any) => {
        const text = (value.children ?? []).map((c: { text: string }) => c.text).join('');
        const id = slugify(text);
        const isFaq = text === 'Frequently Asked Questions';
        return (
          <h2
            id={id}
            className={[
              'font-bold mt-12 mb-4 scroll-mt-32',
              isFaq
                ? 'text-[clamp(1.4rem,2.5vw,1.75rem)] text-[#E21F26] border-t border-black/10 pt-10'
                : 'text-[clamp(1.5rem,3vw,2rem)] text-black',
            ].join(' ')}
          >
            {children}
          </h2>
        );
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      h3: ({ children, value }: any) => {
        const text = (value.children ?? []).map((c: { text: string }) => c.text).join('');
        const id = slugify(text);
        return (
          <h3 id={id} className="text-[clamp(1.1rem,2vw,1.25rem)] font-semibold mt-6 mb-2 text-black scroll-mt-32">
            {children}
          </h3>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className="border-l-[3px] border-[#E21F26] pl-6 py-1 my-7 bg-[#fafafa] rounded-r-lg italic text-[#555555] text-[1.05rem] leading-[1.7]">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => (
        <p className="text-[1.05rem] leading-[1.85] text-[#444444] mb-5">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li className="text-[1.05rem] leading-[1.8] text-[#444444]">{children}</li>,
      number: ({ children }) => <li className="text-[1.05rem] leading-[1.8] text-[#444444]">{children}</li>,
    },
  };
}

function FaqAccordionItem({ faq, index }: { faq: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/10 last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-[15px] font-semibold text-black leading-snug">{faq.question}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#E21F26] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}
      >
        <p className="text-[15px] leading-relaxed text-[#555555]">{faq.answer}</p>
      </div>
    </div>
  );
}

export default function BlogPostClient({ post }: { post: Post }) {
  const headings = post.body ? extractHeadings(post.body) : [];
  const [activeId, setActiveId] = useState<string>('');
  const isDummy = !post.mainImage?.asset;
  const faqs = parseFaqs(post.faqsJson);

  useEffect(() => {
    if (!headings.length) return;
    const OFFSET = 140; // navbar height + buffer
    const onScroll = () => {
      const scrollY = window.scrollY + OFFSET;
      let current = headings[0].id;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.offsetTop <= scrollY) current = h.id;
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.body]);

  const heroSrc = post.heroImageUrl ?? (post.mainImage?.asset ? urlFor(post.mainImage).width(1920).height(700).url() : null);

  return (
    <article className="bg-white min-h-screen">
      {/* ── Hero Image ── */}
      <div className="relative w-full h-[320px] md:h-[440px] lg:h-[520px] overflow-hidden bg-[#f0f0f0] mt-14 md:mt-16 lg:mt-24 2xl:mt-28">
        {heroSrc ? (
          <Image src={heroSrc} alt={post.title} fill priority className="object-cover object-center" unoptimized={!!post.heroImageUrl} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f5f5f5] to-[#e8e8e8]">
            <span className="text-[120px] font-black text-black/5 leading-none">DN</span>
          </div>
        )}
        {/* Bottom blend into white */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/60 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Back link */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-[14px] text-[#A1A1A1] hover:text-black transition-colors duration-200 mt-4 mb-8">
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {/* Post header — full width above the two-column layout */}
          <div className="mb-10">
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-4">
                {post.categories.map((cat) => (
                  <span key={cat._id} className="bg-[#E21F26] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {cat.title}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-extrabold leading-[1.15] tracking-[-0.02em] text-black mb-5" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
              {post.title}
            </h1>

            <div className="flex items-center gap-5 flex-wrap mb-8">
              {post.author && (
                <div className="flex items-center gap-2.5">
                  {post.author.image?.asset ? (
                    <Image src={urlFor(post.author.image).width(40).height(40).url()} alt={post.author.name} width={40} height={40} className="rounded-full object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#f0f0f0] flex items-center justify-center">
                      <User size={16} className="text-[#A1A1A1]" />
                    </div>
                  )}
                  <span className="text-[15px] font-semibold text-black">{post.author.name}</span>
                </div>
              )}
              {post.publishedAt && (
                <span className="flex items-center gap-1.5 text-[14px] text-[#A1A1A1]">
                  <Calendar size={14} />
                  {formatDate(post.publishedAt)}
                </span>
              )}
              {post.readTime && (
                <span className="flex items-center gap-1.5 text-[14px] text-[#A1A1A1]">
                  <Clock size={14} />
                  {post.readTime} min read
                </span>
              )}
            </div>

            <div className="h-px bg-black/10" />
          </div>

          {/* ── Two-column: TOC + Body ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">

            {/* Table of Contents */}
            {headings.length > 0 && (
              <aside className="hidden lg:block sticky top-32 self-start">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A1A1A1] mb-4">Contents</p>
                <nav className="flex flex-col">
                  {headings.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })}
                      className={[
                        'text-left py-1.5 border-l-2 transition-all duration-200 cursor-pointer',
                        h.level === 3 ? 'pl-5 text-[13px]' : 'pl-3 text-[13px] font-medium',
                        activeId === h.id
                          ? 'border-[#E21F26] text-[#E21F26]'
                          : 'border-black/10 text-[#A1A1A1] hover:border-black/30 hover:text-black',
                      ].join(' ')}
                    >
                      {h.text}
                    </button>
                  ))}
                </nav>
              </aside>
            )}

            {/* Article body */}
            <div className="min-w-0">
              {post.body && <PortableText value={post.body} components={makePortableComponents(isDummy)} />}

              {/* FAQs from Sanity JSON field */}
              {faqs.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-[clamp(1.4rem,2.5vw,1.75rem)] font-bold text-[#E21F26] border-t border-black/10 pt-10 mb-6 scroll-mt-32" id="frequently-asked-questions">
                    Frequently Asked Questions
                  </h2>
                  <div className="flex flex-col">
                    {faqs.map((faq, i) => (
                      <FaqAccordionItem key={i} faq={faq} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom nav */}
              <div className="h-px bg-black/10 mt-14 mb-8" />
              <Link href="/blog" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#E21F26] hover:gap-3 transition-all duration-200">
                <ArrowLeft size={14} /> Back to all posts
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
