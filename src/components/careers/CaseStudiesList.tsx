"use client";

import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/data/casestudy";

export default function CaseStudiesList() {
    const remaining = caseStudies.slice(1);

    const CaseCard = ({ cs }: { cs: (typeof caseStudies)[0] }) => (
        <Link
            href={`/case-studies/${cs.slug}`}
            className="block no-underline text-inherit group"
        >
            <div className="flex flex-col gap-4">
                {/* Image */}
                <div
                    style={{
                        width: "100%",
                        borderRadius: 6,
                        overflow: "hidden",
                        aspectRatio: "3 / 2",
                    }}
                >
                    <Image
                        src={cs.listing.imageSrc}
                        alt={cs.metaTitle}
                        width={800}
                        height={533}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 pt-2">
                    <h3
                        style={{
                            fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                            fontWeight: 700,
                            lineHeight: 1.3,
                            color: "#000000",
                            margin: 0,
                        }}
                        dangerouslySetInnerHTML={{ __html: cs.listing.title }}
                    />
                    <p
                        style={{
                            fontSize: 15,
                            fontWeight: 300,
                            lineHeight: 1.6,
                            color: "#787878",
                            margin: 0,
                        }}
                    >
                        {cs.listing.caption}
                    </p>

                    {/* Tag pill */}
                    <div>
                        <span
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "7px 16px",
                                border: "0.9px solid #000000",
                                borderRadius: 999,
                                fontSize: 13,
                                fontWeight: 400,
                                color: "#000000",
                                transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                            }}
                            className="group-hover:bg-[#E21F26] group-hover:border-[#E21F26] group-hover:text-white"
                        >
                            {cs.listing.pillLabel ?? cs.listing.buttonLabel}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );

    return (
        <section className="w-full bg-white">
            <div className="container flex justify-center">
                <div
                    className="w-full py-12 md:py-20 lg:py-24 flex flex-col gap-16 md:gap-20 lg:gap-28"
                    style={{ maxWidth: 1103 }}
                >
                    {/* 2 cards per row — grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-20 lg:gap-y-28">
                        {remaining.map((cs) => (
                            <CaseCard key={cs.slug} cs={cs} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
