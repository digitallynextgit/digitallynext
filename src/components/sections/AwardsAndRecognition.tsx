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
            <section
                ref={sectionRef}
                className="py-10 md:py-16 lg:py-20 overflow-hidden"
            >
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
                        className="flex flex-nowrap items-center justify-between gap-6 md:gap-10 lg:gap-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
                        }}
                    >
                        {awards.map((award, i) => (
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
                                className="flex items-center justify-center shrink-0"
                            >
                                <Image
                                    src={award.src}
                                    alt={award.alt}
                                    width={award.width}
                                    height={award.height}
                                    className="object-contain w-auto"
                                    style={{
                                        height: `clamp(${Math.round(award.height * 0.5)}px, ${Math.round(award.height * 0.06)}vw, ${award.height}px)`,
                                    }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </section>
        </div>
    );
}
