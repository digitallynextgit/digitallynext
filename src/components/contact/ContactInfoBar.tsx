"use client";

import Image from "next/image";
import Link from "next/link";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface ContactInfoBarProps {
    theme?: "dark" | "light";
}

export default function ContactInfoBar({ theme }: ContactInfoBarProps) {
    const { theme: contextTheme } = useSectionTheme();
    const isDark = (theme ?? contextTheme) === "dark";

    return (
        <div
            className={[
                "transition-colors duration-700 ease-in-out",
                isDark ? "bg-black" : "bg-[#111111]",
            ].join(" ")}
        >
            <div className="max-w-[1200px] mx-auto w-full px-6 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
                <div className="grid gap-8 md:grid-cols-3 md:gap-16 justify-items-center text-center">

                    {/* General Inquiries */}
                    <div className="space-y-2">
                        <p
                            className={[
                                "text-[10px] tracking-[0.22em] uppercase transition-colors duration-700",
                                isDark ? "text-white/55" : "text-white/40",
                            ].join(" ")}
                        >
                            General inquiries
                        </p>
                        <a
                            href="mailto:contact@digitallynext.com"
                            className="text-white text-base sm:text-lg font-semibold hover:text-[#E21F26] transition-colors duration-200"
                        >
                            contact@digitallynext.com
                        </a>
                    </div>

                    {/* Careers */}
                    <div className="space-y-2">
                        <p
                            className={[
                                "text-[10px] tracking-[0.22em] uppercase transition-colors duration-700",
                                isDark ? "text-white/55" : "text-white/40",
                            ].join(" ")}
                        >
                            Careers
                        </p>
                        <a
                            href="mailto:careers@digitallynext.com"
                            className="text-white text-base sm:text-lg font-semibold hover:text-[#E21F26] transition-colors duration-200"
                        >
                            careers@digitallynext.com
                        </a>
                    </div>

                    {/* Connect */}
                    <div className="space-y-2">
                        <p
                            className={[
                                "text-[10px] tracking-[0.22em] uppercase transition-colors duration-700",
                                isDark ? "text-white/55" : "text-white/40",
                            ].join(" ")}
                        >
                            Connect
                        </p>
                        <Link
                            href="https://www.linkedin.com/company/digitallynext/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white text-base sm:text-lg font-semibold hover:text-[#E21F26] transition-colors duration-200"
                        >
                            <Image src="/linkedin.png" alt="linkedin" height={15} width={15} />
                            LinkedIn
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
