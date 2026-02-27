"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import AnimatedSection from "@/components/ui/AnimatedSection";

/* ===== Mobile Accordion ===== */
function MobileServices() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setExpandedIndex(expandedIndex === i ? null : i);
  };

  return (
    <div className="lg:hidden">
      <div className="flex flex-col">
        {services.map((service, i) => {
          const isOpen = expandedIndex === i;
          return (
            <div key={service.id} className="border-b border-white/10">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-baseline justify-between py-6 px-1 text-left group"
              >
                <h3
                  className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                    isOpen
                      ? "text-[#E53935]"
                      : "text-white/30 group-hover:text-white/70"
                  }`}
                >
                  {service.title}
                </h3>

                <span
                  className={`ml-4 flex items-center gap-0.5 text-sm font-mono shrink-0 transition-colors duration-300 ${
                    isOpen ? "text-[#E53935]" : "text-white/30"
                  }`}
                >
                  {"{ "}
                  {String(i + 1).padStart(2, "0")}
                  {" }"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 px-1">
                      {/* Video */}
                      <div className="relative aspect-video rounded overflow-hidden bg-[var(--bg-surface)] border border-white/10 shadow-2xl mb-4">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover"
                          key={`mobile-vid-${i}`}
                        >
                          <source src={service.media} type="video/mp4" />
                        </video>
                      </div>

                      {/* Subtitle */}
                      <p className="text-sm text-white/60 mb-4 leading-relaxed">
                        {service.hero.subtitle}
                      </p>

                      {/* Slider */}
                      <div
                        className="bg-white/5 rounded py-2.5 overflow-hidden whitespace-nowrap"
                        style={{
                          maskImage:
                            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                          WebkitMaskImage:
                            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                        }}
                      >
                        <motion.div
                          className="inline-flex text-xs text-white/40 font-medium"
                          animate={{ x: ["0%", "-50%"] }}
                          transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <span className="shrink-0">{service.sliderText}</span>
                          <span className="shrink-0 mx-4 opacity-40">·</span>
                          <span className="shrink-0">{service.sliderText}</span>
                          <span className="shrink-0 mx-4 opacity-40">·</span>
                          <span className="shrink-0">{service.sliderText}</span>
                          <span className="shrink-0 mx-4 opacity-40">·</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ===== Desktop ===== */
function DesktopServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { root: null, rootMargin: "-35% 0px -60% 0px", threshold: 0 },
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="hidden lg:block">
      <div className="grid grid-cols-[38%_1fr] gap-2 mt-20">
        {/* LEFT — Sticky media */}
        <div className="relative">
          <div
            className="lg:sticky lg:top-32 w-full max-w-[320px]"
            style={{ position: "-webkit-sticky" } as React.CSSProperties}
          >
            <div className="relative aspect-4/3 rounded overflow-hidden bg-[var(--bg-surface)] border border-white/10 shadow-2xl">
              <AnimatePresence mode="popLayout">
                <motion.video
                  key={activeIndex}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <source src={services[activeIndex].media} type="video/mp4" />
                </motion.video>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT — Scrollable service items */}
        <div className="flex flex-col overflow-hidden">
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="transition-all duration-500"
            >
              <Link
                href={`/services/${service.slug}`}
                className="group inline-flex items-start gap-4 mb-6"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={
                    hoveredIndex === i
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -16 }
                  }
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="shrink-0 mt-5"
                >
                    <Image
                      src="/icons/enter.svg"
                      alt="arrow"
                      width={52}
                      height={52}
                      className="transition-transform duration-300 ease-out group-hover:-translate-x-1"
                    />
                </motion.div>

                <h3
                  className={`text-3xl md:text-7xl font-bold leading-tight tracking-tight transition-colors duration-300 ${
                    hoveredIndex === i
                      ? "text-[#E53935]" // ✅ hover pe red
                      : activeIndex === i
                        ? "text-[#E53935]" // active pe red
                        : activeIndex + 1 === i
                          ? "text-white"
                          : "text-white/20"
                  }`}
                >
                  {service.title}
                </h3>
              </Link>

              {/* Slider */}
              <div
                className="bg-white/5 rounded py-3 overflow-hidden whitespace-nowrap mt-4"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                }}
              >
                <motion.div
                  className="inline-flex text-lg text-white/60 font-medium"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <span className="shrink-0">{service.sliderText}</span>
                  <span className="shrink-0 mx-4 opacity-40">·</span>
                  <span className="shrink-0">{service.sliderText}</span>
                  <span className="shrink-0 mx-4 opacity-40">·</span>
                  <span className="shrink-0">{service.sliderText}</span>
                  <span className="shrink-0 mx-4 opacity-40">·</span>
                  <span className="shrink-0">{service.sliderText}</span>
                  <span className="shrink-0 mx-4 opacity-40">·</span>
                </motion.div>
              </div>

              <div className="my-12 h-px bg-white/8" />
            </div>
          ))}

          {/* Request Quote CTA */}
          <div className="pt-8 w-full flex justify-start pl-8">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-1 pl-1"
            >
              {/* Arrow — hover pe left slide */}
                <span className="text-[#E21F26] transition-transform duration-300 ease-out group-hover:-translate-x-1">
                <Image
                  src="/icons/enter.svg"
                  alt="arrow-right"
                  width={32}
                  height={32}
                />
              </span>

              {/* ✅ group-hover use karo — inline style hataya */}
              <span className="mt-1 font-light text-white text-2xl transition-colors duration-200 group-hover:text-[#E21F26]">
                Inquire Now
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Main Export ===== */
export default function Services() {
  return (
    <section id="services" className="py-12 md:py-20 bg-black">
      <div className="w-[90%] lg:w-[80%] max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="text-2xl font-extrabold text-white mb-16 tracking-tight">
            <span className="text-5xl md:text-[6vw]">Services</span>
            <span className="text-[#0EC8C5] text-[5rem]">.</span>
          </h2>
        </AnimatedSection>

        <DesktopServices />
        <MobileServices />

        {/* Mobile CTA */}
        <div className="pt-8 lg:hidden">
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 transition-all duration-300 hover:gap-4"
          >
            <span className="text-[#E21F26] transition-transform duration-300 ease-out group-hover:-translate-x-2">
              <Image
                src="/icons/enter.svg"
                alt="arrow-right"
                width={24}
                height={24}
              />
            </span>
            <span className="text-sm font-semibold tracking-wide text-white transition-colors duration-200 group-hover:text-[#E21F26]">
              Request Quote
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
