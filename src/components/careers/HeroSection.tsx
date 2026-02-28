"use client";

import Image from "next/image";
import Link from "next/link";
import ImageTrail from "@/components/ui/ImageTrail";
import { useEffect, useRef } from "react";
import SquareBg from "./SquareBg";
import { useSectionTheme } from "@/context/SectionThemeContext";
import gsap from "gsap";

interface HeroSectionProps {
  theme?: "dark" | "light";
}

export default function HeroSection({ theme }: HeroSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    const elements = backgroundRef.current.querySelectorAll(".floating-element");

    elements.forEach((el) => {
      const randomDelay = Math.random() * 2;
      const randomDuration = 3 + Math.random() * 2;

      gsap.to(el, {
        y: "30px",
        duration: randomDuration,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: randomDelay,
      });
    });

    return () => {
      gsap.killTweensOf(elements);
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className={[
        "overflow-hidden transition-colors duration-700",
        isDark ? "bg-black text-white" : "bg-white text-black",
      ].join(" ")}
      style={{
        position: "relative",
        height: "clamp(600px, 100vh, 907px)",
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20">
        <SquareBg
          direction="diagonal"
          speed={0.5}
          borderColor="rgba(239, 68, 68, 0.3)"
          squareSize={60}
          hoverFillColor="rgba(239, 68, 68, 0.2)"
        />
      </div>

      <div className="mt-6 md:mt-12 lg:mt-20">

        {/* 1. ImageTrail */}
        <div className="absolute inset-0 z-1">
          <div className="h-full w-full relative overflow-hidden">
            <ImageTrail
              key="careers-hero-trail"
              items={[
                "/careers/c1.png",
                "/careers/c2.png",
                "/careers/c3.png",
                "/careers/c4.png",
                "/careers/c5.png",
                "/careers/c6.png",
                "/careers/c7.png",
                "/careers/c8.png",
                "/careers/c9.png",
                "/careers/c10.png",
                "/careers/c11.png",
              ]}
              variant={2}
            />
          </div>
        </div>

        {/* 2. Hero content */}
        <div
          className="relative z-2 pointer-events-none w-full h-full flex flex-col justify-center items-center"
          style={{ padding: "32px 24px", gap: 56 }}
        >
          {/* Heading block */}
          <div
            className="mt-12 w-full max-w-[848px] flex flex-col items-center text-center"
            style={{ gap: 8 }}
          >
            <h1
              style={{
                fontSize: "clamp(2rem, 6vw, 4rem)",
                lineHeight: 1.25,
                fontWeight: 300,
                letterSpacing: "-2.0385px",
                margin: 0,
              }}
              className={[
                "transition-colors duration-700",
                isDark ? "text-white" : "text-[#000000]",
              ].join(" ")}
            >
              Build work that matters
              <span className="text-[#0EC8C5]">.</span>
            </h1>
            <h1
              style={{
                fontSize: "clamp(2rem, 6vw, 4rem)",
                lineHeight: 1.25,
                fontWeight: 700,
                letterSpacing: "-2.0385px",
                margin: 0,
              }}
              className={[
                "transition-colors duration-700",
                isDark ? "text-white" : "text-[#000000]",
              ].join(" ")}
            >
              Build yourself along the way
              <span className="text-[#E21F26]">.</span>
            </h1>
          </div>

          {/* Sub-content block */}
          <div className="flex flex-col items-center" style={{ gap: 24 }}>
            <div className="flex flex-col items-center text-center" style={{ gap: 24 }}>
              <div
                className={[
                  "font-light text-[18px] leading-[31px] transition-colors duration-700",
                  isDark ? "text-[#A1A1A1]" : "text-[#737373]",
                ].join(" ")}
              >
                <div>Some places hire for skills.</div>
                <div>Some hire for speed.</div>
                <div>We hire for how you think.</div>
              </div>
              <div
                className={[
                  "font-light text-[16px] leading-[27px] text-center transition-colors duration-700",
                  isDark ? "text-[#737373]" : "text-[#A1A1A1]",
                ].join(" ")}
              >
                <div>DigitallyNext is where structure meets ambition —</div>
                <div>and where good thinking gets taken seriously.</div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="#open-positions"
              className="pointer-events-auto inline-flex items-center justify-center gap-[10px] bg-[#E21F26] text-white hover:bg-[#c41a20] transition-colors duration-200"
              style={{
                padding: "15px 41px",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "1.04px",
                textTransform: "uppercase",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <Image
                src="/figma/careers/careers-arrow.svg"
                alt=""
                width={36}
                height={15}
              />
              VIEW OPEN POSITIONS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
