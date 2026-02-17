"use client";

import { dadPillars } from "@/data/content";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";

export default function HowWeOperate() {
    return (
        <section
            id="how-we-operate"
            className="section section-light flex justify-center"
        >
            <div className="max-w-7xl text-center justify-center" style={{ textAlign: "center" }}>
                {/* Modern DAD heading */}
                <AnimatedSection>
                    <h2 className="mt-[-40px] sm:mt-[-100px]"
                        style={{
                            fontSize: "clamp(2rem, 14vw, 14rem)",
                            fontFamily: "Stack Sans Text",
                            fontWeight: 900,
                            letterSpacing: "-0.04em",
                            lineHeight: 0.95,
                            marginBottom: 48,
                            // marginTop: -100,
                            WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
                            maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
                        }}
                    >
                        <span className="text-modern ">Modern</span>{" "}
                        <span className="text-dad-red ">DAD</span>
                    </h2>
                </AnimatedSection>

                <AnimatedSection delay={0.5}>
                    <h3
                        style={{
                            fontSize: "clamp(1.25rem, 5vw, 10rem)",
                            fontWeight: 800,
                            marginBottom: 8,
                            color: "#1a1a1a",
                        }}
                    >
                        HOW WE OPERATE<span style={{ color: "#e53935" }}>.</span>
                    </h3>
                    <p className="lg:text-2xl font-medium text-[#787878] mb-10"
                        
                    >
                        An operating model where
                    </p>
                </AnimatedSection>

                {/* Three pillars */}
                <div className="flex flex-col lg:flex-row justify-center gap-8 mb-20"
                    style={{
                        // display: "grid",
                        // gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        // gap: 48,
                        // marginBottom: 64,
                        // maxWidth: 900,
                        // margin: "0 auto 64px",
                    }}
                >
                    {dadPillars.map((pillar, i) => (
                        <AnimatedSection key={pillar.word} delay={0.15 + i * 0.1}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 10,
                                }}
                            >
                                {/* Animated Video Icon */}
                                <div
                                    className="pillar-icon "
                                    style={{
                                        // background: "#", 
                                        // boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <Image
                                        src={
                                            i === 0
                                                ? "/icons/dad1.webp"
                                                : i === 1
                                                    ? "/icons/dad2.webp"
                                                    : "/icons/dad3.webp"
                                        }
                                        alt="Dad"
                                        fill
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: 16,
                                        }}
                                    />
                                </div>

                                <div className="w-full ">
                                    <p className="text-2xl font-semibold"
                                        
                                    >
                                        <span className="lg:text-[2vw] text-[5vw]" style={{ color: "#e53935", fontWeight: 700 }}>
                                            {pillar.word}
                                        </span>{" "}
                                        <span className="lg:text-[2vw] text-[5vw]" style={{ color: "#1a1a1a" }}>
                                            {pillar.tagline}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Tagline bar */}
                <AnimatedSection delay={0.5}>
                    <div className="px-4">
                    <div className="border border-2 lg:w-[60%] p-4 w-full mx-auto">
                       <span className="font-semibold bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent text-2xl ">
                            Decide with data.{" "}
                            <strong>Move with intelligence.</strong>{" "}
                            <strong >
                                Build digitally.
                            </strong>
                        </span>
                    </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
