"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";
import Link from "next/link";

interface ClientLogosProps {
  theme?: "dark" | "light";
}

export default function ClientLogos({ theme = "dark" }: ClientLogosProps) {
  const logoFiles = [
    "/home/client1.png", "/home/client2.png", "/home/client3.png", "/home/client4.png",
    "/home/client5.png", "/home/client6.png", "/home/client7.png", "/home/client8.png",
    "/home/client9.png", "/home/client10.png", "/home/client11.png", "/home/client12.png",
  ];

  const isDark = theme === "dark";

  return (
    <section
      className={[
        "py-10 md:py-16 lg:py-20 overflow-hidden",
        isDark
          ? "bg-black border-t border-b border-white/10"
          : "bg-white border-t border-b border-black/8",
      ].join(" ")}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
        <AnimatedSection>
          <div className="flex justify-between items-center mb-8 flex-wrap gap-6">

            {/* Heading */}
            <p
              className={[
                "text-2xl lg:text-4xl lg:w-[65%] w-full",
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
                <Image
                  src="/icons/enter.svg"
                  alt="arrow-right"
                  width={32}
                  height={32}
                />
              </span>
              <span
                className={[
                  "mt-1 font-light hover:text-[#E21F26] transition-colors duration-200",
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
      <div className="overflow-hidden py-4">
        <div className="flex gap-12 w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
          {[...logoFiles, ...logoFiles, ...logoFiles, ...logoFiles].map((logo, i) => (
            <div
              key={i}
              className={[
                "group shrink-0 flex items-center justify-center",
                "h-[120px] mt-8 px-6",
                "border transition-all duration-300 rounded-lg",
                isDark ? "border-white" : "border-black",
              ].join(" ")}
            >
              <div className="flex items-center justify-center max-w-[160px]">
                <Image
                  src={logo}
                  alt="Client Logo"
                  width={160}
                  height={80}
                  className={[
                    "w-full h-auto object-contain",
                    "opacity-60 group-hover:opacity-100",
                    "transition-opacity duration-300",
                    isDark
                      ? "brightness-0 invert"   
                      : "brightness-0",         
                  ].join(" ")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
