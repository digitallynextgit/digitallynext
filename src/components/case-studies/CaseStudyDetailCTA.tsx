import Image from "next/image";
import Link from "next/link";
import type { CaseStudyDetail } from "@/data/casestudy";

export default function CaseStudyDetailCTA({ detail }: { detail: CaseStudyDetail }) {
  return (
    <section
      id="contact"
      className="relative w-full mt-14 md:mt-[86px] overflow-hidden py-16 md:py-[81px] px-4 sm:px-6 md:px-[98px]"
    >
      <div className="absolute inset-0">
        <Image src={detail.cta.backgroundImageSrc} alt="" fill className="object-cover" priority={false} sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1244px] flex flex-col items-center gap-10 md:gap-[80px]">
        <div className="w-full flex flex-col items-center gap-8 md:gap-[80px]">
          <div className="w-full text-center text-[44px] sm:text-[60px] md:text-[88px] leading-[1.05] md:leading-[1.1818] font-bold text-white">
            {detail.cta.headingLines[0]}
            <br />
            {detail.cta.headingLines[1] ?? ""}
          </div>
          <div className="w-full text-center text-[16px] sm:text-[20px] md:text-[32px] leading-[1.5] md:leading-[1.3] font-light text-white whitespace-pre-line">
            {detail.cta.bodyLines.join("\n")}
          </div>
        </div>

        <div className="relative w-[237px] h-[55px]">
          <div
            className="absolute inset-0"
            style={{
              filter: "blur(4px)",
              border: "2px solid transparent",
              borderImage:
                "linear-gradient(90deg, rgba(226, 31, 38, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(14, 200, 197, 1) 100%) 1",
            }}
          />
          <Link
            href={detail.cta.buttonHref}
            className="relative w-full h-full flex items-center justify-center uppercase text-[24px] leading-[1.3] font-normal text-white"
            style={{
              border: "2px solid transparent",
              borderImage:
                "linear-gradient(90deg, rgba(226, 31, 38, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(14, 200, 197, 1) 100%) 1",
            }}
          >
            {detail.cta.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

