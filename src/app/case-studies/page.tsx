import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/casestudy";

export const metadata = {
  title: "Case Studies | Digitally Next",
  description: "Explore case studies from Digitally Next.",
};

export default function CaseStudiesPage() {
  const featuredCaseStudy = caseStudies[0];
  const remainingCaseStudies = caseStudies.slice(1);

  return (
    <div className="bg-black text-white">
      <section className="mx-auto w-full max-w-[1359px] px-4 sm:px-6 md:px-12 pt-[200px] pb-16 md:pb-24 flex flex-col items-center gap-12 md:gap-[47px]">
        <div className="w-full max-w-[848px] flex flex-col items-center gap-8">
          <h1 className="text-center font-light text-[40px] leading-[1.2] tracking-[-0.03em] sm:text-[52px] sm:leading-[1.15] md:text-[64px] md:leading-[80px]">
            We help brands show up where world is watching.
          </h1>

          <div className="inline-flex items-start justify-center gap-3">
            <p className="text-center text-[16px] md:text-[18px] leading-[31px] font-light text-[#737373]">
              {featuredCaseStudy?.listing.introText ?? ""}
            </p>
            <span className="mt-[6px] inline-block h-[10px] w-[10px] rounded-[2px] bg-[#0EC8C5]" aria-hidden />
          </div>
        </div>

        {featuredCaseStudy ? (
          <div className="w-full max-w-[937px] flex flex-col items-center gap-10 md:gap-[41px]">
            <div className="w-full overflow-hidden rounded-[6px] bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
              <Image
                src={featuredCaseStudy.listing.imageSrc}
                alt={featuredCaseStudy.metaTitle}
                width={1874}
                height={1249}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 937px"
                priority
              />
            </div>

            <div className="w-full flex flex-col items-start gap-12 md:gap-[48px]">
              <div className="w-full flex flex-col items-end gap-4 md:gap-[15px]">
                <h2 className="w-full text-right font-bold text-[34px] leading-[1.25] md:text-[44px] md:leading-[1.25] lg:text-[50px] lg:leading-[66px]">
                  {featuredCaseStudy.listing.title}
                </h2>
                <p className="w-full text-right font-light text-[18px] leading-[1.5] md:text-[24px] md:leading-[31px] text-[#787878]">
                  {featuredCaseStudy.listing.caption}
                </p>
              </div>

              <Link
                href={`/case-studies/${featuredCaseStudy.slug}`}
                className="inline-flex items-center justify-center rounded-full border border-[#E21F26] px-[28px] py-[18px] text-[18px] leading-[1.2] md:text-[21px] md:leading-[28px] font-normal text-white transition-colors hover:bg-[#E21F26]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21F26]"
              >
                {featuredCaseStudy.listing.pillLabel ?? featuredCaseStudy.listing.buttonLabel}
              </Link>
            </div>
          </div>
        ) : null}
      </section>

      {remainingCaseStudies.length ? (
        <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 md:px-12 pb-16 md:pb-24">
          <div className="flex flex-col items-center gap-16 md:gap-28">
            {remainingCaseStudies.map((cs) => (
              <div key={cs.slug} className="w-full flex flex-col items-center">
                <div className="w-full max-w-[920px] overflow-hidden rounded-[12px] bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
                  <Image
                    src={cs.listing.imageSrc}
                    alt={cs.metaTitle}
                    width={1600}
                    height={900}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 920px"
                  />
                </div>

                <div className="mt-10 md:mt-12 w-full max-w-[920px] flex flex-col items-center gap-8">
                  <p className="text-center text-[14px] sm:text-[16px] md:text-[18px] leading-[1.6] font-normal text-[#BFBFBF]">
                    {cs.listing.caption}
                  </p>

                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="inline-flex h-[44px] items-center justify-center rounded-full border border-[#E21F26] px-10 text-[14px] font-normal tracking-[0.08em] uppercase text-white transition-colors hover:bg-[#E21F26]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21F26]"
                  >
                    {cs.listing.buttonLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
