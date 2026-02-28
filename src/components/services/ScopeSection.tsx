import Image from "next/image";
import type { ServiceSection, ServiceTheme } from "@/data/services";

type Props = {
    section: Extract<ServiceSection, { type: "scope" }>;
    theme: ServiceTheme;
};

export default function ScopeSection({ section, theme }: Props) {
    return (
        <section style={{ backgroundColor: "#000000", color: "#FFFFFF" }}>
            {/* Outer: max 1440px — padding: 144px 120px 0 per Figma */}
            <div className="w-full max-w-[1440px] mx-auto px-6 py-10 sm:px-10 md:py-16 lg:px-[120px] lg:py-20">

                {/* Inner: max 1200px — gap 72px between header and list */}
                <div className="max-w-[1200px] mx-auto flex flex-col gap-12 lg:gap-[72px]">

                    {/* ── Header Block ── */}
                    <div className="flex flex-col gap-4 lg:gap-6">

                        {/* Eyebrow: 16px, weight 500, letter-spacing 3px */}
                        <p
                            className="font-medium uppercase text-[13px] lg:text-base"
                            style={{ color: theme.accent, letterSpacing: "3px" }}
                        >
                            {section.eyebrow}
                        </p>

                        {/* Heading: 56px bold white — supports HTML e.g. teal "." */}
                        <h2
                            className="font-bold leading-[1.1] text-[36px] sm:text-[44px] lg:text-[56px] text-white"
                            dangerouslySetInnerHTML={{ __html: section.heading }}
                        />

                        {/* Optional subtitle: 24px weight 300 */}
                        {section.description && (
                            <p
                                className="text-base sm:text-xl lg:text-2xl"
                                style={{ color: "#E5E5E5", fontWeight: 300 }}
                            >
                                {section.description}
                            </p>
                        )}
                    </div>

                    {/* ── Items ── */}
                    <div className="flex flex-col">
                        {section.items.map((item, idx) => (
                            <div key={idx}>

                                {/* ── DESKTOP: horizontal row ──
                    padding: 32px 0, gap: 64px, border-bottom 
                ── */}
                                <div
                                    className="hidden lg:flex items-start lg:items-center gap-16 py-8 border-b"
                                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                                >
                                    {/* Title: w-[280px], 20px bold white */}
                                    <div className="w-[280px] flex-shrink-0">
                                        <h3
                                            className="font-bold text-white"
                                            style={{ fontSize: "20px", lineHeight: "30px" }}
                                        >
                                            {item.title}
                                        </h3>
                                    </div>

                                    {/* Description: flex-1, 16px, weight 300, #E5E5E5 */}
                                    <p
                                        className="flex-1"
                                        style={{
                                            fontSize: "16px",
                                            lineHeight: "27px",
                                            color: "#E5E5E5",
                                            fontWeight: 300,
                                        }}
                                    >
                                        {item.description}
                                    </p>
                                </div>

                                {/* ── MOBILE: card with image + title + description ──
                    gap: 72px between items (pb-[72px] on all but last)
                ── */}
                                <div
                                    className={`flex lg:hidden flex-col gap-6 ${idx < section.items.length - 1 ? "pb-[72px]" : "pb-14"
                                        }`}
                                >
                                    {/* Image: 16:10 aspect, full width */}
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

                                    {/* Text block: gap 16px */}
                                    <div className="flex flex-col gap-4">
                                        <h3
                                            className="font-bold text-white"
                                            style={{ fontSize: "20px", lineHeight: "30px" }}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            style={{
                                                fontSize: "16px",
                                                lineHeight: "27px",
                                                color: "#E5E5E5",
                                                fontWeight: 300,
                                            }}
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
                            className="text-[#E5E5E5] text-start"
                            style={{
                                fontSize: "24px",
                                lineHeight: "27px",
                                fontWeight: 300,
                                whiteSpace: "pre-line",
                            }}
                            dangerouslySetInnerHTML={{ __html: section.footerText }}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
