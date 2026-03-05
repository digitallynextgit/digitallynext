"use client";

import { dadPillars } from "@/data/content";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";
import Link from "next/link";
import { useSectionTheme } from "@/context/SectionThemeContext";

type HowWeOperateProps = {
  theme?: "dark" | "light";
};

export default function HowWeOperate({ theme }: HowWeOperateProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  const modernGradient = isDark
    ? "linear-gradient(to bottom, #FFFFFF 20%, #555555 80%)"
    : "linear-gradient(to bottom, #000000 20%, #888888 80%)";
  const dadGradient = isDark
    ? "linear-gradient(to bottom, #E53935 10%, #7B0000 90%)"
    : "linear-gradient(to bottom, #E53935 10%, #C62828 90%)";
  const taglineGradient = isDark
    ? "linear-gradient(to right, #FFFFFF, #E53935)"
    : "linear-gradient(to right, #000000, #E53935)";

  return (
    <section
      id="how-we-operate"
      className="w-full flex flex-col items-center py-10 md:py-16 lg:py-20"
    >
      {/* Modern DAD Heading */}
      <div className="w-full overflow-hidden px-4 md:px-0">
        <h2
          className={[
            "select-none pointer-events-none w-full text-center",
            "font-black tracking-[-0.03em] leading-none",
            "whitespace-nowrap",
            "mb-[clamp(24px,3vw,48px)]",
          ].join(" ")}
          style={{
            // Safari fix: use inline style instead of Tailwind arbitrary for mask-image
            // Both prefixes required for older Safari
            WebkitMaskImage:
              "linear-gradient(to bottom, black 40%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 40%, transparent 100%)",
            fontSize: "clamp(2.5rem, 15.3vw, 20rem)",
            fontFamily: "Stack Sans Text",
          }}
        >
          <span
            className="bg-clip-text text-transparent transition-all duration-500"
            style={{ backgroundImage: modernGradient }}
          >
            Modern
          </span>{" "}
          <span
            className="bg-clip-text text-transparent transition-all duration-500"
            style={{ backgroundImage: dadGradient }}
          >
            DAD
          </span>
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 text-center">
        <AnimatedSection delay={0.2}>
          <h3
            className={[
              "text-[clamp(1.8rem,5vw,5rem)] font-extrabold mb-3 tracking-[-0.01em]",
              "transition-colors duration-500",
              isDark ? "text-white" : "text-[#1a1a1a]",
            ].join(" ")}
          >
            HOW WE OPERATE
            <span className="text-[#0EC8C5]">.</span>
          </h3>
          <p
            className={[
              "md:mt-4 text-base md:text-2xl lg:text-3xl font-normal",
              "mb-10 md:mb-16",
              "transition-colors duration-500",
              isDark ? "text-white/45" : "text-[#787878]",
            ].join(" ")}
            style={{ fontFamily: "Stack Sans Text" }}
          >
            An operating model where
          </p>
        </AnimatedSection>

        <div className="flex flex-col sm:flex-row justify-between mb-16 lg:mb-20 gap-10">
          {dadPillars.map((pillar, i) => (
            <AnimatedSection key={pillar.word} delay={0.15 + i * 0.1}>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-[clamp(120px,15vw,200px)] h-[clamp(120px,15vw,200px)]">
                  <Image
                    src={
                      i === 0
                        ? "/home/moderndad1.webp"
                        : i === 1
                          ? "/home/moderndad2.webp"
                          : "/home/moderndad3.webp"
                    }
                    alt={pillar.word}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-center max-w-45 lg:max-w-47.5 xl:max-w-56.75 leading-[1.4]">
                  <span className="text-[#E53935] font-bold text-[clamp(1.1rem,1.5vw,1.4rem)]">
                    {pillar.word}
                  </span>{" "}
                  <span
                    className={[
                      "font-medium text-[clamp(1.1rem,1.5vw,1.4rem)]",
                      "transition-colors duration-500",
                      isDark ? "text-white" : "text-[#1a1a1a]",
                    ].join(" ")}
                  >
                    {pillar.taglineLine1}
                  </span>
                  <br />
                  <span
                    className={[
                      "font-medium text-[clamp(1.1rem,1.5vw,1.4rem)]",
                      "transition-colors duration-500",
                      isDark ? "text-white" : "text-[#1a1a1a]",
                    ].join(" ")}
                  >
                    {pillar.taglineLine2}
                  </span>
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="px-4">
            <div
              className={[
                "w-full lg:w-[80%] mx-auto p-4 lg:p-5 border-2",
                "transition-colors duration-500",
                isDark ? "border-white/35" : "border-[#1a1a1a]",
              ].join(" ")}
            >
              <p
                className="text-lg md:text-2xl lg:text-3xl font-normal bg-clip-text text-transparent transition-all duration-500"
                style={{
                  backgroundImage: taglineGradient,
                  fontFamily: "Stack Sans Text",
                }}
              >
                Decide with data. <span>Move with intelligence.</span>{" "}
                <strong>Build digitally.</strong>
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <div className="pt-12 md:pt-16 flex justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2"
            >
              <span className="text-[#E21F26] transition-transform duration-300 ease-out group-hover:-translate-x-1">
                <Image
                  src="/icons/enter.svg"
                  alt="arrow"
                  width={32}
                  height={32}
                />
              </span>
              <span
                className={[
                  "mt-1 font-light text-2xl tracking-wide transition-colors duration-200 group-hover:text-[#E21F26]",
                  isDark ? "text-white" : "text-black",
                ].join(" ")}
              >
                GET IN TOUCH
              </span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
