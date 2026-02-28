"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { caseStudies as caseStudyData } from "@/data/casestudy";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import Image from "next/image";
import { useSectionTheme } from "@/context/SectionThemeContext";

interface CaseStudiesProps {
  theme?: "dark" | "light";
}

export default function CaseStudies({ theme }: CaseStudiesProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === "dark";

  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const caseStudies = caseStudyData.slice(0, 4).map((cs) => ({
    id: cs.id,
    title: cs.listing.title,
    description: cs.listing.caption,
    category: cs.listing.pillLabel ?? "",
    color: cs.detail.hero.metrics[0]?.color ?? "#E21F26",
    image: cs.listing.imageSrc,
    href: `/case-studies/${cs.slug}`,
  }));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headingScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const headingVisibility = useTransform(scrollYProgress, (v: number) =>
    v > 0.36 ? "hidden" : "visible"
  );

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="relative overflow-visible"
    >
      {/* Sticky heading */}
      <div className="sticky top-0 z-1 flex items-center justify-center px-6 py-20 pointer-events-none max-md:min-h-0 max-md:py-10 max-md:px-5">
        <motion.div
          className="text-center"
          style={{ scale: headingScale, visibility: headingVisibility }}
        >
          <h2
            className={[
              "text-[clamp(3rem,12vw,10rem)] max-md:text-[clamp(2.5rem,12vw,4rem)]",
              "font-black leading-[0.95] tracking-[-0.04em]",
              "transition-colors duration-500",
              isDark ? "text-white" : "text-black",
            ].join(" ")}
          >
            Case Studies
            <span className="text-[#0EC8C5]">.</span>
          </h2>
        </motion.div>
      </div>

      {/* Cards grid */}
      <div className="relative z-2 px-6 pb-[120px] max-w-[1280px] mx-auto max-md:mt-0 max-md:px-4 max-md:pb-16">
        <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1 max-md:gap-6">
          {caseStudies.map((cs, i) => {
            const CardWrapper = cs.href
              ? ({ children }: { children: React.ReactNode }) => (
                  <Link href={cs.href!} className="block no-underline text-inherit">
                    {children}
                  </Link>
                )
              : ({ children }: { children: React.ReactNode }) => <>{children}</>;

            return (
              <div key={cs.id} className={i % 2 === 1 ? "mt-20 max-md:mt-0" : ""}>
                <AnimatedSection delay={i * 0.05} direction="up">
                  <CardWrapper>
                    <div
                      className={[
                        "group overflow-hidden cursor-pointer",
                        "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        "hover:-translate-y-1.5",
                        isDark ? "bg-[#0a0a0a]" : "bg-white",
                      ].join(" ")}
                      onMouseEnter={() => setHoveredCard(cs.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Image */}
                      <div
                        className="w-full aspect-4/3 overflow-hidden relative flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${cs.color}30 0%, ${isDark ? "#2a2a2a" : "#e0e0e0"} 100%)`,
                        }}
                      >
                        <img
                          src={cs.image}
                          alt={cs.title}
                          className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <span
                          className={[
                            "absolute bottom-3 right-4 text-[48px] font-black leading-none pointer-events-none transition-colors duration-500",
                            isDark ? "text-white/15" : "text-black/10",
                          ].join(" ")}
                        >
                          0{cs.id}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="pt-6 px-1 pb-6 max-md:pt-5 max-md:pb-5">
                        <p
                          className={[
                            "text-[0.9rem] leading-[1.55] mb-4 transition-colors duration-500",
                            isDark ? "text-white/60" : "text-[#666]",
                          ].join(" ")}
                        >
                          {cs.description}
                        </p>
                      </div>
                    </div>
                  </CardWrapper>
                </AnimatedSection>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="flex justify-center mt-12">
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 text-xl font-semibold tracking-wide transition-all duration-300 hover:gap-4 no-underline"
          >
            <Image src="/icons/enter.svg" alt="arrow-right" width={30} height={30} />
            <span
              className={[
                "transition-colors duration-200 group-hover:text-[#E21F26]",
                isDark ? "text-white" : "text-[#1a1a1a]",
              ].join(" ")}
            >
              View All
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
