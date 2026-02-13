"use client";

import { philosophy } from "@/data/content";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function PeopleCulture() {
    return (
        <section
            className="section"
            style={{ background: "var(--bg-primary)" }}
        >
            <div className="container">
                <AnimatedSection>
                    <h2 style={{ marginBottom: 48 }}>
                        People &amp; Culture<span style={{ color: "var(--accent)" }}>.</span>
                    </h2>
                </AnimatedSection>

                {/* Philosophy quote */}
                <AnimatedSection delay={0.1}>
                    <blockquote
                        style={{
                            position: "relative",
                            padding: "40px 48px",
                            background: "var(--bg-surface)",
                            border: "1px solid var(--border)",
                            borderLeft: "3px solid var(--accent)",
                            borderRadius: "0 12px 12px 0",
                            maxWidth: 800,
                            marginBottom: 64,
                        }}
                    >
                        <p
                            style={{
                                fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
                                lineHeight: 1.7,
                                color: "var(--text-secondary)",
                                fontStyle: "italic",
                            }}
                        >
                            &ldquo;{philosophy}&rdquo;
                        </p>
                    </blockquote>
                </AnimatedSection>

                {/* Culture grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: 24,
                    }}
                >
                    {[
                        {
                            title: "Global Perspective",
                            desc: "We work across continents — understanding diverse markets, cultures, and digital landscapes to deliver global impact.",
                            icon: "🌍",
                        },
                        {
                            title: "Innovation First",
                            desc: "We don't follow trends — we set them. Our team constantly experiments with emerging tech, platforms, and strategies.",
                            icon: "⚡",
                        },
                        {
                            title: "Partners, Not Vendors",
                            desc: "We embed ourselves in your mission. Every campaign, every pixel, every strategy reflects your brand's purpose.",
                            icon: "🤝",
                        },
                        {
                            title: "Data-Driven Creativity",
                            desc: "Beautiful ideas backed by rigorous data. We measure what matters and let insights guide our creative decisions.",
                            icon: "📊",
                        },
                    ].map((item, i) => (
                        <AnimatedSection key={item.title} delay={0.15 + i * 0.08}>
                            <div
                                className="card"
                                style={{
                                    padding: 32,
                                    height: "100%",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 32,
                                        marginBottom: 16,
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <h3
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 700,
                                        marginBottom: 12,
                                    }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "var(--text-secondary)",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {item.desc}
                                </p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
