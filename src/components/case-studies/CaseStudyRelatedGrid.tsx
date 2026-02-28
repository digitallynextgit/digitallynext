"use client";

import Image from "next/image";
import Link from "next/link";
import type { CaseStudyDetail } from "@/data/casestudy";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface CaseStudyRelatedGridProps {
  detail: CaseStudyDetail;
  theme?: "dark" | "light";
}

export default function CaseStudyRelatedGrid({ detail, theme }: CaseStudyRelatedGridProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  return (
    <section className="w-full my-10 md:my-16 lg:my-20">
      <div className="w-full px-4 sm:px-6 md:px-[57px] flex justify-center items-center">
        <div className="max-w-[1280px] md:px-4 lg:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[53.38px]">
          {detail.relatedCaseStudies.map((cs) => (
            <div key={cs.href} className="w-full flex flex-col gap-6 md:gap-[36.81px]">

              {/* Image */}
              <div className="w-full overflow-hidden rounded-[8px] md:rounded-[5.177px]">
                <Image
                  src={cs.imageSrc}
                  alt=""
                  width={638}
                  height={425}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 100vw, 638px"
                />
              </div>

              {/* Content */}
              <div className="w-full flex flex-col gap-6 md:gap-[43.214px]">
                <div className="w-full flex flex-col gap-3 md:gap-[13.604px]">
                  <Link
                    href={cs.href}
                    className={[
                      "text-[16px] sm:text-[18px] md:text-[22.577px] leading-[1.4] md:leading-[1.3]",
                      "font-light w-full max-w-[616.06px] hover:text-[#E21F26] transition-colors duration-200",
                      isDark ? "text-[#BFBFBF]" : "text-[#787878]",
                    ].join(" ")}
                  >
                    {cs.description}
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
