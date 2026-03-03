"use client";

import Image from "next/image";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface GrowthCarouselSectionProps {
  theme?: "dark" | "light";
}

const carouselImages = ["/careers/c1.jpg", "/careers/c2.jpg", "/careers/c3.jpg"];
const carouselItems = Array.from({ length: 10 }, (_, i) => carouselImages[i % carouselImages.length]);

export default function GrowthCarouselSection({ theme }: GrowthCarouselSectionProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  return (
    <section
      className={[
        "transition-colors duration-700",
        isDark ? "bg-black" : "bg-white",
      ].join(" ")}
    >
      <div className="flex justify-center items-center">
        <div  className="w-full pb-10 md:pb-16 lg:pb-20">
          <div
            className="overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <div className="flex w-max gap-6 md:gap-8" style={{ animation: "marquee 40s linear infinite" }}>
              {[...carouselItems, ...carouselItems].map((src, idx) => (
                <div key={`${src}-${idx}`} className="shrink-0">
                  <Image
                    src={src}
                    alt=""
                    width={360}
                    height={240}
                    className="h-[160px] w-full object-cover sm:h-[180px] md:h-[200px] lg:h-[400px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
