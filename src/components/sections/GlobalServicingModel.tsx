"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const frameworks = [
  {
    name: "C-Suite",
    description: "Leadership & decision-aligned engagement",
    cta: "Explore Framework",
    icon: (
      <Image
        src="/home/sm1.png"
        alt="C-Suite Icon"
        width={112}  
        height={112}
        className="w-full h-full object-contain"
      />
    ),
  },
  {
    name: "KASA",
    description: "Founder & leadership brand authority model",
    cta: "Explore Framework",
    icon: (
      <Image
        src="/home/sm2.png"
        alt="KASA Icon"
        width={112}
        height={112}
        className="w-full h-full object-contain"
      />
    ),
  },
  {
    name: "Profit",
    description: "Plan-to-performance growth execution",
    cta: "Explore Framework",
    icon: (
      <Image
        src="/home/sm3.png"
        alt="Profit Icon"
        width={112}
        height={112}
        className="w-full h-full object-contain"
      />
    ),
  },
  {
    name: "Communication & Governance",
    description: "Cadence · Ownership · Escalation",
    cta: "Explore Model",
    icon: (
      <Image
        src="/home/sm4.png"
        alt="Communication Icon"
        width={112}
        height={112}
        className="w-full h-full object-contain"
      />
    ),
  },
  {
    name: "Delivery Models",
    description: "Satellite Office · Dedicated Pods · Build-Operate-Transfer",
    cta: "Explore Models",
    icon: (
      <Image
        src="/home/sm5.png"
        alt="Delivery Models Icon"
        width={112}
        height={112}
        className="w-full h-full object-contain"
      />
    ),
  },
];


const CYCLE_INTERVAL = 4000;

/* ===== Mobile Layout ===== */
function MobileGSM() {
  return (
    <div className="lg:hidden">
      {/* Frameworks heading */}
      <motion.h3
        className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Our Operating Frameworks
      </motion.h3>

      <p className="text-[12px] sm:text-sm text-white/60 mb-6 sm:mb-8 leading-relaxed">
        All frameworks are powered by Modern DAD thinking and governed by the AI
        Decision & Acceleration Center.
      </p>

      {/* All framework cards stacked */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {frameworks.map((fw, i) => (
          <motion.div
            key={fw.name}
            className="bg-black border-2 border-white/15 rounded p-4 sm:p-5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center rounded">
                {fw.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight wrap-break-words">
                    {fw.name}
                  </h4>
                  <Link
                    href="#"
                    className="mt-1 sm:mt-0 inline-flex items-center gap-2 text-[#E53935] font-semibold text-[11px] sm:text-xs shrink-0 hover:gap-4 transition-all duration-300"
                  >
                    <Image
                      src="/icons/enter.svg"
                      alt="arrow-right"
                      width={20}
                      height={20}
                    />
                    <span className="text-white/70 mt-1 whitespace-nowrap text-[14px]">
                      {fw.cta}
                    </span>
                  </Link>
                </div>
                <p className="text-[12px] mt-2 sm:text-xs text-gray-400 leading-relaxed">
                  {fw.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ===== Desktop Layout (unchanged) ===== */
function DesktopGSM() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % frameworks.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, CYCLE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const active = frameworks[activeIndex];

  return (
    <div className="hidden lg:block">
      {/* Main content — two columns */}
      <div className="grid grid-cols-2 gap-20 items-start ">
        {/* LEFT — Static info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-10">
            <span className="text-2xl md:text-5xl font-medium">
              {" "}
              Our Operating
              <br />
              Frameworks
            </span>
          </h3>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-md">
            <span className="text-sm md:text-lg text-white/80 ">
              All frameworks are powered by Modern DAD thinking and governed by
              the AI Decision & Acceleration Center.
            </span>
          </p>
        </motion.div>

        {/* RIGHT — Auto-cycling card */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="bg-black border-2 border-white/15 rounded p-8 md:p-10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Icon */}
              <div className="mb-6 w-28 h-28 flex items-center justify-center rounded">
                {active.icon}
              </div>
              <div className="flex flex-row items-center justify-between">
                {/* Title */}
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                  {active.name}
                </h4>

                {/* CTA */}
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-[#E53935] font-semibold text-sm mb-4 hover:gap-4 transition-all duration-300"
                >
                  <Image
                    src="/icons/enter.svg"
                    alt="arrow-right"
                    width={30}
                    height={30}
                  />{" "}
                  <span className="text-white/70 mt-1 whitespace-nowrap text-lg hover:text-[#E53935]">
                    {active.cta}
                  </span>
                </Link>
              </div>
              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex gap-2 mt-6 justify-center">
            {frameworks.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeIndex === i
                    ? "w-8 bg-[#E53935]"
                    : "w-3 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to framework ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Main Export ===== */
export default function GlobalServicingModel() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-black">
      <div className="w-[92%] sm:w-[90%] lg:w-auto max-w-6xl mx-auto">
        <div className="flex justify-between items-center flex-col">
          {/* Heading */}
          <motion.div
            className="mb-5 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-extrabold text-white tracking-tight leading-none text-center">
              <span className="text-[#E53935] text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
                Global
              </span>{" "}
              <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
                Servicing Model
              </span>
              <span className="text-[#0EC8C5] text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
                .
              </span>
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-[12px] sm:text-sm md:text-base text-white/80 mb-10 sm:mb-16 md:mb-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-sm md:text-lg text-white/80 ">
              Structured frameworks. Predictable delivery. Global scale.
            </span>
          </motion.p>
        </div>

        {/* Desktop layout */}
        <DesktopGSM />

        {/* Mobile layout */}
        <MobileGSM />
      </div>
    </section>
  );
}
