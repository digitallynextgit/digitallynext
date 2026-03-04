"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface ModernDadSectionProps {
  theme?: "dark" | "light";
}

const items = [
  {
    sub: "Data doesn't sit in dashboards.",
    main: "It shapes decisions.",
    image: "/home/moderndad1.png",
  },
  {
    sub: "AI doesn't replace thinking.",
    main: "It removes friction.",
    image: "/home/moderndad2.png",
  },
  {
    sub: "Digital isn't a channel.",
    main: "It's the system.",
    image: "/home/moderndad3.png",
  },
];

export default function ModernDadSection({ theme }: ModernDadSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // Only used for xs mobile inline accordion
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // sm+: hover → that image, no hover → first image (index 0)
  const desktopActiveIndex = hoveredIndex ?? 0;

  return (
    <section
      className={[
        "transition-colors duration-700",
        isDark ? "bg-black text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <div
        className={`h-px bg-linear-to-r from-transparent ${
          isDark ? "via-white/10" : "via-black/10"
        } to-transparent transition-colors duration-500`}
      />

      <div className="relative flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 py-12 md:py-16 lg:py-20">

          {/* Top label */}
          <div className="text-[#0EC8C5] text-4xl sm:text-5xl lg:text-6xl font-light tracking-[0.1125em]">
            MODERN DAD
          </div>

          {/* Main layout row */}
          <div className="flex items-start justify-between w-full mt-6 gap-8 sm:gap-12">

            {/* Left: heading + items */}
            <div className="flex-1 min-w-0">
              <div
                className={[
                  "font-light leading-[1.15] transition-colors duration-700",
                  isDark ? "text-white" : "text-[#000000]",
                ].join(" ")}
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.975rem)" }}
              >
                How work moves{" "}
                <span className="text-[#E21F26]">forward here</span>
              </div>

              {/* Items */}
              <div className="mt-12 lg:mt-22 flex flex-col" style={{ gap: 48 }}>
                {items.map(({ sub, main, image }, index) => {
                  const isTapActive = selectedIndex === index;
                  const isDesktopDimmed =
                    hoveredIndex !== null && hoveredIndex !== index;

                  return (
                    <div key={sub}>
                      {/* Item row */}
                      <div
                        className="pl-5 lg:pl-12 cursor-pointer"
                        style={{
                          borderLeft: `2px solid ${
                            // xs: tapped item cyan; sm+: hovered item cyan
                            isTapActive || hoveredIndex === index
                              ? "#0EC8C5"
                              : "#C8102E"
                          }`,
                          transition: "border-color 0.3s ease",
                        }}
                        onClick={() => setSelectedIndex(index)}   // xs only tap
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <div
                          className="text-[#0EC8C5] text-[15px] lg:text-[16px] font-bold leading-[1.7]"
                          style={{
                            transition: "opacity 0.3s ease",
                            opacity: isDesktopDimmed ? 0.4 : 1,
                          }}
                        >
                          {sub}
                        </div>
                        <div
                          className={[
                            "mt-2 text-[26px] lg:text-[34px] font-normal leading-[1.2] transition-colors duration-700",
                            isDark ? "text-white" : "text-[#000000]",
                          ].join(" ")}
                          style={{
                            transition: "opacity 0.3s ease",
                            opacity: isDesktopDimmed ? 0.4 : 1,
                          }}
                        >
                          {main}
                        </div>
                      </div>

                      {/* Inline image — xs only (below sm hidden) */}
                      <div className="sm:hidden overflow-hidden">
                        <AnimatePresence initial={false}>
                          {isTapActive && (
                            <motion.div
                              key={index}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.45,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            >
                              <div className="relative w-full aspect-4/3 mt-5 rounded overflow-hidden">
                                <Image
                                  src={image}
                                  alt={main}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right image — sm+ only, hover controlled */}
            <div
              className="hidden sm:flex items-center justify-end shrink-0 self-center"
              style={{ width: 260 }}
            >
              <div className="relative" style={{ width: 240, height: 300 }}>
                {items.map(({ image, sub }, index) => (
                  <Image
                    key={sub}
                    src={image}
                    alt=""
                    fill
                    className="object-contain absolute"
                    style={{
                      transition: "opacity 0.4s ease",
                      opacity: desktopActiveIndex === index ? 1 : 0,
                      // ↑ hover → that image, no hover → index 0 (first)
                    }}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Bottom text */}
          <div
            className={[
              "mt-20 pt-10 text-[15px] font-light leading-[1.8] transition-colors duration-700",
              isDark
                ? "border-t border-[#262626] text-[#737373]"
                : "border-t border-[#E5E5E5] text-[#A1A1A1]",
            ].join(" ")}
          >
            <div>That&apos;s Modern DAD —</div>
            <div>how we keep work sharp, relevant, and future-ready.</div>
          </div>

        </div>
      </div>
    </section>
  );
}
