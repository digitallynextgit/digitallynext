"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSectionTheme } from "@/context/SectionThemeContext";

const awards = [
    { src: "/awards/a1.png", alt: "Award 1", width: 342, height: 69 },
    { src: "/awards/a2.png", alt: "Award 2", width: 313, height: 101 },
    { src: "/awards/a3.png", alt: "Award 3", width: 134, height: 101 },
];

// Max height per breakpoint per image (px)
const imageHeights: Record<number, { sm: number; md: number; lg: number }> = {
    0: { sm: 36, md: 52, lg: 69 },   // a1 — wide & short
    1: { sm: 52, md: 72, lg: 101 },  // a2 — tall
    2: { sm: 52, md: 72, lg: 101 },  // a3 — tall & narrow
};

interface AwardsAndRecognitionProps {
    theme?: "dark" | "light";
}

export default function AwardsAndRecognition({ theme }: AwardsAndRecognitionProps) {
    const { theme: contextTheme } = useSectionTheme();
    const isDark = (theme ?? contextTheme) === "dark";
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className={[
                "border-t border-b transition-colors duration-500",
                isDark ? "border-white/10" : "border-gray-200",
            ].join(" ")}
        >
            <section ref={sectionRef} className="py-10 md:py-16 lg:py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 md:px-12">

                    {/* Header */}
                    <div className="text-center mb-12 md:mb-16 lg:mb-[72px]">
                        <motion.h2
                            className={[
                                "font-extrabold tracking-tight leading-none transition-colors duration-500",
                                isDark ? "text-white" : "text-[#0A0A0A]",
                            ].join(" ")}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="text-4xl sm:text-5xl md:text-7xl lg:text-[80px]">
                                Awards &amp; Recognition
                            </span>
                            <span className="text-[#0EC8C5] text-4xl sm:text-5xl md:text-7xl lg:text-[80px]">
                                .
                            </span>
                        </motion.h2>
                    </div>

                    {/* Awards Row */}
                    <motion.div
                        className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 md:flex-nowrap md:justify-between md:gap-10 lg:gap-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.12, delayChildren: 0.2 },
                            },
                        }}
                    >
                        {awards.map((award, i) => {
                            const h = imageHeights[i];
                            return (
                                <motion.div
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                                        },
                                    }}
                                    className="flex items-center justify-center"
                                    // On mobile each award gets a sensible share of width
                                    style={{ flexBasis: "auto", minWidth: 0 }}
                                >
                                    <Image
                                        src={award.src}
                                        alt={award.alt}
                                        width={award.width}
                                        height={award.height}
                                        className="w-auto object-contain"
                                        style={{
                                            height: `clamp(${h.sm}px, ${(h.md / 768) * 100}vw, ${h.lg}px)`,
                                            maxWidth: "100%",
                                        }}
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>

                </div>
            </section>
        </div>
    );
}
