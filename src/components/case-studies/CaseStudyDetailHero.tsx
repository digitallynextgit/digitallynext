import Image from "next/image";
import type { CaseStudyDetail } from "@/data/casestudy";

export default function CaseStudyDetailHero({ detail, metaTitle }: { detail: CaseStudyDetail; metaTitle: string }) {
  const isLight = detail.theme === "light";

  return (
    <section className="w-full pt-28 md:pt-36">
      <div className="mx-auto w-full max-w-[1265px] px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[668px_1fr] gap-10 lg:gap-[84px] items-center">
          <div className="w-full flex flex-col gap-10 lg:gap-[72px]">
            <div className="w-full max-w-[482px] flex flex-col gap-4 lg:gap-[24px]">
              <div className="uppercase text-[16px] md:text-[18px] leading-[1.3] font-normal text-[#E21F26]">
                {detail.hero.eyebrow}
              </div>
              <div className="text-[26px] sm:text-[32px] md:text-[40px] leading-[1.07] font-light">
                {detail.hero.title}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[40px]">
              {detail.hero.metrics.map((m) => (
                <div key={m.value} className="rounded-[10px]" style={{ background: m.background }}>
                  <div className="h-full flex flex-col justify-between p-5 md:p-[16px_27px] min-h-[180px]">
                    <div
                      className="text-[44px] md:text-[54px] leading-[1.3] font-medium tracking-[-0.04em]"
                      style={{ color: m.color }}
                    >
                      {m.value}
                    </div>
                    <div
                      className={
                        isLight
                          ? "text-[16px] md:text-[18px] leading-[1.3] font-normal text-black whitespace-pre-line"
                          : "text-[16px] md:text-[18px] leading-[1.3] font-normal text-white whitespace-pre-line"
                      }
                    >
                      {m.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full overflow-hidden rounded-[10px]">
            <Image
              src={detail.hero.heroImageSrc}
              alt={metaTitle}
              width={513}
              height={518}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1024px) 100vw, 513px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

