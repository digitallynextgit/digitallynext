"use client";

import { stats } from "@/data/content";
import Counter from "@/components/ui/Counter";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Stats() {
    return (
        <section
            style={{
                background: "var(--bg-secondary)",
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                padding: "80px 0",
            }}
        >
            <div className="container">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: 48,
                        textAlign: "center",
                    }}
                >
                    {stats.map((stat, i) => (
                        <AnimatedSection key={stat.label} delay={i * 0.1}>
                            <div>
                                <div
                                    style={{
                                        fontSize: "clamp(2.5rem, 6vw, 4rem)",
                                        fontWeight: 800,
                                        letterSpacing: "-0.03em",
                                        lineHeight: 1,
                                        marginBottom: 8,
                                    }}
                                >
                                    <Counter
                                        target={stat.value}
                                        suffix={stat.suffix}
                                        className="gradient-text-red"
                                    />
                                </div>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "var(--text-muted)",
                                        fontWeight: 500,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                    }}
                                >
                                    {stat.label}
                                </p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
