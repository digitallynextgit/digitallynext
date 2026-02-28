"use client";

import Image from "next/image";
import type { CaseStudyDetail } from "@/data/casestudy";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface CaseStudyDetailHeroProps {
  detail: CaseStudyDetail;
  metaTitle: string;
  theme?: "dark" | "light";
}

export default function CaseStudyDetailHero({ detail, metaTitle, theme }: CaseStudyDetailHeroProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1280px] px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[668px_1fr] gap-10 lg:gap-[84px] lg:items-stretch">

          {/* Left */}
          <div className="w-full flex flex-col gap-10 lg:gap-[72px]">
            <div className="w-full max-w-[482px] flex flex-col gap-4 lg:gap-[24px]">
              <div
                className={[
                  "text-[26px] md:text-[32px] leading-[1.07] font-light transition-colors duration-500",
                  isDark ? "text-white" : "text-[#1a1a1a]",
                ].join(" ")}
              >
                {detail.hero.title}
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[40px]">
              {detail.hero.metrics.map((m) => (
                <div
                  key={m.value}
                  className="rounded-[10px] transition-colors duration-500"
                  style={{ background: m.background }}
                >
                  <div className="h-full flex flex-col justify-between p-5 md:p-[16px_27px] min-h-[180px]">
                    <div
                      className="text-[44px] md:text-[54px] leading-[1.3] font-medium tracking-[-0.04em]"
                      style={{ color: m.color }}
                    >
                      {m.value}
                    </div>
                    <div
                      className={[
                        "capitalize text-[16px] md:text-[18px] leading-[1.3] font-normal whitespace-pre-line",
                        "transition-colors duration-500",
                        isDark ? "text-white" : "text-black",
                      ].join(" ")}
                    >
                      {m.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Hero image */}
          <div className="relative w-full overflow-hidden rounded-[10px] aspect-513/518 lg:aspect-auto lg:h-full">
            <Image
              src={detail.hero.heroImageSrc}
              alt={metaTitle}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 513px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
