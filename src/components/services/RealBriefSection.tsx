import type { ServiceSection, ServiceTheme } from "@/data/services";

type Props = {
  section: Extract<ServiceSection, { type: "realBrief" }>;
  theme: ServiceTheme;
};

export default function RealBriefSection({ section, theme }: Props) {
  const bg = theme.bodyText === "#000000" ? "#FFFFFF" : theme.surfaceBg;

  return (
    <section className="py-10 md:py-16 lg:py-20" style={{ backgroundColor: bg, color: theme.bodyText }}>
      <div className="container py-16 sm:py-20 lg:py-[120px]">

        {/* ── Two-column row ── */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start lg:gap-60">

          {/* LEFT: Eyebrow + Heading + Description */}
          <div className="lg:w-[380px] lg:shrink-0 lg:sticky lg:top-[100px]">
            <div
              className="text-[11px] font-semibold tracking-[0.22em] uppercase"
              style={{ color: theme.accent }}
            >
              {section.eyebrow}
            </div>

            <h2 className="mt-5 font-extrabold leading-[1.05] tracking-[-0.03em] text-[36px] sm:text-[48px] lg:text-[60px]">
              {section.heading}
              <span className="text-[#E21F26]">.</span>
            </h2>

            <p
              className="mt-5 text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-line"
              style={{ color: theme.mutedText }}
            >
              {section.description}
            </p>
          </div>

          {/* RIGHT: List items */}
          <div className="flex-1 mt-10 lg:mt-0 min-w-0">
            <div className="border-t" style={{ borderColor: theme.surfaceBorder }}>
              {section.list.map((item, idx) => {
                const barColor =
                  item.accent === "accent" ? theme.accent : theme.accentAlt;
                return (
                  <div
                    key={idx}
                    className="flex items-stretch gap-5 py-6 sm:py-8 border-b"
                    style={{ borderColor: theme.surfaceBorder }}
                  >
                    {/* Colored left bar */}
                    <div
                      className="w-[3px] shrink-0 rounded-full"
                      style={{ backgroundColor: barColor }}
                    />
                    {/* Item text — supports <strong> for bold words */}
                    <p
                      className="text-base sm:text-lg lg:text-xl leading-snug"
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── Full-width Highlight Bar ── */}
        <div
          className="mt-12 lg:mt-16 py-6 sm:py-8 px-6 sm:px-12 text-center"
          style={{ backgroundColor: theme.bodyText, borderRadius: "3px" }}
        >
          <p
            className="text-base sm:text-lg leading-relaxed text-white"
            dangerouslySetInnerHTML={{ __html: section.highlightText }}
          />
        </div>

      </div>
    </section>
  );
}
