import AnimatedList from "@/components/ui/AnimatedList";
import type { CaseStudyDetail } from "@/data/casestudy";

export default function CaseStudyCoreDigitalAssets({ detail }: { detail: CaseStudyDetail }) {
  const isLight = detail.theme === "light";

  return (
    <section className={isLight ? "w-full bg-[#FAFAFA] mt-[-10px] md:mt-[-25px] relative" : "w-full bg-[#0A0A0A] mt-[-10px] md:mt-[-25px] relative"}>
      <div className="w-full px-4 sm:px-6 md:px-[59px] py-10 md:py-[40px] relative">
        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-[142px] items-start">
          <div className="w-full max-w-[463px] flex flex-col gap-6 md:gap-[54px]">
            <div className={isLight ? "text-[44px] sm:text-[56px] md:text-[80px] leading-[1.1] md:leading-[1.3] font-normal text-black" : "text-[44px] sm:text-[56px] md:text-[80px] leading-[1.1] md:leading-[1.3] font-normal text-white"}>
              <span className="text-[#E21F26]">{detail.coreDigitalAssets.headingPrefix}</span> Core
              <br />
              Digital
              <br />
              {detail.coreDigitalAssets.headingHighlight}
            </div>
            <div className={isLight ? "text-[18px] md:text-[32px] leading-[1.4] md:leading-[1.3] font-normal text-[#787878]" : "text-[18px] md:text-[32px] leading-[1.4] md:leading-[1.3] font-normal text-[#BFBFBF]"}>
              {detail.coreDigitalAssets.subheading}
            </div>
          </div>

          <div className="w-full max-w-[560px]">
            <AnimatedList
              items={detail.coreDigitalAssets.items}
              showGradients={false}
              enableArrowNavigation
              className="mt-1"
              itemClassName="min-h-[58px] flex items-center"
              selectedItemClassName="ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

