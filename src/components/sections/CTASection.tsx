"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden w-screen -mx-[calc((100vw-100%)/2)] py-24 md:py-32"
      style={{ background: "#000000" }}
    >
      {/* Video background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            objectFit: "cover",
            width: "180%",
            height: "180%",
            minWidth: "100%",
            minHeight: "100%",
          }}
        >
          <source src="/videos/CTA video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 w-[95%] max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-8"
          // style={{ fontStyle: "italic" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Let&apos;s Build Something <br className="hidden md:block" />
          That <span className="text-cyan-400">Lasts.</span>
        </motion.h2>

        {/* Description */}
        <motion.div
          className="space-y-5 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm md:text-2xl text-white font-bold">
            We work best with teams that value structure, clarity, and long-term
            thinking.
          </p>
          <p className="text-sm md:text-2xl text-gray-300 leading-relaxed">
            If you&apos;re looking for shortcuts, quick hacks, or transactional
            execution, we may not be the right fit.
          </p>
          <p className="text-sm md:text-2xl text-gray-300 leading-relaxed">
            If you&apos;re building something meant to scale,{" "}
            <span className="font-bold text-white">let&apos;s talk.</span>
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="#contact"
            className="group relative inline-block px-8 py-4 text-white font-semibold text-sm tracking-widest uppercase bg-transparent transition-all duration-300 hover:text-black"
          >
            {/* Gradient border (default) — hidden on hover */}
            <span
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
              style={{
                background:
                  "linear-gradient(90deg, #0EC8C5 0%, #FFFFFF 50%, #E21F26 100%)",
                padding: "2px",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            {/* White border (hover) — hidden by default */}
            <span className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 border-2 border-white" />
            {/* Hover gradient fill */}
            <span
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, #0EC8C5 0%, #FFFFFF 50%, #E21F26 100%)",
              }}
            />
            <span className="relative z-10">GET IN TOUCH</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
