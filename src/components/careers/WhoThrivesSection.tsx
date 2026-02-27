"use client";

import Image from "next/image";
import { useState } from "react";

const traits = [
  {
    before: "Like ",
    bold: "structure",
    after: ", but hate rigidity",
    image: "/figma/careers/careers-thrives-1.png",
  },
  {
    before: 'Ask "',
    bold: "why",
    after: '" before "how"',
    image: "/figma/careers/careers-thrives-2.png",
  },
  {
    before: "Care about ",
    bold: "outcomes",
    after: ", not just effort",
    image: "/figma/careers/careers-thrives-3.png",
  },
  {
    before: "Want to ",
    bold: "grow",
    after: " without pretending",
    image: "/figma/careers/careers-thrives-4.png",
  },
];

export default function WhoThrivesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section style={{ position: "relative", overflow: "hidden" }}>

      {/* Default background */}
      <Image
        src="/figma/careers/careers-thrives-bg-48937d.png"
        alt=""
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          transition: "opacity 0.4s ease",
          opacity: hoveredIndex === null ? 1 : 0,
        }}
      />

      {/* Per-trait hover images */}
      {traits.map((trait, index) => (
        <Image
          key={index}
          src={trait.image}
          alt=""
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            transition: "opacity 0.4s ease",
            opacity: hoveredIndex === index ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay */}
      <div
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1 }}
      />

      {/* Content */}
      <div
        className="container relative flex justify-center items-center"
        style={{ color: "#FFFFFF", zIndex: 2 }}
      >
        <div style={{ maxWidth: 1103 }} className="w-full py-12 md:py-16 lg:py-20">

          {/* Heading */}
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 2.975rem)",
                fontWeight: 400,
                lineHeight: 1.15,
              }}
            >
              Who Thrives at{" "}
              <span style={{ color: "#E21F26", fontWeight: 700 }}>Digitally</span>{" "}
              <span style={{ fontWeight: 700, color: "#FFFFFF" }}>Next</span>
              <span style={{ color: "#0EC8C5", fontWeight: 700 }}>.</span>
            </h2>
            <div
              style={{
                marginTop: 24,
                color: "#D1D1D1",
                fontWeight: 300,
                fontSize: 16,
                lineHeight: 1.8,
              }}
            >
              People who do well here usually:
            </div>
          </div>

          {/* Traits Grid */}
          <div
            style={{
              marginTop: 64,
              maxWidth: 800,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16"
          >
            {/* Left column — traits 0 and 2 */}
            <div>
              {[0, 2].map((traitIdx) => {
                const trait = traits[traitIdx];
                return (
                  <div
                    key={traitIdx}
                    onMouseEnter={() => setHoveredIndex(traitIdx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      paddingTop: 25,
                      paddingBottom: 25,
                      borderTop: "1px solid rgba(255,255,255,0.15)",
                      cursor: "default",
                      transition: "opacity 0.3s ease",
                      opacity:
                        hoveredIndex === null || hoveredIndex === traitIdx
                          ? 1
                          : 0.4,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 17,
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color:
                          hoveredIndex === traitIdx ? "#0EC8C5" : "#FFFFFF",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {trait.before}
                      <span style={{ fontWeight: 700 }}>{trait.bold}</span>
                      {trait.after}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right column — traits 1 and 3 */}
            <div>
              {[1, 3].map((traitIdx) => {
                const trait = traits[traitIdx];
                return (
                  <div
                    key={traitIdx}
                    onMouseEnter={() => setHoveredIndex(traitIdx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      paddingTop: 25,
                      paddingBottom: 25,
                      borderTop: "1px solid rgba(255,255,255,0.15)",
                      cursor: "default",
                      transition: "opacity 0.3s ease",
                      opacity:
                        hoveredIndex === null || hoveredIndex === traitIdx
                          ? 1
                          : 0.4,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 17,
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color:
                          hoveredIndex === traitIdx ? "#0EC8C5" : "#FFFFFF",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {trait.before}
                      <span style={{ fontWeight: 700 }}>{trait.bold}</span>
                      {trait.after}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom text */}
          <div
            style={{
              marginTop: 56,
              textAlign: "center",
              color: "#D1D1D1",
              fontWeight: 300,
              fontSize: 15,
              lineHeight: 1.8,
            }}
          >
            <div>This isn&apos;t the place for shortcuts.</div>
            <div>But it is a place to build something solid.</div>
          </div>

        </div>
      </div>
    </section>
  );
}
