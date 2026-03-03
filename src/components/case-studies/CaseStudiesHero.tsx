"use client";

import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/casestudy";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface CaseStudiesHeroProps {
  theme?: "dark" | "light";
}

export default function CaseStudiesHero({ theme }: CaseStudiesHeroProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  const featuredCaseStudy = caseStudies[0];

  return (
    <section className="w-full py-10 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-14">
        <div className="mt-10 md:mt-20 lg:mt-32 grid grid-cols-1 lg:grid-cols-[784px_1fr] gap-12 lg:gap-[100px] items-center">
          <div className="flex flex-col gap-14 py-8">
            <h1
              className={[
                "text-[clamp(2.5rem,4.4vw,3rem)] font-light m-0 text-left",
                "transition-colors duration-500",
                isDark ? "text-white" : "text-black",
              ].join(" ")}
            >
              We help brands show up
              <div className="font-bold">
                where world is watching<span className="text-[#0EC8C5]">.</span>
              </div>
            </h1>

            <p
              className={[
                "max-w-[761px] font-light text-[18px] leading-[1.7] text-left m-0",
                "transition-colors duration-500",
                isDark ? "text-white/50" : "text-[#737373]",
              ].join(" ")}
            >
              {featuredCaseStudy?.listing.introText ??
                "From ambitious startups to scaling enterprises — Digitally Next builds performance-driven creative systems that turn attention into measurable growth."}
            </p>

            <Link
              href="#case-studies-list"
              className="inline-flex items-center gap-[15.3px] w-fit"
            >
              <Image src="/icons/enter.svg" alt="" width={36} height={16} />
              <span
                className={[
                  "text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.3] font-normal mt-1 transition-colors duration-500 hover:text-[#E21F26]",
                  isDark ? "text-white" : "text-black",
                ].join(" ")}
              >
                Explore Case Studies
              </span>
            </Link>
          </div>

          {/* <div className="relative w-full overflow-hidden rounded-[10px] aspect-4/3 lg:aspect-auto lg:h-[520px]">
            <Image
              src={featuredCaseStudy?.listing.imageSrc ?? "/case/cs1.png"}
              alt={featuredCaseStudy?.listing.title ?? "Case study"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 420px"
              priority
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
