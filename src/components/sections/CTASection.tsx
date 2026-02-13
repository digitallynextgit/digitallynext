"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
    return (
        <section
            id="contact"
            className="section"
            style={{
                background: "var(--bg-primary)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background glow */}
            <div
                style={{
                    position: "absolute",
                    bottom: "-40%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    height: "100%",
                    background:
                        "radial-gradient(ellipse at center, rgba(229,57,53,0.06) 0%, transparent 60%)",
                    pointerEvents: "none",
                }}
            />

            <div
                className="container"
                style={{
                    position: "relative",
                    zIndex: 2,
                    textAlign: "center",
                }}
            >
                <AnimatedSection>
                    <h2
                        style={{
                            fontSize: "clamp(2.5rem, 7vw, 5rem)",
                            fontWeight: 800,
                            marginBottom: 24,
                            lineHeight: 1.1,
                        }}
                    >
                        Let&apos;s Build
                        <br />
                        <span className="gradient-text-red">Something</span>
                    </h2>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                    <p
                        style={{
                            fontSize: "clamp(1rem, 2vw, 1.2rem)",
                            color: "var(--text-secondary)",
                            maxWidth: 560,
                            margin: "0 auto 40px",
                            lineHeight: 1.7,
                        }}
                    >
                        Ready to transform your brand&apos;s digital presence? Let&apos;s talk
                        strategy, creativity, and results.
                    </p>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <div
                        style={{
                            display: "flex",
                            gap: 16,
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <a href="mailto:hello@digitallynext.com" className="btn-primary">
                            Get in Touch <ArrowRight size={16} />
                        </a>
                        <a href="tel:+919999999999" className="btn-outline">
                            Book a Call
                        </a>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.35}>
                    <p
                        style={{
                            fontSize: 13,
                            color: "var(--text-muted)",
                            marginTop: 32,
                        }}
                    >
                        Typically respond within 24 hours
                    </p>
                </AnimatedSection>
            </div>
        </section>
    );
}
