"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/content";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type RouteHeaderTheme = {
  linkColor: "white" | "black";
  logo: "light" | "dark" | "white";
};

const ROUTE_THEMES: Record<string, RouteHeaderTheme> = {
  "/":              { linkColor: "white", logo: "light" },
  "/services":     { linkColor: "white", logo: "white" },
  "/contact":       { linkColor: "white", logo: "white" },
  "/about":         { linkColor: "black", logo: "dark"  },
  "/terms-of-use":  { linkColor: "white", logo: "white" },
  "/privacy-policy":{ linkColor: "white", logo: "white" },
  "/case-studies":  { linkColor: "black", logo: "dark"  },
  "/careers":       { linkColor: "black", logo: "dark"  },
};

const NOT_FOUND_THEME: RouteHeaderTheme = { linkColor: "white", logo: "white" };

const LOGO_SRCS: Record<RouteHeaderTheme["logo"], string> = {
  light: "/logo-complete-white.webp",
  dark:  "/logo1.webp",
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

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const routeTheme = resolveRouteTheme(pathname);

  // scrolled hone pe hamesha white links
  const isBlackLink = !scrolled && routeTheme.linkColor === "black";
  const logoSrc     = scrolled ? LOGO_SRCS.white : LOGO_SRCS[routeTheme.logo];

  const navLinkClass = [
    "text-[11px] lg:text-[15px]",
    "font-light",
    "tracking-[0.06em] lg:tracking-[0.08em]",
    "uppercase",
    "transition-colors duration-200",
    isBlackLink ? "text-black" : "text-white",
  ].join(" ");

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-100 md:py-1",
          "transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled && !mobileOpen
            ? "bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/8"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        {/* ── Grid: mobile = flex (logo left) │ desktop = 5-col grid ── */}
        <div
          className={[
            "relative flex md:grid md:grid-cols-5",
            "items-center h-20 w-full",
            "px-5 md:px-7 lg:px-8",
          ].join(" ")}
        >
          {/* 1. Home */}
          <div className="hidden md:flex justify-center">
            <Link href="/" className={navLinkClass}>HOME</Link>
          </div>

          {/* 2. Services */}
          <div className="hidden md:flex justify-center">
            <Link href="/#services" className={navLinkClass}>SERVICES</Link>
          </div>

          {/* 3. Center Logo ── md:col-start-3 keeps it centered in grid */}
          <div className="flex md:justify-center md:col-start-3">
            <Link href="/" className="flex items-center">
              <Image
                src={logoSrc}
                alt="Digitally Next"
                width={1200}
                height={120}
                className="w-[44vw] sm:w-[36vw] md:w-[28vw] lg:w-[16vw]"
                priority
              />
            </Link>
          </div>

          {/* 4. Case Studies */}
          <div className="hidden md:flex justify-center">
            <Link href="/case-studies" className={navLinkClass}>CASE STUDIES</Link>
          </div>

          {/* 5. Careers */}
          <div className="hidden md:flex justify-center">
            <Link href="/careers" className={navLinkClass}>CAREERS</Link>
          </div>

          {/* Hamburger – absolute right, visible only on mobile */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className={[
                "bg-transparent border-none cursor-pointer p-1",
                isBlackLink ? "text-black" : "text-white",
              ].join(" ")}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-99 bg-[#0a0a0a] flex flex-col justify-center items-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="text-[32px] font-bold text-(--text-accent)"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
