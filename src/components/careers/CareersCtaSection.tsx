"use client";

import Image from "next/image";
import Link from "next/link";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface CareersCtaSectionProps {
  theme?: "dark" | "light";
}

export default function CareersCtaSection({ theme }: CareersCtaSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "clamp(500px, 80vh, 790px)" }}
    >
      {/* Background image */}
      <Image
        src="/figma/careers/careers-team.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: isDark
            ? "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.90) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.80) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-1 w-full h-full flex flex-col items-center justify-center text-center px-6 py-[76px] gap-12">

        {/* Heading block — always white (bg image pe) */}
        <div className="flex flex-col items-center">
          <div
            className="font-light leading-[1.1] text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Work that lasts.
          </div>
          <div
            className="font-normal leading-[1.1] text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Systems that scale.
          </div>
          <div
            className="font-bold leading-[1.1] text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            People who grow with both.
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="#open-positions"
          className="inline-flex items-center justify-center px-10 py-[14px] text-white text-[12px] font-medium uppercase tracking-[0.9815px] whitespace-nowrap hover:opacity-90 transition-opacity duration-300 no-underline"
          style={{
            background: "linear-gradient(90deg, #E21F26 0%, #7C1115 100%)",
          }}
        >
          EXPLORE CAREERS
        </Link>

      </div>
    </section>
  );
}
