"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
export default function Hero() {
    return (
        <section className="hero-section" style={{ position: "sticky", top: 0, zIndex: 0 }}>
            {/* Full-bleed background video */}
            <div className="hero-bg">
                {/* <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: -1,
                    }}
                >
                    <source src="/banner.mp4" type="video/mp4" />
                </video> */}
                <Image src="/banner/b1.webp" alt="Hero" width={1920} height={1080} className="w-[100vw] h-[100vh] object-cover"/>
                {/* Overlay for readability if needed, though mix-blend-mode text might handle it */}
                {/* <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} /> */}
            </div>

            {/* Content overlay */}
            <div className="hero-content ">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <p
                        style={{
                            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
                            fontWeight: 500,
                            color: "#fff",
                            marginBottom: 8,
                            letterSpacing: "0.02em",
                        }}
                    >
                        WE DON&apos;T JUST BUILD
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ mixBlendMode: "difference" }}
                >
                    <h1
                        
                        className="text-[14vw] lg:text-[12vw] font-bold text-white mb-6 uppercase"
                    >
                        CAMPAIGNS.
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <p
                        style={{
                            fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
                            color: "rgba(255,255,255,0.85)",
                            marginBottom: 40,
                            fontWeight: 400,
                        }}
                    >
                        We build what tomorrow will{" "}
                        <strong style={{ color: "#fff", fontWeight: 700 }}>
                            remember.
                        </strong>
                    </p>
                </motion.div>

           
                    <Link href="#contact" className="btn-green text-red-500">
                        GET IN TOUCH
                    </Link>
                
            </div>
        </section>
    );
}
