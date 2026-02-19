"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import FlowingMenu from "@/components/ui/FlowingMenu";
import AnimatedList from "@/components/ui/AnimatedList";

export default function CaseStudyPage() {
  const strategicMarketingItems = useMemo(
    () => [
      { link: "#", text: "Mojave", image: "https://picsum.photos/600/400?random=1" },
      { link: "#", text: "Sonoma", image: "https://picsum.photos/600/400?random=2" },
      { link: "#", text: "Monterey", image: "https://picsum.photos/600/400?random=3" },
      { link: "#", text: "Sequoia", image: "https://picsum.photos/600/400?random=4" },
    ],
    []
  );

  const coreAssets = useMemo(
    () => [
      "Microsite",
      "Engagement Promotional Assets",
      "Item 3",
      "Item 4",
      "Item 5",
      "Item 6",
      "Item 7",
      "Item 8",
      "Item 9",
    ],
    []
  );

  return (
    <div className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1440px]">
        <section className="w-full pt-28 md:pt-[246px]">
          <div className="mx-auto w-full max-w-[1265px] px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[668px_1fr] gap-10 lg:gap-[84px] items-center">
              <div className="w-full flex flex-col gap-10 lg:gap-[72px]">
                <div className="w-full max-w-[482px] flex flex-col gap-4 lg:gap-[24px]">
                  <div className="uppercase text-[16px] md:text-[18px] leading-[1.3] font-normal text-[#E21F26]">
                    NeoTECH
                  </div>
                  <div className="text-[26px] sm:text-[32px] md:text-[40px] leading-[1.07] font-light">
                    Launch of a high end Judaica Art gallery and 5 Artists for
                    International Markets-US | UK
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[40px]">
                  <div className="rounded-[10px] bg-[rgba(226,31,38,0.05)]">
                    <div className="h-full flex flex-col justify-between p-5 md:p-[16px_27px] min-h-[180px]">
                      <div className="text-[44px] md:text-[54px] leading-[1.3] font-medium tracking-[-0.04em] text-[#E21F26]">
                        400%
                      </div>
                      <div className="text-[16px] md:text-[18px] leading-[1.3] font-normal text-black">
                        times more Media
                        <br />
                        Recognition
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[10px] bg-[rgba(14,200,197,0.05)]">
                    <div className="h-full flex flex-col justify-between p-5 md:p-[16px_27px] min-h-[180px]">
                      <div className="text-[44px] md:text-[54px] leading-[1.3] font-medium tracking-[-0.04em] text-[#0EC8C5]">
                        30%
                      </div>
                      <div className="text-[16px] md:text-[18px] leading-[1.3] font-normal text-black max-w-[232px]">
                        increase in revenues from a disruptive
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full overflow-hidden rounded-[10px]">
                <Image
                  src="/figma/case-study/hero-judicia-art-gallery-378231.png"
                  alt="Judicia Art Gallery"
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

        <section className="w-full mt-14 md:mt-[86px] bg-[#FAFAFA]">
          <div className="w-full px-4 sm:px-6 md:px-[73px] py-12 md:py-[78px]">
            <div className="grid grid-cols-1 lg:grid-cols-[492px_1fr] gap-10 lg:gap-[72px] items-center">
              <div className="w-full bg-white rounded-[10px] p-6 md:p-[31px_38px]">
                <div className="w-full flex flex-col gap-6 md:gap-[33px]">
                  <Image
                    src="/figma/case-study/about-logo.png"
                    alt="Logo"
                    width={171}
                    height={105}
                    className="w-[171px] h-[105px] object-contain"
                  />

                  <div className="w-full flex flex-col gap-3 md:gap-[16px]">
                    <div className="uppercase text-[14px] md:text-[16px] leading-[1.3] font-normal text-[#A7A7A7]">
                      ABOUT
                    </div>
                    <div className="text-[14px] md:text-[16px] leading-[1.5] md:leading-[1.3] font-normal text-black">
                      &quot;Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit, sed do eiusmod tempor incididunt ut labore et dolore
                      magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat._&quot;
                    </div>
                  </div>

                  {[
                    ["Industry", "Healthcare"],
                    ["Category", "Hearing Aids-Accessories- Software"],
                    ["Region", "India"],
                  ].map(([k, v]) => (
                    <div key={k} className="w-full flex flex-col gap-3 md:gap-[16px]">
                      <div className="uppercase text-[14px] md:text-[16px] leading-[1.3] font-normal text-[#A7A7A7]">
                        {k}
                      </div>
                      <div className="text-[14px] md:text-[16px] leading-[1.3] font-normal text-black">
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full flex flex-col gap-8 md:gap-[36px]">
                <div className="text-[16px] md:text-[18px] leading-[1.5] md:leading-[1.3] font-normal text-black">
                  Breaking the social taboo to create a high level of awareness
                  where the client is a flag bearer in the bringing the change.
                </div>

                <div className="w-full flex flex-col gap-4 md:gap-[20px]">
                  <div className="uppercase text-[34px] sm:text-[44px] md:text-[56px] leading-[1.15] md:leading-[1.3] font-bold text-[#A7A7A7]">
                    Objective Goal.
                  </div>
                  <div className="text-[16px] md:text-[18px] leading-[1.5] md:leading-[1.3] font-normal text-black">
                    Build a Movement along with strong brand recall and enhanced
                    media attention including global social councils. All from
                    Digital replacing TV spend.
                  </div>
                </div>

                <div className="w-full flex flex-col gap-4 md:gap-[20px]">
                  <div className="uppercase text-[34px] sm:text-[44px] md:text-[56px] leading-[1.15] md:leading-[1.3] font-bold text-[#A7A7A7]">
                    Approach.
                  </div>
                  <div className="text-[16px] md:text-[18px] leading-[1.5] md:leading-[1.3] font-normal text-black">
                    Mix of Strategy
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-[24px]">
                  {[
                    {
                      icon: "/figma/case-study/icon-cloud-lightning.svg",
                      label: "Functional",
                      width: 34,
                      height: 34,
                    },
                    {
                      icon: "/figma/case-study/icon-trending-up.svg",
                      label: "Operational pursuits",
                      width: 32,
                      height: 32,
                    },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="rounded-[10px] bg-[rgba(255,255,255,0.5)]"
                      style={{
                        border: "1px solid #FFFFFF",
                        boxShadow: "0px 4px 0px 0px rgba(0, 0, 0, 0.1)",
                        padding: "19px 34px",
                      }}
                    >
                      <div className="h-full flex flex-col justify-between min-h-[160px]">
                        <Image
                          src={card.icon}
                          alt=""
                          width={card.width}
                          height={card.height}
                          className="w-[34px] h-[34px]"
                        />
                        <div className="text-[16px] md:text-[18px] leading-[1.3] font-normal text-black">
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

        <section className="w-full mt-10 md:mt-[79px]">
          <div className="mx-auto w-full max-w-[1274px] px-4 sm:px-6 md:px-12 flex flex-col items-center gap-4 md:gap-[16px]">
            <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,844px)_1fr] gap-4 md:gap-[16px]">
              <div className="rounded-[10px] bg-[#0EC8C5] p-6 md:p-[34px_28px]">
                <div className="w-full flex flex-col justify-between gap-8 min-h-[240px]">
                  <div className="uppercase text-[34px] sm:text-[44px] md:text-[56px] leading-[1.15] md:leading-[1.3] font-bold text-white">
                    Focus Area.
                  </div>
                  <div className="text-[14px] md:text-[16px] leading-[1.5] md:leading-[1.3] font-normal text-white">
                    &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat._&quot;
                  </div>
                </div>
              </div>

              <div className="rounded-[10px] bg-[#FAFAFA] p-6 md:p-[34px_28px]">
                <div className="h-full flex flex-col justify-between min-h-[240px]">
                  <div className="flex flex-col gap-3 md:gap-[16px]">
                    <Image
                      src="/figma/case-study/icon-check.svg"
                      alt=""
                      width={34}
                      height={34}
                      className="w-[34px] h-[34px]"
                    />
                    <div className="uppercase text-[20px] md:text-[24px] leading-[1.3] font-bold text-black">
                      Social Media
                    </div>
                  </div>
                  <div className="text-[14px] md:text-[16px] leading-[1.5] md:leading-[1.3] font-normal text-black">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[16px]">
              {["Digital PR", "Thought Leadership", "Industry Association"].map((title) => (
                <div key={title} className="rounded-[10px] bg-[#FAFAFA] p-6 md:p-[34px_28px]">
                  <div className="h-full flex flex-col justify-between min-h-[200px]">
                    <div className="flex flex-col gap-3 md:gap-[16px]">
                      <Image
                        src="/figma/case-study/icon-check.svg"
                        alt=""
                        width={34}
                        height={34}
                        className="w-[34px] h-[34px]"
                      />
                      <div className="uppercase text-[20px] md:text-[24px] leading-[1.3] font-bold text-black">
                        {title}
                      </div>
                    </div>
                    <div className="text-[14px] md:text-[16px] leading-[1.5] md:leading-[1.3] font-normal text-black">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full mt-12 md:mt-[90px] mb-12 md:mb-[120px]">
          <div className="mx-auto w-full max-w-[1269px] px-4 sm:px-6 md:px-12">
            <div className="w-full flex flex-col items-center">
              <div className="w-full text-center text-[34px] sm:text-[48px] md:text-[64px] leading-[1.1] md:leading-[1.3] font-bold">
                Strategic Marketing{" "}
                <span className="text-[#E21F26]">Support</span>
                <span className="text-[#0EC8C5]">.</span>
              </div>

              <div className="w-full mt-8 md:mt-[24px] overflow-hidden h-[360px] sm:h-[460px] md:h-[600px]">
                <FlowingMenu
                  items={strategicMarketingItems}
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

        <section className="w-full bg-[#FAFAFA] mt-[-10px] md:mt-[-25px] relative">
          <div className="w-full px-4 sm:px-6 md:px-[59px] py-10 md:py-[40px] relative">
            <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-[142px] items-start">
              <div className="w-full max-w-[463px] flex flex-col gap-6 md:gap-[54px]">
                <div className="text-[44px] sm:text-[56px] md:text-[80px] leading-[1.1] md:leading-[1.3] font-normal text-black">
                  <span className="text-[#E21F26]">Core</span> Digital
                  <br />
                  Assets
                </div>
                <div className="text-[18px] md:text-[32px] leading-[1.4] md:leading-[1.3] font-normal text-[#787878]">
                  All frameworks are powered by Modern DAD thinking and governed
                  by the AI Decision &amp; Acceleration Center.
                </div>
              </div>

              <div className="w-full max-w-[560px]">
                <AnimatedList
                  items={coreAssets}
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

        <section className="w-full mt-14 md:mt-[118px]">
          <div className="w-full px-4 sm:px-6 md:px-[57px]">
            <div className="mx-auto w-full max-w-[1327px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="text-[32px] sm:text-[44px] md:text-[56px] lg:text-[72px] leading-[1.1] md:leading-[1.3] font-bold">
                See how other teams are{" "}
                <br className="hidden sm:block" />
                winning with Digitally Next.
              </div>

              <Link href="/#case-studies" className="flex items-center gap-[15.3px] w-fit">
                <Image
                  src="/figma/case-study/icon-arrow.svg"
                  alt=""
                  width={35}
                  height={16}
                  className="w-[35.39px] h-[16.26px]"
                />
                <div className="text-[22px] sm:text-[28px] md:text-[34.43px] leading-[1.3] font-normal">
                  Case Studies
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full mt-14 md:mt-[118px]">
          <div className="w-full px-4 sm:px-6 md:px-[57px]">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[53.38px]">
              {[0, 1].map((i) => (
                <div key={i} className="w-full flex flex-col gap-6 md:gap-[36.81px]">
                  <div className="w-full overflow-hidden rounded-[8px] md:rounded-[5.177px]">
                    <Image
                      src="/figma/case-study/advent-case-study-69de24.png"
                      alt=""
                      width={638}
                      height={425}
                      className="w-full h-auto object-cover"
                      sizes="(max-width: 1024px) 100vw, 638px"
                    />
                  </div>

                  <div className="w-full flex flex-col gap-6 md:gap-[43.214px]">
                    <div className="w-full flex flex-col gap-3 md:gap-[13.604px]">
                      <div className="text-[32px] sm:text-[38px] md:text-[44.815px] leading-[1.15] md:leading-[1.3] font-bold text-black">
                        Advent Global
                      </div>
                      <div className="text-[16px] sm:text-[18px] md:text-[22.577px] leading-[1.4] md:leading-[1.3] font-light text-[#787878] w-full max-w-[616.06px]">
                        Transforming Legacy ( more than 3 decades old
                        organization) Brand Image to the New Age evolved Brand
                        Positioning.
                      </div>
                    </div>

                    <div
                      className="inline-flex items-center justify-center border rounded-[26.235px] w-fit"
                      style={{
                        borderColor: "#E21F26",
                        borderWidth: "0.800259px",
                        padding: "13.1176px 19.6764px",
                        height: "43.21px",
                      }}
                    >
                      <div className="text-[16px] md:text-[19.206px] leading-[1.3] font-normal text-black text-center">
                        IT &amp; ITES
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative w-full mt-14 md:mt-[86px] overflow-hidden py-16 md:py-[81px] px-4 sm:px-6 md:px-[98px]"
        >
          <div className="absolute inset-0">
            <Image
              src="/figma/case-study/cta-bg-4ff61d.png"
              alt=""
              fill
              className="object-cover"
              priority={false}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1244px] flex flex-col items-center gap-10 md:gap-[80px]">
            <div className="w-full flex flex-col items-center gap-8 md:gap-[80px]">
              <div className="w-full text-center text-[44px] sm:text-[60px] md:text-[88px] leading-[1.05] md:leading-[1.1818] font-bold text-white">
                Let&apos;s Build Something
                <br />
                That Lasts.
              </div>
              <div className="w-full text-center text-[16px] sm:text-[20px] md:text-[32px] leading-[1.5] md:leading-[1.3] font-light text-white">
                We work best with teams that value structure, clarity, and
                long-term thinking.
                <br />
                <br />
                If you&apos;re looking for shortcuts, quick hacks, or
                transactional execution, we may not be the right fit.
                <br />
                <br />
                If you&apos;re building something meant to scale, let&apos;s
                talk.
              </div>
            </div>

            <div className="relative w-[237px] h-[55px]">
              <div
                className="absolute inset-0"
                style={{
                  filter: "blur(4px)",
                  border: "2px solid transparent",
                  borderImage:
                    "linear-gradient(90deg, rgba(226, 31, 38, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(14, 200, 197, 1) 100%) 1",
                }}
              />
              <Link
                href="#contact"
                className="relative w-full h-full flex items-center justify-center uppercase text-[24px] leading-[1.3] font-normal text-white"
                style={{
                  border: "2px solid transparent",
                  borderImage:
                    "linear-gradient(90deg, rgba(226, 31, 38, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(14, 200, 197, 1) 100%) 1",
                }}
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
