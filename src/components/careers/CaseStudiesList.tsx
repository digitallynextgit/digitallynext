"use client";

import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/data/casestudy";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface CaseStudiesListProps {
  theme?: "dark" | "light";
}

export default function CaseStudiesList({ theme }: CaseStudiesListProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  const list = caseStudies;
  const highlightColor = "#0EC8C5";

  const iconMap: Record<string, string> = {
    Industry: "/figma/case-study/icon-cloud-lightning.svg",
    Category: "/figma/case-study/icon-trending-up.svg",
    Region: "/globe.svg",
  };

  const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const buildHighlightedParts = (text: string, keywords: string[]) => {
    if (!keywords.length) return [{ text, highlight: false }];
    const escaped = [...keywords]
      .sort((a, b) => b.length - a.length)
      .map(escapeRegExp);
    const regex = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts = text.split(regex).filter(Boolean);
    const keywordSet = new Set(keywords.map((k) => k.toLowerCase()));
    return parts.map((part) => ({
      text: part,
      highlight: keywordSet.has(part.toLowerCase()),
    }));
  };

  const renderHighlightedText = (text: string, keywords: string[]) =>
    buildHighlightedParts(text, keywords).map((part, index) =>
      part.highlight ? (
        <span
          key={`${part.text}-${index}`}
          className="text-black font-bold group-hover:text-[#E21F26] transition-colors duration-300"
        >
          {part.text}
        </span>
      ) : (
        <span key={`${part.text}-${index}`}>{part.text}</span>
      ),
    );

  const renderPills = (cs: (typeof caseStudies)[0]) => {
    const fields = cs.detail.about.fields ?? [];
    return fields.slice(0, 3).map((field) => (
      <div
        key={`${cs.slug}-${field.label}`}
        className={[
          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] md:text-[13px] font-medium transition-colors duration-300",
          isDark
            ? "border-[#2a2a2a] text-white"
            : "border-[#D3D3D3] text-black",
        ].join(" ")}
      >
        <Image
          src={
            iconMap[field.label] ?? "/figma/case-study/icon-cloud-lightning.svg"
          }
          alt=""
          width={14}
          height={14}
          className="h-[14px] w-[14px]"
        />
        <span className="leading-none">{field.value}</span>
      </div>
    ));
  };

  return (
    <section id="case-studies-list" className="w-full">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="w-full py-10 md:py-16 lg:py-20 justify-center items-center flex flex-col gap-10 md:gap-14 lg:gap-16">
          {/* Heading */}
          <div className="flex items-center gap-2">
            <h2
              className={[
                "text-[clamp(3rem,12vw,10rem)] max-md:text-[clamp(2.5rem,10vw,4rem)]",
                "font-black leading-[0.95] tracking-[-0.04em]",
                "transition-colors duration-500",
                isDark ? "text-white" : "text-black",
              ].join(" ")}
            >
              Case Studies
              <span className="text-[#0EC8C5]">.</span>
            </h2>
          </div>

          {/* ── Full list — no featured card ── */}
          <div className="flex flex-col">
            {list.map((cs, index) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className={[
                  "group no-underline w-full",
                  "flex flex-col gap-4",
                  "px-4 py-6 md:px-6 md:py-8",
                  "-mx-4 md:-mx-6",
                  "rounded-[8px]",
                  "transition-colors duration-300",
                  isDark
                    ? "hover:bg-[#111111] border-[#2a2a2a]"
                    : "hover:bg-[#F5F5F5] border-[#E5E5E5]",
                  isDark
                    ? "border-t border-[#2a2a2a]"
                    : "border-t border-[#E5E5E5]",
                  index === list.length - 1
                    ? isDark
                      ? "border-b border-[#2a2a2a]"
                      : "border-b border-[#E5E5E5]"
                    : "",
                ].join(" ")}
              >
                {/* Text */}
                <p
                  className={[
                    "m-0 text-[18px] md:text-[20px] lg:text-[22px] leading-[1.6] font-light transition-colors duration-300",
                    isDark ? "text-white" : "text-black",
                  ].join(" ")}
                >
                  {renderHighlightedText(
                    cs.listing.caption,
                    cs.listing.highlightKeywords ?? [],
                  )}
                </p>

                {/* Pills below text */}
                <div className="flex flex-wrap gap-3">{renderPills(cs)}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
