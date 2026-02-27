import Image from "next/image";
import Link from "next/link";
import type { CaseStudyDetail } from "@/data/casestudy";

export default function CaseStudyOtherTeams({ detail }: { detail: CaseStudyDetail }) {
  const isLight = detail.theme === "light";

  return (
    <section className="w-full mt-14 md:mt-[118px]">
      <div className="w-full px-4 sm:px-6 md:px-[57px]">
        <div className="mx-auto w-full max-w-[1327px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className={isLight ? "text-[32px] sm:text-[44px] md:text-[56px] leading-[1.1] md:leading-[1.3] font-bold" : "text-[32px] sm:text-[44px] md:text-[56px] leading-[1.1] md:leading-[1.3] font-bold text-white"}>
            <p className="font-normal">See how other teams are</p>
            <span className="font-normal">winning with</span>{"   "}
            {detail.otherTeams.heading.split("\\n").map((line, idx) => (
              <span key={idx}>
                {line}
                {idx === 0 ? <br className="hidden sm:block" /> : null}
              </span>
            ))}
          </div>

          <Link href={detail.otherTeams.linkHref} className="flex items-center gap-[15.3px] w-fit">
            <Image src="/figma/case-study/icon-arrow.svg" alt="" width={35} height={16} className="w-[35.39px] h-[16.26px]" />
            <div className={isLight ? "text-[22px] sm:text-[28px] md:text-[34.43px] leading-[1.3] font-normal" : "text-[22px] sm:text-[28px] md:text-[34.43px] leading-[1.3] font-normal text-white"}>
              {detail.otherTeams.linkLabel}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

