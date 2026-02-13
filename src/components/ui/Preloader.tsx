"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

export default function Preloader() {
    const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
    const [percentText, setPercentText] = useState(0);
    const progress = useMotionValue(0);
    const rafRef = useRef<number>(0);

    // Transform hooks must be at the top level
    const clipPercent = useTransform(progress, (v) => `${v}%`);
    const clipPathValue = useTransform(clipPercent, (v) => `inset(0 ${100 - parseFloat(v)}% 0 0)`);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        // Animate progress from 0 to 100
        const controls = animate(progress, 100, {
            duration: 2.0,
            ease: [0.25, 0.1, 0.25, 1],
        });

        // Track percent for display
        const updatePercent = () => {
            setPercentText(Math.round(progress.get()));
            rafRef.current = requestAnimationFrame(updatePercent);
        };
        rafRef.current = requestAnimationFrame(updatePercent);

        // Sequence timers
        const revealTimer = setTimeout(() => {
            setPhase("reveal");
        }, 2200);

        const doneTimer = setTimeout(() => {
            setPhase("done");
            document.body.style.overflow = "";
        }, 3600);

        return () => {
            controls.stop();
            cancelAnimationFrame(rafRef.current);
            clearTimeout(revealTimer);
            clearTimeout(doneTimer);
            document.body.style.overflow = "";
        };
    }, [progress]);

    if (phase === "done") return null;

    const splitTransition = {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1] as const,
        delay: 0.15,
    };

    const brandText = "DIGITALLY NEXT";

    return (
        <AnimatePresence>
            {(phase === "loading" || phase === "reveal") && (
                <div
                    key="preloader-wrap"
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        pointerEvents: phase === "reveal" ? "none" : "auto",
                    }}
                >
                    {/* Top half */}
                    <motion.div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "50%",
                            background: "#e53935",
                            zIndex: 2,
                            overflow: "hidden",
                        }}
                        animate={phase === "reveal" ? { y: "-100%" } : { y: 0 }}
                        transition={phase === "reveal" ? splitTransition : {}}
                    />

                    {/* Bottom half */}
                    <motion.div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "50%",
                            background: "#e53935",
                            zIndex: 2,
                            overflow: "hidden",
                        }}
                        animate={phase === "reveal" ? { y: "100%" } : { y: 0 }}
                        transition={phase === "reveal" ? splitTransition : {}}
                    />

                    {/* Center content — sits on the seam between halves */}
                    <motion.div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            x: "-50%",
                            y: "-50%",
                            zIndex: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 0,
                        }}
                        initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                        animate={phase === "reveal" ? { opacity: 0, scale: 0.9, x: "-50%", y: "-50%" } : { opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Outlined brand name with fill wipe */}
                        <div
                            style={{
                                position: "relative",
                                lineHeight: 1,
                            }}
                        >
                            {/* Outline layer (always visible) */}
                            <span
                                style={{
                                    fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                                    fontWeight: 900,
                                    letterSpacing: "-0.03em",
                                    color: "transparent",
                                    WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.5)",
                                    display: "block",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {brandText}
                            </span>

                            {/* Fill layer (clips left to right based on progress) */}
                            <motion.span
                                style={{
                                    fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                                    fontWeight: 900,
                                    letterSpacing: "-0.03em",
                                    color: "#fff",
                                    WebkitTextStroke: "1.5px #fff",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    display: "block",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    clipPath: clipPathValue,
                                }}
                            >
                                {brandText}
                            </motion.span>
                        </div>

                        {/* Percentage counter */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                                marginTop: 8,
                            }}
                        >
                            <span
                                style={{
                                    color: "rgba(255, 255, 255, 0.6)",
                                    fontSize: "clamp(10px, 1vw, 13px)",
                                    fontWeight: 400,
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                }}
                            >
                                Think. Act. Disrupt.
                            </span>
                            <span
                                style={{
                                    color: "#fff",
                                    fontSize: "clamp(1.2rem, 3vw, 2rem)",
                                    fontWeight: 700,
                                    fontVariantNumeric: "tabular-nums",
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                {percentText}%
                            </span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
