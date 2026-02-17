"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const INSTAGRAM_REELS = [
    {
        id: "reel1",
        embedUrl: "https://www.instagram.com/reel/DUxx0CeEm1V/embed",
        title: "Team Culture Reel",
    },
    {
        id: "reel2",
        embedUrl: "https://www.instagram.com/reel/DHvsqYGhjU3/embed",
        title: "Behind the Scenes",
    },
    {
        id: "reel3",
        embedUrl: "https://www.instagram.com/reel/DT5KMCUEmYg/embed",
        title: "Our Work Process",
    },
    {
        id: "reel4",
        embedUrl: "https://www.instagram.com/reel/DUsQ4aNkmla/embed",
        title: "Our Work Process",
    },
    {
        id: "reel5",
        embedUrl: "https://www.instagram.com/reel/DTkIEw9Emsq/embed",
        title: "Our Work Process",
    },
    {
        id: "reel6",
        embedUrl: "https://www.instagram.com/reel/DTze5OUEsBR/embed",
        title: "Our Work Process",
    },
];

const cardVariants = {
    hidden: (i: number) => ({
        opacity: 0,
        y: 60,
        scale: 0.92,
        rotateY: i % 2 === 0 ? -8 : 8,
    }),
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        transition: {
            duration: 0.7,
            delay: i * 0.15,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function InstagramReels() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        const cardWidth = scrollRef.current.querySelector(".reel-card")?.clientWidth ?? 300;
        const gap = 24;
        const scrollAmount = cardWidth + gap;
        scrollRef.current.scrollBy({
            left: dir === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <section className="py-24 md:py-32 overflow-hidden" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <motion.h2
                        className="font-extrabold text-white tracking-tight leading-none mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-4xl md:text-6xl lg:text-7xl">People & Culture</span>
                        <span className="text-[#E53935] text-4xl md:text-6xl lg:text-7xl">.</span>
                    </motion.h2>

                    <motion.p
                        className="text-lg md:text-xl font-semibold text-white mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        The People Behind the Work
                    </motion.p>

                    <motion.p
                        className="text-sm md:text-base text-white/70 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Digitally Next is built by multidisciplinary teams who value clarity, collaboration, and accountability.
                    </motion.p>
                </div>

                {/* Navigation arrows */}
                <div className="flex justify-end gap-3 mb-6">
                    <button
                        onClick={() => scroll("left")}
                        className="w-11 h-11 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-[#E53935] hover:bg-[#E53935]/10 transition-all duration-300 group"
                        aria-label="Scroll left"
                    >
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="w-11 h-11 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-[#E53935] hover:bg-[#E53935]/10 transition-all duration-300 group"
                        aria-label="Scroll right"
                    >
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Reels carousel — full-width with edge-to-edge scroll */}
            <div
                ref={scrollRef}
                className="flex gap-6 px-6 md:px-12 overflow-x-auto pb-4"
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    scrollSnapType: "x mandatory",
                }}
            >
                <style>{`
                    .reels-scroll-container::-webkit-scrollbar { display: none; }
                `}</style>
                {INSTAGRAM_REELS.map((reel, index) => (
                    <motion.div
                        key={reel.id}
                        className="reel-card flex-shrink-0"
                        custom={index}
                        // variants={cardVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        style={{
                            width: "calc(25% - 18px)",
                            minWidth: "240px",
                            scrollSnapAlign: "start",
                            perspective: "1000px",
                        }}
                    >
                        <div
                            className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a] hover:border-white/25 transition-all duration-500 hover:shadow-[0_0_40px_rgba(229,57,53,0.15)]"
                            style={{ aspectRatio: "9 / 16" }}
                        >
                            <iframe
                                src={reel.embedUrl}
                                className="absolute inset-0 w-full h-full"
                                allowFullScreen
                                loading="lazy"
                                title={reel.title}
                                style={{ border: "none" }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Instagram CTA */}
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <motion.div
                    className="text-center mt-12 md:mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link
                        href="https://www.instagram.com/digitallynext/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 text-white font-semibold text-sm tracking-wide hover:border-[#E53935] hover:text-[#E53935] transition-all duration-300 group"
                    >
                        <svg
                            className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        Follow us on Instagram
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
