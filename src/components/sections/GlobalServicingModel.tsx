"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

const frameworks = [
    {
        name: "C-Suite",
        description: "Leadership & decision-aligned engagement",
        cta: "Explore Framework",
        icon: <Image src="/global/g1.png" alt="C-Suite Icon" width={80} height={80} className="w-full h-full object-contain" />,
    },
    {
        name: "KASA",
        description: "Founder & leadership brand authority model",
        cta: "Explore Framework",
        icon: <Image src="/global/g2.png" alt="KASA Icon" width={80} height={80} className="w-full h-full object-contain" />,
    },
    {
        name: "Profit",
        description: "Plan-to-performance growth execution",
        cta: "Explore Framework",
        icon: <Image src="/global/g3.png" alt="Profit Icon" width={80} height={80} className="w-full h-full object-contain" />,
    },
    {
        name: "Communication & Governance",
        description: "Cadence · Ownership · Escalation",
        cta: "Explore Model",
        icon: <Image src="/global/g4.png" alt="Communication Icon" width={80} height={80} className="w-full h-full object-contain" />,
    },
    {
        name: "Delivery Models",
        description: "Satellite Office · Dedicated Pods · Build-Operate-Transfer",
        cta: "Explore Models",
        icon: <Image src="/global/g5.png" alt="Delivery Models Icon" width={80} height={80} className="w-full h-full object-contain" />,
    },
];

const CYCLE_INTERVAL = 4000;

export default function GlobalServicingModel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const next = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % frameworks.length);
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(next, CYCLE_INTERVAL);
        return () => clearInterval(timer);
    }, [isPaused, next]);

    const active = frameworks[activeIndex];

    return (
        <section className=" py-24 md:py-32">
            <div className=" max-w-6xl mx-auto">
                <div className="flex justify-between items-center flex-col">
                    {/* Heading */}
                    <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className=" font-extrabold text-white tracking-tight leading-none">
                            <span className="text-[#E53935] text-4xl md:text-6xl lg:text-7xl">Global</span> <span className="text-4xl md:text-6xl lg:text-7xl">Servicing Model</span><span className="text-[#E53935] text-4xl md:text-6xl lg:text-7xl">.</span>
                        </h2>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        className="text-sm md:text-base text-white/80 mb-16 md:mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-sm md:text-lg text-white/80 ">Structured frameworks. Predictable delivery. Global scale.</span>
                    </motion.p>
                </div>
                {/* Main content — two columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-20">

                    {/* LEFT — Static info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-10">
                            <span className="text-2xl md:text-5xl font-medium"> Our Operating<br />Frameworks</span>
                        </h3>
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-md">
                            <span className="text-sm md:text-lg text-white/80 ">All frameworks are powered by Modern DAD thinking and governed by the AI Decision & Acceleration Center.</span>
                        </p>
                    </motion.div>

                    {/* RIGHT — Auto-cycling card */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                className="bg-black  border border-white rounded-2xl p-8 md:p-10 backdrop-blur-sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Icon */}
                                <div className="mb-6 w-20 h-20 flex items-center justify-center rounded-xl bg-orange-500/10">
                                    {active.icon}
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                    {/* Title */}
                                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                                        {active.name}
                                    </h4>

                                    {/* CTA */}
                                    <Link
                                        href="#"
                                        className="inline-flex items-center gap-2 text-[#E53935] font-semibold text-sm mb-4 hover:gap-3 transition-all duration-300"
                                    >
                                        <span className="text-red-500">↳</span> <span className="text-white">{active.cta}</span>
                                    </Link>
                                </div>
                                {/* Description */}
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {active.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress dots */}
                        <div className="flex gap-2 mt-6 justify-center">
                            {frameworks.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i
                                        ? "w-8 bg-[#E53935]"
                                        : "w-3 bg-white/20 hover:bg-white/40"
                                        }`}
                                    aria-label={`Go to framework ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
