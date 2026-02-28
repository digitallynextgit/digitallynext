"use client";

import { motion } from "framer-motion";

/* ===== Shared mask style ===== */
const fadeBottomMask = {
  WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
  maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
};

const mobileFadeBottomMask = {
  WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
  maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
};

/* ===== Mobile SADAC ===== */
function MobileSADAC() {
  return (
    <div className="lg:hidden">
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
        <p className="text-2xl font-bold text-black leading-tight mt-2">
          AI Decision &<br />
          Acceleration Center
        </p>
      </motion.div>

      {/* Image with gradient overlay */}
      <motion.div
        className="relative w-full rounded overflow-hidden mb-8 aspect-[4/2.8]"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/images/ADAC Visual Draft.png"
          alt="ADAC Visual"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="mt-6 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* How decisions are governed */}
        <div className="text-center space-y-3">
          <h3 className="text-xl font-normal text-black">
            How decisions are governed
          </h3>
          <p className="text-sm text-[#787878] leading-relaxed">
            ADAC is a dedicated internal function that governs AI usage across all work.
          </p>
        </div>

        {/* It exists to */}
        <div>
          <h3 className="text-xl font-normal text-black mb-4">It exists to:</h3>
          <ul className="flex flex-col gap-3 text-sm text-[#787878] leading-relaxed list-none">
            {[
              "Define where AI should and should not be applied",
              "Set clear boundaries between AI assistance and human ownership",
              "Document decision logic, not just outcomes",
              "Measure whether AI is accelerating the right thing",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#787878] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ADAC ensures box */}
        <div className="bg-[#FBFBFA] p-6">
          <h3 className="text-xl font-bold text-[#0EC8C5] mb-4">ADAC ensures:</h3>
          <ul className="flex flex-col gap-3 text-sm text-[#787878] leading-relaxed list-none">
            {[
              "Speed without recklessness",
              "Scale without sameness",
              "Intelligence without abdication",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#0EC8C5] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </motion.div>
    </div>
  );
}

/* ===== Desktop SADAC ===== */
function DesktopSADAC() {
  return (
    <div className="hidden lg:block">
      {/* Header — centered row */}
      <motion.div
        className="flex flex-row items-center justify-center gap-12 xl:gap-14 mb-14"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          className="-mt-24 text-[clamp(2rem,14vw,14rem)] font-black leading-[0.95] tracking-[-0.04em] text-red-500"
          style={fadeBottomMask}
        >
          ADAC
        </h2>
        <p className="text-3xl xl:text-[4rem] font-bold text-black leading-tight">
          AI Decision &<br />
          Acceleration Center
        </p>
      </motion.div>

      {/* Image with gradient overlay — full bleed */}
      <motion.div
        className="relative w-full rounded overflow-hidden mb-8 aspect-[4/2.8]"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute -top-[4px] -left-[4px] -right-[4px] -bottom-[12px] w-[calc(100%+8px)] h-[calc(100%+16px)] object-cover object-top mt-[5px]"
        >
          <source src="/videos/ADAC Video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Content block — max-w matches Figma 1165px */}
      <motion.div
        className="max-w-[1165px] mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* How decisions are governed — centered */}
        <div className="text-center mb-14 space-y-5">
          <h3 className="text-[2.5rem] leading-[1.3] font-normal text-black">
            How decisions are governed
          </h3>
          <p className="text-2xl text-[#787878] leading-relaxed">
            ADAC is a dedicated internal function that governs AI usage across all work.
          </p>
        </div>

        {/* Two columns — gap 120px per Figma */}
        <div className="flex flex-row justify-between" style={{ gap: "120px" }}>
          {/* Left: It exists to */}
          <div className="flex-1 flex flex-col gap-10">
            <h3 className="text-[2.5rem] leading-[1.3] font-normal text-black">
              It exists to:
            </h3>
            <ul className="flex flex-col gap-4 text-lg text-[#787878] leading-relaxed list-none"> {/* text-2xl → text-lg */}
              {[
                "Define where AI should and should not be applied",
                "Set clear boundaries between AI assistance and human ownership",
                "Document decision logic, not just outcomes",
                "Measure whether AI is accelerating the right thing",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-[#787878] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: ADAC ensures box */}
          <div
            className="flex-1 flex flex-col gap-10 self-start"
            style={{ background: "#FBFBFA", padding: "32px" }}
          >
            <h3 className="text-[2.5rem] leading-[1.3] font-bold text-[#0EC8C5]">
              ADAC ensures:
            </h3>
            <ul className="flex flex-col gap-4 text-lg text-[#787878] leading-relaxed list-none"> {/* text-2xl → text-lg */}
              {[
                "Speed without recklessness",
                "Scale without sameness",
                "Intelligence without abdication",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-[#0EC8C5] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

/* ===== Main Export ===== */
export default function SADAC() {
  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="w-[90%] lg:w-[85%] max-w-6xl mx-auto">
        <DesktopSADAC />
        <MobileSADAC />
      </div>
    </section>
  );
}
