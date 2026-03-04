"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSectionTheme } from "@/context/SectionThemeContext";

const fadeBottomMask = {
  WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
  maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
};

const mobileFadeBottomMask = {
  WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
  maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
};

interface ADACProps {
  theme?: "dark" | "light";
}

/* ===== Mobile ADAC ===== */
function MobileADAC({ isDark }: { isDark: boolean }) {
  return (
    <div className="sm:hidden">

      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          className="text-[18vw] font-black leading-[0.85] tracking-tighter -mt-14 text-red-500"
          style={mobileFadeBottomMask}
        >
          ADAC
        </h2>
        <p
          className={[
            "text-3xl font-bold leading-tight mt-2 transition-colors duration-500",
            isDark ? "text-white" : "text-black",
          ].join(" ")}
        >
          AI Decision &<br />
          Acceleration Center
        </p>
      </motion.div>

      {/* Video */}
      <motion.div
        className="relative w-full overflow-hidden -mt-4 mb-8 aspect-[4/2.8]"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          autoPlay loop muted playsInline
          className="absolute -left-1 -right-1 -bottom-3 w-[calc(100%+8px)] h-[calc(100%+16px)] object-cover object-top"
        >
          <source src="/videos/ADAC Video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Content */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-start gap-4 justify-between mb-4">
          <h3
            className={[
              "text-3xl font-bold transition-colors duration-500",
              isDark ? "text-white" : "text-[#1a1a1a]",
            ].join(" ")}
          >
            How We Use AI
          </h3>
          <p
            className={[
              "text-sm leading-relaxed transition-colors duration-500",
              isDark ? "text-white/50" : "text-gray-500",
            ].join(" ")}
          >
            A dedicated function that governs how, where, and why AI is applied
            across our digital work.
          </p>
          <Link
            href="#"
            className={[
              "group inline-flex items-center gap-2 font-normal text-lg",
              "hover:gap-3 transition-all duration-300 shrink-0 no-underline mb-6",
              isDark ? "text-white" : "text-black",
            ].join(" ")}
          >
            <Image src="/icons/enter.svg" alt="arrow-right" width={24} height={24} />
            <span className="mt-1 transition-colors duration-200 group-hover:text-[#E21F26]">
              Read More
            </span>
          </Link>
        </div>

        {/* Quote Box */}
        <div
          className={[
            "border px-5 py-4 mb-8 transition-colors duration-500",
            isDark ? "border-white/20" : "border-gray-800",
          ].join(" ")}
        >
          <p
            className={[
              "text-lg leading-relaxed text-center transition-colors duration-500",
              isDark ? "text-white/50" : "text-gray-600",
            ].join(" ")}
          >
            Not all work needs <span className="font-normal">AI.</span>{" "}
            <span
              className="font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(to right, #ffffff, #E53935)"
                  : "linear-gradient(to right, #000000, #E53935)",
              }}
            >
              Some need judgment. ADAC decides the difference.
            </span>
          </p>
        </div>

        {/* Bottom Statement */}
        <p
          className={[
            "text-sm font-semibold leading-relaxed text-center transition-colors duration-500",
            isDark ? "text-white/80" : "text-[#1a1a1a]",
          ].join(" ")}
        >
          <span className="font-bold">ADAC</span> ensures AI accelerates speed,
          quality, scale, and insight — without replacing human accountability
          or creative ownership.
        </p>
      </motion.div>
    </div>
  );
}

/* ===== Desktop ADAC ===== */
function DesktopADAC({ isDark }: { isDark: boolean }) {
  return (
    <div className="hidden sm:block">

      {/* Header */}
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <h2
            className="-mt-24 text-[clamp(2rem,17vw,17rem)] font-black leading-[0.95] tracking-[-0.04em] text-red-500"
            style={fadeBottomMask}
          >
            ADAC
          </h2>
          <p
            className={[
              "text-[25px] md:text-3xl lg:text-4xl xl:text-[55px] font-bold leading-tight -translate-y-8",
              "transition-colors duration-500",
              isDark ? "text-white" : "text-black",
            ].join(" ")}
          >
            AI Decision &<br />
            Acceleration Center
          </p>
        </div>
      </motion.div>

      {/* Video */}
      <motion.div
        className="relative w-full overflow-hidden mb-12 sm:mb-16 aspect-4/3"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/ADAC Video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Content */}
      <motion.div
        className="mt-8 sm:mt-12 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* How We Use AI + Read More */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col gap-4">
            <h3
              className={[
                "text-5xl font-bold transition-colors duration-500",
                isDark ? "text-white" : "text-[#1a1a1a]",
              ].join(" ")}
            >
              How We Use AI
            </h3>
            <p
              className={[
                "text-xl leading-relaxed max-w-xl transition-colors duration-500",
                isDark ? "text-white/50" : "text-gray-500",
              ].join(" ")}
            >
              A dedicated function that governs how, where, and why AI is applied
              across our digital work.
            </p>
          </div>
          <Link
            href="/services/ai-enablement"
            className={[
              "group inline-flex items-center gap-2 font-normal text-2xl",
              "hover:gap-3 transition-all duration-300 shrink-0 no-underline",
              isDark ? "text-white" : "text-black",
            ].join(" ")}
          >
            <Image src="/icons/enter.svg" alt="arrow-right" width={30} height={30} />
            <span className="mt-1 transition-colors duration-200 group-hover:text-[#E21F26]">
              Read More
            </span>
          </Link>
        </div>

        {/* Quote Box */}
        <div
          className={[
            "border px-6 py-5 my-10 transition-colors duration-500",
            isDark ? "border-white/20" : "border-gray-800",
          ].join(" ")}
        >
          <p
            className={[
              "text-2xl leading-relaxed text-center transition-colors duration-500",
              isDark ? "text-white/50" : "text-gray-600",
            ].join(" ")}
          >
            Not all work needs <span className="font-normal">AI.</span>{" "}
            <span
              className="font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(to right, #ffffff, #E53935)"
                  : "linear-gradient(to right, #000000, #E53935)",
              }}
            >
              Some need judgment. ADAC decides the difference.
            </span>
          </p>
        </div>

        {/* Bottom Statement */}
        <p
          className={[
            "text-2xl font-normal leading-relaxed text-center max-w-5xl mx-auto",
            "transition-colors duration-500",
            isDark ? "text-white/80" : "text-[#1a1a1a]",
          ].join(" ")}
        >
          <span className="font-bold">ADAC</span> ensures AI accelerates speed,
          quality, scale, and insight — without replacing human accountability
          or creative ownership.
        </p>
      </motion.div>
    </div>
  );
}

/* ===== Main Export ===== */
export default function ADAC({ theme }: ADACProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  return (
    <section className="pt-20 pb-10 sm:py-20 overflow-hidden">
      <div className="w-[90%] max-w-7xl mx-auto">
        <DesktopADAC isDark={isDark} />
        <MobileADAC isDark={isDark} />
      </div>
    </section>
  );
}
