"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cobe, type CobeRef } from "../ui/cobe-globe";
import { useSectionTheme } from "@/context/SectionThemeContext";

const locations = [
  { name: "India",          lat: 20.5937,  long: 78.9629   },
  { name: "USA",            lat: 37.0902,  long: -95.7129  },
  { name: "UK",             lat: 51.5074,  long: -0.1278   },
  { name: "Italy",          lat: 41.9028,  long: 12.4964   },
  { name: "Czech Republic", lat: 50.0755,  long: 14.4378   },
  { name: "Switzerland",    lat: 46.9481,  long: 7.4474    },
  { name: "Australia",      lat: -25.2744, long: 133.7751  },
  { name: "Russia",         lat: 55.7558,  long: 37.6173   },
  { name: "Middle East",    lat: 24.4667,  long: 54.3667   },
  { name: "Israel",         lat: 31.7683,  long: 35.2137   },
  { name: "Canada",         lat: 56.1304,  long: -106.3468 },
  { name: "Singapore",      lat: 1.3521,   long: 103.8198  },
];

interface ProudlyWorkingWithProps {
  theme?: "dark" | "light";
}

export default function ProudlyWorkingWith({ theme }: ProudlyWorkingWithProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";
  const cobeRef = useRef<CobeRef>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // track click-locked pause separately from hover pause
  const [clickPaused, setClickPaused] = useState(false);

  const pauseMarquee = () => {
    if (marqueeRef.current) marqueeRef.current.style.animationPlayState = "paused";
  };

  const resumeMarquee = () => {
    if (marqueeRef.current) marqueeRef.current.style.animationPlayState = "running";
  };

  const handleMouseEnter = (lat: number, long: number) => {
    pauseMarquee();
    cobeRef.current?.pauseAt(lat, long);
  };

  const handleMouseLeave = () => {
    if (!clickPaused) resumeMarquee(); // resume only if not click-locked
    cobeRef.current?.resume();
  };

  const handleClick = (lat: number, long: number) => {
    if (clickPaused) {
      // already paused by click → resume
      setClickPaused(false);
      resumeMarquee();
      cobeRef.current?.resume();
    } else {
      // pause by click
      setClickPaused(true);
      pauseMarquee();
      cobeRef.current?.focusLocation(lat, long);
    }
  };

  return (
    <section className="py-10 md:py-16 lg:py-20 overflow-hidden">
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
              <span className="text-[#E53935] text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
                Proudly
              </span>{" "}
              <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
                working with
              </span>
              <span className="text-[#0EC8C5] text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
                .
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Locations Marquee */}
        <div
          className={[
            "border-t border-b transition-colors duration-500 overflow-hidden",
            isDark ? "border-white/10" : "border-black/10",
          ].join(" ")}
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <div
            ref={marqueeRef}
            className="flex w-max py-6 md:py-8"
            style={{ animation: "marquee 55s linear infinite" }}
          >
            {[...locations, ...locations, ...locations, ...locations].map((place, i) => (
              <span
                key={i}
                onClick={() => handleClick(place.lat, place.long)}
                onMouseEnter={() => handleMouseEnter(place.lat, place.long)}
                onMouseLeave={handleMouseLeave}
                className={[
                  "shrink-0 text-[clamp(0.9rem,2vw,1.4rem)] font-light tracking-widest uppercase",
                  "transition-colors duration-300 cursor-pointer select-none",
                  "px-6 md:px-10",
                  isDark
                    ? "text-white/70 hover:text-[#E53935]"
                    : "text-[#1a1a1a]/70 hover:text-[#E53935]",
                ].join(" ")}
              >
                {place.name}
                <span className="ml-6 md:ml-10 text-[#E53935] opacity-40">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Click to unlock hint */}
        {clickPaused && (
          <p className="text-center text-xs mt-2 text-[#E53935]/60 tracking-widest uppercase">
            Click again to resume
          </p>
        )}

        {/* Globe */}
        <Cobe
          ref={cobeRef}
          variant="auto-rotate-to-location"
          locations={locations.map((l) => ({ ...l, emoji: "📍" }))}
          phi={0}
          theta={0.2}
          mapSamples={16000}
          mapBrightness={1.8}
          mapBaseBrightness={0.05}
          diffuse={3}
          dark={isDark ? 1.1 : 0}
          baseColor={isDark ? "#ffffff" : "#1a1a1a"}
          markerColor="#E53935"
          markerSize={0.06}
          glowColor={isDark ? "#ffffff" : "#888888"}
          opacity={0.85}
        />

      </div>
    </section>
  );
}
