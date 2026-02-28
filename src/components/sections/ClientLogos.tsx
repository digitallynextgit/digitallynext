"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";
import Link from "next/link";

interface ClientLogosProps {
    theme?: "dark" | "light";
}

export default function ClientLogos({ theme = "dark" }: ClientLogosProps) {
    const logoFiles = [
        "/home/client1.png", "/home/clinet2.png", "/home/client3.png", "/home/client4.png",
        "/home/client5.png", "/home/client6.png", "/home/client7.png", "/home/client8.png",
        "/home/client9.png", "/home/client10.png", "/home/client11.png", "/home/client12.png",
    ];

    const isDark = theme === "dark";

    const styles = {
        section: {
            background: isDark ? "#000000" : "#FFFFFF",
            borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
            borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
            padding: "80px 0",
            overflow: "hidden" as const,
        },
        heading: {
            color: isDark ? "#FFFFFF" : "#000000",
        },
        logoCard: {
            border: isDark ? "1px solid #fff" : "1px solid #000",
            background: isDark ? "transparent" : "transparent",
        },
        linkText: {
            color: isDark ? "#FFFFFF" : "#000000",
        },
    };

    return (
        <section style={styles.section}>
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
                            className="text-2xl lg:text-4xl lg:w-[65%] w-full"
                            style={styles.heading}
                        >
                            <strong className="text-2xl lg:text-4xl">Trusted</strong>{" "}
                            <span className="font-light">
                                by ambitious brands across industries and geographies.
                            </span>
                        </p>

                        <Link
                            href="/contact"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 24,
                                fontWeight: 500,
                                transition: "color 0.2s",
                                textDecoration: "none",
                            }}
                            className="group"
                        >
                            <span className="text-[#E21F26] transition-transform duration-300 ease-out group-hover:-translate-x-2">
                                <Image
                                    src="/icons/enter.svg"
                                    alt="arrow-right"
                                    width={32}
                                    height={32}
                                />
                            </span>
                            <span
                                style={styles.linkText}
                                className="mt-1 font-light hover:text-[#E21F26] transition-colors duration-200"
                            >
                                Work With Us
                            </span>
                        </Link>
                    </div>
                </AnimatedSection>
            </div>

            {/* Marquee */}
            <div style={{ overflow: "hidden", paddingTop: "1rem", paddingBottom: "1rem" }}>
                <div className="marquee-track">
                    {[...logoFiles, ...logoFiles, ...logoFiles, ...logoFiles].map((logo, i) => (
                        <div
                            key={i}
                            className="client-logo-card"
                            style={styles.logoCard}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "18px 22px",
                                    maxWidth: 200,
                                }}
                            >
                                <Image
                                    src={logo}
                                    alt="Client Logo"
                                    width={200}
                                    height={120}
                                    className="client-logo-img"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "contain",
                                        filter: isDark ? "brightness(1)" : "brightness(0.85) contrast(1.1)",
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
