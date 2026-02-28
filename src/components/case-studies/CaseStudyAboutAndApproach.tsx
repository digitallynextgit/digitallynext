import Image from "next/image";
import type { CaseStudyDetail } from "@/data/casestudy";

export default function CaseStudyAboutAndApproach({ detail }: { detail: CaseStudyDetail }) {
  return (
    <section className="w-full mt-14 md:mt-[86px] bg-gray-100">
      <div className="w-full px-4 md:px-36 py-10 md:py-16 lg:py-20 flex items-center justify-center">
        <div className="max-w-[1280px] w-full flex flex-col gap-10 lg:gap-[72px]">
          <div className="grid grid-cols-1 lg:grid-cols-[492px_1fr] gap-10 lg:gap-[72px] items-start">
            <div className="w-full bg-white rounded-[10px] p-6 md:p-[31px_38px]">
              <div className="w-full flex flex-col gap-6 md:gap-[33px]">
                {detail.about.fields.map((f) => (
                  <div key={f.label} className="w-full flex flex-col gap-2">
                    <div className="uppercase text-[12px] md:text-[13px] tracking-[0.2em] font-semibold text-[#B3B3B3]">
                      {f.label}
                    </div>
                    <div className="text-[14px] md:text-[16px] leading-tight font-medium text-black">
                      {f.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full flex flex-col items-center gap-4 md:gap-6">
              <div className="text-lg capitalize font-400 text-center">
                {detail.intro}
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <div className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold tracking-[-0.02em] text-black uppercase">
                  {detail.objective.heading}
                  <span className="text-[#0EC8C5] text-[32px] sm:text-[40px] md:text-[48px] font-extrabold">
                    .
                  </span>
                </div>
              </div>
              <div className="text-[14px] md:text-[16px] leading-[1.6] text-center max-w-[520px]">
                {detail.objective.body}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[492px_1fr] gap-10 lg:gap-[72px] items-center">
            <div className="w-full flex flex-col items-center gap-3 md:gap-4">
              <div className="flex items-baseline gap-2 flex-wrap">
                <div className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold tracking-[-0.02em] text-black">
                  {detail.approach.heading}
                  <span className="text-[#0EC8C5] text-[32px] sm:text-[40px] md:text-[48px] font-extrabold">
                    .
                  </span>
                </div>
              </div>
              <div className="text-[14px] md:text-[16px] leading-[1.6]">
                {detail.approach.body}
              </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-10">
              {detail.approach.cards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-[10px] bg-white"
                  style={{
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0px 4px 0px 0px rgba(0, 0, 0, 0.06)",
                    padding: "20px 26px",
                  }}
                >
                  <div className="h-full flex flex-col gap-4">
                    <Image src={card.iconSrc} alt="" width={28} height={28} className="w-[28px] h-[28px]" />
                    <div className="text-[14px] md:text-[16px] leading-[1.4] font-semibold text-black">
                      {card.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

