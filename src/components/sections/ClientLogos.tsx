"use client";

import { clientLogos } from "@/data/content";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";


export default function ClientLogos() {
    const logoFiles = [
        "/logos/1.png", "/logos/3.png", "/logos/5.png", "/logos/7.png", "/logos/9.png",
        "/logos/11.png", "/logos/13.png", "/logos/15.png", "/logos/17.png", "/logos/19.png"
    ];
    // const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos];

    return (
        <section
            style={{
                background: "var(--bg-secondary)",
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                padding: "48px 0",
                overflow: "hidden",
            }}
        >
            <div className="container">
                <AnimatedSection>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 32,
                            flexWrap: "wrap",
                            gap: 16,
                        }}
                    >
                        <p
                            style={{
                                fontSize: "clamp(2.15rem, 2vw, 8rem)",
                                color: "var(--text-secondary)",
                                maxWidth: 620,
                                // fontStyle: "italic",
                            }}
                        >
                            <strong style={{ color: "var(--text-primary)" }}>Trusted</strong>{" "}
                            by ambitious brands across industries and geographies.
                        </p>
                        <a
                            href="#contact"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                color: "var(--text-secondary)",
                                fontSize: 24,
                                fontWeight: 500,
                                transition: "color 0.2s",
                            }}
                        >
                            <span className="text-red-500 "><Image src="/icons/enter.svg" alt="arrow-right" width={40} height={40} /></span> Work With Us
                        </a>
                    </div>
                </AnimatedSection>
            </div>

            {/* Marquee */}
            <div style={{ overflow: "hidden" }}>
                <div className="marquee-track">
                    {/* Duplicate set of logos for infinite scroll */}
                    {[...logoFiles, ...logoFiles, ...logoFiles, ...logoFiles].map((logo, i) => (
                        <div
                            key={i}
                            className="client-logo-card"
                        >
                            <div style={{ position: "relative", width: 140, height: 140 }}>
                                <Image
                                    src={logo}
                                    alt="Client Logo"
                                    fill
                                    className="client-logo-img"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
