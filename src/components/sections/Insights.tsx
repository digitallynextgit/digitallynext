"use client";

import { insights } from "@/data/content";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ArrowRight } from "lucide-react";

export default function Insights() {
    return (
        <section
            id="insights"
            className="section"
            style={{ background: "var(--bg-secondary)" }}
        >
            <div className="container">
                <AnimatedSection>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            marginBottom: 48,
                            flexWrap: "wrap",
                            gap: 16,
                        }}
                    >
                        <h2>
                            Latest Insights
                            <span style={{ color: "var(--accent)" }}>.</span>
                        </h2>
                        <a
                            href="/blog"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 14,
                                color: "var(--text-secondary)",
                                fontWeight: 500,
                                transition: "color 0.2s",
                            }}
                        >
                            View All <ArrowRight size={14} />
                        </a>
                    </div>
                </AnimatedSection>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: 24,
                    }}
                >
                    {insights.map((post, i) => (
                        <AnimatedSection key={post.id} delay={i * 0.1}>
                            <div
                                className="card"
                                style={{
                                    cursor: "pointer",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Image placeholder */}
                                <div
                                    style={{
                                        height: 200,
                                        background: `linear-gradient(135deg, var(--bg-surface) 0%, ${i === 0
                                                ? "#E5393522"
                                                : i === 1
                                                    ? "#2196F322"
                                                    : "#4CAF5022"
                                            } 100%)`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 48,
                                            fontWeight: 900,
                                            color: "rgba(255,255,255,0.05)",
                                        }}
                                    >
                                        DN
                                    </span>
                                </div>

                                <div style={{ padding: 24 }}>
                                    {/* Category + Date */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: 12,
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 600,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.06em",
                                                color: "var(--accent)",
                                            }}
                                        >
                                            {post.category}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: 12,
                                                color: "var(--text-muted)",
                                            }}
                                        >
                                            {post.date}
                                        </span>
                                    </div>

                                    <h3
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 700,
                                            marginBottom: 12,
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {post.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: 14,
                                            color: "var(--text-secondary)",
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {post.excerpt}
                                    </p>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
