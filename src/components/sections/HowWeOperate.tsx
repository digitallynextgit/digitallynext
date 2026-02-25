"use client";

import { dadPillars } from "@/data/content";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";

type HowWeOperateProps = {
  theme?: "dark" | "light";
};

export default function HowWeOperate({ theme = "light" }: HowWeOperateProps) {
  const isDark = theme === "dark";

  // ── Theme tokens ──────────────────────────────────────────────
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
      className="w-full flex justify-center overflow-x-hidden py-16 lg:py-24"
    >
      <div className="w-full max-w-7xl px-6 mt-16 lg:mt-24 text-center">
        {/* ── "Modern DAD" heading ── */}
        <AnimatedSection>
          <h2
            className="mt-[-20px] sm:mt-[-60px] lg:mt-[-100px] select-none pointer-events-none"
            style={{
              fontSize: "clamp(2rem, 13.88vw, 14rem)",
              fontFamily: "Stack Sans Text",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              marginBottom: 48,
              whiteSpace: "nowrap",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 20%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 20%, transparent 100%)",
            }}
          >
            {/* "Modern" — white→gray (dark) / black→gray (light) */}
            <span
              style={{
                backgroundImage: tokens.modernGradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              Modern
            </span>{" "}
            {/* "DAD" — always red gradient */}
            <span
              style={{
                backgroundImage: tokens.dadGradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              DAD
            </span>
          </h2>
        </AnimatedSection>

        {/* ── "HOW WE OPERATE." ── */}
        <AnimatedSection delay={0.2}>
          <h3
            style={{
              fontSize: "clamp(1.5rem, 5vw, 4rem)",
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
            className="text-base lg:text-2xl font-medium mb-10 lg:mb-16"
            style={{ color: tokens.subtitleColor }}
          >
            An operating model where
          </p>
        </AnimatedSection>

        {/* ── Three Pillars ── */}
        <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-16 mb-16 lg:mb-20">
          {dadPillars.map((pillar, i) => (
            <AnimatedSection key={pillar.word} delay={0.15 + i * 0.1}>
              <div className="flex flex-col items-center gap-4">
                {/* Icon */}
                <div
                  className="pillar-icon relative"
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

                {/* Label */}
                <p className="text-center" style={{ lineHeight: 1.3 }}>
                  <span
                    style={{
                      color: "#E53935",
                      fontWeight: 700,
                      fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                    }}
                  >
                    {pillar.word}
                  </span>{" "}
                  <span
                    style={{
                      color: tokens.pillarTextColor,
                      fontWeight: 500,
                      fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                    }}
                  >
                    {pillar.tagline}
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
              className="w-full lg:w-[60%] mx-auto p-4 lg:p-5"
              style={{
                border: `2px solid ${tokens.taglineBorder}`,
              }}
            >
              <p
                className="text-lg lg:text-2xl font-semibold"
                style={{
                  backgroundImage: `linear-gradient(to right, ${tokens.taglineFrom}, ${tokens.taglineTo})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Decide with data. <strong>Move with intelligence.</strong>{" "}
                <strong>Build digitally.</strong>
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
