"use client";

import { clientLogos } from "@/data/content";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";
import Link from "next/link";


export default function ClientLogos() {
    const logoFiles = [
        "/logos/1.png", "/logos/3.png", "/logos/5.png", "/logos/7.png",
        "/logos/11.png", "/logos/13.png", "/logos/17.png", "/logos/19.png"
    ];
    // const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos];

    return (
        <section
            style={{
                background: "#000000",
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                padding: "80px 0",
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
                            className="text-2xl lg:text-4xl lg:w-[65%] w-full "
                        >
                            <strong className="text-2xl lg:text-4xl" >Trusted</strong>{" "}
                            <span className="font-light">by ambitious brands across industries and geographies.</span>
                        </p>
                        <Link
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
                            className="group"
                        >
                            <span
                                className="text-[#E21F26] transition-transform duration-300 ease-out group-hover:-translate-x-2"
                            >
                                <Image src="/icons/enter.svg" alt="arrow-right" width={32} height={32} />
                            </span>
                            <span className="mt-1 font-light text-white hover:text-[#E21F26]">Work With Us</span>
                        </Link>
                    </div>
                </AnimatedSection>
            </div>

            {/* Marquee */}
            <div style={{ overflow: "hidden", paddingTop: "1rem", paddingBottom: "1rem" }}>
                <div className="marquee-track ">
                    {/* Duplicate set of logos for infinite scroll */}
                    {[...logoFiles, ...logoFiles, ...logoFiles, ...logoFiles].map((logo, i) => (
                        <div
                            key={i}
                            className="client-logo-card border-2 border-white "
                        >
                            <div className=""
                                style={{ position: "relative", width: 160, height: 160 }}>
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
