"use client";

import Image from "next/image";
import { useSectionTheme } from "@/context/SectionThemeContext";
import type { ServiceSection, ServiceTheme } from "@/data/services";

type Props = {
  section: Extract<ServiceSection, { type: "featureGrid" }>;
  theme: ServiceTheme;
};

export default function FeatureGridSection({ section, theme }: Props) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = contextTheme === "dark";

  const totalCards = section.cards.length;
  const hasOddLastCard = totalCards % 2 !== 0;
  const gridCards = hasOddLastCard ? section.cards.slice(0, -1) : section.cards;
  const lastCard = hasOddLastCard ? section.cards[totalCards - 1] : null;

  return (
    <section
      className={[
        "transition-colors duration-700",
        isDark ? "bg-black" : "bg-white",
      ].join(" ")}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 py-10 sm:px-12 md:py-16 lg:px-[120px] lg:py-20">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-12 lg:gap-20">

          {/* ── Header Block ── */}
          <div className="flex flex-col gap-4 lg:gap-6">

            {/* Eyebrow */}
            <p
              className="text-[13px] lg:text-base font-medium uppercase"
              style={{ color: theme.accent, letterSpacing: "3px" }}
            >
              {section.eyebrow}
            </p>

            {/* Heading */}
            <h2
              className={[
                "font-bold leading-[1.1] tracking-[-0.02em] text-[32px] sm:text-[44px] lg:text-[60px]",
                "transition-colors duration-700",
                isDark ? "text-white" : "text-[#000000]",
              ].join(" ")}
            >
              {section.headingLines.map((line, idx) => (
                <span
                  key={idx}
                  className="block"
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              ))}
            </h2>

            {/* Description */}
            <p
              className={[
                "text-base sm:text-lg lg:text-2xl leading-relaxed whitespace-pre-line font-light",
                "transition-colors duration-700",
                isDark ? "text-[#737373]" : "text-[#787878]",
              ].join(" ")}
              dangerouslySetInnerHTML={{ __html: section.description }}
            />
          </div>

          {/* ── Card Grid ──
              gap: 1px trick — container bg acts as border
          ── */}
          <div
            className={[
              "flex flex-wrap transition-colors duration-700",
              isDark ? "bg-white/10" : "bg-black/10",
            ].join(" ")}
            style={{ gap: "1px" }}
          >
            {/* Regular 2-per-row cards */}
            {gridCards.map((card, idx) => (
              <div
                key={idx}
                className={[
                  "flex flex-col gap-6 w-full sm:w-[calc(50%-0.5px)]",
                  "p-6 sm:p-8 lg:pt-14 lg:pb-14 lg:pl-14 lg:pr-8",
                  "transition-colors duration-700",
                  isDark ? "bg-[#111111]" : "bg-[#FAFAFA]",
                ].join(" ")}
              >
                <Image src={card.iconSrc} alt={card.title} width={36} height={36} />

                <div className="flex flex-col gap-3">
                  <h3
                    className={[
                      "font-bold text-[22px] leading-[33px] transition-colors duration-700",
                      isDark ? "text-white" : "text-[#000000]",
                    ].join(" ")}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={[
                      "text-[16px] leading-[27px] font-light transition-colors duration-700",
                      isDark ? "text-[#737373]" : "text-[#787878]",
                    ].join(" ")}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Odd last card — full width */}
            {lastCard && (
              <div
                className={[
                  "flex flex-col sm:flex-row sm:items-center sm:justify-center gap-6 w-full",
                  "p-6 sm:p-8 lg:py-14 lg:pl-14 lg:pr-14",
                  "transition-colors duration-700",
                  isDark ? "bg-[#111111]" : "bg-[#FAFAFA]",
                ].join(" ")}
              >
                <div className="shrink-0">
                  <Image src={lastCard.iconSrc} alt={lastCard.title} width={36} height={36} />
                </div>

                <div className="flex flex-col gap-3 sm:max-w-[724px]">
                  <h3
                    className={[
                      "font-bold text-[22px] leading-[33px] transition-colors duration-700",
                      isDark ? "text-white" : "text-[#000000]",
                    ].join(" ")}
                  >
                    {lastCard.title}
                  </h3>
                  <p
                    className={[
                      "text-[16px] leading-[27px] font-light transition-colors duration-700",
                      isDark ? "text-[#737373]" : "text-[#787878]",
                    ].join(" ")}
                  >
                    {lastCard.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Footer Text ── */}
          {section.footerText && (
            <div className="text-center">
              <p
                className={[
                  "font-bold text-[clamp(16px,2vw,24px)] leading-[31px]",
                  "transition-colors duration-700",
                  isDark ? "text-[#737373]" : "text-[#787878]",
                ].join(" ")}
              >
                {section.footerText}
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
