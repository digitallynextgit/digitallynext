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
    <section
      ref={sectionRef}
      className="py-8 sm:py-10 md:py-16 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Outer column — gap scales per breakpoint */}
        <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-14 lg:gap-18">

          {/* Header */}
          <motion.h2
            className={[
              "font-extrabold tracking-tight leading-none text-center transition-colors duration-500",
              isDark ? "text-white" : "text-[#0A0A0A]",
            ].join(" ")}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]">
              Alliances &amp; Recognition
            </span>
            <span className="text-[#0EC8C5] text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[80px]">
              .
            </span>
          </motion.h2>

          {/* Awards Row */}
          <motion.div
            className={[
              "flex flex-col sm:flex-row flex-wrap items-center justify-center w-full", // ← flex-col on mobile, flex-row sm+
              "gap-10 sm:gap-12 md:gap-20 lg:gap-32 xl:gap-48",
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
            {awards.map((award, i) => (
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
                className="flex items-center justify-center shrink-0"
              >
                <Image
                  src={award.src}
                  alt={award.alt}
                  width={award.width}
                  height={award.height}
                  className="w-48 sm:w-full sm:min-w-32 sm:max-w-72 object-contain h-14 sm:h-16 md:h-18 lg:h-20 xl:h-24"
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
