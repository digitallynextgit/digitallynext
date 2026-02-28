"use client";

import Image from "next/image";
import { useState } from "react";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface WhoThrivesSectionProps {
  theme?: "dark" | "light";
}

const traits = [
  {
    before: "Like ",
    bold: "structure",
    after: ", but hate rigidity",
    image: "/figma/careers/careers-thrives-1.png",
  },
  {
    before: 'Ask "',
    bold: "why",
    after: '" before "how"',
    image: "/figma/careers/careers-thrives-2.png",
  },
  {
    before: "Care about ",
    bold: "outcomes",
    after: ", not just effort",
    image: "/figma/careers/careers-thrives-3.png",
  },
  {
    before: "Want to ",
    bold: "grow",
    after: " without pretending",
    image: "/figma/careers/careers-thrives-4.png",
  },
];

export default function WhoThrivesSection({ theme }: WhoThrivesSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden">

      {/* Default background */}
      <Image
        src="/figma/careers/careers-thrives-bg-48937d.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        style={{
          transition: "opacity 0.4s ease",
          opacity: hoveredIndex === null ? 1 : 0,
        }}
      />

      {/* Per-trait hover images */}
      {traits.map((trait, index) => (
        <Image
          key={index}
          src={trait.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{
            transition: "opacity 0.4s ease",
            opacity: hoveredIndex === index ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay — slightly lighter on light theme */}
      <div
        className="absolute inset-0 z-1 transition-colors duration-700"
        style={{
          background: isDark
            ? "rgba(0,0,0,0.85)"
            : "rgba(0,0,0,0.70)",
        }}
      />

      {/* Content */}
      <div className="container relative z-2 flex justify-center items-center text-white">
        <div style={{ maxWidth: 1103 }} className="w-full py-12 md:py-16 lg:py-20">

          {/* Heading */}
          <div className="text-center max-w-[720px] mx-auto">
            <h2
              className="font-normal leading-[1.15] text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 2.975rem)" }}
            >
              Who Thrives at{" "}
              <span className="text-[#E21F26] font-bold">Digitally</span>{" "}
              <span className="font-bold text-white">Next</span>
              <span className="text-[#0EC8C5] font-bold">.</span>
            </h2>
            <div className="mt-6 text-[#D1D1D1] font-light text-[16px] leading-[1.8]">
              People who do well here usually:
            </div>
          </div>

          {/* Traits Grid */}
          <div
            className="mt-16 max-w-[800px] mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-x-16"
          >
            {/* Left col — traits 0, 2 */}
            <div>
              {[0, 2].map((traitIdx) => {
                const trait = traits[traitIdx];
                return (
                  <div
                    key={traitIdx}
                    onMouseEnter={() => setHoveredIndex(traitIdx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="py-[25px] border-t border-white/15 cursor-default"
                    style={{
                      transition: "opacity 0.3s ease",
                      opacity:
                        hoveredIndex === null || hoveredIndex === traitIdx
                          ? 1
                          : 0.4,
                    }}
                  >
                    <div
                      className="text-[17px] font-normal leading-normal transition-colors duration-300"
                      style={{
                        color: hoveredIndex === traitIdx ? "#0EC8C5" : "#FFFFFF",
                      }}
                    >
                      {trait.before}
                      <span className="font-bold">{trait.bold}</span>
                      {trait.after}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right col — traits 1, 3 */}
            <div>
              {[1, 3].map((traitIdx) => {
                const trait = traits[traitIdx];
                return (
                  <div
                    key={traitIdx}
                    onMouseEnter={() => setHoveredIndex(traitIdx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="py-[25px] border-t border-white/15 cursor-default"
                    style={{
                      transition: "opacity 0.3s ease",
                      opacity:
                        hoveredIndex === null || hoveredIndex === traitIdx
                          ? 1
                          : 0.4,
                    }}
                  >
                    <div
                      className="text-[17px] font-normal leading-normal transition-colors duration-300"
                      style={{
                        color: hoveredIndex === traitIdx ? "#0EC8C5" : "#FFFFFF",
                      }}
                    >
                      {trait.before}
                      <span className="font-bold">{trait.bold}</span>
                      {trait.after}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom text */}
          <div className="mt-14 text-center text-[#D1D1D1] font-light text-[15px] leading-[1.8]">
            <div>This isn&apos;t the place for shortcuts.</div>
            <div>But it is a place to build something solid.</div>
          </div>

        </div>
      </div>
    </section>
  );
}
