import Image from "next/image";
import Link from "next/link";

export default function YourAskSection() {
    return (
        <section className="w-full bg-white">

            {/* Outer: max 1440px, padding 144px 126px per Figma */}
            <div className="w-full max-w-[1440px] mx-auto px-6 py-16 sm:px-12 sm:py-24 lg:px-[126px] lg:py-[144px]">

                {/* Frame 158: all content, centered, gap 56px */}
                <div className="flex flex-col items-center gap-14">

                    {/* Frame 157: eyebrow + text block, gap 56px */}
                    <div className="flex flex-col items-center gap-14 w-full max-w-[900px]">

                        {/* Eyebrow */}
                        <p
                            className="text-center font-medium uppercase"
                            style={{
                                fontSize: "16px",
                                lineHeight: "21px",
                                letterSpacing: "3px",
                                color: "#E21F26",
                            }}
                        >
                            If this sounds like your ask
                        </p>

                        {/* Frame 156: text lines + description, gap 56px */}
                        <div className="flex flex-col items-center gap-14 w-full">

                            {/* 3 text lines — gap 12px desktop, 24px mobile */}
                            <div className="flex flex-col items-center gap-6 lg:gap-3 w-full">

                                {/* Line 1: Growth (extrabold) + without chaos (light) */}
                                <p
                                    className="text-center w-full text-black"
                                    style={{
                                        fontSize: "clamp(32px, 8vw, 48px)",
                                        lineHeight: "1.2",
                                        fontWeight: 300,
                                    }}
                                >
                                    <span style={{ fontWeight: 800 }}>Growth</span>
                                    {" "}without chaos
                                </p>

                                {/* Line 2: Performance (extrabold) + without brand erosion (light) */}
                                <p
                                    className="text-center w-full text-black"
                                    style={{
                                        fontSize: "clamp(32px, 8vw, 48px)",
                                        lineHeight: "1.2",
                                        fontWeight: 300,
                                    }}
                                >
                                    <span style={{ fontWeight: 800 }}>Performance</span>
                                    {" "}without brand erosion
                                </p>

                                {/* Line 3: Distribution systems that (light) + scale (extrabold) */}
                                <p
                                    className="text-center w-full text-black"
                                    style={{
                                        fontSize: "clamp(32px, 8vw, 48px)",
                                        lineHeight: "1.2",
                                        fontWeight: 300,
                                    }}
                                >
                                    Distribution systems that{" "}
                                    <span style={{ fontWeight: 800 }}>scale</span>
                                </p>
                            </div>

                            {/* Description: 18px, weight 300, centered, max-width 600px */}
                            <p
                                className="text-center max-w-[600px] mx-auto"
                                style={{
                                    fontSize: "18px",
                                    lineHeight: "31px",
                                    fontWeight: 300,
                                    color: "#787878",
                                }}
                            >
                                We work best with teams that value structure, clarity, and
                                long-term thinking. If you&apos;re building something meant to
                                scale &ndash; let&apos;s talk.
                            </p>

                        </div>
                    </div>

                    {/* CTA: ↳ arrow (teal) + "Learn More" (red) */}
                    <Link
                        href="/contact"
                        className="flex flex-row items-center transition-opacity hover:opacity-75"
                        style={{ gap: "15px" }}
                    >
                        <Image
                            src="/figma/services/arrow2.svg"
                            alt="Arrow right"
                            width={36}
                            height={17}
                            style={{
                                stroke: "#0EC8C5",
                                strokeWidth: "2.87",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                            }}
                        />

                        {/* "Learn More" */}
                        <span
                            style={{
                                fontSize: "24px",
                                lineHeight: "31px",
                                fontWeight: 400,
                                color: "#E21F26",
                            }}
                        >
                            Learn More
                        </span>
                    </Link>

                </div>
            </div>
        </section>
    );
}
