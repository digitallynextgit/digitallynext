"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinksLeft, navLinksRight, navLinks, siteConfig } from "@/data/content";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [mobileOpen]);

    // Dynamic visual logic
    const headerBg = scrolled ? "rgba(10, 10, 10, 0.85)" : "transparent";
    const linkColor = isHome ? "#fff" : (scrolled ? "#fff" : "#000");
    const logoLight = "/logo-complete-white.webp";
    const logoDark = "/logo1.webp";
    const logoWhite = "/logo1-white.webp";
    const logoSrc = isHome ? (scrolled ? logoWhite : logoLight) : (scrolled ? logoWhite : logoDark);

    return (
        <>
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    background: headerBg,
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
                }}
            >
                <div
                    className="header-container"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        alignItems: "center",
                        height: 80,
                        width: "100%",
                        maxWidth: 1440,
                        margin: "0 auto",
                        padding: "0 32px",
                    }}
                >
                    {/* 1. Home */}
                    <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className="desktop-nav"
                    >
                        <Link
                            href="/"
                            className="header-nav-link"
                            style={{ color: linkColor }}
                        >
                            HOME
                        </Link>
                    </div>

                    {/* 2. Services */}
                    <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className="desktop-nav"
                    >
                        <Link
                            href="/#services"
                            className="header-nav-link"
                            style={{ color: linkColor }}
                        >
                            SERVICES
                        </Link>
                    </div>

                    {/* 3. Center Logo (desktop) / Left logo (mobile) */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Link
                            href="/"
                            className="header-logo"
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                src={logoSrc}
                                alt="Logo"
                                width={1200}
                                height={120}
                                className="w-[44vw] sm:w-[36vw] md:w-[28vw] lg:w-[16vw]"
                            />
                        </Link>
                    </div>

                    {/* 4. Case Studies */}
                    <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className="desktop-nav"
                    >
                        <Link
                            href="/case-study"
                            className="header-nav-link"
                            style={{ color: linkColor }}
                        >
                            CASE STUDIES
                        </Link>
                    </div>

                    {/* 5. Contact */}
                    <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className="desktop-nav"
                    >
                        <Link
                            href="/#contact"
                            className="header-nav-link"
                            style={{ color: linkColor }}
                        >
                            CONTACT
                        </Link>
                    </div>

                    {/* Hamburger for mobile - Absolute positioned since grid disrupts it */}
                    <div
                        style={{
                            position: "absolute",
                            right: 20,
                            top: "50%",
                            transform: "translateY(-50%)",
                            display: "none",
                        }}
                        className="mobile-menu-btn-container"
                    >
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            style={{
                                display: "none",
                                background: "none",
                                border: "none",
                                color: linkColor,
                                cursor: "pointer",
                                padding: 4,
                            }}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 99,
                            background: "var(--bg-primary)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 32,
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                style={{
                                    fontSize: 32,
                                    fontWeight: 700,
                                    color: "var(--text-accent)",
                                }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
