import Image from "next/image";
import type { ServiceSection, ServiceTheme } from "@/data/services";

type Props = {
  section: Extract<ServiceSection, { type: "featureGrid" }>;
  theme: ServiceTheme;
};

export default function FeatureGridSection({ section, theme }: Props) {
  const totalCards = section.cards.length;
  const hasOddLastCard = totalCards % 2 !== 0;
  const gridCards = hasOddLastCard ? section.cards.slice(0, -1) : section.cards;
  const lastCard = hasOddLastCard ? section.cards[totalCards - 1] : null;

  return (
    <section style={{ backgroundColor: theme.surfaceBg, color: theme.bodyText }}>

      {/* ── Outer: max 1440px, padding 72px 120px per Figma ── */}
      <div className="w-full max-w-[1440px] mx-auto px-6 py-14 sm:px-12 sm:py-16 lg:px-[120px] lg:py-[72px]">

        {/* ── Inner: max 1200px ── */}
        <div className="max-w-[1200px] mx-auto flex flex-col gap-12 lg:gap-20">

          {/* ── Header Block ── */}
          <div className="flex flex-col gap-4 lg:gap-6">

            {/* Eyebrow: 16px, font-weight 500, letter-spacing 3px, uppercase, red */}
            <p
              className="text-[13px] lg:text-base font-medium uppercase"
              style={{ color: theme.accent, letterSpacing: "3px" }}
            >
              {section.eyebrow}
            </p>

            {/* 
              Heading: 60px, bold
              Supports HTML for accent words:
              e.g. 'Where <span style="color:#E21F26">growth</span> is'
                   'engineered, not assumed<span style="color:#0EC8C5">.</span>'
            */}
            <h2 className="font-bold leading-[1.1] tracking-[-0.02em] text-[32px] sm:text-[44px] lg:text-[60px]">
              {section.headingLines.map((line, idx) => (
                <span
                  key={idx}
                  className="block"
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              ))}
            </h2>

            {/* Description: 24px, weight 300, muted — supports <strong> for bold parts */}
            <p
              className="text-base sm:text-lg lg:text-2xl leading-relaxed whitespace-pre-line"
              style={{ color: theme.mutedText, fontWeight: 300 }}
              dangerouslySetInnerHTML={{ __html: section.description }}
            />
          </div>

          {/* ── Card Grid ──
              Figma gap trick:
              - Container bg: rgba(0,0,0,0.1)
              - gap: 1px
              - Each card bg: #FAFAFA (surfaceBg)
              → 1px lines appear between cards naturally, no borders needed
          ── */}
          <div
            className="flex flex-wrap"
            style={{ backgroundColor: "rgba(0,0,0,0.1)", gap: "1px" }}
          >
            {/* Regular 2-per-row cards */}
            {gridCards.map((card, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-6 w-full sm:w-[calc(50%-0.5px)] p-6 sm:p-8 lg:pt-14 lg:pb-14 lg:pl-14 lg:pr-8"
                style={{ backgroundColor: theme.surfaceBg }}
              >
                {/* Icon: 36x36 */}
                <Image
                  src={card.iconSrc}
                  alt={card.title}
                  width={36}
                  height={36}
                />

                {/* Title + Description */}
                <div className="flex flex-col gap-3">
                  <h3
                    className="font-bold"
                    style={{
                      fontSize: "22px",
                      lineHeight: "33px",
                      color: theme.bodyText,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "27px",
                      color: theme.mutedText,
                      fontWeight: 300,
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            ))}

            {/* 
              Odd last card — full-width horizontal row on desktop
              Figma: flex-direction row, justify-content center, align-items center
              padding: 56px 0 56px 56px, gap: 24px
            */}
            {lastCard && (
              <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-6 w-full p-6 sm:p-8 lg:py-14 lg:pl-14 lg:pr-14"
                style={{ backgroundColor: theme.surfaceBg }}
              >
                {/* Icon */}
                <div className="shrink-0">
                  <Image
                    src={lastCard.iconSrc}
                    alt={lastCard.title}
                    width={36}
                    height={36}
                  />
                </div>

                {/* Title + Description */}
                <div className="flex flex-col gap-3 sm:max-w-[724px]">
                  <h3
                    className="font-bold"
                    style={{
                      fontSize: "22px",
                      lineHeight: "33px",
                      color: theme.bodyText,
                    }}
                  >
                    {lastCard.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "27px",
                      color: theme.mutedText,
                      fontWeight: 300,
                    }}
                  >
                    {lastCard.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Footer Text: bold, centered, 24px, muted color ── */}
          {section.footerText && (
            <div className="text-center">
              <p
                className="font-bold"
                style={{
                  fontSize: "clamp(16px, 2vw, 24px)",
                  lineHeight: "31px",
                  color: theme.mutedText,
                }}
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
