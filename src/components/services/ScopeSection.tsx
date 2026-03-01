"use client";

import Image from "next/image";
import { useSectionTheme } from "@/context/SectionThemeContext";
import type { ServiceSection, ServiceTheme } from "@/data/services";

type Props = {
    section: Extract<ServiceSection, { type: "scope" }>;
    theme: ServiceTheme;
};

export default function ScopeSection({ section, theme }: Props) {
    const { theme: contextTheme } = useSectionTheme();
    const isDark = contextTheme === "dark";

    return (
        <section
            className={[
                "transition-colors duration-700",
                isDark ? "bg-[#000000]" : "bg-[#FAFAFA]",
            ].join(" ")}
        >
            <div className="w-full max-w-[1440px] mx-auto px-6 py-10 sm:px-10 md:py-16 lg:px-[120px] lg:py-20">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-12 lg:gap-[72px]">

                    {/* ── Header Block ── */}
                    <div className="flex flex-col gap-4 lg:gap-6">

                        {/* Eyebrow */}
                        <p
                            className="font-medium uppercase text-[13px] lg:text-base"
                            style={{ color: theme.accent, letterSpacing: "3px" }}
                        >
                            {section.eyebrow}
                        </p>

                        {/* Heading */}
                        <h2
                            className={[
                                "font-bold leading-[1.1] text-[36px] sm:text-[44px] lg:text-[56px]",
                                "transition-colors duration-700",
                                isDark ? "text-white" : "text-[#000000]",
                            ].join(" ")}
                            dangerouslySetInnerHTML={{ __html: section.heading }}
                        />

                        {/* Description */}
                        {section.description && (
                            <p
                                className={[
                                    "text-base sm:text-xl lg:text-2xl font-light",
                                    "transition-colors duration-700",
                                    isDark ? "text-[#E5E5E5]" : "text-[#787878]",
                                ].join(" ")}
                            >
                                {section.description}
                            </p>
                        )}
                    </div>

                    {/* ── Items ── */}
                    <div className="flex flex-col">
                        {section.items.map((item, idx) => (
                            <div key={idx}>

                                {/* ── DESKTOP row ── */}
                                <div
                                    className={[
                                        "hidden lg:flex items-start lg:items-center gap-16 py-8 border-b",
                                        "transition-colors duration-700",
                                        isDark ? "border-white/10" : "border-black/10",
                                    ].join(" ")}
                                >
                                    {/* Title */}
                                    <div className="w-[280px] shrink-0">
                                        <h3
                                            className={[
                                                "font-bold text-[20px] leading-[30px] transition-colors duration-700",
                                                isDark ? "text-white" : "text-[#000000]",
                                            ].join(" ")}
                                        >
                                            {item.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p
                                        className={[
                                            "flex-1 text-[16px] leading-[27px] font-light",
                                            "transition-colors duration-700",
                                            isDark ? "text-[#E5E5E5]" : "text-[#787878]",
                                        ].join(" ")}
                                    >
                                        {item.description}
                                    </p>
                                </div>

                                {/* ── MOBILE card ── */}
                                <div
                                    className={[
                                        "flex lg:hidden flex-col gap-6",
                                        idx < section.items.length - 1 ? "pb-[72px]" : "pb-14",
                                    ].join(" ")}
                                >
                                    {item.imageSrc && (
                                        <div
                                            className="relative w-full overflow-hidden"
                                            style={{ aspectRatio: "16 / 10" }}
                                        >
                                            <Image
                                                src={item.imageSrc}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-4">
                                        <h3
                                            className={[
                                                "font-bold text-[20px] leading-[30px] transition-colors duration-700",
                                                isDark ? "text-white" : "text-[#000000]",
                                            ].join(" ")}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            className={[
                                                "text-[16px] leading-[27px] font-light transition-colors duration-700",
                                                isDark ? "text-[#E5E5E5]" : "text-[#787878]",
                                            ].join(" ")}
                                        >
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* ── Footer Text ── */}
                    {section.footerText && (
                        <p
                            className={[
                                "text-start text-[24px] leading-[27px] font-light whitespace-pre-line",
                                "transition-colors duration-700",
                                isDark ? "text-[#E5E5E5]" : "text-[#787878]",
                            ].join(" ")}
                            dangerouslySetInnerHTML={{ __html: section.footerText }}
                        />
                    )}

                </div>
            </div>
        </section>
    );
}
