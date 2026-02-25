"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { caseStudies } from "@/data/content";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Heading stays solid black at first, fades smoothly, then hidden
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.3],
    [1, 1, 0],
  );
  const headingScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const headingVisibility = useTransform(scrollYProgress, (v: number) =>
    v > 0.36 ? "hidden" : "visible",
  );

  return (
    <section id="case-studies" ref={sectionRef} className="cs-section">
      {/* Sticky heading in background */}
      <div className="cs-heading-wrapper">
        <motion.div
          className="cs-heading-inner"
          style={{
            // opacity: headingOpacity,
            scale: headingScale,
            visibility: headingVisibility,
          }}
        >
          <div className="cs-label">
            <span className="cs-label-corner">¬</span> SELECTED WORK
          </div>
          <h2 className="cs-heading">
            Case Studies
            <span className="cs-heading-dot !text-[#0EC8C5]">.</span>
          </h2>
        </motion.div>
      </div>

      {/* Cards that scroll up and overlap the heading */}
      <div className="cs-cards-container">
        <div className="cs-cards-grid">
          {caseStudies.map((cs, i) => (
            <AnimatedSection key={cs.id} delay={i * 0.05} direction="up">
              <div
                className="cs-card"
                onMouseEnter={(e) => {
                  const tag = e.currentTarget.querySelector(
                    ".cs-card-tag",
                  ) as HTMLElement;
                  if (tag) {
                    tag.style.backgroundColor = cs.color;
                    tag.style.color = "#FFFFFF";
                  }
                }}
                onMouseLeave={(e) => {
                  const tag = e.currentTarget.querySelector(
                    ".cs-card-tag",
                  ) as HTMLElement;
                  if (tag) {
                    tag.style.backgroundColor = "transparent";
                    tag.style.color = cs.color;
                  }
                }}
              >
                {/* Image */}
                <div
                  className="cs-card-image"
                  style={{
                    background: `linear-gradient(135deg, ${cs.color}30 0%, #2a2a2a 100%)`,
                  }}
                >
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="cs-card-img"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <span className="cs-card-number">0{cs.id}</span>
                </div>

                {/* Text content */}
                <div className="cs-card-content">
                  <h3 className="cs-card-title">
                    {cs.title.split(cs.highlight || "").map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span style={{ color: cs.color }}>
                            {cs.highlight}
                          </span>
                        )}
                      </span>
                    ))}
                  </h3>
                  <p className="cs-card-desc">{cs.description}</p>
                  <span
                    className="cs-card-tag transition-all duration-300 cursor-pointer"
                    style={{
                      borderColor: cs.color,
                      color: cs.color,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.backgroundColor = cs.color;
                      el.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.backgroundColor = "transparent";
                      el.style.color = cs.color;
                    }}
                  >
                    {cs.category}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
