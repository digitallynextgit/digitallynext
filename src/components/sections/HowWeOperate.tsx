"use client";

import { dadPillars } from "@/data/content";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";
import { useEffect, useRef } from "react";

type HowWeOperateProps = {
  theme?: "dark" | "light";
};

export default function HowWeOperate({ theme = "light" }: HowWeOperateProps) {
  const isDark = theme === "dark";
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const fit = () => {
      const el = headingRef.current;
      if (!el) return;
      el.style.fontSize = "19vw";
      const containerWidth = window.innerWidth;
      const textWidth = el.scrollWidth;
      if (textWidth > containerWidth) {
        const ratio = (containerWidth / textWidth) * 0.96;
        el.style.fontSize = `${19 * ratio}vw`;
      }
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const tokens = {
    sectionBg: isDark ? "#000000" : "#FFFFFF",
    modernGradient: isDark
      ? "linear-gradient(to bottom, #FFFFFF 20%, #555555 80%)"
      : "linear-gradient(to bottom, #000000 20%, #888888 80%)",
    dadGradient: isDark
      ? "linear-gradient(to bottom, #E53935 10%, #7B0000 90%)"
      : "linear-gradient(to bottom, #E53935 10%, #C62828 90%)",
    headingColor: isDark ? "#FFFFFF" : "#1a1a1a",
    subtitleColor: isDark ? "rgba(255,255,255,0.45)" : "#787878",
    pillarTextColor: isDark ? "#FFFFFF" : "#1a1a1a",
    taglineBorder: isDark ? "rgba(255,255,255,0.35)" : "#1a1a1a",
    taglineFrom: isDark ? "#FFFFFF" : "#000000",
    taglineTo: "#E53935",
  };

  return (
    <section
      id="how-we-operate"
      style={{ backgroundColor: tokens.sectionBg }}
      className="w-full flex flex-col items-center pb-16 lg:pb-24"
    >
      {/* ── Modern DAD ── */}
      <AnimatedSection className="w-full">
        <div style={{ width: "100%", display: "flex", justifyContent: "center", overflow: "hidden" }}>
          <h2
            ref={headingRef}
            className="select-none pointer-events-none"
            style={{
              fontSize: "19vw",
              fontFamily: "Stack Sans Text",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              paddingTop: "clamp(32px, 5vw, 80px)",
              marginBottom: "clamp(24px, 3vw, 48px)",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "0.2em",
              WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
            }}
          >
            <span style={{ backgroundImage: tokens.modernGradient, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
              Modern
            </span>
            <span style={{ backgroundImage: tokens.dadGradient, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
              DAD
            </span>
          </h2>
        </div>
      </AnimatedSection>

      {/* ── Baaki content ── */}
      <div className="w-full max-w-7xl mx-auto px-6 text-center">

        {/* HOW WE OPERATE */}
        <AnimatedSection delay={0.2}>
          <h3
            style={{
              fontSize: "clamp(1.5rem, 5vw, 5rem)",
              fontWeight: 800,
              marginBottom: 12,
              color: tokens.headingColor,
              letterSpacing: "-0.01em",
            }}
          >
            HOW WE OPERATE
            <span style={{ color: "#0EC8C5" }}>.</span>
          </h3>
          <p
            className="md:mt-10 text-base md:text-2xl lg:text-3xl font-normal mb-10 md:mb-16 lg:mb-20"
            style={{ color: tokens.subtitleColor, fontFamily: "Stack Sans Text" }}
          >
            An operating model where
          </p>
        </AnimatedSection>

        {/* ── Three Pillars — 167px gap, inline text ── */}
        <div
          className="flex flex-col md:flex-row justify-center mb-16 lg:mb-20 gap-16 md:gap-32 lg:gap-[167px]"
        >
          {dadPillars.map((pillar, i) => (
            <AnimatedSection key={pillar.word} delay={0.15 + i * 0.1}>
              <div className="flex flex-col items-center gap-4">
                {/* Icon */}
                <div
                  className="relative"
                  style={{
                    width: "clamp(120px, 15vw, 200px)",
                    height: "clamp(120px, 15vw, 200px)",
                  }}
                >
                  <Image
                    src={
                      i === 0
                        ? "/icons/dad1.webp"
                        : i === 1
                          ? "/icons/dad2.webp"
                          : "/icons/dad3.webp"
                    }
                    alt={pillar.word}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>

                {/* ✅ Inline — "Data shapes decisions" ek saath */}
                <p className="text-center max-w-[180px] lg:max-w-[190px] xl:max-w-[227px]" style={{ lineHeight: 1.4 }}>
                  <span
                    style={{
                      color: "#E53935",
                      fontWeight: 700,
                      fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
                    }}
                  >
                    {pillar.word}
                  </span>{" "}
                  <span
                    style={{
                      color: tokens.pillarTextColor,
                      fontWeight: 500,
                      fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
                    }}
                  >
                    {pillar.taglineLine1}
                  </span>
                  <br />
                  <span
                    style={{
                      color: tokens.pillarTextColor,
                      fontWeight: 500,
                      fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
                    }}
                  >
                    {pillar.taglineLine2}
                  </span>
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* ── Tagline bar ── */}
        <AnimatedSection delay={0.5}>
          <div className="px-4">
            <div
              className="w-full lg:w-[75%] mx-auto p-4 lg:p-5"
              style={{ border: `2px solid ${tokens.taglineBorder}` }}
            >
              <p
                className="text-lg md:text-2xl lg:text-3xl font-normal"
                style={{
                  backgroundImage: `linear-gradient(to right, ${tokens.taglineFrom}, ${tokens.taglineTo})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  fontFamily: "Stack Sans Text",
                }}
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
