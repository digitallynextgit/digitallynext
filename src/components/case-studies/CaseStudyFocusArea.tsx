"use client";

import Image from "next/image";
import type { CaseStudyDetail } from "@/data/casestudy";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface CaseStudyFocusAreaProps {
  detail: CaseStudyDetail;
  theme?: "dark" | "light";
}

export default function CaseStudyFocusArea({ detail, theme }: CaseStudyFocusAreaProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  const first = detail.focusArea.cards[0];
  const rest = detail.focusArea.cards.slice(1);
  const restGridClass =
    rest.length === 1 ? "md:grid-cols-1" :
      rest.length === 2 ? "md:grid-cols-2" :
        "md:grid-cols-3";

  const cardClass = [
    "rounded-[10px] p-6 md:p-[34px_28px] transition-colors duration-500",
    isDark ? "bg-[#111111]" : "bg-gray-100",
  ].join(" ");

  const cardTitleClass = [
    "uppercase text-[20px] md:text-[24px] leading-[1.3] font-bold transition-colors duration-500",
    isDark ? "text-white" : "text-black",
  ].join(" ");

  const cardBodyClass = [
    "text-[14px] md:text-[16px] leading-normal md:leading-[1.3] font-normal capitalize transition-colors duration-500",
    isDark ? "text-white" : "text-black",
  ].join(" ");

  return (
    <section className="w-full py-10 md:py-0 lg:py-0 md:pt-16 lg:pt-20">
      <div className="mx-auto w-full max-w-[1280px] px-4 flex flex-col items-center gap-4 md:gap-[16px]">

        {/* Top row */}
        <div className="max-w-[1280px] w-full grid grid-cols-1 lg:grid-cols-[minmax(0,844px)_1fr] gap-4 md:gap-[16px]">

          {/* Heading card — always teal */}
          <div className="rounded-[10px] bg-[#0EC8C5] p-6 md:p-[34px_28px]">
            <div className="w-full flex flex-col justify-between gap-8 min-h-[240px]">
              <div className="uppercase text-[34px] sm:text-[44px] md:text-[56px] leading-[1.15] md:leading-[1.3] font-bold text-white">
                {detail.focusArea.heading}
                <span className="text-[#E21F26]">.</span>
              </div>
              <div className="text-[14px] md:text-[16px] leading-normal md:leading-[1.3] font-normal text-white whitespace-pre-line mt-2 capitalize">
                {detail.focusArea.body}
              </div>
            </div>
          </div>

          {/* First card */}
          <div className={cardClass}>
            <div className="h-full flex flex-col justify-between min-h-[270px]">
              <div className="flex flex-col gap-3 md:gap-[16px]">
                <Image
                  src="/figma/case-study/icon-check.svg"
                  alt=""
                  width={34}
                  height={34}
                  className="w-[34px] h-[34px]"
                />
                <div className={cardTitleClass}>
                  {first?.title ?? ""}
                </div>
              </div>
              <div className={cardBodyClass}>
                {first?.description ?? ""}
              </div>
            </div>
          </div>
        </div>

        {/* Rest cards */}
        <div className={`w-full grid grid-cols-1 ${restGridClass} gap-4 md:gap-[16px]`}>
          {rest.map((c) => (
            <div key={c.title} className={cardClass}>
              <div className="h-full flex flex-col justify-between min-h-[200px]">
                <div className="flex flex-col gap-3 md:gap-[16px]">
                  <Image
                    src="/figma/case-study/icon-check.svg"
                    alt=""
                    width={34}
                    height={34}
                    className="w-[34px] h-[34px]"
                  />
                  <div className={cardTitleClass}>
                    {c.title}
                  </div>
                </div>
                <div className={cardBodyClass}>
                  {c.description}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
