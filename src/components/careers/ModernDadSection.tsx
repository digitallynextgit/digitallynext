"use client";

import Image from "next/image";
import { useState } from "react";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface ModernDadSectionProps {
  theme?: "dark" | "light";
}

const items = [
  {
    sub: "Data doesn't sit in dashboards.",
    main: "It shapes decisions.",
    image: "/figma/careers/careers-modern-dad-1.png",
  },
  {
    sub: "AI doesn't replace thinking.",
    main: "It removes friction.",
    image: "/figma/careers/careers-modern-dad-2.png",
  },
  {
    sub: "Digital isn't a channel.",
    main: "It's the system.",
    image: "/figma/careers/careers-modern-dad-3.png",
  },
];

export default function ModernDadSection({ theme }: ModernDadSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className={[
        "transition-colors duration-700",
        isDark ? "bg-black text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <div className="container relative flex items-center justify-center">
        <div style={{ maxWidth: 1103 }} className="w-full py-12 md:py-16 lg:py-20">

          {/* Top label */}
          <div className="text-[#0EC8C5] text-[16px] font-medium tracking-[0.1125em]">
            MODERN DAD
          </div>

          {/* Main layout row */}
          <div className="flex items-start justify-between gap-12 mt-6">

            {/* Left: heading + items */}
            <div className="flex-1">
              <h2
                className={[
                  "font-normal leading-[1.15] transition-colors duration-700",
                  isDark ? "text-white" : "text-[#000000]",
                ].join(" ")}
                style={{ fontSize: "clamp(2rem, 4vw, 2.975rem)" }}
              >
                How work moves forward here
              </h2>

              <div
                className="mt-12 lg:mt-[88px] flex flex-col"
                style={{ gap: 64 }}
              >
                {items.map(({ sub, main }, index) => (
                  <div
                    key={sub}
                    className="pl-6 lg:pl-[50px] cursor-default"
                    style={{
                      borderLeft: `2px solid ${hoveredIndex === index ? "#0EC8C5" : "#C8102E"}`,
                      transition: "border-color 0.3s ease",
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      className="text-[#0EC8C5] text-[16px] font-bold leading-[27px]"
                      style={{
                        transition: "opacity 0.3s ease",
                        opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.4,
                      }}
                    >
                      {sub}
                    </div>
                    <div
                      className={[
                        "mt-2 text-[34px] font-normal leading-[1.2] transition-colors duration-700",
                        isDark ? "text-white" : "text-[#000000]",
                      ].join(" ")}
                      style={{
                        transition: "opacity 0.3s ease",
                        opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.4,
                      }}
                    >
                      {main}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image (desktop only) */}
            <div
              className="hidden lg:block shrink-0"
              style={{ width: 260, marginTop: 80 }}
            >
              <div className="relative" style={{ width: 260, height: 363 }}>
                {items.map(({ image, sub }, index) => (
                  <Image
                    key={sub}
                    src={image}
                    alt=""
                    fill
                    className="object-cover absolute"
                    style={{
                      transition: "opacity 0.4s ease",
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                  />
                ))}
                {/* Default image */}
                <Image
                  src="/figma/careers/careers-modern-dad.png"
                  alt=""
                  fill
                  className="object-cover absolute"
                  style={{
                    transition: "opacity 0.4s ease",
                    opacity: hoveredIndex === null ? 1 : 0,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <div
            className={[
              "mt-20 pt-[49px] text-[15px] font-light leading-[1.8] transition-colors duration-700",
              isDark
                ? "border-t border-[#262626] text-[#737373]"
                : "border-t border-[#E5E5E5] text-[#A1A1A1]",
            ].join(" ")}
          >
            <div>That&apos;s Modern DAD —</div>
            <div>how we keep work sharp, relevant, and future-ready.</div>
          </div>

        </div>
      </div>
    </section>
  );
}
