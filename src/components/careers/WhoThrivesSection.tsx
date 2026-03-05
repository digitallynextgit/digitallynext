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
    image: "/figma/careers/careers-thrives-bg-48937d.webp",
  },
  {
    before: 'Ask "',
    bold: "why",
    after: '" before "how"',
    image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg",
  },
  {
    before: "Care about ",
    bold: "outcomes",
    after: ", not just effort",
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg",
  },
  {
    before: "Want to ",
    bold: "grow",
    after: " without pretending",
    image: "https://images.pexels.com/photos/4173195/pexels-photo-4173195.jpeg",
  },
];

const DEFAULT_BG = "/figma/careers/careers-thrives-bg-48937d.webp";

export default function WhoThrivesSection({ theme }: WhoThrivesSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full overflow-hidden">

      {/* Default background */}
      <Image
        src={DEFAULT_BG}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        style={{
          transition: "opacity 0.5s ease",
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
            transition: "opacity 0.5s ease",
            opacity: hoveredIndex === index ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "rgba(0,0,0,0.90)" }}
      />

      {/* Content */}
      <div className="relative z-20 w-full">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 py-12 md:py-16 lg:py-20 text-white">

          {/* Heading */}
          <div className="text-center max-w-180 mx-auto">
            <h2
              className="font-normal leading-[1.15] text-white"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.975rem)" }}
            >
              Who Thrives at{" "}
              <span className="text-[#E21F26] font-bold">Digitally</span>{" "}
              <span className="font-bold text-white">Next</span>
              <span className="text-[#0EC8C5] font-bold">.</span>
            </h2>
            <p className="mt-6 text-[#D1D1D1] font-light text-[16px] leading-[1.8]">
              People who do well here usually:
            </p>
          </div>

          {/* Traits Grid */}
          <div className="mt-16 max-w-200 mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-x-16">

            {/* Left col — traits 0, 2 */}
            <div>
              {[0, 2].map((traitIdx) => {
                const trait = traits[traitIdx];
                return (
                  <div
                    key={traitIdx}
                    onMouseEnter={() => setHoveredIndex(traitIdx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="py-6 border-t border-white/40 cursor-default" // ← was border-white/15
                    style={{
                      transition: "opacity 0.3s ease",
                      opacity:
                        hoveredIndex === null || hoveredIndex === traitIdx
                          ? 1
                          : 0.35,
                    }}
                  >
                    <div
                      className="text-[17px] cursor-pointer font-normal leading-normal transition-colors duration-300"
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
                    className="py-6 border-t border-white/40 cursor-default" // ← was border-white/15
                    style={{
                      transition: "opacity 0.3s ease",
                      opacity:
                        hoveredIndex === null || hoveredIndex === traitIdx
                          ? 1
                          : 0.35,
                    }}
                  >
                    <div
                      className="text-[17px] cursor-pointer font-normal leading-normal transition-colors duration-300"
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
            <span className="block">This isn&apos;t the place for shortcuts.</span>
            <span className="block">But it is a place to build something solid.</span>
          </div>

        </div>
      </div>
    </section>
  );
}
