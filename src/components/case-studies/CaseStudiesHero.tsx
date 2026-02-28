import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/casestudy";

export default function CaseStudiesHero() {
  const featuredCaseStudy = caseStudies[0];

  return (
    <section className="bg-white flex flex-col items-center gap-[47px] w-full py-10 md:py-16 lg:py-20">

      {/* Top text block */}
      <div className="mt-10 flex flex-col items-center py-8 gap-14 w-full max-w-[848px] text-center px-4">
        <h1 className="text-[clamp(2rem,5vw,4rem)] font-extralight leading-tight text-center tracking-[-2.0385px] text-black m-0">
          We help brands show up{" "}
          <br />
          <span className="font-medium">where world is watching</span>
          <span className="text-[#0EC8C5]">.</span>
        </h1>

        <p className="max-w-[803px] font-light text-[18px] leading-[31px] text-center text-[#737373] m-0">
          {featuredCaseStudy?.listing.introText ??
            "From ambitious startups to scaling enterprises — Digitally Next builds performance-driven creative systems that turn attention into measurable growth."}
        </p>
      </div>

      {/* Featured case study */}
      {featuredCaseStudy && (
        <div className="flex flex-col items-start gap-4" >
          <Link
            href={`/case-studies/${featuredCaseStudy.slug}`}
            className="flex flex-col items-start gap-[41px] w-full max-w-[937px] px-4"
          >
            {/* Image */}
            <div className="w-full rounded overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.10)]">
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

            {/* Info */}
            <div className="w-full flex flex-col items-start gap-12">
              <div className="w-full flex flex-col items-start gap-[15px]">
                <p className="font-light text-2xl leading-[31px] text-[#787878] m-0 text-left">
                  {featuredCaseStudy.listing.caption}
                </p>
              </div>
            </div>
          </Link>
          <Link
            href={`/case-studies/${featuredCaseStudy.slug}`}
            className="group px-5 flex items-center gap-2 text-2xl font-medium no-underline"
          >
            <span className="text-[#E21F26] transition-transform duration-300 ease-out group-hover:-translate-x-2">
              <Image
                src="/icons/enter.svg"
                alt="arrow-right"
                width={32}
                height={32}
              />
            </span>
            <span
              className={[
                "mt-2 font-light text-[#787878] hover:text-[#E21F26] transition-colors duration-200",
              ].join(" ")}
            >
              View Case Study
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
