import { siteConfig, navLinks } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

const footerServices = [
    "Digital Branding",
    "Performance Marketing",
    "Content & Media",
    "Web & UX Design",
    "AI & Analytics",
];

const socialLinks = [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Twitter / X", href: "https://x.com" },
];

export default function Footer() {
    return (
        <footer
            style={{
                background: "var(--bg-secondary)",
                borderTop: "1px solid var(--border)",
                padding: "80px 0 40px",
            }}
        >
            <div className="container">
                {/* Top Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: 48,
                        marginBottom: 64,
                    }}
                >
                    {/* Brand */}
                    <div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 16,
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 24,
                                    fontWeight: 800,
                                    color: "var(--accent)",
                                }}
                            >
                                ✕
                            </span>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>
                                {siteConfig.name}
                            </span>
                        </div>
                        <p
                            style={{
                                fontSize: 14,
                                color: "var(--text-secondary)",
                                lineHeight: 1.7,
                                maxWidth: 280,
                            }}
                        >
                            {siteConfig.description}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4
                            style={{
                                fontSize: 13,
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: "var(--text-muted)",
                                marginBottom: 20,
                            }}
                        >
                            Navigation
                        </h4>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                            }}
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    style={{
                                        fontSize: 14,
                                        color: "var(--text-secondary)",
                                        transition: "color 0.2s",
                                    }}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4
                            style={{
                                fontSize: 13,
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: "var(--text-muted)",
                                marginBottom: 20,
                            }}
                        >
                            Services
                        </h4>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                            }}
                        >
                            {footerServices.map((s) => (
                                <span
                                    key={s}
                                    style={{
                                        fontSize: 14,
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h4
                            style={{
                                fontSize: 13,
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: "var(--text-muted)",
                                marginBottom: 20,
                            }}
                        >
                            Connect
                        </h4>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                            }}
                        >
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        fontSize: 14,
                                        color: "var(--text-secondary)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        transition: "color 0.2s",
                                    }}
                                >
                                    {link.label} <ArrowUpRight size={12} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="divider" />

                {/* Bottom */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: 24,
                        flexWrap: "wrap",
                        gap: 16,
                    }}
                >
                    <span
                        style={{
                            fontSize: 13,
                            color: "var(--text-muted)",
                        }}
                    >
                        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                    </span>
                    <span
                        style={{
                            fontSize: 13,
                            color: "var(--text-muted)",
                        }}
                    >
                        Crafted with purpose.
                    </span>
                </div>
            </div>
        </footer>
    );
}
