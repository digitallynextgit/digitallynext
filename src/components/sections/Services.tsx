"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useSectionTheme } from "@/context/SectionThemeContext";

const maskStyle = {
  maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
};

/* ===== Mobile Accordion ===== */
function MobileServices({ isDark }: { isDark: boolean }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const toggle = (i: number) => setExpandedIndex(expandedIndex === i ? null : i);

  return (
    <div className="lg:hidden">
      <div className="flex flex-col">
        {services.map((service, i) => {
          const isOpen = expandedIndex === i;
          return (
            <div
              key={service.id}
              className={[
                "border-b transition-colors duration-500",
                isDark ? "border-white/10" : "border-black/10",
              ].join(" ")}
            >
              {/* Accordion header */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-baseline justify-between py-6 px-1 text-left group"
              >
                <h3
                  className={[
                    "text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-300",
                    isOpen
                      ? "text-[#E53935]"
                      : isDark
                        ? "text-white/30 group-hover:text-white/70"
                        : "text-black/30 group-hover:text-black/70",
                  ].join(" ")}
                >
                  {service.title}
                </h3>
                <span
                  className={[
                    "ml-4 flex items-center gap-0.5 text-sm font-mono shrink-0 transition-colors duration-300",
                    isOpen ? "text-[#E53935]" : isDark ? "text-white/30" : "text-black/30",
                  ].join(" ")}
                >
                  {"{ "}
                  {String(i + 1).padStart(2, "0")}
                  {" }"}
                </span>
              </button>

              {/* Accordion body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 px-1">
                      <Link href={`/services/${service.slug}`}>
                        <div
                          className={[
                            "relative aspect-video rounded-sm overflow-hidden shadow-2xl mb-4 group",
                            "border transition-colors duration-500",
                            isDark
                              ? "bg-[#1a1a1a] border-white/10"
                              : "bg-[#f0f0f0] border-black/10",
                          ].join(" ")}
                        >
                          <Image
                            src={service.media}
                            alt={service.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 480px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority={i === 0}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white font-semibold text-sm tracking-widest uppercase border border-white/60 px-4 py-2 rounded-sm backdrop-blur-sm">
                              <Image src="/icons/enter.svg" alt="" width={16} height={16} />
                              View Details
                            </span>
                          </div>
                        </div>
                      </Link>

                      {/* Subtitle */}
                      <p
                        className={[
                          "text-sm mb-4 leading-relaxed transition-colors duration-500",
                          isDark ? "text-white/60" : "text-black/60",
                        ].join(" ")}
                      >
                        {service.hero.subtitle}
                      </p>

                      {/* Slider */}
                      <div
                        className={[
                          "rounded-sm py-2.5 overflow-hidden whitespace-nowrap mb-4",
                          "transition-colors duration-500",
                          isDark ? "bg-white/5" : "bg-black/5",
                        ].join(" ")}
                        style={maskStyle}
                      >
                        <motion.div
                          className={[
                            "inline-flex text-xs font-medium transition-colors duration-500",
                            isDark ? "text-white/40" : "text-black/40",
                          ].join(" ")}
                          animate={{ x: ["0%", "-50%"] }}
                          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        >
                          {[...Array(3)].map((_, j) => (
                            <span key={j} className="shrink-0 flex items-center">
                              {service.sliderText}
                              <span className="mx-4 opacity-40">·</span>
                            </span>
                          ))}
                        </motion.div>
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/services/${service.slug}`}
                        className="group inline-flex items-center gap-2 mt-1"
                      >
                        <span className="text-[#E21F26] transition-transform duration-300 ease-out group-hover:-translate-x-1">
                          <Image src="/icons/enter.svg" alt="" width={20} height={20} />
                        </span>
                        <span
                          className={[
                            "text-sm font-semibold tracking-wide uppercase",
                            "transition-colors duration-200 group-hover:text-[#E21F26]",
                            isDark ? "text-white" : "text-black",
                          ].join(" ")}
                        >
                          Explore {service.title}
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ===== Desktop ===== */
function DesktopServices({ isDark }: { isDark: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(index); },
        { root: null, rootMargin: "-35% 0px -60% 0px", threshold: 0 },
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="hidden lg:block">
      <div className="grid grid-cols-[44%_1fr] gap-2 mt-20">

        {/* LEFT — Sticky media */}
        <div className="relative">
          <div
            className="lg:sticky lg:top-32 w-full max-w-[460px]"
            style={{ position: "-webkit-sticky" } as React.CSSProperties}
          >
            <div
              className={[
                "relative aspect-4/3 rounded-sm overflow-hidden shadow-2xl",
                "border transition-colors duration-500",
                isDark
                  ? "bg-[#1a1a1a] border-white/10"
                  : "bg-[#f0f0f0] border-black/10",
              ].join(" ")}
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Image
                    src={services[activeIndex].media}
                    alt={services[activeIndex].title}
                    fill
                    sizes="(max-width: 1280px) 44vw, 520px"
                    className="object-cover"
                    priority={activeIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT — Scrollable items */}
        <div className="flex flex-col overflow-x-hidden overflow-y-hidden min-w-0">
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="transition-all duration-500"
            >
              <Link
                href={`/services/${service.slug}`}
                className="group flex items-start gap-4 mb-6 w-full min-w-0 transition-transform duration-200 ease-out hover:translate-x-3"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Arrow icon */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="relative z-20 shrink-0 mt-5"
                >
                  <Image
                    src="/icons/enter.svg"
                    alt="arrow"
                    width={52}
                    height={52}
                    className="transition-transform duration-300 ease-out"
                  />
                </motion.div>

                {/* Service title */}
                <h3
                  className={[
                    "min-w-0 whitespace-normal wrap-break-words",
                    "text-3xl md:text-5xl font-bold leading-tight tracking-tight",
                    "transition-colors duration-300",
                    hoveredIndex === i || activeIndex === i
                      ? "text-[#E53935]"
                      : activeIndex + 1 === i
                        ? isDark ? "text-white" : "text-black"
                        : isDark ? "text-white/20" : "text-black/20",
                  ].join(" ")}
                >
                  {service.title}
                </h3>
              </Link>

              {/* Slider */}
              <div
                className={[
                  "rounded-sm py-3 overflow-hidden whitespace-nowrap mt-4",
                  "transition-colors duration-500",
                  isDark ? "bg-white/5" : "bg-black/5",
                ].join(" ")}
                style={maskStyle}
              >
                <motion.div
                  className={[
                    "inline-flex text-lg font-medium transition-colors duration-500",
                    isDark ? "text-white/60" : "text-black/60",
                  ].join(" ")}
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(4)].map((_, j) => (
                    <span key={j} className="shrink-0 flex items-center">
                      {service.sliderText}
                      <span className="mx-4 opacity-40">·</span>
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Divider */}
              <div
                className={[
                  "my-12 h-px transition-colors duration-500",
                  isDark ? "bg-white/8" : "bg-black/8",
                ].join(" ")}
              />
            </div>
          ))}

          {/* Inquire Now CTA */}
          <div className="pt-8 w-full flex justify-start pl-8">
            <Link href="/contact" className="group inline-flex items-center gap-1 pl-1">
              <span className="text-[#E21F26] transition-transform duration-300 ease-out group-hover:-translate-x-1">
                <Image src="/icons/enter.svg" alt="arrow-right" width={32} height={32} />
              </span>
              <span
                className={[
                  "mt-1 font-light text-2xl transition-colors duration-200 group-hover:text-[#E21F26]",
                  isDark ? "text-white" : "text-black",
                ].join(" ")}
              >
                Inquire Now
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Main Export ===== */
interface ServicesProps {
  theme?: "dark" | "light";
}

export default function Services({ theme }: ServicesProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  return (
    <section id="services" className="py-10 md:py-16 lg:py-20">
      <div className="w-[90%] lg:w-[85%] max-w-7xl mx-auto">
        <AnimatedSection>
          <h2
            className={[
              "text-2xl font-extrabold tracking-tight transition-colors duration-500",
              isDark ? "text-white" : "text-[#1a1a1a]",
            ].join(" ")}
          >
            <span className="text-5xl md:text-[6vw]">Services</span>
            <span className="text-[#0EC8C5] text-[5rem]">.</span>
          </h2>
        </AnimatedSection>

        <DesktopServices isDark={isDark} />
        <MobileServices isDark={isDark} />

        {/* Mobile CTA */}
        <div className="pt-8 w-full flex justify-start lg:hidden">
          <Link href="/contact" className="group inline-flex items-center gap-1 pl-1">
            <span className="text-[#E21F26] transition-transform duration-300 ease-out group-hover:-translate-x-1">
              <Image src="/icons/enter.svg" alt="arrow-right" width={32} height={32} />
            </span>
            <span
              className={[
                "mt-1 font-light text-2xl transition-colors duration-200 group-hover:text-[#E21F26]",
                isDark ? "text-white" : "text-black",
              ].join(" ")}
            >
              Inquire Now
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
