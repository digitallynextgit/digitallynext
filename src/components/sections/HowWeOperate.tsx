"use client";

import { dadPillars } from "@/data/content";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useSectionTheme } from "@/context/SectionThemeContext";

type HowWeOperateProps = {
  theme?: "dark" | "light";
};

export default function HowWeOperate({ theme }: HowWeOperateProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // ✅ container ref

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    let lastWidth = 0;

    const fit = () => {
      // ✅ clientWidth — mobile scroll pe address bar se affect nahi hota
      const containerWidth = document.documentElement.clientWidth;

      // ✅ Width same ho to skip — height change (scroll) pe ignore
      if (containerWidth === lastWidth) return;
      lastWidth = containerWidth;

      // ✅ Direct set — no rAF, no observer loop
      el.style.fontSize = "19vw";
      const textWidth = el.scrollWidth;
      if (textWidth > containerWidth) {
        const ratio = (containerWidth / textWidth) * 0.96;
        el.style.fontSize = `${19 * ratio}vw`;
      }
    };

    fit();

    window.addEventListener("resize", fit, { passive: true });
    return () => window.removeEventListener("resize", fit);
  }, []);


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
      {/* ✅ containerRef yahan — heading ka actual wrapper */}
      <div ref={containerRef} className="w-full overflow-hidden">
        <div className="w-full flex justify-center">
          <h2
            ref={headingRef}
            className={[
              "select-none pointer-events-none",
              "font-black tracking-[-0.03em] leading-none",
              "whitespace-nowrap flex items-center gap-[0.2em]",
              "mb-[clamp(24px,3vw,48px)]",
              "[-webkit-mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]",
              "mask-[linear-gradient(to_bottom,black_40%,transparent_100%)]",
            ].join(" ")}
            style={{ fontSize: "19vw", fontFamily: "Stack Sans Text" }}
          >
            <span
              className="bg-clip-text text-transparent transition-all duration-500"
              style={{ backgroundImage: modernGradient }}
            >
              Modern
            </span>
            <span
              className="bg-clip-text text-transparent transition-all duration-500"
              style={{ backgroundImage: dadGradient }}
            >
              DAD
            </span>
          </h2>
        </div>
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
              "md:mt-10 text-base md:text-2xl lg:text-3xl font-normal",
              "mb-10 md:mb-16 lg:mb-20",
              "transition-colors duration-500",
              isDark ? "text-white/45" : "text-[#787878]",
            ].join(" ")}
            style={{ fontFamily: "Stack Sans Text" }}
          >
            An operating model where
          </p>
        </AnimatedSection>

        <div className="flex flex-col md:flex-row justify-between mb-16 lg:mb-20 gap-16 md:gap-32 lg:gap-[167px]">
          {dadPillars.map((pillar, i) => (
            <AnimatedSection key={pillar.word} delay={0.15 + i * 0.1}>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-[clamp(120px,15vw,200px)] h-[clamp(120px,15vw,200px)]">
                  <Image
                    src={
                      i === 0 ? "/home/moderndad1.png"
                        : i === 1 ? "/home/moderndad2.png"
                          : "/home/moderndad3.png"
                    }
                    alt={pillar.word}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-center max-w-[180px] lg:max-w-[190px] xl:max-w-[227px] leading-[1.4]">
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
                style={{ backgroundImage: taglineGradient, fontFamily: "Stack Sans Text" }}
              >
                Decide with data.{" "}
                <span>Move with intelligence.</span>{" "}
                <strong>Build digitally.</strong>
              </p>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
