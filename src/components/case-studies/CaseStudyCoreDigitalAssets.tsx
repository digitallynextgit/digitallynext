"use client";

import AnimatedList from "@/components/ui/AnimatedList";
import type { CaseStudyDetail } from "@/data/casestudy";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface CaseStudyCoreDigitalAssetsProps {
  detail: CaseStudyDetail;
  theme?: "dark" | "light";
}

export default function CaseStudyCoreDigitalAssets({ detail, theme }: CaseStudyCoreDigitalAssetsProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  return (
    <section
      className={[
        "w-full mt-[-10px] md:mt-[-25px] relative transition-colors duration-500",
        isDark ? "bg-[#0A0A0A]" : "bg-[#FAFAFA]",
      ].join(" ")}
    >
      <div className="w-full px-4 sm:px-6 md:px-[59px] py-10 relative">
        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-[142px] justify-center">

          {/* Heading */}
          <div className="w-full max-w-[463px] flex flex-col gap-6 md:gap-[54px]">
            <div
              className={[
                "text-center md:text-start text-[44px] sm:text-[56px] md:text-[80px]",
                "leading-[1.1] md:leading-[1.3] font-normal transition-colors duration-500",
                isDark ? "text-white" : "text-black",
              ].join(" ")}
            >
              <span className="text-[#E21F26]">
                {detail.coreDigitalAssets.headingPrefix}
              </span>{" "}
              {detail.coreDigitalAssets.headingHighlight}
            </div>
          </div>

          {/* Animated list */}
          <div className="w-full max-w-[560px]">
            <AnimatedList
              items={detail.coreDigitalAssets.items}
              showGradients={false}
              enableArrowNavigation
              className="mt-1"
              itemClassName="min-h-[58px] flex items-center"
              selectedItemClassName={
                isDark ? "ring-1 ring-white/10" : "ring-1 ring-black/10"
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
