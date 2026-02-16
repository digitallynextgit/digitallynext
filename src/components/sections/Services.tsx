"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/content";
import AnimatedSection from "@/components/ui/AnimatedSection";

const serviceMedia = [
    "/services/s1.mp4",
    "/services/s2.mp4",
    "/services/s3.mp4",
    "/services/s4.mp4",
    "/services/s6.mp4",
];

const serviceSliderTexts = [
    "Brand & digital strategy · Positioning & GTM · Personal & founder branding · Community strategy · Podcast strategy & narrative design · Market & audience research",
    "Content strategy · Video & visual production · Podcast production",
    "SEO & organic growth · Paid media & optimisation · Influencer marketing",
    "Websites & landing experiences · UX & conversion design",
    "Websites & landing experiences · UX & conversion design",
];

function InfiniteSlider({ text }: { text: string }) {
    return (
        <div className="overflow-hidden whitespace-nowrap mt-2"
            style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            }}
        >
            <motion.div
                className="inline-flex text-sm text-white/40 font-medium"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
                <span className="shrink-0">{text}</span>
                <span className="shrink-0 mx-3 opacity-40">·</span>
                <span className="shrink-0">{text}</span>
                <span className="shrink-0 mx-3 opacity-40">·</span>
                <span className="shrink-0">{text}</span>
                <span className="shrink-0 mx-3 opacity-40">·</span>
                <span className="shrink-0">{text}</span>
                <span className="shrink-0 mx-3 opacity-40">·</span>
            </motion.div>
        </div>
    );
}

export default function Services() {
    const [activeIndex, setActiveIndex] = useState(0);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        itemRefs.current.forEach((ref, index) => {
            if (!ref) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveIndex(index);
                    }
                },
                {
                    root: null,
                    rootMargin: "-35% 0px -60% 0px",
                    threshold: 0,
                }
            );

            observer.observe(ref);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <section id="services" className="py-28">
            <div className="w-[80%] max-w-7xl mx-auto">
                {/* Heading */}

                <h2 className="text-2xl font-extrabold text-white mb-16 tracking-tight">
                    <span className="text-5xl md:text-[6vw]">Services</span><span className="text-[#0EC8C5]">.</span>
                </h2>


                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[38%_1fr] gap-12 lg:gap-2 mt-20">

                    {/* LEFT — Sticky media */}
                    <div className="relative">
                        <div
                            className="lg:sticky lg:top-32 w-full max-w-[320px]"
                            style={{ position: "-webkit-sticky" } as React.CSSProperties}
                        >
                            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[var(--bg-surface)] border border-white/10 shadow-2xl">
                                <AnimatePresence mode="popLayout">
                                    <motion.video
                                        key={activeIndex}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        <source
                                            src={serviceMedia[activeIndex]}
                                            type="video/mp4"
                                        />
                                    </motion.video>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Scrollable service items */}
                    <div className="flex flex-col overflow-hidden">
                        {services.map((service, i) => (
                            <div
                                key={service.id}
                                ref={(el) => { itemRefs.current[i] = el; }}
                                className={`py-32 transition-all duration-500`}
                            >
                                <h3 className={`text-3xl md:text-7xl font-bold leading-tight mb-6 tracking-tight transition-colors duration-500
                                    ${activeIndex === i ? "text-[#E53935]" :
                                        activeIndex + 1 === i ? "text-white" : "text-white/20"
                                    }`}>
                                    <span className="text-3xl md:text-7xl">{service.title}</span>
                                </h3>

                                {/* Slider with gray bg and blend */}
                                <div className="bg-white/5 rounded-lg py-3 overflow-hidden whitespace-nowrap mt-4"
                                    style={{
                                        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                                        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                                    }}
                                >
                                    <motion.div
                                        className="inline-flex text-lg text-white/60 font-medium"
                                        animate={{ x: ["0%", "-50%"] }}
                                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                    >
                                        <span className="shrink-0">{serviceSliderTexts[i]}</span>
                                        <span className="shrink-0 mx-4 opacity-40">·</span>
                                        <span className="shrink-0">{serviceSliderTexts[i]}</span>
                                        <span className="shrink-0 mx-4 opacity-40">·</span>
                                        <span className="shrink-0">{serviceSliderTexts[i]}</span>
                                        <span className="shrink-0 mx-4 opacity-40">·</span>
                                        <span className="shrink-0">{serviceSliderTexts[i]}</span>
                                        <span className="shrink-0 mx-4 opacity-40">·</span>
                                    </motion.div>
                                </div>

                                <div className="mt-12 h-px bg-white/8" />
                            </div>
                        ))}

                        {/* Request Quote CTA */}
                        <div className="pt-8">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-all duration-300 hover:gap-4"
                                style={{ color: "var(--accent)" }}
                            >
                                <span>↳</span> Request Quote
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
