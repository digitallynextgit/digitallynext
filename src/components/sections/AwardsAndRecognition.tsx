"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSectionTheme } from "@/context/SectionThemeContext";

const awards = [
  { src: "/awards/a1.png", alt: "Award 1", width: 342, height: 69 },
  { src: "/awards/a2.png", alt: "Award 2", width: 313, height: 101 },
  { src: "/awards/a3.png", alt: "Award 3", width: 134, height: 101 },
];

// Max height per breakpoint per image (px)
const imageHeights: Record<number, { sm: number; md: number; lg: number }> = {
  0: { sm: 44, md: 60, lg: 82 },
  1: { sm: 44, md: 60, lg: 82 },
  2: { sm: 44, md: 60, lg: 82 },
};

interface AwardsAndRecognitionProps {
  theme?: "dark" | "light";
}

export default function AwardsAndRecognition({
  theme,
}: AwardsAndRecognitionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div
        className={`h-px bg-linear-to-r from-transparent ${isDark ? "via-white/10" : "via-gray-200"} to-transparent transition-colors duration-500`}
      />
      <section
        ref={sectionRef}
        className="py-10 md:py-16 lg:py-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 lg:mb-[72px]">
            <motion.h2
              className={[
                "font-extrabold tracking-tight leading-none transition-colors duration-500",
                isDark ? "text-white" : "text-[#0A0A0A]",
              ].join(" ")}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-4xl sm:text-5xl md:text-7xl lg:text-[80px]">
                Alliances &amp; Recognition
              </span>
              <span className="text-[#0EC8C5] text-4xl sm:text-5xl md:text-7xl lg:text-[80px]">
                .
              </span>
            </motion.h2>
          </div>

          {/* Awards Row */}
          <motion.div
            className={[
              "flex items-center w-full",
              isDark ? "divide-x divide-white/10" : "divide-x divide-gray-200",
            ].join(" ")}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.18,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {awards.map((award, i) => {
              const h = imageHeights[i];
              return (
                <motion.div
                  key={i}
                  variants={{
                    hidden: {
                      opacity: 0,
                      scale: 0.85,
                      filter: "blur(8px)",
                      y: 24,
                    },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="flex-1 flex items-center justify-center px-6 md:px-10 lg:px-14"
                >
                  <Image
                    src={award.src}
                    alt={award.alt}
                    width={award.width}
                    height={award.height}
                    className="w-auto object-contain"
                    style={{
                      height: `clamp(${h.sm}px, ${(h.md / 768) * 100}vw, ${h.lg}px)`,
                      maxWidth: "100%",
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      <div
        className={`h-px bg-linear-to-r from-transparent ${isDark ? "via-white/10" : "via-gray-200"} to-transparent transition-colors duration-500`}
      />
    </div>
  );
}
