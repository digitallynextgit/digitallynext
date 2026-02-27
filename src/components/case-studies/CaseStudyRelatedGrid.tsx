import Image from "next/image";
import Link from "next/link";
import type { CaseStudyDetail } from "@/data/casestudy";

export default function CaseStudyRelatedGrid({ detail }: { detail: CaseStudyDetail }) {
  const isLight = detail.theme === "light";

  return (
    <section className="w-full mt-14 md:mt-[118px]">
      <div className="w-full px-4 sm:px-6 md:px-[57px]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[53.38px]">
          {detail.relatedCaseStudies.map((cs) => (
            <div key={cs.href} className="w-full flex flex-col gap-6 md:gap-[36.81px]">
              <div className="w-full overflow-hidden rounded-[8px] md:rounded-[5.177px]">
                <Image
                  src={cs.imageSrc}
                  alt=""
                  width={638}
                  height={425}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 100vw, 638px"
                />
              </div>

              <div className="w-full flex flex-col gap-6 md:gap-[43.214px]">
                <div className="w-full flex flex-col gap-3 md:gap-[13.604px]">
                  <div className={isLight ? "text-[32px] sm:text-[38px] md:text-[44.815px] leading-[1.15] md:leading-[1.3] font-bold text-black" : "text-[32px] sm:text-[38px] md:text-[44.815px] leading-[1.15] md:leading-[1.3] font-bold text-white"}>
                    {cs.title}
                  </div>
                  <div className={isLight ? "text-[16px] sm:text-[18px] md:text-[22.577px] leading-[1.4] md:leading-[1.3] font-light text-[#787878] w-full max-w-[616.06px]" : "text-[16px] sm:text-[18px] md:text-[22.577px] leading-[1.4] md:leading-[1.3] font-light text-[#BFBFBF] w-full max-w-[616.06px]"}>
                    {cs.description}
                  </div>
                </div>

                <Link
                  href={cs.href}
                  className={
                    isLight
                      ? "inline-flex items-center justify-center border rounded-[26.235px] w-fit"
                      : "inline-flex items-center justify-center border rounded-[26.235px] w-fit text-white"
                  }
                  style={{
                    borderColor: "#E21F26",
                    borderWidth: "0.800259px",
                    padding: "13.1176px 19.6764px",
                    height: "43.21px",
                  }}
                >
                  <div className={isLight ? "text-[16px] md:text-[19.206px] leading-[1.3] font-normal text-black text-center" : "text-[16px] md:text-[19.206px] leading-[1.3] font-normal text-white text-center"}>
                    {cs.tag}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

