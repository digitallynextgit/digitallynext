import Image from "next/image";
import type { CaseStudyDetail } from "@/data/casestudy";

export default function CaseStudyAboutAndApproach({ detail }: { detail: CaseStudyDetail }) {
  const isLight = detail.theme === "light";

  return (
    <section className={isLight ? "w-full mt-14 md:mt-[86px] bg-[#FAFAFA]" : "w-full mt-14 md:mt-[86px] bg-[#0A0A0A]"}>
      <div className="w-full px-4 sm:px-6 md:px-[73px] py-12 md:py-[78px]">
        <div className="grid grid-cols-1 lg:grid-cols-[492px_1fr] gap-10 lg:gap-[72px] items-center">
          <div className={isLight ? "w-full bg-white rounded-[10px] p-6 md:p-[31px_38px]" : "w-full bg-[#111111] rounded-[10px] p-6 md:p-[31px_38px]"}>
            <div className="w-full flex flex-col gap-6 md:gap-[33px]">
              <Image
                src={detail.about.logoSrc}
                alt=""
                width={171}
                height={105}
                className="w-[171px] h-[105px] object-contain"
              />

              <div className="w-full flex flex-col gap-3 md:gap-[16px]">
                <div className="uppercase text-[14px] md:text-[16px] leading-[1.3] font-normal text-[#A7A7A7]">
                  ABOUT
                </div>
                <div
                  className={
                    isLight
                      ? "text-[14px] md:text-[16px] leading-[1.5] md:leading-[1.3] font-normal text-black"
                      : "text-[14px] md:text-[16px] leading-[1.5] md:leading-[1.3] font-normal text-white"
                  }
                >
                  {detail.about.quote}
                </div>
              </div>

              {detail.about.fields.map((f) => (
                <div key={f.label} className="w-full flex flex-col gap-3 md:gap-[16px]">
                  <div className="uppercase text-[14px] md:text-[16px] leading-[1.3] font-normal text-[#A7A7A7]">
                    {f.label}
                  </div>
                  <div
                    className={
                      isLight
                        ? "text-[14px] md:text-[16px] leading-[1.3] font-normal text-black"
                        : "text-[14px] md:text-[16px] leading-[1.3] font-normal text-white"
                    }
                  >
                    {f.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col gap-8 md:gap-[36px]">
            <div
              className={
                isLight
                  ? "text-[16px] md:text-[18px] leading-[1.5] md:leading-[1.3] font-normal text-black"
                  : "text-[16px] md:text-[18px] leading-[1.5] md:leading-[1.3] font-normal text-white"
              }
            >
              {detail.intro}
            </div>

            <div className="w-full flex flex-col gap-4 md:gap-[20px]">
              <div className="uppercase text-[34px] sm:text-[44px] md:text-[56px] leading-[1.15] md:leading-[1.3] font-bold text-[#A7A7A7]">
                {detail.objective.heading}
              </div>
              <div
                className={
                  isLight
                    ? "text-[16px] md:text-[18px] leading-[1.5] md:leading-[1.3] font-normal text-black"
                    : "text-[16px] md:text-[18px] leading-[1.5] md:leading-[1.3] font-normal text-white"
                }
              >
                {detail.objective.body}
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 md:gap-[20px]">
              <div className="uppercase text-[34px] sm:text-[44px] md:text-[56px] leading-[1.15] md:leading-[1.3] font-bold text-[#A7A7A7]">
                {detail.approach.heading}
              </div>
              <div
                className={
                  isLight
                    ? "text-[16px] md:text-[18px] leading-[1.5] md:leading-[1.3] font-normal text-black"
                    : "text-[16px] md:text-[18px] leading-[1.5] md:leading-[1.3] font-normal text-white"
                }
              >
                {detail.approach.body}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-[24px]">
              {detail.approach.cards.map((card) => (
                <div
                  key={card.label}
                  className={isLight ? "rounded-[10px] bg-[rgba(255,255,255,0.5)]" : "rounded-[10px] bg-[rgba(255,255,255,0.06)]"}
                  style={{
                    border: isLight ? "1px solid #FFFFFF" : "1px solid rgba(255,255,255,0.12)",
                    boxShadow: isLight
                      ? "0px 4px 0px 0px rgba(0, 0, 0, 0.1)"
                      : "0px 4px 0px 0px rgba(255, 255, 255, 0.06)",
                    padding: "19px 34px",
                  }}
                >
                  <div className="h-full flex flex-col justify-between min-h-[160px]">
                    <Image src={card.iconSrc} alt="" width={34} height={34} className="w-[34px] h-[34px]" />
                    <div
                      className={
                        isLight
                          ? "text-[16px] md:text-[18px] leading-[1.3] font-normal text-black"
                          : "text-[16px] md:text-[18px] leading-[1.3] font-normal text-white"
                      }
                    >
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

