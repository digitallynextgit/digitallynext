"use client";

import { useSectionTheme } from "@/context/SectionThemeContext";

interface GrowthSectionProps {
  theme?: "dark" | "light";
}

const items = [
  {
    num: "01",
    title: { bold: "Learn", rest: " by building" },
    desc: "Real projects from day one. You learn by doing the work — not watching someone else do it.",
  },
  {
    num: "02",
    title: { bold: "Grow", rest: " by owning" },
    desc: "Ownership isn't a perk. It's the default. You'll own outcomes, not just tasks.",
  },
  {
    num: "03",
    title: { bold: "Improve", rest: " by questioning" },
    desc: "We don't reward blind agreement. We reward people who ask better questions.",
    borderBottom: true,
  },
];

export default function GrowthSection({ theme }: GrowthSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  return (
    <section
      className={[
        "transition-colors duration-700",
        isDark ? "bg-black" : "bg-white",
      ].join(" ")}
    >
      {/* Top border */}
      <div
        className={[
          "transition-colors duration-700",
          isDark ? "border-t border-[#2a2a2a]" : "border-t border-[#E5E5E5]",
        ].join(" ")}
      />

      <div className="container flex justify-center items-center">
        <div style={{ maxWidth: 1103 }} className="py-12 md:py-16 lg:py-20">

          {/* Heading */}
          <h2
            className={[
              "font-normal leading-[1.15] transition-colors duration-700",
              isDark ? "text-white" : "text-[#000000]",
            ].join(" ")}
            style={{ fontSize: "clamp(2rem, 4vw, 2.975rem)" }}
          >
            How{" "}
            <span className="text-[#E21F26] font-semibold">Growth</span>{" "}
            Actually Happens
            <span className="text-[#0EC8C5]">...</span>
          </h2>

          {/* Subtitle */}
          <div
            className={[
              "mt-6 font-light text-[16px] leading-[1.8] transition-colors duration-700",
              isDark ? "text-[#737373]" : "text-[#A1A1A1]",
            ].join(" ")}
          >
            <div>You won&apos;t be &quot;trained&quot; for months before doing real work.</div>
            <div>And you won&apos;t be thrown into the deep end without context.</div>
          </div>

          {/* Items list */}
          <div
            className={[
              "mt-20 transition-colors duration-700",
              isDark ? "border-t border-[#2a2a2a]" : "border-t border-[#E5E5E5]",
            ].join(" ")}
          >
            {items.map(({ num, title, desc, borderBottom }) => (
              <div
                key={num}
                className={[
                  "group grid grid-cols-1 items-start gap-3",
                  "lg:grid-cols-[80px_minmax(0,435px)_minmax(0,1fr)] lg:items-center lg:gap-0",
                  "cursor-default transition-colors duration-300",
                  "px-0 py-[44px]",
                  isDark
                    ? "border-t border-[#2a2a2a] hover:bg-[#111111]"
                    : "border-t border-[#E5E5E5] hover:bg-[#F5F5F5]",
                  borderBottom
                    ? isDark
                      ? "border-b border-[#2a2a2a]"
                      : "border-b border-[#E5E5E5]"
                    : "",
                ].join(" ")}
              >
                {/* Number */}
                <div
                  className={[
                    "text-[13px] tracking-[0.05em] transition-colors duration-300",
                    isDark
                      ? "text-[#3a3a3a] group-hover:text-[#737373]"
                      : "text-[#D4D4D4] group-hover:text-[#A1A1A1]",
                  ].join(" ")}
                >
                  {num}
                </div>

                {/* Title */}
                <div
                  className={[
                    "text-[28px] font-normal transition-colors duration-300",
                    isDark ? "text-white" : "text-[#000000]",
                  ].join(" ")}
                >
                  <span className="font-bold group-hover:text-[#E21F26] transition-colors duration-300">
                    {title.bold}
                  </span>
                  {title.rest}
                </div>

                {/* Description */}
                <div
                  className={[
                    "text-[15px] font-light leading-[1.7] transition-colors duration-300",
                    isDark
                      ? "text-[#737373] group-hover:text-[#A1A1A1]"
                      : "text-[#A1A1A1] group-hover:text-[#737373]",
                  ].join(" ")}
                >
                  {desc}
                </div>
              </div>
            ))}
          </div>

          {/* Footer text */}
          <div
            className={[
              "mt-16 font-light text-[15px] leading-[1.8] transition-colors duration-700",
              isDark ? "text-[#737373]" : "text-[#A1A1A1]",
            ].join(" ")}
          >
            <div>Growth here isn&apos;t loud.</div>
            <div>But it&apos;s real — and it compounds.</div>
          </div>

        </div>
      </div>
    </section>
  );
}
