import Image from "next/image";
import type { CaseStudyDetail } from "@/data/casestudy";

export default function CaseStudyFocusArea({ detail }: { detail: CaseStudyDetail }) {
  const isLight = detail.theme === "light";
  const first = detail.focusArea.cards[0];
  const rest = detail.focusArea.cards.slice(1, 4);

  return (
    <section className="w-full mt-10 md:mt-[79px]">
      <div className="mx-auto w-full max-w-[1274px] px-4 sm:px-6 md:px-12 flex flex-col items-center gap-4 md:gap-[16px]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,844px)_1fr] gap-4 md:gap-[16px]">
          <div className="rounded-[10px] bg-[#0EC8C5] p-6 md:p-[34px_28px]">
            <div className="w-full flex flex-col justify-between gap-8 min-h-[240px]">
              <div className="uppercase text-[34px] sm:text-[44px] md:text-[56px] leading-[1.15] md:leading-[1.3] font-bold text-white">
                {detail.focusArea.heading}
              </div>
              <div className="text-[14px] md:text-[16px] leading-[1.5] md:leading-[1.3] font-normal text-white whitespace-pre-line">
                {detail.focusArea.body}
              </div>
            </div>
          </div>

          <div className={isLight ? "rounded-[10px] bg-[#FAFAFA] p-6 md:p-[34px_28px]" : "rounded-[10px] bg-[#111111] p-6 md:p-[34px_28px]"}>
            <div className="h-full flex flex-col justify-between min-h-[240px]">
              <div className="flex flex-col gap-3 md:gap-[16px]">
                <Image src="/figma/case-study/icon-check.svg" alt="" width={34} height={34} className="w-[34px] h-[34px]" />
                <div className={isLight ? "uppercase text-[20px] md:text-[24px] leading-[1.3] font-bold text-black" : "uppercase text-[20px] md:text-[24px] leading-[1.3] font-bold text-white"}>
                  {first?.title ?? ""}
                </div>
              </div>
              <div className={isLight ? "text-[14px] md:text-[16px] leading-[1.5] md:leading-[1.3] font-normal text-black" : "text-[14px] md:text-[16px] leading-[1.5] md:leading-[1.3] font-normal text-white"}>
                {first?.description ?? ""}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[16px]">
          {rest.map((c) => (
            <div key={c.title} className={isLight ? "rounded-[10px] bg-[#FAFAFA] p-6 md:p-[34px_28px]" : "rounded-[10px] bg-[#111111] p-6 md:p-[34px_28px]"}>
              <div className="h-full flex flex-col justify-between min-h-[200px]">
                <div className="flex flex-col gap-3 md:gap-[16px]">
                  <Image src="/figma/case-study/icon-check.svg" alt="" width={34} height={34} className="w-[34px] h-[34px]" />
                  <div className={isLight ? "uppercase text-[20px] md:text-[24px] leading-[1.3] font-bold text-black" : "uppercase text-[20px] md:text-[24px] leading-[1.3] font-bold text-white"}>
                    {c.title}
                  </div>
                </div>
                <div className={isLight ? "text-[14px] md:text-[16px] leading-[1.5] md:leading-[1.3] font-normal text-black" : "text-[14px] md:text-[16px] leading-[1.5] md:leading-[1.3] font-normal text-white"}>
                  {c.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

