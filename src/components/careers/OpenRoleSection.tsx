"use client";

import Image from "next/image";
import Link from "next/link";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface OpenRolesSectionProps {
  theme?: "dark" | "light";
}

const cards = [
  {
    title: "Internships",
    desc: "Start with real work, real mentorship, and real expectations. Our internships are structured to build, not busy-work.",
    linkLabel: "Internship Roles",
    href: "#internships",
  },
  {
    title: "Full-Time Positions",
    desc: "Join a team that values clarity, ownership, and craft. Roles across strategy, digital, data, and AI.",
    linkLabel: "Full-Time Roles",
    href: "#full-time",
  },
];

export default function OpenRolesSection({ theme }: OpenRolesSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  return (
    <section
      className={[
        "transition-colors duration-700",
        isDark ? "bg-black" : "bg-white",
      ].join(" ")}
    >
      <div className="container flex justify-center items-center">
        <div style={{ maxWidth: 1103 }} className="w-full py-12 md:py-16 lg:py-20">

          {/* Outer wrapper */}
          <div
            className={[
              "flex flex-col transition-colors duration-700",
              isDark ? "bg-[#0a0a0a]" : "bg-[#FAFAFA]",
            ].join(" ")}
            style={{ gap: 40 }}
          >

            {/* Heading */}
            <div
              className={[
                "font-bold leading-[1.15] transition-colors duration-700",
                isDark ? "text-white" : "text-[#000000]",
              ].join(" ")}
              style={{ fontSize: "clamp(2rem, 4vw, 2.975rem)" }}
            >
              Open{" "}
              <span className="font-normal">Roles</span>
              <span className="text-[#E21F26]">.</span>
            </div>

            {/* Subtitle */}
            <div
              className={[
                "font-light text-[16px] leading-[29px] transition-colors duration-700",
                isDark ? "text-[#737373]" : "text-[#A1A1A1]",
              ].join(" ")}
            >
              <div>If this feels like your kind of place,</div>
              <div>start here:</div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {cards.map(({ title, desc, linkLabel, href }, index) => (
                <div
                  key={title}
                  className={[
                    "flex flex-col transition-colors duration-700",
                    isDark
                      ? "bg-[#111111] border border-[#2a2a2a]"
                      : "bg-white border border-[#E5E5E5]",
                    index === 1
                      ? isDark
                        ? "md:border-l-0"
                        : "md:border-l-0"
                      : "",
                  ].join(" ")}
                  style={{ padding: "49px 49px 40px", gap: 16 }}
                >
                  {/* Title */}
                  <div
                    className={[
                      "text-[32px] font-normal leading-[38px] transition-colors duration-700",
                      isDark ? "text-white" : "text-[#0A0A0A]",
                    ].join(" ")}
                  >
                    {title}
                  </div>

                  {/* Description */}
                  <div
                    className={[
                      "text-[15px] font-light leading-[26px] transition-colors duration-700",
                      isDark ? "text-[#737373]" : "text-[#A1A1A1]",
                    ].join(" ")}
                  >
                    {desc}
                  </div>

                  {/* Link */}
                  <Link
                    href={href}
                    className={[
                      "group mt-2 inline-flex items-center gap-[15px]",
                      "text-[14px] font-normal leading-[18px] no-underline",
                      "transition-colors duration-300",
                      isDark ? "text-white" : "text-[#000000]",
                    ].join(" ")}
                  >
                    <Image
                      src="/figma/careers/careers-arrow-link.svg"
                      alt=""
                      width={19}
                      height={10}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                    <span className="group-hover:text-[#E21F26] transition-colors duration-300">
                      {linkLabel}
                    </span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Bottom line */}
            <div
              className={[
                "text-[14px] font-bold leading-[25px] transition-colors duration-700",
                isDark ? "text-white" : "text-[#000000]",
              ].join(" ")}
            >
              No hype. Just an{" "}
              <span className="text-[#E21F26]">honest start.</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
