"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const cards = [
  {
    title: "What AI should touch",
    desc: "Repetitive workflows, data processing, pattern recognition — AI accelerates what doesn't need human nuance.",
    extraClass: "",
  },
  {
    title: "What humans must own",
    desc: "Strategy, relationships, ethical judgment, creative vision — the work that defines who we are.",
    extraClass: "border-t border-[#E5E5E5] lg:border-t-0 lg:border-l",
  },
  {
    title: "Where judgment matters",
    desc: "The grey zone. Where speed and quality collide. Where the answer isn't obvious — and shouldn't be automated.",
    extraClass: "border-t border-[#E5E5E5] lg:border-t-0 lg:border-l",
  },
];

export default function AdacSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section>
      <div className="container flex justify-center items-center">
        <div style={{ maxWidth: 1103 }} className="py-12 md:py-16 lg:py-20">
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

            {/* Label */}
            <div
              style={{
                color: "#C8102E",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.15em",
              }}
            >
              ADAC
            </div>

            {/* Heading */}
            <div>
              <div
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.975rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                }}
              >
                How we stay intelligent
              </div>
              <div
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.975rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                without losing{" "}
                <span style={{ color: "#E21F26" }}>control</span>
              </div>
            </div>

            {/* Subtitle */}
            <div
              style={{
                maxWidth: 520,
                color: "#A1A1A1",
                fontWeight: 300,
                fontSize: 16,
                lineHeight: 1.8,
              }}
            >
              <div>We don&apos;t use AI everywhere.</div>
              <div>And we don&apos;t avoid it either.</div>
              <div>ADAC is how we decide:</div>
            </div>

            {/* Cards */}
            <div
              style={{ gap: 0, border: "1px solid #E5E5E5" }}
              className="grid grid-cols-1 lg:grid-cols-3"
            >
              {cards.map(({ title, desc, extraClass }, index) => (
                <div
                  key={title}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    padding: 33,
                    background:
                      hoveredIndex === index
                        ? "rgba(14, 200, 197, 0.08)"
                        : "#FFFFFF",
                    transition: "background 0.3s ease",
                    cursor: "default",
                  }}
                  className={extraClass}
                >
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 400,
                      lineHeight: 1.25,
                      color: hoveredIndex === index ? "#0EC8C5" : "#000000",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      marginTop: 16,
                      fontSize: 14,
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: "#A1A1A1",
                    }}
                  >
                    {desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 48,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  color: "#A1A1A1",
                  fontWeight: 300,
                  fontSize: 15,
                  lineHeight: 1.8,
                }}
              >
                <div>It&apos;s how we stay modern</div>
                <div>without becoming careless.</div>
              </div>

              <Link
                href="#open-positions"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 15,
                  color: "#000000",
                  fontSize: 24,
                  fontWeight: 400,
                  lineHeight: 1.3,
                }}
                className="group hover:text-[#E21F26] transition-colors duration-300"
              >
                <Image
                  src="/figma/careers/careers-arrow-link.svg"
                  alt=""
                  width={35}
                  height={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
                Open Roles in ADAC
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
