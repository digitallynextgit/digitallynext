"use client";

import { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import WorldMap from "@/components/ui/world-map";
import { useSectionTheme } from "@/context/SectionThemeContext";

const locations = [
  { name: "India", flag: "India", lat: 20.5937, lng: 78.9629 },
  { name: "USA", flag: "USA", lat: 37.0902, lng: -95.7129 },
  { name: "UK", flag: "UK", lat: 51.5074, lng: -0.1278 },
  { name: "Italy", flag: "Italy", lat: 41.9028, lng: 12.4964 },
  {
    name: "Czech Republic",
    flag: "Czech Republic",
    lat: 50.0755,
    lng: 14.4378,
  },
  { name: "Switzerland", flag: "Switzerland", lat: 46.9481, lng: 7.4474 },
  { name: "Australia", flag: "Australia", lat: -25.2744, lng: 133.7751 },
  { name: "Russia", flag: "Russia", lat: 55.7558, lng: 37.6173 },
  { name: "Middle East", flag: "Middle East", lat: 24.4667, lng: 54.3667 },
  { name: "Israel", flag: "Israel", lat: 31.7683, lng: 35.2137 },
  { name: "Canada", flag: "Canada", lat: 56.1304, lng: -106.3468 },
  { name: "Singapore", flag: "Singapore", lat: 1.3521, lng: 103.8198 },
];

interface ProudlyWorkingWithProps {
  theme?: "dark" | "light";
}

export default function ProudlyWorkingWith({ theme }: ProudlyWorkingWithProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [hoveredName, setHoveredName] = useState<string | null>(null);

  const pauseMarquee = () => {
    if (marqueeRef.current)
      marqueeRef.current.style.animationPlayState = "paused";
  };

  const resumeMarquee = () => {
    if (marqueeRef.current)
      marqueeRef.current.style.animationPlayState = "running";
  };

  const handleMouseEnter = (name: string) => {
    pauseMarquee();
    setHoveredName(name);
  };

  const handleMouseLeave = () => {
    resumeMarquee();
    setHoveredName(null);
  };

  // All 12 dots always shown — hovered country turns blue, rest stay red. No lines.
  const mapDots = useMemo(
    () =>
      locations.map((l) => ({
        start: { lat: l.lat, lng: l.lng },
        end: { lat: l.lat, lng: l.lng },
        color: hoveredName === l.name ? "#0EC8C5" : "#E53935",
      })),
    [hoveredName],
  );

  return (
    <section className={`pt-10 md:pt-16 lg:pt-20 overflow-hidden ${isDark ? 'bg-black' : 'bg-[#F5F5F5]'}`}>
      {/* Heading + Marquee inside constrained container */}
      <div className="w-[92%] sm:w-[90%] lg:w-auto max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center mb-12 md:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className={[
                "font-extrabold tracking-tight leading-none text-center transition-colors duration-500",
                isDark ? "text-white" : "text-[#1a1a1a]",
              ].join(" ")}
            >
              <span className="text-[#E53935] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]">
                Proudly
              </span>{" "}
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]">
                working with
              </span>
              <span className="text-[#0EC8C5] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]">
                .
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Locations Marquee */}
        <div
          className={`h-px bg-linear-to-r from-transparent ${isDark ? "via-white/10" : "via-black/10"} to-transparent transition-colors duration-500`}
        />
        <div
          className="overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <div
            ref={marqueeRef}
            className="flex w-max py-6 md:py-8"
            style={{ animation: "marquee 55s linear infinite" }}
          >
            {[...locations, ...locations, ...locations, ...locations].map(
              (place, i) => (
                <span
                  key={i}
                  onMouseEnter={() => handleMouseEnter(place.name)}
                  onMouseLeave={handleMouseLeave}
                  className={[
                    "shrink-0 inline-flex items-center gap-3",
                    "text-[clamp(1.1rem,2.5vw,1.75rem)] font-light tracking-widest uppercase",
                    "transition-colors duration-300 select-none",
                    "px-10",
                    hoveredName === place.name
                      ? "text-[#E53935]"
                      : isDark
                        ? "text-white/70 hover:text-[#E53935]"
                        : "text-[#1a1a1a]/70 hover:text-[#E53935]",
                  ].join(" ")}
                >
                  <Image
                    src={`/flags/${place.flag}.png`}
                    alt={place.name}
                    width={36}       
                    height={26}      
                    className="rounded-[3px] object-cover shrink-0"
                    style={{ width: "clamp(26px, 2.5vw, 36px)", height: "auto" }}
                  />
                  {place.name}
                  <span className="text-[#E53935] opacity-40">·</span>
                </span>

              ),
            )}
          </div>
        </div>
        <div
          className={`h-px bg-linear-to-r from-transparent ${isDark ? "via-white/10" : "via-black/10"} to-transparent transition-colors duration-500`}
        />
      </div>

      <div
        className={`relative w-full mt-10 ${isDark ? "bg-black" : "bg-[#F5F5F5]"}`}
        style={{
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 60%, transparent 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <WorldMap
            dots={mapDots}
            lineColor="#0EC8C5"
            theme={isDark ? "dark" : "light"}
          />
        </div>
      </div>

    </section>
  );
}
