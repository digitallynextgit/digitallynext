'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, type Variants, useSpring } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navLinks } from '@/data/content';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ─────────────────────────────────────────────
// Types & Static Config
// ─────────────────────────────────────────────
type RouteHeaderTheme = {
  linkColor: 'white' | 'black';
  logo: 'light' | 'dark' | 'white';
};

const ROUTE_THEMES: Record<string, RouteHeaderTheme> = {
  '/': { linkColor: 'white', logo: 'light' },
  '/services': { linkColor: 'white', logo: 'white' },
  '/contact': { linkColor: 'white', logo: 'white' },
  '/about': { linkColor: 'black', logo: 'dark' },
  '/terms-of-use': { linkColor: 'white', logo: 'white' },
  '/privacy-policy': { linkColor: 'white', logo: 'white' },
  '/case-studies': { linkColor: 'black', logo: 'dark' },
  '/careers': { linkColor: 'black', logo: 'dark' },
};

const NOT_FOUND_THEME: RouteHeaderTheme = { linkColor: 'white', logo: 'white' };

const LOGO_SRCS: Record<RouteHeaderTheme['logo'], string> = {
  light: '/logo-complete-white.webp',
  dark: '/logo1.webp',
  white: '/logo1-white.webp',
};

const SERVICES = [
  {
    label: 'Strategy, Brand & Growth Intelligence',
    href: '/services/brand-strategy',
  },
  {
    label: 'Content, Culture & Media Creation',
    href: '/services/ui-ux-design',
  },
  {
    label: 'Performance, Distribution & Demand',
    href: '/services/seo-optimization',
  },
  {
    label: 'Platforms, Web & Digital Experience',
    href: '/services/web-development',
  },
  {
    label: 'AI Enablement & Decision Systems',
    href: '/services/ai-enablement',
  },
];

const MENU_EXTRA = [{ label: 'CONTACT', href: '/contact' }];
const MotionLink = motion(Link);

function resolveRouteTheme(pathname: string): RouteHeaderTheme {
  if (ROUTE_THEMES[pathname]) return ROUTE_THEMES[pathname];
  const prefixMatch = Object.keys(ROUTE_THEMES)
    .filter((key) => key !== '/' && pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];
  if (prefixMatch) return ROUTE_THEMES[prefixMatch];
  return NOT_FOUND_THEME;
}

// ─────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────
const overlayVariants: Variants = {
  hidden: {
    clipPath: 'circle(0% at calc(100% - 40px) 40px)',
    opacity: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
      when: 'afterChildren',
    },
  },
  visible: {
    // 300vmax guarantees full coverage at any resolution/aspect ratio,
    // including ultra-wide and 4K+ displays where 170% may fall short.
    clipPath: 'circle(300vmax at calc(100% - 40px) 40px)',
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
      delayChildren: 0.12,
      staggerChildren: 0.045,
    },
  },
};

const linkVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const dividerVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.08,
    },
  },
};

const subMenuVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.36, ease: [0.22, 1, 0.36, 1] as const },
      opacity: { duration: 0.22, delay: 0.06 },
    },
  },
};

