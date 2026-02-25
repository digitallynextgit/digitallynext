import Image from "next/image";
import Link from "next/link";
import type { ServiceSection, ServiceTheme } from "@/data/services";

type Props = {
    section: Extract<ServiceSection, { type: "caseStudy" }>;
    theme: ServiceTheme;
};

export default function CaseStudySection({ section, theme }: Props) {
    return (
        <section
            style={{
                backgroundColor: "#FAFAFA",
                borderTop: "1px solid rgba(0,0,0,0.1)",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
            }}
        >
            {/* Outer: max 1440px | Desktop: px-[264px] py-[88px] */}
            <div className="w-full max-w-[1440px] mx-auto px-8 py-14 sm:px-12 sm:py-16 lg:px-[264px] lg:py-[88px]">

                {/* Outer column: gap 56px (between header row and card) */}
                <div className="flex flex-col gap-14">

                    {/* ── ROW 1: Heading + CTA ──
              Desktop: flex-row, items-center
                - Heading: w-[588px], fixed
                - Spacer: w-[104px]
                - CTA: w-[219px]
              Mobile: flex-col, gap-6
          ── */}
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

                        {/* Heading: 44px bold, line-height 51px */}
                        <h2
                            className="font-bold text-black lg:w-[588px] lg:flex-shrink-0"
                            style={{
                                fontSize: "clamp(26px, 3.06vw, 44px)",
                                lineHeight: "1.16",
                            }}
                            dangerouslySetInnerHTML={{ __html: section.heading }}
                        />

                        {/* Gap 104px — desktop only spacer */}
                        <div className="hidden lg:block flex-shrink-0" style={{ width: "104px" }} />

                        {/* CTA: ↳ arrow (red) + "View Case Study" (black) */}
                        <Link
                            href={section.ctaHref}
                            className="inline-flex flex-row items-center gap-2 group w-fit lg:w-[219px] lg:flex-shrink-0"
                        >
                            {/* ↳ Arrow SVG — 22×20px, red, ↳ shape */}
                            <svg
                                width="22"
                                height="20"
                                viewBox="0 0 22 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="flex-shrink-0"
                            >
                                <path
                                    d="M2.5 2L2.5 14.5L19.5 14.5"
                                    stroke="#E21F26"
                                    strokeWidth="2.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M13.5 8.5L19.5 14.5L13.5 20.5"
                                    stroke="#E21F26"
                                    strokeWidth="2.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span
                                className="text-black group-hover:opacity-70 transition-opacity"
                                style={{
                                    fontSize: "22px",
                                    lineHeight: "33px",
                                    fontWeight: 400,
                                }}
                            >
                                {section.ctaLabel}
                            </span>
                        </Link>
                    </div>

                    {/* ── ROW 2: Cards — 638px, centered on desktop ──
              Desktop: w-[637.81px], mx-auto (centered in 912px container)
              Mobile:  full width
          ── */}
                    <div className="flex flex-col gap-14 w-full lg:w-[638px] lg:mx-auto">
                        {section.cards.map((card, idx) => {
                            const isLink = !!card.href;

                            return isLink ? (
                                <Link
                                    key={idx}
                                    href={card.href!}
                                    className="flex flex-col group"
                                    style={{ gap: "36.81px" }}
                                >
                                    <CardContent card={card} />
                                </Link>
                            ) : (
                                <div
                                    key={idx}
                                    className="flex flex-col"
                                    style={{ gap: "36.81px" }}
                                >
                                    <CardContent card={card} />
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}

/* ── Inner card content — extracted to avoid repetition ── */
type CardContentProps = {
    card: {
        imageSrc: string;
        title: string;
        description: string;
        tag: string;
    };
};

function CardContent({ card }: CardContentProps) {
    return (
        <>
            {/* Image: 637.81 × 424.94px, border-radius 5.18px */}
            <div
                className="relative w-full overflow-hidden"
                style={{
                    height: "clamp(220px, 29.5vw, 425px)",
                    borderRadius: "5.18px",
                }}
            >
                <Image
                    src={card.imageSrc}
                    alt={card.title.replace(/<[^>]+>/g, "")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 638px"
                />
            </div>

            {/* Info block: gap 43.21px */}
            <div className="flex flex-col" style={{ gap: "43.21px" }}>

                {/* Title + Description: gap 13.6px */}
                <div className="flex flex-col" style={{ gap: "13.6px" }}>

                    {/* Title: 44.8px bold, supports HTML accent */}
                    <h3
                        className="font-bold text-black"
                        style={{
                            fontSize: "clamp(28px, 3.12vw, 44.8px)",
                            lineHeight: "58px",
                        }}
                        dangerouslySetInnerHTML={{ __html: card.title }}
                    />

                    {/* Description: 22.58px weight 300 #787878 */}
                    <p
                        style={{
                            fontSize: "clamp(16px, 1.57vw, 22.58px)",
                            lineHeight: "29px",
                            fontWeight: 300,
                            color: "#787878",
                        }}
                    >
                        {card.description}
                    </p>
                </div>

                {/* Tag Pill: border 0.8px red, radius 26.24px */}
                <div
                    className="inline-flex items-center justify-center self-start"
                    style={{
                        padding: "13.12px 19.68px",
                        border: "0.8px solid #E21F26",
                        borderRadius: "26.24px",
                    }}
                >
                    <span
                        className="text-black text-center"
                        style={{
                            fontSize: "19.2px",
                            lineHeight: "25px",
                            fontWeight: 400,
                        }}
                    >
                        {card.tag}
                    </span>
                </div>

            </div>
        </>
    );
}
