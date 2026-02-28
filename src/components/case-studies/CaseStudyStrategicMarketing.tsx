import FlowingMenu from "@/components/ui/FlowingMenu";
import type { CaseStudyDetail } from "@/data/casestudy";

export default function CaseStudyStrategicMarketing({ detail }: { detail: CaseStudyDetail }) {
  const isLight = detail.theme === "light";

  return (
    <section className="w-full mt-12 md:mt-[90px] mb-12 md:mb-[120px]">
      <div className="mx-auto w-full max-w-[1269px] px-4 sm:px-6 md:px-12">
        <div className="w-full flex flex-col items-center">
          <div className={isLight ? "w-full text-center text-[34px] sm:text-[48px] md:text-[64px] leading-[1.1] md:leading-[1.3] font-bold" : "w-full text-center text-[34px] sm:text-[48px] md:text-[64px] leading-[1.1] md:leading-[1.3] font-bold text-white"}>
            {detail.strategicMarketing.headingPrefix}{" "}
            <span className="text-[#E21F26]">{detail.strategicMarketing.headingHighlight}</span>
            <span className="text-[#0EC8C5]">.</span>
          </div>

          <div className="w-full mt-8 md:mt-[24px] lg:mt-[36px] overflow-hidden">
            <FlowingMenu
              items={detail.strategicMarketing.menuItems}
              speed={15}
              textColor="#ffffff"
              bgColor="#060010"
              marqueeBgColor="#ffffff"
              marqueeTextColor="#060010"
              borderColor="#ffffff"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

