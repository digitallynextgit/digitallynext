"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className={[
        "sticky top-0 z-0 overflow-hidden",
        "flex items-center md:items-end",
        "py-10 md:pt-16 lg:pt-20",
      ].join(" ")}
      style={{ height: "clamp(600px, 100vh, 1500px)" }}
    >
      {/* Background image + gradient overlay */}
      <div className={[
        "absolute inset-0 z-0",
        "after:content-[''] after:absolute after:inset-0 after:z-1",
        "after:bg-linear-to-b after:from-black/10 after:via-black/30 after:to-black/65",
      ].join(" ")}>
        <Image
          src="/banner/b1.webp"
          alt="Hero"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-2 px-6 md:px-12 w-full max-w-[1280px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p
            style={{ fontSize: "clamp(3.1rem, 2.5vw, 1.35rem)" }}
            className="font-medium text-white mb-2 tracking-[0.02em] leading-[1.3] md:leading-normal"
          >
            WE DON&apos;T JUST BUILD
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mix-blend-difference"
        >
          <h1 className="text-[14vw] lg:text-[9.5vw] font-bold text-white mb-6 uppercase">
            CAMPAIGNS<span className="text-[#0EC8C5]">.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p
            style={{ fontSize: "clamp(1.95rem, 2vw, 1.2rem)" }}
            className="text-white/85 mb-10 font-light"
          >
            We build what tomorrow will{" "}
            <strong className="text-white font-black">remember.</strong>
          </p>
        </motion.div>

        <Link
          href="/contact"
          className={[
            "inline-flex items-center gap-2 py-4 px-9",
            "bg-[rgba(0,255,255,0.826)] text-red-500 text-[1.2rem]",
            "font-normal tracking-[0.12em] uppercase rounded-none cursor-pointer",
            "relative overflow-hidden",
            "transition-all duration-200 ease-in-out",
            "hover:bg-[#00e6bf] hover:-translate-y-0.5",
            "hover:shadow-[0_8px_32px_rgba(0,201,167,0.3)]",
          ].join(" ")}
        >
          GET IN TOUCH
        </Link>
      </div>
    </section>
  );
}
