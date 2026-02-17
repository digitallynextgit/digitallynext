"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ===== Mobile ADAC ===== */
function MobileADAC() {
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
                    className="text-[18vw] font-black leading-[0.85] tracking-tighter -mt-24"
                    style={{
                        fontFamily: "Stack Sans Text",
                        WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
                        maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
                    }}
                >
                    <span className="text-red-500">ADAC</span>
                </h2>
                <p className="text-2xl font-bold text-black leading-tight mt-2">
                    AI Decision &<br />Acceleration Center
                </p>
            </motion.div>

            {/* Image */}
            <motion.div
                className="relative w-full rounded-xl overflow-hidden mb-8"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                <Image src="/adac.webp" alt="ADAC Hero" width={1920} height={1080} className="w-full object-contain" />
            </motion.div>

            {/* Content */}
            <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-3xl font-bold text-[#1a1a1a]">
                        How We Use AI
                    </h3>
                    <Link
                        href="#"
                        className="inline-flex items-center gap-2 text-red-500 font-semibold text-sm hover:gap-3 transition-all duration-300 shrink-0"
                    >
                        <span className="text-lg">↳</span> Read More
                    </Link>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    A dedicated function that governs how, where,
                    and why AI is applied across our digital work.
                </p>

                {/* Quote Box */}
                <div className="border border-gray-800 rounded-lg px-5 py-4 mb-8">
                    <p className="text-lg text-gray-600 leading-relaxed text-center">
                        Not all work needs <span className="font-normal">AI.</span>{" "}
                        <span className="font-bold bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent">
                            Some need judgment. ADAC decides the difference.
                        </span>
                    </p>
                </div>

                {/* Bottom Statement */}
                <p className="text-sm text-[#1a1a1a] font-semibold leading-relaxed text-center">
                    <span className="font-bold">ADAC</span> ensures AI accelerates speed, quality, scale, and insight — without
                    replacing human accountability or creative ownership.
                </p>
            </motion.div>
        </div>
    );
}

/* ===== Desktop ADAC (unchanged) ===== */
function DesktopADAC() {
    return (
        <div className="hidden lg:block">
            {/* Header */}
            <motion.div
                className="mb-12 md:mb-16"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                    <h2 className="-mt-24"
                        style={{
                            fontSize: "clamp(2rem, 14vw, 14rem)",
                            fontFamily: "Stack Sans Text",
                            fontWeight: 900,
                            letterSpacing: "-0.04em",
                            lineHeight: 0.95,
                            WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
                            maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
                        }}
                    >
                        <span className="text-red-500 ">ADAC</span>
                    </h2>
                    <p className="text-xl md:text-2xl lg:text-5xl font-bold text-black leading-tight -translate-y-8">
                        AI Decision &<br />Acceleration Center
                    </p>
                </div>
            </motion.div>

            {/* AI Image */}
            <motion.div
                className="relative w-full rounded-2xl overflow-hidden mb-12 md:mb-16"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <Image src="/adac.webp" alt="ADAC Hero" width={1920} height={1080} className="w-full object-contain" />
            </motion.div>

            {/* Content */}
            <motion.div
                className="mt-8 md:mt-12 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* How We Use AI + Read More */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a]">
                        <span className="text-5xl">How We Use AI</span>
                    </h3>
                    <Link
                        href="#"
                        className="inline-flex items-center gap-2 text-red-500 font-semibold text-sm md:text-base hover:gap-3 transition-all duration-300 shrink-0"
                    >
                        <span className="text-lg">↳</span> Read More
                    </Link>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-3xl">
                    A dedicated function that governs how, where,
                    and why AI is applied across our digital work.
                </p>

                {/* Quote Box */}
                <div className="border border-gray-800 rounded-lg px-6 py-5 my-10">
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed text-center">
                        <span className="text-2xl">
                            Not all work needs <span className="font-normal">AI.</span>{" "}
                            <span className="font-bold bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent">
                                Some need judgment. ADAC decides the difference.
                            </span>
                        </span>
                    </p>
                </div>

                {/* Bottom Statement */}
                <p className="text-sm md:text-xl text-[#1a1a1a] font-semibold leading-relaxed text-center max-w-5xl mx-auto">
                    <span className="font-bold">ADAC</span> ensures AI accelerates speed, quality, scale, and insight — without
                    replacing human accountability or creative ownership.
                </p>
            </motion.div>
        </div>
    );
}

/* ===== Main Export ===== */
export default function ADAC() {
    return (
        <section className="bg-white py-24 md:py-32 overflow-hidden">
            <div className="w-[90%] lg:w-[85%] max-w-6xl mx-auto">
                <DesktopADAC />
                <MobileADAC />
            </div>
        </section>
    );
}
