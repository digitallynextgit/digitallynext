"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
    return (
        <section
            id="contact"
            className="relative overflow-hidden py-24 md:py-32"
            style={{ background: "var(--bg-primary)" }}
        >
            {/* Gradient blob background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <Image
                    src="/news.webp"
                    alt="CTA Background"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="relative z-10 w-[85%] max-w-3xl mx-auto text-center">
                {/* Heading */}
                <motion.h2
                    className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-8"
                    // style={{ fontStyle: "italic" }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    Let&apos;s Build Something{" "}
                    <br className="hidden md:block" />
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
                    <p className="text-sm md:text-base text-white font-bold">
                        We work best with teams that value structure, clarity, and long-term thinking.
                    </p>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                        If you&apos;re looking for shortcuts, quick hacks, or transactional execution, we may
                        not be the right fit.
                    </p>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                        If you&apos;re building something meant to scale, <span className="font-bold text-white">let&apos;s talk.</span>
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
                        className="inline-block border border-[#E53935] text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#E53935] transition-all duration-300"
                    >
                        GET IN TOUCH
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
