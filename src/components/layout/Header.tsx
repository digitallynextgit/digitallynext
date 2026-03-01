"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type Variants,
  useSpring,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/content";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─────────────────────────────────────────────
// Types & Static Config
// ─────────────────────────────────────────────
type RouteHeaderTheme = {
  linkColor: "white" | "black";
  logo: "light" | "dark" | "white";
};

const ROUTE_THEMES: Record<string, RouteHeaderTheme> = {
  "/": { linkColor: "white", logo: "light" },
  "/services": { linkColor: "white", logo: "white" },
  "/contact": { linkColor: "white", logo: "white" },
  "/about": { linkColor: "black", logo: "dark" },
  "/terms-of-use": { linkColor: "white", logo: "white" },
  "/privacy-policy": { linkColor: "white", logo: "white" },
  "/case-studies": { linkColor: "black", logo: "dark" },
  "/careers": { linkColor: "black", logo: "dark" },
};

const NOT_FOUND_THEME: RouteHeaderTheme = { linkColor: "white", logo: "white" };

const LOGO_SRCS: Record<RouteHeaderTheme["logo"], string> = {
  light: "/logo-complete-white.webp",
  dark: "/logo1.webp",
  white: "/logo1-white.webp",
};

function resolveRouteTheme(pathname: string): RouteHeaderTheme {
  if (ROUTE_THEMES[pathname]) return ROUTE_THEMES[pathname];
  const prefixMatch = Object.keys(ROUTE_THEMES)
    .filter((key) => key !== "/" && pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];
  if (prefixMatch) return ROUTE_THEMES[prefixMatch];
  return NOT_FOUND_THEME;
}

// ─────────────────────────────────────────────
// Animation Variants (outside component = stable refs)
// ─────────────────────────────────────────────

// Overlay: clip-path wipe from top-right corner → full screen
const overlayVariants: Variants = {
  hidden: {
    clipPath: "circle(0% at calc(100% - 40px) 40px)",
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.76, 0, 0.24, 1] as const,
      when: "afterChildren",
    },
  },
  visible: {
    clipPath: "circle(170% at calc(100% - 40px) 40px)",
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.76, 0, 0.24, 1] as const,
      delayChildren: 0.3,
      staggerChildren: 0.07,
    },
  },
};

// Each nav link: slides up + fades in
const linkVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Divider line under each link
const dividerVariants: Variants = {
  hidden: { scaleX: 0, transition: { duration: 0.2 } },
  visible: {
    scaleX: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 },
  },
};

// Bottom social/footer row
const footerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const, delay: 0.55 },
  },
};

// ─────────────────────────────────────────────
// Magnetic Nav Link Component
// ─────────────────────────────────────────────
function MagneticLink({
  href,
  label,
  index,
  onClick,
}: {
  href: string;
  label: string;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 18, mass: 0.08 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-30, 30], [2.5, -2.5]);
  const rotateY = useTransform(x, [-80, 80], [-2.5, 2.5]);

  const hoverX = useMotionValue(0);
  const smoothHoverX = useSpring(hoverX, { stiffness: 200, damping: 28 });

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
  };

  const handleMouseEnter = () => {
    hoverX.set(12);
  };

  return (
    <motion.div
      ref={ref}
      variants={linkVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="w-full border-t border-white/10 last:border-b"
      style={{ willChange: "transform" }}
    >
      <motion.a
        href={href}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          x: smoothHoverX,        
          transformPerspective: 1200, 
          willChange: "transform",
        }}
        className="group flex items-center justify-between w-full py-5 md:py-6 px-6 md:px-12 cursor-pointer"
      >
        {/* Index number */}
        <span className="text-white/30 text-sm font-mono w-8 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Label */}
        <span className="flex-1 text-white text-[clamp(2rem,5vw,4rem)] font-light tracking-tight leading-none uppercase">
          {label}
        </span>

        {/* Arrow */}
        <motion.span
          className="text-white/40 text-xl font-light"
          style={{
            x: useTransform(smoothHoverX, [0, 12], [-6, 0]),
            opacity: useTransform(smoothHoverX, [0, 12], [0, 1]),
          }}
        >
          →
        </motion.span>
      </motion.a>

      {/* Animated underline */}
      <motion.div
        variants={dividerVariants}
        className="h-px bg-white/10 origin-left"
      />
    </motion.div>
  );
}


// ─────────────────────────────────────────────
// Main Header Component
// ─────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const routeTheme = resolveRouteTheme(pathname);
  const isBlackLink = !scrolled && routeTheme.linkColor === "black";
  const logoSrc = menuOpen || scrolled ? LOGO_SRCS.white : LOGO_SRCS[routeTheme.logo];
  const iconColor = menuOpen ? "text-white" : isBlackLink ? "text-black" : "text-white";

  return (
    <>
      {/* ── Header Bar ── */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-100",
          "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled && !menuOpen
            ? "bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/8"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <div className="grid grid-cols-3 items-center h-16 md:h-20 w-full px-5 md:px-7 lg:px-8">

          {/* Col 1 – Left Image */}
          <div className="flex items-center justify-start">
            <Image
              src="/admin-ajax.webp"
              alt="awards"
              width={120}
              height={120}
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
          </div>

          {/* Col 2 – Center Logo */}
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center">
              <Image
                src={logoSrc}
                alt="Digitally Next"
                width={1200}
                height={120}
                className="w-[58vw] sm:w-[44vw] md:w-[20vw] lg:w-[14vw]"
                priority
              />
            </Link>
          </div>


          {/* Col 3 – Animated Hamburger */}
          <div className="flex items-center justify-end">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className={[
                "relative w-10 h-10 flex items-center justify-center",
                "bg-transparent border-none cursor-pointer rounded-full",
                "transition-colors duration-300",
                iconColor,
              ].join(" ")}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute"
                  >
                    <X size={22} strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute"
                  >
                    <Menu size={22} strokeWidth={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-Screen Menu Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ willChange: "clip-path" }}
            className="fixed inset-0 z-99 bg-[#0a0a0a] flex flex-col"
          >
            {/* Nav Links — vertically centered */}
            <nav className="flex-1 flex flex-col justify-start mt-20 md:mt-28 lg:mt-32">
              {navLinks.map((link, i) => (
                <MagneticLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  index={i}
                  onClick={() => setMenuOpen(false)}
                />
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
