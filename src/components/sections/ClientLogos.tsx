"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";
import Link from "next/link";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface ClientLogosProps {
  theme?: "dark" | "light";
}
const logosWhite = [
  "/home/client1.png",  "/home/client2.png",  "/home/client3.png",
  "/home/client4.png",  "/home/client5.png",  "/home/client6.png",
  "/home/client7.png",  "/home/client8.png",  "/home/client9.png",
  "/home/client10.png", "/home/client11.png", "/home/client12.png",
];
const logosBlack = [
  "/home/client13.png", "/home/client14.png", "/home/client15.png",
  "/home/client16.png", "/home/client17.png", "/home/client18.png",
  "/home/client19.png", "/home/client20.png", "/home/client21.png",
  "/home/client22.png", "/home/client23.png", "/home/client24.png",
];

export default function ClientLogos({ theme }: ClientLogosProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  const logoFiles = isDark ? logosWhite : logosBlack;

  return (
    <section
      className={[
        "py-10 md:py-16 lg:py-20 overflow-hidden",
        "transition-colors duration-500",
        isDark
          ? "border-t border-b border-white/10"
          : "border-t border-b border-black/10",
      ].join(" ")}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
        <AnimatedSection>
          <div className="flex justify-between items-center mb-8 flex-wrap gap-6">

            {/* Heading */}
            <p
              className={[
                "text-2xl lg:text-4xl lg:w-[65%] w-full",
                "transition-colors duration-500",
                isDark ? "text-white" : "text-black",
              ].join(" ")}
            >
              <strong className="text-2xl lg:text-4xl">Trusted</strong>{" "}
              <span className="font-light">
                by ambitious brands across industries and geographies.
              </span>
            </p>

            {/* Work With Us */}
            <Link
              href="/contact"
              className="group flex items-center gap-2 text-2xl font-medium no-underline"
            >
              <span className="text-[#E21F26] transition-transform duration-300 ease-out group-hover:-translate-x-2">
                <Image src="/icons/enter.svg" alt="arrow-right" width={32} height={32} />
              </span>
              <span
                className={[
                  "mt-1 font-light hover:text-[#E21F26]",
                  "transition-colors duration-500",
                  isDark ? "text-white" : "text-black",
                ].join(" ")}
              >
                Work With Us
              </span>
            </Link>
          </div>
        </AnimatedSection>
      </div>

      {/* Marquee */}
      <div
        className="overflow-hidden py-4 mt-4"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          className="flex gap-8 w-max"
          style={{ animation: "marquee 45s linear infinite" }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {[...logoFiles, ...logoFiles, ...logoFiles, ...logoFiles].map((logo, i) => (
            <div
              key={i}
              className={[
                "group shrink-0 flex items-center justify-center",
                "h-[100px] px-5",
                "border-2 rounded-lg hover:rounded-full",
                "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "hover:scale-105",
                isDark
                  ? "border-white/50 hover:border-white/70 hover:shadow-[0_0_24px_rgba(255,255,255,0.08)]"
                  : "border-black/20 hover:border-black/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]",
              ].join(" ")}
            >
              <Image
                src={logo}
                alt="Client Logo"
                width={0}
                height={0}
                sizes="140px"
                style={{
                  width: "auto",
                  height: "55px",
                  maxWidth: "140px",
                }}
                className="object-contain transition-opacity duration-500 opacity-100 brightness-900"
              
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