// ─────────────────────────────────────────────
// SubItem — same slide + arrow animation as parent links
// ─────────────────────────────────────────────
function SubItem({ href, label, index, onClick }: { href: string; label: string; index: number; onClick: () => void }) {
  const hoverX = useMotionValue(0);
  const smoothHoverX = useSpring(hoverX, { stiffness: 250, damping: 30 });
  const arrowX = useTransform(smoothHoverX, [0, 10], [-6, 0]);
  const arrowOpacity = useTransform(smoothHoverX, [0, 10], [0, 1]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.04 + 0.06,
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => hoverX.set(10)}
      onMouseLeave={() => hoverX.set(0)}
    >
      <Link href={href} onClick={onClick} className="group flex items-center gap-3 w-full py-2 px-3 rounded-md">
        <motion.span style={{ x: smoothHoverX }} className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-white/20 text-[10px] font-mono shrink-0 group-hover:text-white/40 transition-colors duration-200">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="flex-1 text-white/85 group-hover:text-[#E21F26] text-sm md:text-[14px] font-light tracking-wide transition-colors duration-200 leading-snug">
            {label}
          </span>
        </motion.span>
        <motion.span style={{ x: arrowX, opacity: arrowOpacity }} className="text-white/30 text-sm shrink-0">
          →
        </motion.span>
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MagneticLink — red label on hover + stays red while submenu open
// ─────────────────────────────────────────────
function MagneticLink({
  href,
  label,
  index,
  onClick,
  hasSubmenu = false,
  submenuOpen = false,
  onSubmenuToggle,
}: {
  href: string;
  label: string;
  index: number;
  onClick: () => void;
  hasSubmenu?: boolean;
  submenuOpen?: boolean;
  onSubmenuToggle?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.1 };
  const mx = useSpring(mouseX, springConfig);
  const my = useSpring(mouseY, springConfig);
  const rotateX = useTransform(my, [-30, 30], [2, -2]);
  const rotateY = useTransform(mx, [-80, 80], [-2, 2]);

  const hoverX = useMotionValue(0);
  const smoothHoverX = useSpring(hoverX, { stiffness: 250, damping: 30 });
  const arrowTranslateX = useTransform(smoothHoverX, [0, 10], [-6, 0]);
  const arrowOpacity = useTransform(smoothHoverX, [0, 10], [0, 1]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    hoverX.set(0);
    setHovered(false);
  };

  const handleMouseEnter = () => {
    hoverX.set(10);
    setHovered(true);
  };

  // Red when hovered OR submenu is open (active state)
  const labelColor = hovered || submenuOpen ? 'text-[#E21F26]' : 'text-white';

  const innerContent = (
    <>
      <span className="text-white/25 text-xs font-mono w-7 shrink-0">{String(index + 1).padStart(2, '0')}</span>
      <span
        className={`flex-1 ${labelColor} text-[clamp(1.4rem,3.2vw,2.6rem)] font-light tracking-tight leading-none uppercase transition-colors duration-300`}
      >
        {label}
      </span>
      {hasSubmenu ? (
        <motion.span
          animate={{ rotate: submenuOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/40 flex items-center shrink-0"
        >
          <ChevronDown size={18} strokeWidth={1.5} />
        </motion.span>
      ) : (
        <motion.span className="text-white/40 text-lg shrink-0" style={{ x: arrowTranslateX, opacity: arrowOpacity }}>
          →
        </motion.span>
      )}
    </>
  );

  return (
    <motion.div
      ref={ref}
      variants={linkVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="w-full border-t border-white/10 last:border-b"
    >
      {/* div for submenu toggle (no navigation), a for regular links */}
      {hasSubmenu ? (
        <motion.div
          onClick={() => onSubmenuToggle?.()}
          style={{
            rotateX,
            rotateY,
            x: smoothHoverX,
            transformPerspective: 1200,
          }}
          className="flex items-center justify-between w-full py-4 md:py-5 px-6 md:px-12 cursor-pointer select-none"
        >
          {innerContent}
        </motion.div>
      ) : (
        <MotionLink
          href={href}
          onClick={onClick}
          style={{
            rotateX,
            rotateY,
            x: smoothHoverX,
            transformPerspective: 1200,
          }}
          className="flex items-center justify-between w-full py-4 md:py-5 px-6 md:px-12 cursor-pointer"
        >
          {innerContent}
        </MotionLink>
      )}

      {/* Services accordion — no border-l, no bg hover on items */}
      <AnimatePresence>
        {hasSubmenu && submenuOpen && (
          <motion.div
            key="submenu"
            variants={subMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            <div className="px-6 md:px-12 pb-5 space-y-1">
              {SERVICES.map((service, i) => (
                <SubItem key={service.href} href={service.href} label={service.label} index={i} onClick={onClick} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={dividerVariants} className="h-px bg-white/10 origin-left" />
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main Header Component
// ─────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      if (currentY > 80) {
        const delta = currentY - lastScrollY.current;
        if (delta > 4) setHeaderVisible(false);
        else if (delta < -4) setHeaderVisible(true);
      } else {
        setHeaderVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const routeTheme = resolveRouteTheme(pathname);

  const logoSrc = menuOpen ? LOGO_SRCS.white : scrolled ? LOGO_SRCS.dark : LOGO_SRCS[routeTheme.logo];

  const iconColor = menuOpen
    ? 'text-white'
    : scrolled
      ? 'text-black'
      : routeTheme.linkColor === 'black'
        ? 'text-black'
        : 'text-white';

  // No border on any state
  const headerBg = menuOpen
    ? 'bg-transparent'
    : scrolled
      ? 'bg-white/40 backdrop-blur-2xl shadow-[0_2px_28px_rgba(0,0,0,0.05)]'
      : 'bg-transparent';

  const allMenuLinks = [...navLinks, ...MENU_EXTRA];

  return (
    <>
      {/* ── Header Bar ── */}
      <motion.header
        initial={false}
        animate={{ y: headerVisible || menuOpen ? '0%' : '-100%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={['fixed top-0 left-0 right-0 z-100', 'transition-colors duration-500', headerBg].join(' ')}
      >
        {/* Heights dynamically scale infinitely on massive 4k/8k displays */}
        <div className="grid grid-cols-3 items-center h-14 md:h-16 lg:h-28 2xl:h-[max(9rem,5vw)] w-full px-5 md:px-7 lg:px-8">
          {/* Col 1 — Award image | FLIP logo when menu open */}
          <div className="flex items-center justify-start">
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="logo-left"
                  layoutId="header-logo"
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href="/" onClick={() => setMenuOpen(false)}>
                    <Image
                      src={LOGO_SRCS.white}
                      alt="Digitally Next"
                      width={600}
                      height={60}
                      className="w-[40vw] sm:w-[28vw] md:w-[16vw] lg:w-[18vw]"
                    />
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="award-img"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src="/admin-ajax.webp"
                    alt="awards"
                    width={80}
                    height={80}
                    quality={100}
                    className="w-14 h-14 md:w-16 md:h-16 lg:w-28 lg:h-28 object-contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Col 2 — Center logo, FLIP to col-1 on menu open */}
          <div className="flex items-center justify-center">
            <AnimatePresence>
              {!menuOpen && (
                <motion.div
                  layoutId="header-logo"
                  initial={false}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href="/">
                    <Image
                      src={logoSrc}
                      alt="Digitally Next"
                      width={600}
                      height={60}
                      className="w-[40vw] sm:w-[28vw] md:w-[16vw] lg:w-[18vw]"
                      priority
                    />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Col 3 — Hamburger / Close */}
          <div className="flex items-center justify-end">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className={[
                'relative w-10 h-10 flex items-center justify-center',
                'bg-transparent border-none cursor-pointer rounded-full',
                'transition-colors duration-300',
                iconColor,
              ].join(' ')}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute"
                  >
                    <X size={28} strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute"
                  >
                    <Menu size={28} strokeWidth={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Full-Screen Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              // Safari: force GPU compositing and add backface-visibility
              // Note: -webkit-clip-path is handled by Framer Motion's autoprefixing
              willChange: 'clip-path, transform',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
            }}
            className="fixed inset-0 z-99 bg-[#0a0a0a] flex flex-col"
          >
            {/* Margins dynamically scale boundlessly with screen widths >1536px */ }
            <div
              className={[
                'flex-1 overflow-y-auto mt-14 md:mt-16 lg:mt-28 2xl:mt-[max(9rem,5vw)] ',
                '[&::-webkit-scrollbar]:w-0.75',
                '[&::-webkit-scrollbar-track]:bg-transparent',
                '[&::-webkit-scrollbar-thumb]:bg-white/20',
                '[&::-webkit-scrollbar-thumb]:rounded-full',
                '[&::-webkit-scrollbar-thumb:hover]:bg-white/40',
              ].join(' ')}
            >
              <nav className="pt-4 md:pt-6">
                {allMenuLinks.map((link, i) => {
                  const isServices = link.label === 'SERVICES';
                  return (
                    <MagneticLink
                      key={link.label}
                      href={link.href}
                      label={link.label}
                      index={i}
                      onClick={() => setMenuOpen(false)}
                      hasSubmenu={isServices}
                      submenuOpen={isServices && servicesOpen}
                      onSubmenuToggle={isServices ? () => setServicesOpen((v) => !v) : undefined}
                    />
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
