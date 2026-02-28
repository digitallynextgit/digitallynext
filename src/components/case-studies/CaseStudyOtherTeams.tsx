"use client";

import Image from "next/image";
import Link from "next/link";
import type { CaseStudyDetail } from "@/data/casestudy";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface CaseStudyOtherTeamsProps {
  detail: CaseStudyDetail;
  theme?: "dark" | "light";
}

export default function CaseStudyOtherTeams({ detail, theme }: CaseStudyOtherTeamsProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  return (
    <section className="w-full mt-14 md:mt-[118px]">
      <div className="w-full px-4 sm:px-6 md:px-[57px]">
        <div className="mx-auto w-full max-w-[1280px] md:px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* Heading */}
          <div
            className={[
              "text-[32px] sm:text-[44px] md:text-[56px] leading-[1.1] md:leading-[1.3] font-bold",
              "transition-colors duration-500",
              isDark ? "text-white" : "text-[#1a1a1a]",
            ].join(" ")}
          >
            <p className="font-normal">See how other teams are</p>
            <span className="font-normal">winning with</span>{"   "}
            <span className="capitalize">{detail.otherTeams.heading}</span>
            <span className="text-[#E21F26]">.</span>
          </div>

          {/* CTA Link */}
          <Link
            href={detail.otherTeams.linkHref}
            className="group flex items-center gap-2 text-2xl font-medium no-underline"
          >
            <span className="text-[#E21F26] transition-transform duration-300 ease-out group-hover:-translate-x-2">
              <Image src="/icons/enter.svg" alt="arrow-right" width={32} height={32} />
            </span>
            <div
              className={[
                "text-[22px] sm:text-[28px] md:text-[34.43px] leading-[1.3] font-normal",
                "hover:text-[#E21F26] transition-colors duration-200",
                isDark ? "text-white" : "text-[#1a1a1a]",
              ].join(" ")}
            >
              {detail.otherTeams.linkLabel}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
