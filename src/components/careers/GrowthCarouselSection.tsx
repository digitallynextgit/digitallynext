"use client";

import Image from "next/image";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface GrowthCarouselSectionProps {
  theme?: "dark" | "light";
}

const carouselImages = [
  "/careers/c1.jpg",
  "/careers/c2.jpg",
  "/careers/c3.jpg",
  "/careers/c4.png",
  "/careers/c5.webp",
  "/careers/c6.png",
  "/careers/c7.png",
  "/careers/c8.png",
  "/careers/c9.jpeg",
  "/careers/c10.jpeg",
  "/careers/c11.jpeg",
];
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
        <div className="w-full pb-10 md:pb-16 lg:pb-20">
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
                    className="h-40 w-full object-cover sm:h-45 md:h-50 lg:h-100"
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
