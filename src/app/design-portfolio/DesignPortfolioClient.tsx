'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

// ============================================================
// CAROUSEL DATA
// ============================================================
type CarouselSlide = {
  url: string;
  src: string;
  name: string;
  platform: string;
  fallback: ReactNode;
  fallbackBg: CSSProperties;
  screenshotSrc?: string;
  // When true, render a live <iframe> instead of an mShots screenshot.
  // Only enable this for sites that explicitly allow being framed (no
  // X-Frame-Options or frame-ancestors restrictions). Domain must also
  // be present in next.config.ts CSP frame-src.
  useIframe?: boolean;
};

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    url: 'adventglobal.com',
    src: 'https://adventglobal.com',
    name: 'Advent Global',
    platform: 'WordPress',
    fallbackBg: { background: '#090e1a', color: 'white' },
    fallback: (
      <FallbackShell>
        <FallbackNav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="font-bold text-[11px] tracking-[0.5px] shrink-0 text-[#e21f26]">ADVENT GLOBAL</div>
          <div className="flex gap-2 flex-1">
            <FallbackPill width={38} />
            <FallbackPill width={30} />
            <FallbackPill width={44} />
            <FallbackPill width={34} />
          </div>
          <FallbackCTA className="bg-[#e21f26] text-white">Contact Us</FallbackCTA>
        </FallbackNav>
        <FallbackBody>
          <FallbackTag style={{ color: '#e21f26' }}>IT Services · SAP · QA · Staffing</FallbackTag>
          <FallbackH1 style={{ fontSize: 22 }}>
            Innovate,<br />Transform,<br /><span style={{ color: '#e21f26' }}>Succeed</span>
          </FallbackH1>
          <FallbackSub>Think, Emerge, Connect, Hustle</FallbackSub>
          <div className="flex gap-2">
            <FallbackBtn className="bg-[#e21f26] text-white">Our Services</FallbackBtn>
            <FallbackBtn className="border border-white/20 text-white">About Us</FallbackBtn>
          </div>
        </FallbackBody>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 w-[90px] h-[90px] rounded-full border border-[rgba(226,31,38,0.15)] bg-[radial-gradient(circle,#e21f2620,transparent)]" />
      </FallbackShell>
    ),
  },
  {
    url: 'khaleej.in',
    src: 'https://khaleej.in',
    name: 'Khaleej',
    platform: 'Shopify',
    fallbackBg: { background: '#fafaf8', color: '#1a1a1a' },
    fallback: (
      <FallbackShell>
        <FallbackNav style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', justifyContent: 'space-between' }}>
          <div className="flex gap-3 flex-none">
            <FallbackPill width={36} style={{ background: '#1a1a1a' }} />
            <FallbackPill width={48} style={{ background: '#1a1a1a' }} />
            <FallbackPill width={36} style={{ background: '#1a1a1a' }} />
          </div>
          <div className="font-semibold text-[14px] tracking-[4px] text-[#1a1a1a] shrink-0">KHALEEJ</div>
          <div className="flex gap-2.5 items-center">
            <div className="w-4 h-4 rounded-full bg-[#1a1a1a] opacity-20" />
            <div className="w-4 h-4 rounded-full bg-[#1a1a1a] opacity-20" />
          </div>
        </FallbackNav>
        <div className="px-[18px] py-2 flex-1 flex flex-col">
          <div className="text-[9px] tracking-[2px] uppercase opacity-40 mb-1.5 text-center">New Season Collection</div>
          <div className="flex gap-1.5 mt-2.5">
            <div className="flex-1 rounded-md h-[130px] relative bg-[linear-gradient(180deg,#e8d5c4,#c9a882)]">
              <div className="absolute bottom-2 left-2 text-[8px] font-semibold text-[#1a1a1a] opacity-70">Capes</div>
            </div>
            <div className="flex flex-col gap-1.5 flex-[0.7]">
              <div className="flex-1 rounded-md h-[60px] bg-[linear-gradient(180deg,#6d28d9,#4c1d95)]" />
              <div className="flex-1 rounded-md h-[60px] bg-[linear-gradient(180deg,#374151,#1f2937)]" />
            </div>
          </div>
          <div className="text-[8px] font-semibold tracking-[0.5px] py-1.5 opacity-60 truncate mt-2 text-[#1a1a1a]">
            Designer Capes · Ponchos · Kaftans · Co-ord Sets · Dresses · Night Wear
          </div>
        </div>
      </FallbackShell>
    ),
  },
  {
    url: 'gajnaoverseas.com',
    src: 'https://gajnaoverseas.com',
    name: 'Gajna Overseas',
    platform: 'Next.js',
    useIframe: true,
    fallbackBg: { background: '#1c0a00', color: '#f0d5a8' },
    fallback: (
      <FallbackShell>
        <FallbackNav style={{ borderBottom: '1px solid rgba(240,213,168,0.1)' }}>
          <div className="font-bold text-[10px] tracking-[2px] shrink-0 text-[#d4a255]">GAJNA OVERSEAS</div>
          <div className="flex gap-2 flex-1">
            <FallbackPill width={36} style={{ background: '#d4a255' }} />
            <FallbackPill width={30} style={{ background: '#d4a255' }} />
            <FallbackPill width={44} style={{ background: '#d4a255' }} />
          </div>
          <FallbackCTA className="bg-[#d4a255] text-[#1c0a00]">Export Inquiry</FallbackCTA>
        </FallbackNav>
        <FallbackBody>
          <FallbackTag style={{ color: '#d4a255' }}>Green Coffee Beans · Indian Origin</FallbackTag>
          <FallbackH1 style={{ color: '#f0d5a8' }}>
            Gajna Coffee<br /><span style={{ color: '#d4a255' }}>Brewing</span><br />Excellence...
          </FallbackH1>
          <FallbackSub style={{ color: '#f0d5a8' }}>Exporter of premium green coffee beans. USA · Europe · Middle East</FallbackSub>
          <div className="flex gap-2">
            <FallbackBtn className="bg-[#d4a255] text-[#1c0a00]">Our Coffees</FallbackBtn>
            <FallbackBtn className="border border-[rgba(212,162,85,0.35)] text-[#d4a255]">Our Story</FallbackBtn>
          </div>
        </FallbackBody>
        <div className="absolute right-4 bottom-4 w-16 h-16 rounded-full border-[1.5px] border-[rgba(212,162,85,0.3)] bg-[radial-gradient(#6b3000,#1c0a00)]" />
      </FallbackShell>
    ),
  },
  {
    url: 'talentifix.com',
    src: 'https://talentifix.com',
    name: 'Talentifix',
    platform: 'Next.js',
    fallbackBg: { background: '#08091a', color: 'white' },
    fallback: (
      <FallbackShell>
        <FallbackNav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-[linear-gradient(135deg,#f093fb,#f5576c)]" />
            <div className="font-bold text-[11px] tracking-[0.5px] text-white">TalentiFi-X</div>
          </div>
          <div className="flex gap-2 flex-1">
            <FallbackPill width={36} />
            <FallbackPill width={30} />
            <FallbackPill width={44} />
          </div>
          <FallbackCTA className="bg-[linear-gradient(90deg,#f093fb,#f5576c)] text-white">Get Started</FallbackCTA>
        </FallbackNav>
        <FallbackBody>
          <FallbackTag style={{ color: '#f093fb' }}>AI-Powered Talent Platform</FallbackTag>
          <FallbackH1 style={{ color: 'white' }}>
            Intelligent Hiring<br />for the{' '}
            <span className="bg-[linear-gradient(90deg,#f093fb,#f5576c)] bg-clip-text text-transparent">AI Age</span>
          </FallbackH1>
          <FallbackSub>Where intelligent matching meets human potential</FallbackSub>
          <div className="flex gap-2">
            <FallbackBtn className="bg-[linear-gradient(90deg,#f093fb,#f5576c)] text-white">Hire Talent</FallbackBtn>
            <FallbackBtn className="border border-[rgba(240,147,251,0.3)] text-[#f093fb]">Find Jobs</FallbackBtn>
          </div>
        </FallbackBody>
        <div className="absolute right-0 top-0 w-[120px] h-[120px] pointer-events-none bg-[radial-gradient(#f093fb15,transparent)]" />
      </FallbackShell>
    ),
  },
  {
    url: 'houseofnandini.com',
    src: 'https://houseofnandini.com',
    name: 'House of Nandini',
    platform: 'Shopify',
    screenshotSrc: '/portfolio/house-of-nandini-preview.png',
    fallbackBg: { background: '#f5e6d3', color: '#2d1a0e' },
    fallback: (
      <FallbackShell>
        <FallbackNav style={{ borderBottom: '1px solid rgba(45,26,14,0.1)', justifyContent: 'space-between' }}>
          <div />
          <div className="font-semibold text-[12px] tracking-[3px] shrink-0 font-serif">HOUSE OF NANDINI</div>
          <FallbackCTA className="border-[1.5px] border-[rgba(45,26,14,0.3)] text-[#2d1a0e] !text-[7px]">Shop Now</FallbackCTA>
        </FallbackNav>
        <FallbackBody>
          <FallbackTag style={{ color: '#8b5e3c' }}>Lucknow&apos;s Finest · Chikankari Artisan</FallbackTag>
          <FallbackH1 className="font-serif" style={{ color: '#2d1a0e', fontSize: 19 }}>The Art of<br />Chikankari</FallbackH1>
          <FallbackSub style={{ color: '#6b4226' }}>Handcrafted ethnic wear · Made with love · Heritage fashion for the modern woman</FallbackSub>
          <div className="flex gap-2">
            <FallbackBtn className="bg-[#2d1a0e] text-[#f5e6d3]">Explore Collection</FallbackBtn>
          </div>
          <div className="flex gap-1.5 mt-2.5">
            <div className="flex-1 rounded-md h-[50px] opacity-70 bg-[linear-gradient(135deg,#c9a882,#a07850)]" />
            <div className="flex-1 rounded-md h-[50px] opacity-70 bg-[linear-gradient(135deg,#8b5e3c,#6b4226)]" />
            <div className="flex-1 rounded-md h-[50px] opacity-70 bg-[linear-gradient(135deg,#d4a574,#b8845a)]" />
          </div>
        </FallbackBody>
      </FallbackShell>
    ),
  },
  {
    url: 'neotechworldlab.com',
    src: 'https://neotechworldlab.com',
    name: 'NeoTech World Lab',
    platform: 'Next.js',
    fallbackBg: { background: '#001f4d', color: 'white' },
    fallback: (
      <FallbackShell>
        <FallbackNav style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="font-bold text-[10px] tracking-[1.5px] shrink-0 text-white">NEOTECH WORLD LAB</div>
          <div className="flex gap-2 flex-1">
            <FallbackPill width={44} />
            <FallbackPill width={36} />
            <FallbackPill width={52} />
          </div>
          <FallbackCTA className="bg-[#0ea5e9] text-white">Book a Test</FallbackCTA>
        </FallbackNav>
        <FallbackBody>
          <FallbackTag style={{ color: '#7dd3fc' }}>Genetic Testing · Healthcare · B2B & B2C</FallbackTag>
          <FallbackH1 style={{ color: 'white' }}>
            Advanced Genetic<br />Testing <span style={{ color: '#0ea5e9' }}>Solutions</span>
          </FallbackH1>
          <FallbackSub>Making complex science clear, trustworthy, and accessible. India &amp; Global markets.</FallbackSub>
          <div className="flex gap-2">
            <FallbackBtn className="bg-[#0ea5e9] text-white">Our Tests</FallbackBtn>
            <FallbackBtn className="border border-[rgba(14,165,233,0.35)] text-[#7dd3fc]">For Institutions</FallbackBtn>
          </div>
          <FallbackStats>
            <FallbackStat n="50+" l="Tests Available" color="#0ea5e9" />
            <FallbackStat n="B2B" l="& B2C" color="#0ea5e9" />
            <FallbackStat n="India" l="& Global" color="#0ea5e9" />
          </FallbackStats>
        </FallbackBody>
      </FallbackShell>
    ),
  },
  {
    url: 'mauli.co',
    src: 'https://mauli.co',
    name: 'Mauli',
    platform: 'Shopify',
    fallbackBg: { background: '#f7f4f0', color: '#1a1a1a' },
    fallback: (
      <FallbackShell>
        <div className="flex items-center gap-3 px-5 py-3.5 shrink-0 justify-between border-b border-black/[0.07]">
          <div className="flex gap-3.5 text-[8px] text-black/40 font-medium uppercase tracking-[1.5px] items-center">
            <span>Women</span><span>Men</span><span>Capes</span>
          </div>
          <div className="text-[16px] font-light tracking-[6px] text-[#1a1a1a] font-serif">MAULI</div>
          <div className="flex gap-2.5 items-center text-[8px] text-black/40 tracking-[1px]">
            <span>SEARCH</span><span>BAG (0)</span>
          </div>
        </div>
        <FallbackBody className="items-center text-center">
          <div className="text-[8px] tracking-[3px] uppercase text-black/35 mb-2">Pure Cashmere · Handcrafted</div>
          <div className="text-[19px] font-light tracking-wide text-[#1a1a1a] font-serif leading-[1.3] mb-2.5">Mauli Cashmere</div>
          <div className="text-[8px] text-black/45 tracking-[0.5px] max-w-[180px] leading-[1.6] mb-3.5">Buy Pure Cashmere Shawls Online, Handcrafted with Love</div>
          <div className="flex gap-2 justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#8b7355] border border-black/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#d4c4b0] border border-black/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#c9a882] border border-black/10" />
          </div>
        </FallbackBody>
        <div className="absolute bottom-5 left-0 right-0 text-center">
          <div className="text-[7px] tracking-[2px] uppercase text-black/25">INDIA | ₹  ·  GLOBAL | $</div>
        </div>
      </FallbackShell>
    ),
  },
  {
    url: 'sanjivaniedge.com',
    src: 'https://sanjivaniedge.com',
    name: 'Sanjivani Edge',
    platform: 'Next.js',
    fallbackBg: { background: '#0a0f1e', color: 'white' },
    fallback: (
      <FallbackShell>
        <FallbackNav style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-[7px]">
            <div className="w-[18px] h-[18px] rounded bg-[linear-gradient(135deg,#22d3ee,#3b82f6)]" />
            <div className="font-bold text-[10px] tracking-[0.5px] text-white">SANJIVANI EDGE</div>
          </div>
          <div className="flex gap-2 flex-1">
            <FallbackPill width={44} />
            <FallbackPill width={36} />
            <FallbackPill width={52} />
          </div>
          <FallbackCTA className="border border-[rgba(34,211,238,0.4)] text-[#22d3ee]">Get In Touch</FallbackCTA>
        </FallbackNav>
        <FallbackBody>
          <FallbackTag style={{ color: '#22d3ee' }}>IT · ERP · Digital Transformation</FallbackTag>
          <FallbackH1 style={{ color: 'white', fontSize: 17 }}>
            Rooted in Values...<br /><span style={{ color: '#22d3ee' }}>Engineered for</span><br />the Future...
          </FallbackH1>
          <FallbackSub className="mt-2">Delivering IT, ERP, and Digital Transformation Solutions that power enterprise evolution.</FallbackSub>
          <FallbackStats>
            <FallbackStat n="8" l="Domains" color="#22d3ee" />
            <FallbackStat n="100%" l="Delivery Gov." color="#22d3ee" />
            <FallbackStat n="200+" l="Capabilities" color="#22d3ee" />
          </FallbackStats>
        </FallbackBody>
        <div className="absolute right-3.5 bottom-3.5 w-[60px] h-[60px] rounded-full border border-[rgba(34,211,238,0.1)] bg-[radial-gradient(#22d3ee15,transparent)]" />
      </FallbackShell>
    ),
  },
  {
    url: 'opinovafoundation.com',
    src: 'https://opinovafoundation.com',
    name: 'Opinova Foundation',
    platform: 'Next.js',
    fallbackBg: { background: '#032a1e', color: 'white' },
    fallback: (
      <FallbackShell>
        <FallbackNav style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-[7px]">
            <div className="w-[18px] h-[18px] rounded-full bg-white/15 flex items-center justify-center text-[9px] font-bold text-white">O</div>
            <div className="font-bold text-[10px] tracking-[0.5px] text-white">OPINOVA FOUNDATION</div>
          </div>
          <div className="flex gap-2 flex-1">
            <FallbackPill width={44} />
            <FallbackPill width={36} />
            <FallbackPill width={36} />
            <FallbackPill width={44} />
          </div>
          <FallbackCTA className="bg-[#059669] text-white">Contribute</FallbackCTA>
        </FallbackNav>
        <FallbackBody>
          <FallbackH1 style={{ color: 'white', fontSize: 17, textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
            EMPOWERING<br />COMMUNITIES.<br />
            <span style={{ color: '#34d399', fontSize: 14, textTransform: 'none', letterSpacing: 0 }}>Inspiring Change.</span>
          </FallbackH1>
          <FallbackSub className="mt-2.5">Building capacity, confidence, and opportunity so every empowered life sparks change for others.</FallbackSub>
          <FallbackStats>
            <FallbackStat n="1000+" l="Healthcare" color="#34d399" />
            <FallbackStat n="200+" l="Mentorship hrs" color="#34d399" />
            <FallbackStat n="100+" l="Rural families" color="#34d399" />
          </FallbackStats>
        </FallbackBody>
        <div className="absolute right-0 top-0 w-[100px] h-[100px] pointer-events-none bg-[radial-gradient(#05966920,transparent)]" />
      </FallbackShell>
    ),
  },
  {
    url: 'h2s.co.in',
    src: 'https://h2s.co.in',
    name: 'Hard2Soft',
    platform: 'Shopify',
    screenshotSrc: '/portfolio/h2s-preview.png',
    fallbackBg: { background: '#f0f9ff', color: '#0c4a6e' },
    fallback: (
      <FallbackShell>
        <div className="text-[7px] font-semibold tracking-[1px] py-1 truncate text-center text-white bg-[#0ea5e9]">
          Extra ₹50 off on prepaid orders  ·  Free Delivery  ·  Pan India Delivery
        </div>
        <FallbackNav style={{ borderBottom: '1px solid rgba(12,74,110,0.08)' }}>
          <div className="flex gap-2 flex-1">
            <FallbackPill width={36} style={{ background: '#0c4a6e' }} />
            <FallbackPill width={52} style={{ background: '#0c4a6e' }} />
            <FallbackPill width={36} style={{ background: '#0c4a6e' }} />
          </div>
          <div className="w-8 h-8 rounded-lg shrink-0 bg-[linear-gradient(135deg,#0ea5e9,#0369a1)]" />
          <div className="flex gap-2.5 items-center">
            <FallbackCTA className="bg-[#0369a1] text-white">Shop Now</FallbackCTA>
          </div>
        </FallbackNav>
        <FallbackBody>
          <div className="flex items-center gap-3.5">
            <div className="flex-1">
              <FallbackTag style={{ color: '#0369a1' }}>Water Softener · Hard Water Solution · India</FallbackTag>
              <FallbackH1 style={{ color: '#0c4a6e', fontSize: 19 }}>
                Pure Water,<br />Better <span style={{ color: '#0369a1' }}>Living.</span>
              </FallbackH1>
              <FallbackSub style={{ color: '#0c4a6e' }}>Hard2Soft water softener cartridge. Simple, trustworthy, easy to install.</FallbackSub>
              <div className="flex gap-2 mt-2.5">
                <FallbackBtn className="bg-[#0369a1] text-white">Buy Now</FallbackBtn>
                <FallbackBtn className="border border-[rgba(3,105,161,0.3)] text-[#0369a1]">How It Works</FallbackBtn>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full border-[3px] border-white shrink-0 shadow-[0_4px_16px_rgba(14,165,233,0.2)] bg-[radial-gradient(#bae6fd,#7dd3fc)]" />
          </div>
        </FallbackBody>
      </FallbackShell>
    ),
  },
];

// ============================================================
// SHARED FALLBACK BUILDING BLOCKS
// (kept here so each slide stays declarative)
// ============================================================
function FallbackShell({ children }: { children: ReactNode }) {
  return <div className="absolute inset-0 z-[1] flex flex-col overflow-hidden font-[var(--font-body,inherit)]">{children}</div>;
}
function FallbackNav({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div className="flex items-center gap-3 px-[18px] py-3 shrink-0" style={style}>{children}</div>;
}
function FallbackBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex-1 px-5 py-3.5 flex flex-col justify-center', className)}>{children}</div>;
}
function FallbackTag({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div className="text-[8px] font-bold tracking-[2px] uppercase opacity-55 mb-1.5" style={style}>{children}</div>;
}
function FallbackH1({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  return <div className={cn('text-[20px] font-bold leading-[1.1] tracking-[-0.8px] mb-2', className)} style={style}>{children}</div>;
}
function FallbackSub({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  return <div className={cn('text-[9px] leading-[1.6] opacity-50 max-w-[200px] mb-3', className)} style={style}>{children}</div>;
}
function FallbackBtn({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('h-6 rounded-full px-3.5 text-[8px] font-bold inline-flex items-center', className)}>{children}</div>;
}
function FallbackCTA({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('h-[22px] rounded-full shrink-0 opacity-90 px-3 flex items-center text-[8px] font-bold tracking-[0.5px]', className)}>{children}</div>;
}
function FallbackPill({ width, style }: { width: number; style?: CSSProperties }) {
  return <div className="h-[7px] rounded-[3px] bg-current opacity-[0.18]" style={{ width, ...style }} />;
}
function FallbackStats({ children }: { children: ReactNode }) {
  return <div className="flex gap-4 mt-3 pt-3 border-t border-current opacity-100">{children}</div>;
}
function FallbackStat({ n, l, color }: { n: string; l: string; color: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="text-[15px] font-bold tracking-[-0.5px]" style={{ color }}>{n}</div>
      <div className="text-[7px] uppercase tracking-[1px] opacity-45">{l}</div>
    </div>
  );
}

// ============================================================
// FILTERS / FAQS / DATA
// ============================================================
type FilterKey =
  | 'all' | 'technology' | 'fashion' | 'healthcare' | 'food' | 'home'
  | 'social' | 'b2b' | 'd2c' | 'wordpress' | 'shopify' | 'nextjs';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'technology', label: 'Technology' },
  { key: 'fashion', label: 'Fashion & Apparel' },
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'food', label: 'Food & Beverage' },
  { key: 'home', label: 'Home & Lifestyle' },
  { key: 'social', label: 'Social Sector' },
  { key: 'b2b', label: 'B2B' },
  { key: 'd2c', label: 'D2C' },
  { key: 'wordpress', label: 'WordPress' },
  { key: 'shopify', label: 'Shopify' },
  { key: 'nextjs', label: 'Next.js' },
];

const FAQS = [
  { q: 'How long does it take to build a website with Digitally Next?', a: "Timelines depend on the scope and complexity of the project. A standard WordPress or Shopify website development project typically goes live in 4 to 6 weeks. Custom coded websites on Next.js or React.js may take 8 to 12 weeks. We always agree on a fixed timeline before the project begins — and we stick to it. Our clients in the USA, Canada, and Australia consistently note that our structured delivery process removes the uncertainty they've experienced with other agencies." },
  { q: 'What platforms do you build websites on?', a: "We build on WordPress, Shopify, Next.js, and React.js, as well as fully custom coded solutions depending on your business needs. As a website design and development agency in India with 10+ years of experience, our team recommends the right platform based on your goals, target audience, budget, and long-term scalability — whether you're a D2C brand in the USA or a B2B enterprise in the Middle East." },
  { q: 'Do you work with clients based in the USA, Canada, Australia, and other countries?', a: 'Yes — we are an India-based web design agency actively working with international clients across the USA, Canada, Australia, New Zealand, the Middle East, and Europe. We have structured global servicing frameworks including dedicated points of contact, timezone-aligned calls, and fortnightly progress reports. Distance has never been a barrier to delivering world-class website development.' },
  { q: 'Is the website built with SEO and AEO in mind?', a: 'Absolutely. Every website we build includes on-page SEO as a standard part of our 11-step process — from meta titles and descriptions to structured content, fast loading speeds, and mobile-first optimisation. We also ensure the website is AEO (Answer Engine Optimisation) and GEO (Generative Engine Optimisation) ready, so it has the best chance of being featured in AI-powered search results on platforms like Google AI Overviews, ChatGPT, and Perplexity.' },
  { q: 'What is included in the website handover?', a: "Every website we deliver — whether it's a WordPress site, Shopify store, or custom Next.js build — comes with a hands-on training session for your team, full documentation, and an official handover. We also offer post-handover support and maintenance packages for clients who want continued assistance after go-live." },
  { q: 'Can you handle both design and development, or do we need to bring our own designer?', a: 'We handle everything in-house — brand strategy, content writing, UI/UX design, and website development. You bring your vision and business goals. Our six specialist teams take care of the rest, end to end. This is what makes Digitally Next different from a typical web development agency — we are a full-service creative and technical partner.' },
  { q: 'What makes Digitally Next different from other web development agencies in India?', a: "We don't just build websites — we build digital business assets. Every project goes through a structured 11-step process covering research, user journey mapping, content strategy, visual design, development, quality optimisation, and handover. With 10+ years of experience, 50+ websites delivered across 6 industries, and clients in the USA, Canada, Australia, Middle East, and India — we bring both creative depth and strategic thinking to every project we take on." },
];

const PROCESS_STEPS = [
  { n: '01', title: 'Understand', desc: 'Business requirements, stakeholders & expectations.' },
  { n: '02', title: 'Study, Research & Benchmark', desc: 'Competitor analysis, reference websites & new tech relevant to your project.' },
  { n: '03', title: 'Prepare', desc: 'User & visitor journey mapping — for prospects, existing clients & partners.' },
  { n: '04', title: 'Finalise Structure', desc: 'Sitemap, domain name & hosting subscriptions.' },
  { n: '05', title: 'Content Creation', desc: 'Conversion-centric, SEO & AEO friendly content written for real users.' },
  { n: '06', title: 'Visuals', desc: 'Banners & creatives for WordPress/Shopify OR UI/UX framework & wireframes for coded websites.' },
  { n: '07', title: 'Development', desc: 'Custom coding, theme & template customisation, platform configuration, API & plugin integration.' },
  { n: '08', title: 'Quality & Optimisation', desc: 'Mobile optimisation, speed & performance testing, cross-browser testing.' },
  { n: '09', title: 'Analytics, On-Page SEO & UAT', desc: 'Google Analytics integration, on-page SEO initiated & user acceptance testing.' },
  { n: '10', title: 'Go Live & Training', desc: 'Formal launch + hands-on training session for your team.' },
  { n: '11', title: 'Handover', desc: 'Official handover of the website with full documentation. Your site. Your ownership. Completely.', wide: true },
];

const COUNTRIES: { code: string; name: string }[] = [
  { code: 'in', name: 'India' },
  { code: 'us', name: 'United States' },
  { code: 'ca', name: 'Canada' },
  { code: 'au', name: 'Australia' },
  { code: 'nz', name: 'New Zealand' },
  { code: 'ae', name: 'UAE' },
  { code: 'sa', name: 'Saudi Arabia' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'sg', name: 'Singapore' },
  { code: 'de', name: 'Germany' },
  { code: 'nl', name: 'Netherlands' },
  { code: 'bh', name: 'Bahrain' },
];

// ============================================================
// SHARED CLASS STRINGS — sections share the same padding cadence
// ============================================================
const SECTION_PAD = 'py-[100px] px-[60px] max-[1100px]:py-[70px] max-[1100px]:px-[30px] max-[700px]:py-[60px] max-[700px]:px-5';
const SECTION_HEADLINE = "font-['Stack_Sans_Headline','Stack_Sans_Text',sans-serif] text-[clamp(36px,5vw,64px)] font-bold tracking-[-2px] leading-[1.05] mb-4 text-[#0A0A0A]";
const SECTION_LABEL = 'text-[11px] font-bold tracking-[3px] uppercase mb-4 text-[#ED2226]';
const SECTION_SUBLINE = 'text-base font-normal leading-[1.7] text-[#666] max-w-[560px] mb-[60px] max-[700px]:mb-8';
const REVEAL_DELAY = ['', '[transition-delay:0.1s]', '[transition-delay:0.2s]', '[transition-delay:0.3s]'];

// Reusable inline animation strings — kept here so Tailwind's arbitrary-value
// parser never has to deal with cubic-bezier() commas (which it mangles).
const EASE = 'cubic-bezier(0.25,0.46,0.45,0.94)';
const fadeUp = (duration: string, delay = '0s'): CSSProperties => ({
  animation: `dpFadeUp ${duration} ${delay} ${EASE} both`,
});


// ============================================================
// PAGE
// ============================================================
export default function DesignPortfolioClient() {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [hasMounted, setHasMounted] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const carouselOuterRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { setHasMounted(true); }, []);

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;
    const root = rootRef.current;
    if (!cursor || !ring || !root) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf = 0;
    let revealed = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
      if (!revealed) {
        revealed = true;
        rx = mx; ry = my;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        cursor.style.opacity = '1';
        ring.style.opacity = '0.5';
      }
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      raf = requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animateRing);

    const hoverEls = root.querySelectorAll('a, button, [data-cursor-hover]');
    const onEnter = () => { cursor.classList.add('hover'); ring.classList.add('hover'); };
    const onLeave = () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); };
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      hoverEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [filter, hasMounted]);

  // Carousel positioning
  const positionCarousel = (idx: number, instant = false) => {
    const track = carouselTrackRef.current;
    const outer = carouselOuterRef.current;
    if (!track || !outer) return;
    const CARD_W = 420;
    const STRIDE = CARD_W + 20;
    const offset = Math.max(0, (outer.offsetWidth - CARD_W) / 2);
    const tx = -(idx * STRIDE) + offset;
    if (instant) {
      track.style.transition = 'none';
      track.style.transform = `translateX(${tx}px)`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { track.style.transition = ''; });
      });
    } else {
      track.style.transform = `translateX(${tx}px)`;
    }
  };

  useEffect(() => { positionCarousel(carouselIdx, false); }, [carouselIdx]);

  useEffect(() => {
    const init = () => positionCarousel(carouselIdx, true);
    if (document.readyState === 'complete') init();
    else window.addEventListener('load', init);
    const onResize = () => positionCarousel(carouselIdx, true);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('load', init);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-advance
  useEffect(() => {
    const clearTimer = () => { if (autoTimer.current) clearInterval(autoTimer.current); };
    const start = () => {
      clearTimer();
      autoTimer.current = setInterval(() => {
        setCarouselIdx(i => (i + 1) % CAROUSEL_SLIDES.length);
      }, 3600);
    };
    start();
    const outer = carouselOuterRef.current;
    if (!outer) return clearTimer;
    outer.addEventListener('mouseenter', clearTimer);
    outer.addEventListener('mouseleave', start);
    return () => {
      clearTimer();
      outer.removeEventListener('mouseenter', clearTimer);
      outer.removeEventListener('mouseleave', start);
    };
  }, []);

  // Touch swipe
  useEffect(() => {
    const outer = carouselOuterRef.current;
    if (!outer) return;
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) {
        setCarouselIdx(i => {
          const len = CAROUSEL_SLIDES.length;
          return dx < 0 ? (i + 1) % len : (i - 1 + len) % len;
        });
      }
    };
    outer.addEventListener('touchstart', onStart, { passive: true });
    outer.addEventListener('touchend', onEnd);
    return () => {
      outer.removeEventListener('touchstart', onStart);
      outer.removeEventListener('touchend', onEnd);
    };
  }, []);

  // Scroll reveal — IntersectionObserver fades elements in as they enter view.
  // Observation is deferred via double-rAF so the initial opacity:0 state is
  // committed to the GPU before the first observer callback fires; otherwise
  // above-the-fold elements snap to visible without ever transitioning.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', '1');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        root.querySelectorAll('.dp-reveal').forEach((el) => observer.observe(el));
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      observer.disconnect();
    };
  }, []);


  return (
    <div ref={rootRef} className="dp-page bg-white text-[#0A0A0A] overflow-x-hidden font-['Stack_Sans_Text',sans-serif]">
      {hasMounted && createPortal(
        <>
          <div className="dp-cursor" ref={cursorRef} />
          <div className="dp-cursor-ring" ref={cursorRingRef} />
        </>,
        document.body,
      )}

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen grid grid-cols-2 items-center px-[60px] pt-[140px] pb-20 bg-[#FAFAF8] overflow-hidden max-[1100px]:grid-cols-1 max-[1100px]:px-[30px] max-[1100px]:pt-[120px] max-[1100px]:pb-[60px] max-[700px]:px-5 max-[700px]:pt-[110px]"
      >
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[linear-gradient(90deg,#ED2226_0%,#0EC8C5_100%)]" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
          }}
        />

        {/* HERO LEFT */}
        <div className="flex flex-col justify-center pr-12 z-[2] max-[1100px]:pr-0">
          <div className="flex items-center gap-3 mb-7 max-[700px]:mb-5 max-[700px]:flex-wrap" style={fadeUp('0.8s')}>
            <span className="text-[11px] font-bold tracking-[2px] uppercase text-[#ED2226] bg-[rgba(237,34,38,0.07)] px-3.5 py-1.5 rounded-full">
              Website Design &amp; Development Agency India
            </span>
            <div className="w-10 h-[1.5px] bg-[#ED2226]" />
          </div>

          <h1
            className="font-['Stack_Sans_Headline','Stack_Sans_Text',sans-serif] text-[clamp(40px,5.5vw,84px)] font-bold leading-[0.95] tracking-[-3px] max-[700px]:tracking-[-1.5px] text-[#0A0A0A] mb-6 max-[700px]:mb-4"
            style={fadeUp('0.9s', '0.1s')}
          >
            Websites That<br />
            Mean <span className="text-[#ED2226]">Business.</span>
          </h1>

          <div className="flex flex-col max-[700px]:gap-[30px]" style={fadeUp('0.9s', '0.25s')}>
            <h2
              className="text-[clamp(13px,1.1vw,16px)] font-normal leading-[1.75] text-[#555] max-w-[460px] mb-8 max-[700px]:mb-5 [&_strong]:text-[#0A0A0A] [&_strong]:font-semibold"
              style={fadeUp('0.9s', '0.2s')}
            >
              A <strong>website design and development agency in India</strong>, building for brands across the <strong>USA, Canada, Australia,</strong> and beyond. Every website starts with understanding your world — and ends with something your audience remembers.
            </h2>

            <div className="flex items-center gap-5 flex-wrap mb-10 max-[700px]:mb-6">
              <Link
                href="/contact"
                className="relative overflow-hidden inline-flex items-center gap-2.5 bg-[#ED2226] text-white px-8 py-4 rounded-full text-sm font-bold tracking-[0.3px] transition-transform duration-200 hover:scale-[1.04] hover:shadow-[0_16px_48px_rgba(237,34,38,0.35)] before:content-[''] before:absolute before:inset-0 before:bg-[#0EC8C5] before:-translate-x-full before:transition-transform before:duration-[400ms] hover:before:translate-x-0 [&>span]:relative [&>span]:z-[1] [&>svg]:relative [&>svg]:z-[1]"
              >
                <span>Book a Free 30-min Call</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
              </Link>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 text-[#0A0A0A] text-[13px] font-semibold tracking-[0.3px] transition-[color,gap] duration-200 hover:text-[#ED2226] hover:gap-3.5"
              >
                See Our Work
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 max-[380px]:gap-3" style={fadeUp('0.9s', '0.35s')}>
            <div
              className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-[linear-gradient(to_bottom_right,#ED2226,#c41a1e)] shadow-[0_8px_20px_rgba(237,34,38,0.25)]"
              style={{ animation: 'dpFloat 4s ease-in-out infinite' }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 4h3v3a3 3 0 0 1-3 3M7 4H4v3a3 3 0 0 0 3 3" />
              </svg>
            </div>
            <div className="text-xs text-[#888] leading-[1.5]">
              <strong className="block text-[#0A0A0A] font-semibold text-[13px]">10+ Years of Web Experience</strong>
              50+ websites · 6 industries · Global delivery
            </div>
          </div>

          <div className="flex items-center gap-3 mt-10 max-[700px]:mt-7" style={{ animation: 'dpFadeUp 1s 0.5s both' }}>
            <div className="w-10 h-px bg-[#3A3A3A] relative overflow-hidden after:content-[''] after:absolute after:top-0 after:bottom-0 after:bg-[#ED2226] after:[animation:dpScrollSlide_2s_ease-in-out_infinite]" />
            <span className="text-[11px] font-semibold tracking-[2px] uppercase text-[#888]">Scroll to explore</span>
          </div>
        </div>

        {/* HERO RIGHT — carousel */}
        <div className="flex flex-col justify-center items-center relative z-[2] max-[1100px]:hidden">
          <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-[#ED2226] mb-3.5 flex items-center gap-2 pl-1 before:content-[''] before:inline-block before:w-4 before:h-[1.5px] before:bg-[#ED2226]">
            Our latest work
          </div>
          <div
            ref={carouselOuterRef}
            className="w-full max-w-[640px] relative select-none before:content-[''] before:absolute before:top-0 before:bottom-12 before:left-0 before:w-[120px] before:z-[3] before:pointer-events-none before:bg-[linear-gradient(to_right,#FAFAF8_0%,transparent_100%)] after:content-[''] after:absolute after:top-0 after:bottom-12 after:right-0 after:w-[120px] after:z-[3] after:pointer-events-none after:bg-[linear-gradient(to_left,#FAFAF8_0%,transparent_100%)]"
          >
            <div className="overflow-hidden w-full py-3">
              <div
                ref={carouselTrackRef}
                className="flex gap-5 will-change-transform transition-transform duration-[750ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                style={{ transform: 'translateX(110px)' }}
              >
                {CAROUSEL_SLIDES.map((slide, i) => {
                  const active = i === carouselIdx;
                  return (
                    <div
                      key={slide.url}
                      data-cursor-hover
                      role="link"
                      tabIndex={0}
                      aria-label={`${active ? 'Open' : 'Select'} ${slide.name}`}
                      onClick={() => {
                        if (active) {
                          window.open(slide.src, '_blank', 'noopener,noreferrer');
                        } else {
                          setCarouselIdx(i);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          if (active) {
                            window.open(slide.src, '_blank', 'noopener,noreferrer');
                          } else {
                            setCarouselIdx(i);
                          }
                        }
                      }}
                      className={cn(
                        'shrink-0 w-[420px] flex flex-col origin-center transition-[opacity,filter,transform] duration-[600ms] ease-[ease] select-none',
                        active ? 'opacity-100 [filter:none] scale-100' : 'opacity-30 [filter:grayscale(100%)] scale-[0.92]'
                      )}
                    >
                      <div className="bg-black/[0.06] px-3 py-2 flex items-center gap-2 rounded-t-2xl border border-b-0 border-black/[0.07]">
                        <div className="flex gap-[5px]">
                          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                          <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                        </div>
                        <div className="flex-1 bg-black/[0.05] rounded-full px-3 py-1 text-[10px] text-[#888] font-mono tracking-[0.2px] truncate">{slide.url}</div>
                      </div>
                      <SitePreview
                        src={slide.src}
                        title={slide.name}
                        screenshotSrc={slide.screenshotSrc}
                        screenshotClassName={slide.screenshotSrc ? 'object-contain object-center' : undefined}
                        useIframe={slide.useIframe}
                        iframeHeight={850}
                        iframeScale={0.29167}
                        className={cn(
                          'w-[420px] h-[272px] rounded-b-2xl border border-t-0 border-black/[0.07]',
                          active
                            ? 'shadow-[0_32px_80px_rgba(0,0,0,0.18),0_0_0_2px_rgba(237,34,38,0.12)]'
                            : 'shadow-[0_24px_60px_rgba(0,0,0,0.12)]'
                        )}
                        fallback={
                          <div className="absolute inset-0 flex flex-col overflow-hidden" style={slide.fallbackBg}>
                            {slide.fallback}
                          </div>
                        }
                      />
                      <div className="flex items-center justify-between pt-3 px-1">
                        <span className="text-sm font-bold text-[#0A0A0A] font-['Stack_Sans_Headline','Stack_Sans_Text',sans-serif] tracking-[-0.3px]">{slide.name}</span>
                        <span className="text-[10px] font-bold tracking-[1px] uppercase text-[#0EC8C5] bg-[rgba(14,200,197,0.08)] border border-[rgba(14,200,197,0.2)] px-2.5 py-[3px] rounded-full">{slide.platform}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center items-center mt-5">
              {CAROUSEL_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  className="p-2.5 border-0 bg-transparent flex items-center justify-center"
                  onClick={() => setCarouselIdx(i)}
                >
                  <span className={cn(
                    'block h-1.5 rounded-full transition-[width,background] duration-300',
                    i === carouselIdx ? 'w-5 bg-[#ED2226]' : 'w-1.5 bg-black/15'
                  )} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section id="numbers" className="bg-[#0A0A0A] px-5 py-10 md:p-[60px]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {(
            [
              { number: '50', plus: true, label: 'Websites Delivered' },
              { number: '6', plus: false, label: 'Industries Served' },
              { number: '3', plus: false, label: 'Platforms (WordPress, Shopify, Next.js)' },
              { number: '10', plus: true, label: 'Years of Web Experience' },
            ] as const
          ).map((stat, i, arr) => (
            <div
              key={stat.label}
              className={cn(
                'dp-reveal text-center lg:px-10',
                i < arr.length - 1 && 'lg:border-r lg:border-white/[0.08]',
              )}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="font-['Stack_Sans_Headline','Stack_Sans_Text',sans-serif] text-[48px] md:text-[64px] font-bold text-white leading-none tracking-[-3px]">
                {stat.number}
                {stat.plus && <span className="text-[#ED2226]">+</span>}
              </div>
              <div className="text-[13px] font-medium text-white/50 mt-2 tracking-[0.3px]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section id="tech-stack" className={cn(SECTION_PAD, 'bg-[#FAFAF8]')}>
        <div className={SECTION_LABEL}>Technologies We Build On</div>
        <h2 className={cn(SECTION_HEADLINE, 'dp-reveal')}>Our Tech Stack</h2>
        <p className={cn(SECTION_SUBLINE, 'dp-reveal', REVEAL_DELAY[1])}>We build professional websites on the world&apos;s most trusted platforms — from WordPress and Shopify to custom Next.js and React.js development.</p>

        <div className="grid grid-cols-5 gap-4 max-[1100px]:grid-cols-3 max-[700px]:grid-cols-2">
          {[
            { name: 'WordPress', sub: 'CMS & Themes', bg: '#21759B', label: 'W' },
            { name: 'Shopify', sub: 'E-Commerce', bg: '#96BF48', label: 'SH' },
            { name: 'Next.js', sub: 'React Framework', bg: '#0A0A0A', label: 'N.js' },
            { name: 'React.js', sub: 'UI Library', bg: '#20232A', label: 'RCT', textColor: '#61DAFB' },
            { name: 'Custom Code', sub: 'Bespoke Development', bg: '#ED2226', label: '</>' },
          ].map((t, i) => (
            <div
              key={t.name}
              className={cn(
                'dp-reveal bg-white border border-black/[0.07] rounded-2xl px-6 py-8 text-center transition-[transform,box-shadow,border-color] duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-[#ED2226]',
                REVEAL_DELAY[Math.min(i, 3)],
              )}
            >
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <rect width="40" height="40" rx="8" fill={t.bg} />
                  <text x="20" y="27" textAnchor="middle" fill={t.textColor || 'white'} fontSize={t.label.length > 2 ? '12' : '18'} fontWeight="bold">{t.label}</text>
                </svg>
              </div>
              <div className="text-[15px] font-bold text-[#0A0A0A] tracking-[-0.1px]">{t.name}</div>
              <div className="text-[11px] text-[#999] mt-1">{t.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className={cn(SECTION_PAD, 'bg-[#0A0A0A] overflow-hidden')}>
        <div className={cn(SECTION_LABEL, '!text-[#0EC8C5]')}>How We Build</div>
        <h2 className={cn(SECTION_HEADLINE, '!text-white dp-reveal')}>Our Process</h2>
        <p className={cn(SECTION_SUBLINE, '!text-white/50 dp-reveal', REVEAL_DELAY[1])}>From brief to handover — a structured 11-step website development process that covers strategy, design, content, SEO, AEO readiness, and go-live.</p>

        <div className="grid grid-cols-3 gap-[2px] max-[1100px]:grid-cols-2 max-[700px]:grid-cols-1">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.n}
              className={cn(
                'dp-reveal group bg-[#111111] px-8 py-9 max-[700px]:px-6 max-[700px]:py-6 border border-white/[0.05] relative overflow-hidden transition-[background] duration-300 hover:bg-[#1A1A1A]',
                "before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:opacity-0 before:transition-opacity before:duration-200 before:bg-[linear-gradient(#ED2226,#0EC8C5)] hover:before:opacity-100",
                REVEAL_DELAY[i % 3],
              )}
              style={{
                ...(step.wide ? { gridColumn: 'span 2' } : {}),
                transitionDelay: `${(i % 3) * 80}ms`,
              }}
            >
              <div className="font-['Stack_Sans_Headline','Stack_Sans_Text',sans-serif] text-[72px] font-bold text-white/[0.04] leading-none absolute top-4 right-6 tracking-[-4px]">{step.n}</div>
              <span className="text-[11px] font-bold tracking-[2px] text-[#ED2226] mb-3 block">Step {step.n}</span>
              <div className="text-[17px] font-bold text-white mb-2 tracking-[-0.1px]">{step.title}</div>
              <div className="text-[13px] leading-[1.65] text-white/45">{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAMS */}
      <section id="teams" className={cn(SECTION_PAD, 'bg-[#FAFAF8]')}>
        <div className="flex justify-between items-end mb-[60px] max-[700px]:mb-8 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-4">
          <div>
            <div className={SECTION_LABEL}>Who Builds It</div>
            <h2 className={cn(SECTION_HEADLINE, 'dp-reveal')}>The Teams Behind<br />Your Website</h2>
          </div>
          <p className={cn(SECTION_SUBLINE, '!mb-0 dp-reveal')}>Every project is a collaboration across six specialist teams.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-[1100px]:grid-cols-2 max-[700px]:grid-cols-1">
          {[
            { name: 'Brand & Strategy', sub: 'Foundation of every project', icon: <path d="M10 2l2.5 5H17l-4 3.5 1.5 5.5L10 13l-4.5 3L7 10.5 3 7h4.5L10 2z" fill="#ED2226" /> },
            { name: 'Marketing Content Management', sub: 'Words that convert', icon: <><rect x="2" y="4" width="16" height="12" rx="2" stroke="#ED2226" strokeWidth="2" /><path d="M6 9h8M6 12h5" stroke="#ED2226" strokeWidth="1.5" strokeLinecap="round" /></> },
            { name: 'Visual Impact Management', sub: 'Design that stops scrollers', icon: <><circle cx="10" cy="10" r="7" stroke="#ED2226" strokeWidth="2" /><path d="M7 10l2 2 4-4" stroke="#ED2226" strokeWidth="1.5" strokeLinecap="round" /></> },
            { name: 'Web Essentials Management', sub: 'The technical backbone', icon: <><path d="M4 6l4-3 4 3 4-3" stroke="#ED2226" strokeWidth="1.5" strokeLinecap="round" /><path d="M4 10l4-3 4 3 4-3M4 14l4-3 4 3 4-3" stroke="#ED2226" strokeWidth="1.5" strokeLinecap="round" /></> },
            { name: 'Organic Search (SEO)', sub: 'Ranking that sticks', icon: <><circle cx="10" cy="8" r="3" stroke="#ED2226" strokeWidth="2" /><path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#ED2226" strokeWidth="2" strokeLinecap="round" /></> },
            { name: 'AI Search Readiness', sub: 'Built for ChatGPT & Perplexity era', icon: <><path d="M10 3v14M3 10h14" stroke="#ED2226" strokeWidth="2" strokeLinecap="round" /><circle cx="10" cy="10" r="3" fill="#ED2226" opacity="0.3" /></> },
          ].map((t, i) => (
            <div
              key={t.name}
              data-cursor-hover
              className={cn(
                'dp-reveal bg-white border border-black/[0.08] rounded-[20px] px-8 py-7 flex items-center gap-4 transition-[transform,border-color,box-shadow] duration-[400ms] hover:translate-x-1.5 hover:border-[#ED2226] hover:shadow-[4px_0_0_#ED2226]',
                REVEAL_DELAY[i % 3],
              )}
            >
              <div className="w-11 h-11 bg-[rgba(237,34,38,0.08)] rounded-xl flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">{t.icon}</svg>
              </div>
              <div>
                <div className="text-[15px] font-bold text-[#0A0A0A] tracking-[-0.1px]">{t.name}</div>
                <div className="text-[11px] text-[#999] mt-0.5">{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL */}
      <section
        id="global"
        className={cn(SECTION_PAD, 'bg-[#0A0A0A] grid grid-cols-2 gap-20 items-center max-[1100px]:grid-cols-1 max-[1100px]:gap-[50px]')}
      >
        <div>
          <div className={cn(SECTION_LABEL, '!text-[#0EC8C5]')}>Global Servicing</div>
          <h2 className={cn(SECTION_HEADLINE, '!text-white max-w-[500px] dp-reveal')}>Built for Global.<br />Delivered with<br />Structure.</h2>
          <p className={cn('text-[15px] leading-[1.7] text-white/55 mt-4 mb-10 dp-reveal', REVEAL_DELAY[1])}>
            We have built structured frameworks for working with international clients — from communication cadence to delivery ownership. Whether you are in <strong className="text-white/75">New York, Toronto, Sydney, or Dubai,</strong> you get the same predictable, transparent website development experience.
          </p>
          <Link
            href="/case-studies"
            className={cn(
              'dp-reveal w-fit relative overflow-hidden inline-flex items-center gap-2.5 bg-[#ED2226] text-white px-8 py-4 rounded-full text-sm font-bold tracking-[0.3px] transition-transform duration-200 hover:scale-[1.04] hover:shadow-[0_16px_48px_rgba(237,34,38,0.35)]',
              "before:content-[''] before:absolute before:inset-0 before:bg-[#0EC8C5] before:-translate-x-full before:transition-transform before:duration-[400ms] hover:before:translate-x-0 [&>span]:relative [&>span]:z-[1] [&>svg]:relative [&>svg]:z-[1]",
              REVEAL_DELAY[2],
            )}
          >
            <span>See How We Work</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
          </Link>
          <p className={cn('text-sm text-white/40 italic mt-9 dp-reveal', REVEAL_DELAY[3])}>
            Want to understand our full engagement frameworks?<br />We will walk you through it on a call.
          </p>
        </div>

        <div className={cn('dp-reveal flex flex-col bg-[#1A1A1A] rounded-3xl overflow-hidden border border-white/[0.06]', REVEAL_DELAY[1])}>
          {[
            { title: 'Dedicated Point of Contact', desc: 'One person owns your project. Always. No ticket systems, no confusion, no dropped balls.', icon: <><circle cx="10" cy="7" r="3" stroke="white" strokeWidth="2" /><path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" /></> },
            { title: 'Your Timezone, Our Commitment', desc: 'All client calls scheduled during your business hours. We adapt to you, not the other way around.', icon: <><circle cx="10" cy="10" r="7" stroke="white" strokeWidth="2" /><path d="M10 6v4l3 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></> },
            { title: 'Structured Delivery', desc: 'Fixed milestones, fortnightly reports, zero surprises. You always know where your project stands.', icon: <path d="M4 10l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" /> },
          ].map(p => (
            <div key={p.title} className="px-9 py-8 max-[700px]:px-5 max-[700px]:py-5 border-b border-white/[0.06] last:border-b-0 flex gap-4 items-start transition-colors duration-200 hover:bg-[#242424]">
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-[linear-gradient(135deg,#ED2226,#0EC8C5)]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">{p.icon}</svg>
              </div>
              <div>
                <div className="text-base font-bold text-white mb-1.5 tracking-[-0.1px]">{p.title}</div>
                <div className="text-[13px] text-white/45 leading-[1.6]">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COUNTRIES */}
      <section id="countries" className="bg-[#FAFAF8] py-20 px-[60px] text-center max-[1100px]:px-[30px] max-[700px]:px-5 max-[700px]:py-[60px]">
        <div className={SECTION_LABEL}>Our Global Footprint</div>
        <h2 className={cn(SECTION_HEADLINE, '!mb-3 dp-reveal')}>Brands We&apos;ve Served,<br />Around the World</h2>
        <p className={cn('text-[15px] text-[#777] max-w-[500px] mx-auto mb-12 dp-reveal', REVEAL_DELAY[1])}>From Delhi to the world — here&apos;s where our website development and digital marketing work has made an impact.</p>
        {/* Flag grid: 6 columns × 2 rows on desktop (collapses on smaller screens).
            Flags ~3× the original pill size, name underneath, no container chrome.
            Each flag has a subtle perspective-based wave animation, staggered
            by index so they don't all flutter in unison. */}
        <div className="mx-auto max-w-6xl grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-10">
          {COUNTRIES.map((c, i) => (
            <div
              key={c.code}
              className="dp-reveal group flex flex-col items-center gap-3 cursor-default transition-transform duration-200 hover:scale-[1.08]"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div
                className="origin-left"
                style={{
                  animation: 'dpFlagWave 4.5s ease-in-out infinite',
                  animationDelay: `${(i % 6) * 0.25}s`,
                  transformOrigin: 'left center',
                }}
              >
                  <Image
                  src={`https://flagcdn.com/w160/${c.code}.png`}
                  width={84}
                  height={60}
                  alt={c.name}
                  className="w-[84px] h-[60px] rounded-md object-cover shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                  loading="lazy"
                />
              </div>
              <span className="text-[13px] font-semibold tracking-[0.2px] text-[#0A0A0A] group-hover:text-[#ED2226] transition-colors duration-200">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className={cn(SECTION_PAD, 'bg-[#0A0A0A]')}>
        <div className="flex justify-between items-end mb-12 max-[700px]:mb-8 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-4">
          <div>
            <div className={cn(SECTION_LABEL, '!text-[#0EC8C5]')}>Our Work</div>
            <h2 className={cn(SECTION_HEADLINE, '!text-white !mb-2 dp-reveal')}>Explore Our Websites</h2>
            <p className={cn('text-[15px] text-white/45 max-w-[500px] leading-[1.65] dp-reveal', REVEAL_DELAY[1])}>Browse our website design and development work across industries, business models, and platforms. From WordPress and Shopify to custom Next.js builds — filter by what matters to you.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-12 max-[700px]:mb-8">
          {FILTERS.map((f, i) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                'dp-reveal rounded-full px-[18px] py-2 text-xs font-semibold tracking-[0.3px] transition-all duration-200 border',
                filter === f.key
                  ? 'bg-[#ED2226] text-white border-[#ED2226]'
                  : 'bg-white/5 text-white/55 border-white/[0.08] hover:bg-[#ED2226] hover:text-white hover:border-[#ED2226]'
              )}
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <PortfolioGrid filter={filter} />
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className={cn(SECTION_PAD, 'bg-[#FAFAF8] grid grid-cols-[360px_1fr] gap-20 items-start max-[1100px]:grid-cols-1 max-[1100px]:gap-12')}
      >
        <div className="sticky top-[120px] max-[1100px]:static">
          <div className={SECTION_LABEL}>Questions &amp; Answers</div>
          <h2 className={cn(SECTION_HEADLINE, 'text-[clamp(32px,4vw,48px)]! dp-reveal')} style={{ fontSize: 'clamp(32px,4vw,48px)' }}>Everything You Want to Know</h2>
          <p className={cn(SECTION_SUBLINE, '!text-[#777] !mb-9 dp-reveal', REVEAL_DELAY[1])}>Common questions from our clients in India, the USA, Canada, Australia, and beyond — before they start their website project with us.</p>
          <div className={cn("font-['Stack_Sans_Headline','Stack_Sans_Text',sans-serif] text-[100px] max-[700px]:text-[64px] font-bold text-black/[0.04] leading-none tracking-[-6px] max-[700px]:tracking-[-3px] -mb-5 dp-reveal", REVEAL_DELAY[2])}>07</div>
        </div>

        <div className="flex flex-col">
          {FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <div
                key={i}
                className="dp-reveal border-t border-black/[0.08] last:border-b last:border-b-black/[0.08] overflow-hidden"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full py-6 flex justify-between items-center gap-5 bg-transparent border-0 text-left font-inherit"
                >
                  <h3 className="text-base font-semibold text-[#0A0A0A] tracking-[-0.1px] leading-[1.35] m-0">{f.q}</h3>
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-[background,transform] duration-200',
                      open ? 'bg-[#ED2226] rotate-45 [&_svg]:stroke-white' : 'bg-black/5'
                    )}
                    aria-hidden="true"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  className={cn(
                    'overflow-hidden transition-[max-height] duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
                    open ? 'max-h-[600px]' : 'max-h-0'
                  )}
                >
                  <div className="pb-6 text-sm leading-[1.75] text-[#666]">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-[120px] px-[60px] bg-[#ED2226] text-center relative overflow-hidden max-[700px]:py-[60px] max-[700px]:px-5">
        <div className="absolute font-['Stack_Sans_Headline','Stack_Sans_Text',sans-serif] text-[clamp(80px,20vw,200px)] font-bold text-white/5 tracking-[-10px] max-[700px]:tracking-[-4px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">NEXT</div>
        <div className={cn(SECTION_LABEL, '!text-white/60 !mb-6 dp-reveal')}>Let&apos;s Build Together</div>
        <h2 className={cn("dp-reveal font-['Stack_Sans_Headline','Stack_Sans_Text',sans-serif] text-[clamp(48px,7vw,100px)] font-bold text-white tracking-[-3px] leading-[0.95] mb-6 relative", REVEAL_DELAY[1])}>
          Have a website<br />in mind?
        </h2>
        <p className={cn('dp-reveal text-[17px] text-white/70 mb-12 relative', REVEAL_DELAY[2])}>Tell us about your brand and what you need. We&apos;ll take it from there.</p>
        <Link
          href="/contact"
          className={cn(
            'dp-reveal inline-flex items-center gap-3 bg-white text-[#ED2226] px-10 py-[18px] max-[700px]:px-7 max-[700px]:py-[14px] rounded-full text-[15px] font-bold tracking-[-0.2px] transition-[transform,box-shadow] duration-200 hover:scale-[1.06] hover:shadow-[0_24px_60px_rgba(0,0,0,0.2)] relative',
            REVEAL_DELAY[3],
          )}
        >
          Book a Free 30-min Call →
        </Link>
      </section>
    </div>
  );
}

// ============================================================
// PORTFOLIO GRID
// ============================================================
type PortfolioCardData = {
  categories: FilterKey[];
  url: string;
  href: string;
  featured?: boolean;
  preview: ReactNode;
  screenshotSrc?: string;
  tags: string[];
  platformTag: string;
  title: string;
  oneliner: string;
  result: string;
  // Same flag as CarouselSlide.useIframe — see comment there.
  useIframe?: boolean;
};

const PORTFOLIO_CARDS: PortfolioCardData[] = [
  {
    categories: ['food', 'b2b', 'nextjs'],
    url: 'gajnaoverseas.com',
    href: 'https://gajnaoverseas.com',
    useIframe: true,
    tags: ['Food & Beverage', 'B2B', 'Export'],
    platformTag: 'Next.js',
    title: 'Gajna Overseas',
    oneliner: 'A warm, brand-forward Next.js website for an Indian specialty coffee exporter — crafted to open doors in the USA, Europe, and Middle East by telling the authentic story behind every bean.',
    result: 'Gave Gajna Overseas a credible, export-ready digital presence that speaks directly to international buyers.',
    preview: (
      <div className="absolute inset-0 flex flex-col" style={{ background: 'linear-gradient(135deg, #1c0a00 0%, #3d1a00 50%, #6b3000 100%)' }}>
        <div className="px-5 py-3.5 flex justify-between items-center">
          <div className="text-sm font-bold text-[#d4a255] tracking-[1px]">GAJNA OVERSEAS</div>
        </div>
        <div className="px-5 py-2 flex-1 flex flex-col justify-center">
          <div className="text-[22px] font-extrabold text-white leading-[1.1]">India&apos;s Finest<br /><span className="text-[#d4a255]">Specialty Coffee</span></div>
          <div className="text-[10px] text-white/50 mt-2">Export-Ready · USA · Europe · Middle East</div>
          <div className="flex gap-2 mt-3">
            <div className="bg-[#d4a255] rounded-full px-3.5 py-1.5 text-[9px] text-[#1c0a00] font-bold">Our Coffees</div>
            <div className="border border-[rgba(212,162,85,0.4)] rounded-full px-3.5 py-1.5 text-[9px] text-[#d4a255]">Our Story</div>
          </div>
        </div>
        <div className="absolute right-5 bottom-4 w-[60px] h-[60px] rounded-full border-2 border-[rgba(212,162,85,0.3)] bg-[radial-gradient(#6b3000,#1c0a00)]" />
      </div>
    ),
  },
  {
    categories: ['technology', 'b2b', 'nextjs'],
    url: 'talentifix.com',
    href: 'https://talentifix.com',
    tags: ['Technology', 'B2B', 'Staffing'],
    platformTag: 'Next.js',
    title: 'Talentifix',
    oneliner: 'A custom-coded Next.js website that brought fresh, new-generation energy to the IT staffing industry — bold UI/UX design that broke every convention in a space known for dull, corporate web presence.',
    result: 'Went live in just 4 weeks. Has been driving high organic traffic since launch.',
    preview: (
      <div className="absolute inset-0 flex flex-col" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}>
        <div className="px-5 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-md bg-[linear-gradient(135deg,#f093fb,#f5576c)]" />
            <div className="text-[13px] font-extrabold text-white">Talentifix</div>
          </div>
        </div>
        <div className="px-5 py-2 flex-1 flex flex-col justify-center">
          <div className="text-[20px] font-extrabold text-white leading-[1.1]">IT Staffing<br /><span className="bg-[linear-gradient(90deg,#f093fb,#f5576c)] bg-clip-text text-transparent">Reimagined.</span></div>
          <div className="text-[10px] text-white/40 mt-2">4 weeks to launch · High organic traffic</div>
        </div>
        <div className="px-5 py-3 flex gap-2">
          <div className="flex-1 h-[30px] rounded-md bg-[rgba(240,147,251,0.15)] border border-[rgba(240,147,251,0.2)]" />
          <div className="flex-1 h-[30px] rounded-md bg-[rgba(245,87,108,0.15)] border border-[rgba(245,87,108,0.2)]" />
        </div>
      </div>
    ),
  },
  {
    categories: ['healthcare', 'b2b', 'nextjs'],
    url: 'neotechworldlab.com',
    href: 'https://neotechworldlab.com',
    tags: ['Healthcare', 'B2B & B2C', 'Life Sciences'],
    platformTag: 'Next.js',
    title: 'NeoTech World Lab',
    oneliner: 'A credibility-first Next.js website for a genetic testing lab serving both individual consumers and institutional clients — designed to make complex science feel clear, trustworthy, and accessible.',
    result: 'Successfully bridges a highly technical healthcare offering with everyday consumer accessibility.',
    preview: (
      <div className="absolute inset-0 flex flex-col" style={{ background: 'linear-gradient(135deg, #003d7a 0%, #0070c4 50%, #00a8e8 100%)' }}>
        <div className="px-[18px] py-3 flex justify-between items-center">
          <div className="text-[11px] font-extrabold text-white tracking-[1px]">NEOTECH WORLD LAB</div>
          <div className="w-[60px] h-5 rounded-full bg-white/15" />
        </div>
        <div className="px-[18px] py-2 flex-1 flex gap-3">
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-base font-extrabold text-white leading-[1.2]">Advanced Genetic<br />Testing Solutions</div>
            <div className="text-[9px] text-white/60 mt-1.5">B2B · B2C · Healthcare · India &amp; Global</div>
            <div className="flex gap-1.5 mt-2.5">
              <div className="bg-white rounded-full px-3 py-1.5 text-[8px] text-[#003d7a] font-bold">Our Tests</div>
              <div className="border border-white/40 rounded-full px-3 py-1.5 text-[8px] text-white">Learn More</div>
            </div>
          </div>
          <div className="w-[70px] flex flex-col gap-1.5 justify-center">
            <div className="h-7 rounded-md bg-white/10 border border-white/20" />
            <div className="h-7 rounded-md bg-white/[0.07] border border-white/15" />
            <div className="h-7 rounded-md bg-white/5 border border-white/10" />
          </div>
        </div>
      </div>
    ),
  },
  {
    categories: ['technology', 'b2b', 'wordpress'],
    url: 'adventglobal.com',
    href: 'https://adventglobal.com',
    featured: true,
    screenshotSrc: '/portfolio/advent-global-preview.png',
    tags: ['Technology', 'B2B', 'IT Services'],
    platformTag: 'WordPress',
    title: 'Advent Global',
    oneliner: 'A complete brand revamp and custom WordPress website for a 30-year legacy IT services company — parallax animations, enterprise-grade design, and a conversion-friendly architecture built to attract global B2B clients.',
    result: 'Shortly after launch, this professionally redesigned WordPress website helped the company onboard a landmark enterprise client — proof that world-class web design drives real business outcomes for IT firms in international markets.',
    preview: (
      <div className="absolute inset-0 flex flex-col" style={{ background: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 60%, #fdbb2d 100%)' }}>
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex gap-5 items-center">
            <div className="w-20 h-6 rounded bg-white/20" />
            <div className="flex gap-3">
              {[0, 1, 2, 3].map(i => <div key={i} className="w-8 h-[3px] rounded-full bg-white/20" />)}
            </div>
          </div>
          <div className="w-[100px] h-7 rounded-full bg-[#ED2226]" />
        </div>
        <div className="px-[30px] py-5">
          <div className="text-[28px] font-black text-white tracking-[-0.5px] [text-shadow:0_2px_8px_rgba(0,0,0,0.3)] font-['Stack_Sans_Text',sans-serif]">Advent Global Solutions</div>
          <div className="text-[13px] text-white/70 mt-1.5">30 Years of IT Excellence · Enterprise Solutions</div>
          <div className="flex gap-2.5 mt-4">
            {['IT Services', 'Consulting', 'Enterprise'].map(t => (
              <div key={t} className="bg-white/15 backdrop-blur-sm rounded-lg px-4 py-2.5 text-[10px] text-white">{t}</div>
            ))}
          </div>
        </div>
        <div className="absolute right-[30px] bottom-5 w-[180px] h-[100px] rounded-xl bg-white/10 backdrop-blur-sm border border-white/20" />
      </div>
    ),
  },
  {
    categories: ['fashion', 'd2c', 'shopify'],
    url: 'khaleej.in',
    href: 'https://khaleej.in',
    tags: ['Fashion & Apparel', 'D2C', 'Luxury'],
    platformTag: 'Shopify',
    title: 'Khaleej',
    oneliner: "A high-performance Shopify store for a luxury women's fashion brand — deeply optimised product pages, seamless mobile-first experience, and a conversion-focused design built to turn browsers into buyers.",
    result: "Achieved 5X ROAS within the first month — generated enough revenue to cover the entire year's business targets.",
    preview: (
      <div className="absolute inset-0 flex flex-col" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #6d28d9 50%, #c026d3 100%)' }}>
        <div className="px-5 py-4 flex justify-between items-center">
          <div className="text-base font-extrabold text-white tracking-[3px]">KHALEEJ</div>
          <div className="flex gap-3.5">
            <div className="w-4 h-4 rounded-full border-[1.5px] border-white/50" />
            <div className="w-4 h-4 rounded-full border-[1.5px] border-white/50" />
          </div>
        </div>
        <div className="px-5 flex gap-3 flex-1">
          <div className="flex-1 bg-white/10 rounded-lg border border-white/15 overflow-hidden relative">
            <div className="absolute bottom-0 left-0 right-0 p-2.5 text-[10px] text-white bg-[linear-gradient(transparent,rgba(0,0,0,0.7))]">Luxury Collection</div>
          </div>
          <div className="w-[100px] flex flex-col gap-2">
            <div className="flex-1 bg-white/[0.08] rounded-md border border-white/10" />
            <div className="flex-1 bg-white/[0.08] rounded-md border border-white/10" />
          </div>
        </div>
      </div>
    ),
  },
  {
    categories: ['fashion', 'd2c', 'shopify'],
    url: 'houseofnandini.com',
    href: 'https://houseofnandini.com',
    featured: true,
    screenshotSrc: '/portfolio/house-of-nandini-preview.png',
    tags: ['Fashion & Apparel', 'D2C', 'Heritage'],
    platformTag: 'Shopify',
    title: 'House of Nandini',
    oneliner: "A beautifully crafted Shopify store that captures the soul of Lucknow's chikankari artisan tradition — merging heritage ethnic fashion with modern D2C e-commerce, built for women who appreciate craft as much as design.",
    result: "Launched at a physical inauguration event attended by prominent TV anchor Ms. Richa Anirudh Thatte, who publicly praised the store's authentic cultural identity — creating immediate brand credibility.",
    preview: (
      <div className="absolute inset-0 flex flex-col" style={{ background: 'linear-gradient(135deg, #f5e6d3 0%, #e8c9a0 50%, #d4a574 100%)' }}>
        <div className="px-6 py-3.5 flex justify-between items-center border-b border-black/[0.08]">
          <div className="text-lg font-bold text-[#2d1a0e] tracking-[2px] font-serif">HOUSE OF NANDINI</div>
          <div className="flex gap-4 text-[10px] text-[#6b4226]">Collections · Story · Care</div>
        </div>
        <div className="flex-1 flex gap-4 px-6 py-4">
          <div className="flex-[2] flex flex-col justify-center">
            <div className="text-[10px] tracking-[2px] text-[#6b4226] mb-2">LUCKNOW&apos;S FINEST</div>
            <div className="text-[22px] font-bold text-[#2d1a0e] font-serif leading-[1.2]">The Art of<br />Chikankari</div>
            <div className="mt-3 text-[9px] text-[#8b5e3c]">Handcrafted Ethnic Wear · Made with Love</div>
            <div className="mt-3.5 w-[100px] h-7 rounded bg-[#2d1a0e]" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex-1 rounded-lg bg-[rgba(107,66,38,0.15)] border border-[rgba(107,66,38,0.2)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(107,66,38,0.05),rgba(107,66,38,0.05)_2px,transparent_2px,transparent_8px)]" />
            </div>
            <div className="flex-1 rounded-lg bg-[rgba(107,66,38,0.1)] border border-[rgba(107,66,38,0.15)]" />
          </div>
        </div>
      </div>
    ),
  },
  {
    categories: ['fashion', 'd2c', 'shopify'],
    url: 'mauli.co',
    href: 'https://mauli.co',
    tags: ['Fashion & Apparel', 'D2C', 'Luxury'],
    platformTag: 'Shopify',
    title: 'Mauli',
    oneliner: "A refined, minimal Shopify e-commerce store for a premium cashmere women's brand — where every design decision is as intentional as the product itself, built to convert high-intent D2C shoppers.",
    result: "Achieved 4X ROAS within 2 months — generated revenues that covered the brand's entire annual business targets.",
    preview: (
      <div className="absolute inset-0 flex flex-col" style={{ background: 'linear-gradient(135deg, #f0ece4 0%, #e8ddd0 50%, #d9ccbb 100%)' }}>
        <div className="px-[18px] py-3 flex justify-center border-b border-black/[0.06]">
          <div className="text-xl font-light text-[#2a2a2a] tracking-[8px] font-serif">MAULI</div>
        </div>
        <div className="flex-1 flex items-center justify-center flex-col gap-2.5 p-4">
          <div className="text-xs text-[#6b5d4f] tracking-[3px] uppercase">Premium Cashmere</div>
          <div className="w-20 h-20 rounded-full border-[3px] border-white/80 bg-[linear-gradient(135deg,#c9b99a,#a89070)]" />
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#8b7355] border border-black/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#d4c4b0] border border-black/10" />
          </div>
        </div>
      </div>
    ),
  },
  {
    categories: ['technology', 'b2b', 'nextjs'],
    url: 'sanjivaniedge.com',
    href: 'https://sanjivaniedge.com',
    tags: ['Technology', 'B2B', 'Enterprise'],
    platformTag: 'Next.js',
    title: 'Sanjivani Edge',
    oneliner: 'A sharp, professional Next.js website for a technology edge solutions company — clean architecture, precise messaging, and a design built to convert the right enterprise visitors into qualified business conversations.',
    result: 'Positioned Sanjivani Edge as a credible technology partner for enterprise clients across India and international markets.',
    preview: (
      <div className="absolute inset-0 flex flex-col" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #1a2332 50%, #0d2137 100%)' }}>
        <div className="px-[18px] py-3 flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[linear-gradient(135deg,#22d3ee,#3b82f6)]" />
          <div className="text-xs font-bold text-white tracking-[0.5px]">SANJIVANI EDGE</div>
        </div>
        <div className="px-[18px] py-2 flex-1 flex flex-col justify-center">
          <div className="text-lg font-extrabold text-white leading-[1.2]">Enterprise Edge<br /><span className="text-[#22d3ee]">Solutions.</span></div>
          <div className="text-[9px] text-white/40 mt-1.5">B2B · India &amp; International Markets</div>
          <div className="flex gap-3 mt-3.5">
            <div className="h-0.5 flex-1 rounded-full bg-[linear-gradient(90deg,#22d3ee,transparent)]" />
          </div>
        </div>
      </div>
    ),
  },
  {
    categories: ['social', 'nextjs'],
    url: 'opinovafoundation.com',
    href: 'https://opinovafoundation.com',
    tags: ['Social Sector', 'Non-Profit'],
    platformTag: 'Next.js',
    title: 'Opinova Foundation',
    oneliner: 'A purpose-driven Next.js website for a non-profit foundation focused on community empowerment — designed with the same strategic care and creative depth we bring to every commercial website development project.',
    result: 'Gave Opinova Foundation a dignified, professional digital home that elevated their credibility with donors, grant bodies, and the communities they serve.',
    preview: (
      <div className="absolute inset-0 flex flex-col" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)' }}>
        <div className="px-[18px] py-3 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] text-white">O</div>
          <div className="text-[11px] font-bold text-white tracking-[1px]">OPINOVA FOUNDATION</div>
        </div>
        <div className="px-[18px] py-2 flex-1 flex flex-col justify-center">
          <div className="text-lg font-extrabold text-white leading-[1.2]">Empowering<br />Communities.</div>
          <div className="text-[9px] text-white/50 mt-1.5">Non-Profit · Social Impact · India</div>
          <div className="mt-3.5 w-[90px] h-[26px] rounded-full bg-white/15 border border-white/25" />
        </div>
      </div>
    ),
  },
  {
    categories: ['home', 'd2c', 'shopify'],
    url: 'h2s.co.in',
    href: 'https://h2s.co.in',
    screenshotSrc: '/portfolio/h2s-preview.png',
    tags: ['Home & Lifestyle', 'D2C'],
    platformTag: 'Shopify',
    title: 'Hard2Soft',
    oneliner: 'A clean, conversion-focused Shopify store for a D2C home water softener brand — making a technical product feel simple, trustworthy, and easy to buy for everyday consumers across India.',
    result: 'Successfully simplified a technical home lifestyle product for D2C consumers, driving online sales directly to end users.',
    preview: (
      <div className="absolute inset-0 flex flex-col" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)' }}>
        <div className="px-[18px] py-3 flex justify-between items-center">
          <div className="text-base font-extrabold text-[#0369a1] tracking-[-0.5px]">H2S</div>
          <div className="text-[9px] text-[#0369a1] bg-[rgba(3,105,161,0.1)] px-2.5 py-1 rounded-full">Water Softeners</div>
        </div>
        <div className="px-[18px] py-2 flex-1 flex items-center gap-4">
          <div className="flex-1">
            <div className="text-base font-extrabold text-[#0c4a6e] leading-[1.2]">Pure Water,<br />Better Living.</div>
            <div className="text-[9px] text-[#0369a1] mt-1.5">D2C · Home &amp; Lifestyle · India</div>
            <div className="mt-2.5 w-20 h-6 rounded bg-[#0369a1]" />
          </div>
          <div className="w-[60px] h-[60px] rounded-full border-[3px] border-white/80 bg-[radial-gradient(circle,#bae6fd,#38bdf8)]" />
        </div>
      </div>
    ),
  },
];

/**
 * Renders a website preview layered over a static fallback.
 *
 * Two modes:
 *  - Default: WordPress mShots screenshot (https://s.wordpress.com/mshots/v1/...).
 *    Works for any public URL since the target site can't refuse a screenshot.
 *  - useIframe: live <iframe>. Only enable for sites without X-Frame-Options
 *    or frame-ancestors restrictions, AND that are listed in CSP frame-src.
 *
 * In both modes the fallback gradient is the loading skeleton (visible while
 * the image/iframe is fetching) and the error backup (if it fails entirely).
 */
function mshotsSrc(url: string, w: number, h: number) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${w}&h=${h}`;
}

function SitePreview({
  src,
  title,
  fallback,
  className,
  screenshotSrc,
  screenshotClassName,
  useIframe = false,
  iframeWidth = 1440,
  iframeHeight = 850,
  iframeScale = 0.29167,
  shotWidth = 1280,
  shotHeight = 828,
}: {
  src: string;
  title: string;
  fallback: ReactNode;
  className?: string;
  screenshotSrc?: string;
  screenshotClassName?: string;
  useIframe?: boolean;
  iframeWidth?: number;
  iframeHeight?: number;
  iframeScale?: number;
  shotWidth?: number;
  shotHeight?: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className="absolute inset-0 z-[1]">{fallback}</div>
      {screenshotSrc ? (
        <Image
          src={screenshotSrc}
          alt={`${title} screenshot`}
          fill
          quality={100}
          className={cn('absolute inset-0 z-[2] object-cover object-top', screenshotClassName)}
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 100vw, 900px"
        />
      ) : useIframe ? (
        <iframe
          src={src}
          title={`${title} website`}
          loading="lazy"
          scrolling="no"
          onLoad={() => setLoaded(true)}
          className="absolute top-0 left-0 z-[2] border-0 pointer-events-none origin-top-left transition-opacity duration-500"
          style={{
            width: iframeWidth,
            height: iframeHeight,
            transform: `scale(${iframeScale})`,
            opacity: loaded ? 1 : 0,
          }}
        />
      ) : (
        !errored && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mshotsSrc(src, shotWidth, shotHeight)}
            alt={`${title} screenshot`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className="absolute inset-0 z-[2] w-full h-full object-cover object-top transition-opacity duration-500"
            style={{ opacity: loaded ? 1 : 0 }}
          />
        )
      )}
    </div>
  );
}

function PortfolioGrid({ filter }: { filter: FilterKey }) {
  return (
    <div className="grid grid-cols-3 gap-5 [grid-auto-flow:dense] max-[1100px]:grid-cols-2 max-[700px]:grid-cols-1">
      {PORTFOLIO_CARDS.map((card, i) => {
        const visible = filter === 'all' || card.categories.includes(filter);
        return (
          <a
            key={card.url}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className={cn(
              'dp-reveal group relative bg-[#1A1A1A] rounded-[20px] overflow-hidden border border-white/[0.06] transition-[transform,box-shadow,border-color] duration-[400ms] hover:-translate-y-2 hover:shadow-[0_32px_64px_rgba(0,0,0,0.5)] hover:border-white/15 block',
              card.featured && 'col-span-2 max-[700px]:col-span-1',
              REVEAL_DELAY[i % 3],
              !visible && 'hidden',
            )}
            style={{ transitionDelay: `${(i % 3) * 80}ms` }}
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-[400ms] pointer-events-none bg-[linear-gradient(180deg,transparent_50%,rgba(237,34,38,0.12)_100%)] group-hover:opacity-100" />
            <div className="bg-white/[0.04] px-3.5 py-2.5 flex items-center gap-2.5 border-b border-white/[0.06]">
              <div className="flex gap-[5px]">
                <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                <div className="w-2 h-2 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 bg-white/[0.06] rounded-full px-3.5 py-1.5 text-[10px] text-white/35 font-mono tracking-[0.3px]">{card.url}</div>
            </div>
            <SitePreview
              src={card.href}
              title={card.title}
              fallback={card.preview}
              screenshotSrc={card.screenshotSrc}
              useIframe={card.useIframe}
              iframeHeight={card.featured ? 870 : 670}
              iframeScale={0.3}
              className={card.featured ? 'h-[260px]' : 'h-[200px]'}
            />
            <div className="px-[22px] pt-5 pb-[22px]">
              <div className="flex gap-1.5 flex-wrap mb-3">
                {card.tags.map(t => (
                  <span key={t} className="text-[9px] font-bold tracking-[1.5px] uppercase px-2.5 py-1 rounded-full border border-white/[0.12] text-white/45">{t}</span>
                ))}
                <span className="text-[9px] font-bold tracking-[1.5px] uppercase px-2.5 py-1 rounded-full border border-[rgba(14,200,197,0.25)] text-[#0EC8C5]">{card.platformTag}</span>
              </div>
              <div
                className={cn(
                  "font-['Stack_Sans_Headline','Stack_Sans_Text',sans-serif] font-bold text-white tracking-[-0.5px] mb-2 leading-[1.15]",
                  card.featured ? 'text-2xl' : 'text-[19px]',
                )}
              >
                {card.title}
              </div>
              <div className="text-xs leading-[1.65] text-white/40 mb-4">{card.oneliner}</div>
              <div className="bg-[rgba(14,200,197,0.07)] border border-[rgba(14,200,197,0.15)] rounded-[10px] px-3.5 py-3 text-[11px] leading-[1.6] text-[rgba(14,200,197,0.7)] mb-4 before:content-['✓_'] before:font-bold before:text-[#0EC8C5]">{card.result}</div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.5px] text-white/30 transition-[color,gap] duration-200 group-hover:text-white group-hover:gap-2.5">
                Visit Site →
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
