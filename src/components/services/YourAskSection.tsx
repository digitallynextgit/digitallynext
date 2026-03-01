import Image from "next/image";
import Link from "next/link";
import type { ServiceYourAsk } from "@/data/services";
import LiquidEther from "@/app/contact/LiquidEther";

type Props = {
    yourAsk: ServiceYourAsk;
};

export default function YourAskSection({ yourAsk }: Props) {
    const {
        eyebrow = "If this sounds like your ask",
        lines,
        description,
        ctaLabel = "Learn More",
        ctaHref = "/contact",
        arrowSrc = "/figma/services/arrow2.svg",
    } = yourAsk;

    return (
        <section className="relative w-full overflow-hidden min-h-[70vh] flex items-center bg-white">
            <div className="absolute inset-0 z-0">
                <LiquidEther
                    colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
            <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 py-16 sm:px-12 md:py-20 lg:px-[126px] lg:py-24">
                <div className="flex flex-col items-center gap-14">

                    {/* Eyebrow + text block */}
                    <div className="flex flex-col items-center w-full">

                        {/* Eyebrow */}
                        <p className="text-center font-medium uppercase text-[16px] leading-[21px] tracking-[3px] text-[#E21F26]">
                            {eyebrow}
                        </p>

                        <div className="text-[#787878] mt-14 mb-4 font-bold text-lg">
                            If you’re looking for:
                        </div>
                        <div className="flex flex-col items-center gap-14 w-full">
                            {/* Lines */}
                            <div className="flex flex-col items-center gap-6 lg:gap-3 w-full">
                                {lines.map((line, i) => (
                                    <p
                                        key={i}
                                        className="text-center w-full text-[#111111] font-light"
                                        style={{ fontSize: "clamp(32px, 8vw, 48px)", lineHeight: "1.2" }}
                                        dangerouslySetInnerHTML={{ __html: line }}
                                    />
                                ))}
                            </div>

                            {/* Description */}
                            <p className="text-center mx-auto text-[18px] leading-[31px] font-light text-[#555555]">
                                {description}
                            </p>

                        </div>
                    </div>

                    {/* CTA */}
                    <Link
                        href={ctaHref}
                        className="group flex flex-row items-center gap-[15px] no-underline"
                    >
                        <span className="transition-transform duration-300 ease-out group-hover:-translate-x-2">
                            <Image
                                src={arrowSrc}
                                alt="Arrow right"
                                width={36}
                                height={17}
                            />
                        </span>
                        <span className="text-[24px] leading-[31px] font-normal text-[#E21F26] transition-opacity duration-200 group-hover:opacity-75">
                            {ctaLabel}
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
