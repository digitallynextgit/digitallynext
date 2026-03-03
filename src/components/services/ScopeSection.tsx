"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionTheme } from "@/context/SectionThemeContext";
import type { ServiceSection, ServiceTheme } from "@/data/services";
import Link from "next/link";

type Props = {
  section: Extract<ServiceSection, { type: "scope" }>;
  theme: ServiceTheme;
};

export default function ScopeSection({ section, theme }: Props) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = contextTheme === "dark";

  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { root: null, rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const activeItem = section.items[activeIndex];

  return (
    <section
      className={[
        "transition-colors duration-700",
        isDark ? "bg-[#000000]" : "bg-[#FAFAFA]",
      ].join(" ")}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 py-10 sm:px-10 md:py-16 lg:px-[120px] lg:py-20">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-12 lg:gap-[72px]">

          {/* ── Header Block ── */}
          <div className="flex flex-col gap-4 lg:gap-6">
            <p
              className="font-medium uppercase text-[13px] lg:text-base"
              style={{ color: theme.accent, letterSpacing: "3px" }}
            >
              {section.eyebrow}
            </p>

            <h2
              className={[
                "font-bold leading-[1.1] text-[36px] sm:text-[44px] lg:text-[56px]",
                "transition-colors duration-700",
                isDark ? "text-white" : "text-[#000000]",
              ].join(" ")}
              dangerouslySetInnerHTML={{ __html: section.heading }}
            />

            {section.description && (
              <p
                className={[
                  "text-base sm:text-xl lg:text-2xl font-light",
                  "transition-colors duration-700",
                  isDark ? "text-[#E5E5E5]" : "text-[#787878]",
                ].join(" ")}
              >
                {section.description}
              </p>
            )}
          </div>

          {/* ── Items ── */}
          <div>

            {/* DESKTOP — sticky image left + scrollable right */}
            {/* ↑ col 1 wider (480px) for bigger image */}
            <div className="hidden lg:grid grid-cols-[480px_1fr] gap-14 items-start">

              {/* LEFT — Sticky image (bigger) */}
              <div className="sticky top-28">
                <div
                  className={[
                    "relative w-full overflow-hidden rounded-md shadow-2xl border",
                    "transition-colors duration-500",
                    isDark
                      ? "bg-[#1a1a1a] border-white/10"
                      : "bg-[#f0f0f0] border-black/10",
                  ].join(" ")}
                  style={{ aspectRatio: "4 / 3" }}   // taller feel
                >
                  <AnimatePresence mode="popLayout">
                    {activeItem?.imageSrc ? (
                      <motion.div
                        key={activeIndex}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      >
                        <Image
                          src={activeItem.imageSrc}
                          alt={activeItem.title}
                          fill
                          className="object-cover"
                          sizes="480px"
                          priority={activeIndex === 0}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`placeholder-${activeIndex}`}
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <span
                          className={[
                            "text-5xl font-bold tracking-tight",
                            isDark ? "text-white/10" : "text-black/10",
                          ].join(" ")}
                        >
                          {String(activeIndex + 1).padStart(2, "0")}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Title overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-5 bg-linear-to-t from-black/75 to-transparent">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={activeIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="text-white text-base font-semibold tracking-wide"
                      >
                        {activeItem?.title}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
                {/* ── dots removed ── */}
              </div>

              {/* RIGHT — Scrollable items */}
              <div className="flex flex-col">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    ref={(el) => { itemRefs.current[idx] = el; }}
                  >
                    <div
                      className={[
                        "flex items-start gap-6 py-9 border-b",
                        "transition-all duration-500 cursor-default",
                        isDark ? "border-white/10" : "border-black/10",
                        activeIndex === idx ? "opacity-100" : "opacity-35",
                      ].join(" ")}
                    >
                      {/* Index */}
                      <span
                        className="shrink-0 text-sm font-mono pt-1 transition-colors duration-500"
                        style={{
                          color:
                            activeIndex === idx
                              ? theme.accent
                              : isDark
                              ? "rgba(255,255,255,0.3)"
                              : "rgba(0,0,0,0.3)",
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <div className="flex flex-col gap-3">
                        {/* ↑ title: 22px → 24px */}
                        <Link
                          href={'/contact'}
                          className={[
                            "font-bold text-[24px] leading-[34px] transition-colors duration-500 hover:text-[#E21F26] active:text-[#E21F26]",
                            activeIndex === idx
                              ? isDark ? "text-white" : "text-[#000000]"
                              : isDark ? "text-white/50" : "text-black/50",
                          ].join(" ")}
                        >
                          {item.title}
                        </Link>
                        {/* ↑ description: 16px → 18px */}
                        <p
                          className={[
                            "text-[18px] leading-[30px] font-light transition-colors duration-700",
                            isDark ? "text-[#E5E5E5]" : "text-[#787878]",
                          ].join(" ")}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MOBILE — unchanged */}
            <div className="flex flex-col lg:hidden">
              {section.items.map((item, idx) => (
                <div key={idx}>
                  <div
                    className={[
                      "flex flex-col gap-6",
                      idx < section.items.length - 1 ? "pb-[72px]" : "pb-14",
                    ].join(" ")}
                  >
                    {item.imageSrc && (
                      <div
                        className="relative w-full overflow-hidden"
                        style={{ aspectRatio: "16 / 10" }}
                      >
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex flex-col gap-4">
                      <Link
                        href={'/contact'}
                        className={[
                          "font-bold text-[20px] leading-[30px] transition-colors duration-700 hover:text-[#E21F26] active:text-[#E21F26]",
                          isDark ? "text-white" : "text-[#000000]",
                        ].join(" ")}
                      >
                        {item.title}
                      </Link>
                      <p
                        className={[
                          "text-[16px] leading-[27px] font-light transition-colors duration-700",
                          isDark ? "text-[#E5E5E5]" : "text-[#787878]",
                        ].join(" ")}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ── Footer Text ── */}
          {section.footerText && (
            <p
              className={[
                "text-start text-[24px] leading-[27px] font-light whitespace-pre-line",
                "transition-colors duration-700",
                isDark ? "text-[#E5E5E5]" : "text-[#787878]",
              ].join(" ")}
              dangerouslySetInnerHTML={{ __html: section.footerText }}
            />
          )}

        </div>
      </div>
    </section>
  );
}
