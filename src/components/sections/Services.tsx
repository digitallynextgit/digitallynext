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

export default function Services() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        sectionRefs.current.forEach((ref, index) => {
            if (!ref) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveIndex(index);
                        }
                    });
                },
                {
                    threshold: 0.4,
                    rootMargin: "-20% 0px -20% 0px",
                }
            );

            observer.observe(ref);
            observers.push(observer);
        });

        return () => observers.forEach((obs) => obs.disconnect());
    }, []);

    return (
        <section id="services" className="section services-section">
            <div className="container">
                {/* Section heading */}
                <AnimatedSection>
                    <h2 className="services-heading">
                        Services<span style={{ color: "var(--accent)" }}>.</span>
                    </h2>
                </AnimatedSection>

                {/* Two-column layout */}
                <div className="services-grid" ref={containerRef}>
                    {/* Left — Sticky Media */}
                    <div className="services-media-col ">
                        <div className="services-media-sticky">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    className="services-media-wrapper"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        key={serviceMedia[activeIndex]}
                                        className="services-media-video"
                                    >
                                        <source
                                            src={serviceMedia[activeIndex]}
                                            type="video/mp4"
                                        />
                                    </video>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right — Scrollable Service Items */}
                    <div className="services-items-col">
                        {services.map((service, i) => (
                            <div
                                key={service.id}
                                ref={(el) => {
                                    sectionRefs.current[i] = el;
                                }}
                                className={`services-item ${activeIndex === i ? "services-item-active" : ""}`}
                            >
                                <div className="services-item-inner">
                                    <h3 className="services-item-title ">
                                        {service.highlight ? (
                                            <>
                                                {service.title.replace(service.highlight, "")}{" "}
                                                <span className="services-item-highlight">
                                                    {service.highlight}
                                                </span>
                                            </>
                                        ) : (
                                            service.title
                                        )}
                                    </h3>
                                    <p className="services-item-subtitle">
                                        {service.subtitle}
                                    </p>
                                </div>
                                <div className="services-item-divider" />
                            </div>
                        ))}

                        {/* Request Quote CTA */}
                        <div className="services-cta">
                            <a href="#contact" className="services-cta-link">
                                <span className="services-cta-arrow">↳</span> Request Quote
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
