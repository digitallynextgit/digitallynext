"use client";

import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/data/casestudy";

export default function CaseStudiesList() {
  const remaining = caseStudies.slice(1);

  const CaseCard = ({ cs }: { cs: (typeof caseStudies)[0] }) => (
    <div className="flex flex-col gap-4">

      {/* Image */}
      <Link
        href={`/case-studies/${cs.slug}`}
        className="group block no-underline"
      >
        <div className="w-full rounded overflow-hidden aspect-3/2">
          <Image
            src={cs.listing.imageSrc}
            alt={cs.metaTitle}
            width={800}
            height={533}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-3 pt-2">
        {/* Caption */}
        <p className="text-[15px] font-light leading-[1.6] text-[#787878] m-0">
          {cs.listing.caption}
        </p>

        {/* ✅ View Case Study CTA — same style as hero */}
        <Link
          href={`/case-studies/${cs.slug}`}
          className="group inline-flex items-center gap-2 text-xl font-medium no-underline mt-1"
        >
          <span className="text-[#E21F26] transition-transform duration-300 ease-out group-hover:-translate-x-2">
            <Image src="/icons/enter.svg" alt="arrow-right" width={26} height={26} />
          </span>
          <span className="mt-1 font-light text-[#787878] group-hover:text-[#E21F26] transition-colors duration-200">
            View Case Study
          </span>
        </Link>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-white">
      {/* ✅ .container replaced */}
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 flex justify-center">
        <div className="w-full max-w-[1103px] py-10 md:py-16 lg:py-20 flex flex-col gap-16 md:gap-20 lg:gap-28">
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
