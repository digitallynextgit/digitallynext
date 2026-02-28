"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Cobe, type CobeRef } from "../ui/cobe-globe";
import { useSectionTheme } from "@/context/SectionThemeContext";

const locations = [
  { name: "New York",  lat: 40.7128, long: -74.0060 },
  { name: "London",    lat: 51.5074, long: -0.1278  },
  { name: "Dubai",     lat: 25.2048, long: 55.2708  },
  { name: "Singapore", lat: 1.3521,  long: 103.8198 },
  { name: "Mumbai",    lat: 19.0760, long: 72.8777  },
];

interface ProudlyWorkingWithProps {
  theme?: "dark" | "light";
}

export default function ProudlyWorkingWith({ theme }: ProudlyWorkingWithProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";
  const cobeRef = useRef<CobeRef>(null);

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

        {/* Locations */}
        <div
          className={[
            "flex flex-wrap items-center justify-between gap-y-6",
            "border-t border-b py-6 md:py-8 transition-colors duration-500",
            isDark ? "border-white/10" : "border-black/10",
          ].join(" ")}
        >
          {locations.map((place, i) => (
            <motion.span
              key={place.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => cobeRef.current?.focusLocation(place.lat, place.long)}
              onMouseEnter={() => cobeRef.current?.pauseAt(place.lat, place.long)}
              onMouseLeave={() => cobeRef.current?.resume()}
              className={[
                "text-[clamp(1rem,2.2vw,1.6rem)] font-light tracking-widest uppercase",
                "transition-colors duration-300 hover:text-[#E53935] cursor-pointer select-none",
                isDark ? "text-white" : "text-[#1a1a1a]",
              ].join(" ")}
            >
              {place.name}
            </motion.span>
          ))}
        </div>

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
          // ✅ Globe dark/light mode
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
