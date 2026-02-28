"use client";

import Image from "next/image";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface WorkHereSectionProps {
  theme?: "dark" | "light";
}

export default function WorkHereSection({ theme }: WorkHereSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  return (
    <section
      className={[
        "container flex justify-center items-center transition-colors duration-700",
        isDark ? "bg-black" : "bg-white",
      ].join(" ")}
    >
      <div style={{ maxWidth: 1103 }} className="py-12 md:py-16 lg:py-20">
        <div
          className={[
            "flex flex-col gap-8 md:gap-12 lg:gap-16 rounded-[10px] transition-colors duration-700",
            isDark ? "bg-[#0a0a0a]" : "bg-[#FAFAFA]",
          ].join(" ")}
        >
          {/* Heading */}
          <h2
            className={[
              "m-0 font-normal leading-[55px] transition-colors duration-700",
              isDark ? "text-white" : "text-[#000000]",
            ].join(" ")}
            style={{ fontSize: "clamp(2rem, 4vw, 47.565px)" }}
          >
            What It&apos;s Like to{" "}
            <span className="text-[#E21F26] font-semibold">Work Here</span>
            <span className="text-[#0EC8C5]">.</span>
          </h2>

          <div className="flex flex-col md:flex-row md:gap-10">

            {/* LEFT COL */}
            <div
              className="flex-1 flex flex-col"
              style={{
                gap: 24,
                paddingRight: "clamp(0px, 3vw, 40px)",
              }}
            >
              <div
                className={[
                  "font-light text-[17px] leading-[31px] transition-colors duration-700",
                  isDark ? "text-[#A1A1A1]" : "text-[#737373]",
                ].join(" ")}
              >
                <div>We&apos;re not chaotic.</div>
                <div>We&apos;re not clock-punching either.</div>
              </div>

              <div
                className={[
                  "font-light text-[16px] leading-[29px] transition-colors duration-700",
                  isDark ? "text-[#737373]" : "text-[#A1A1A1]",
                ].join(" ")}
              >
                Work here has:
              </div>

              <div className="flex flex-col" style={{ gap: 16 }}>
                <div
                  className={[
                    "font-light text-[16px] leading-[29px] transition-colors duration-700",
                    isDark ? "text-[#A1A1A1]" : "text-[#737373]",
                  ].join(" ")}
                >
                  <div>Ideas are welcomed.</div>
                  <div>But they&apos;re expected to stand on something.</div>
                </div>
                <div
                  className={[
                    "font-light text-[15px] leading-[27px] transition-colors duration-700",
                    isDark ? "text-[#737373]" : "text-[#A1A1A1]",
                  ].join(" ")}
                >
                  <div>If you like clarity more than noise,</div>
                  <div>you&apos;ll feel comfortable fast.</div>
                </div>
              </div>

              <div className="mt-2">
                <Image
                  src="/figma/careers/careers-workhere.png"
                  alt="Work Here"
                  width={477}
                  height={269}
                  className="w-full h-auto rounded-[5px] object-cover"
                />
              </div>
            </div>

            {/* RIGHT COL */}
            <div className="flex-1 flex flex-col mt-10 md:mt-0">

              {/* Direction */}
              <div
                className={[
                  "flex flex-col gap-3 p-[33px_33px_32px] transition-colors duration-700",
                  isDark ? "border border-[#2a2a2a]" : "border border-[#E5E5E5]",
                ].join(" ")}
              >
                <Image
                  src="/figma/careers/careers-icon-direction.svg"
                  alt=""
                  width={52}
                  height={41}
                />
                <div
                  className={[
                    "text-[24px] font-normal leading-[29px] transition-colors duration-700",
                    isDark ? "text-white" : "text-[#000000]",
                  ].join(" ")}
                >
                  Direction
                </div>
                <div
                  className={[
                    "text-[15px] font-light leading-[26px] transition-colors duration-700",
                    isDark ? "text-[#737373]" : "text-[#A1A1A1]",
                  ].join(" ")}
                >
                  Every project has a clear brief, a defined scope, and someone
                  accountable.
                </div>
              </div>

              {/* Context */}
              <div
                className={[
                  "flex flex-col gap-3 p-[33px_33px_32px] border-t-0 transition-colors duration-700",
                  isDark ? "border border-[#2a2a2a]" : "border border-[#E5E5E5]",
                ].join(" ")}
              >
                <Image
                  src="/figma/careers/careers-icon-context.svg"
                  alt=""
                  width={52}
                  height={44}
                />
                <div
                  className={[
                    "text-[24px] font-normal leading-[29px] transition-colors duration-700",
                    isDark ? "text-white" : "text-[#000000]",
                  ].join(" ")}
                >
                  Context
                </div>
                <div
                  className={[
                    "text-[15px] font-light leading-[26px] transition-colors duration-700",
                    isDark ? "text-[#737373]" : "text-[#A1A1A1]",
                  ].join(" ")}
                >
                  You&apos;ll always know why your work matters — not just what
                  needs to be done.
                </div>
              </div>

              {/* Standards */}
              <div
                className={[
                  "flex flex-col gap-3 p-[33px_33px_32px] border-t-0 transition-colors duration-700",
                  isDark ? "border border-[#2a2a2a]" : "border border-[#E5E5E5]",
                ].join(" ")}
              >
                <div
                  className={[
                    "text-[24px] font-normal leading-[29px] transition-colors duration-700",
                    isDark ? "text-white" : "text-[#000000]",
                  ].join(" ")}
                >
                  Standards
                </div>
                <div
                  className={[
                    "text-[15px] font-light leading-[26px] transition-colors duration-700",
                    isDark ? "text-[#737373]" : "text-[#A1A1A1]",
                  ].join(" ")}
                >
                  Quality isn&apos;t negotiable. We&apos;d rather do less,
                  better.
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
