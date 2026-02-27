"use client";

import Image from "next/image";
import { useState } from "react";

const items = [
  {
    sub: "Data doesn't sit in dashboards.",
    main: "It shapes decisions.",
    image: "/figma/careers/careers-modern-dad-1.png",
  },
  {
    sub: "AI doesn't replace thinking.",
    main: "It removes friction.",
    image: "/figma/careers/careers-modern-dad-2.png",
  },
  {
    sub: "Digital isn't a channel.",
    main: "It's the system.",
    image: "/figma/careers/careers-modern-dad-3.png",
  },
];

export default function ModernDadSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeImage =
    hoveredIndex !== null
      ? items[hoveredIndex].image
      : "/figma/careers/careers-modern-dad.png";

  return (
    <section style={{ background: "#000000", color: "#FFFFFF" }}>
      <div className="container relative flex items-center justify-center">
        <div style={{ maxWidth: 1103 }} className="w-full py-12 md:py-16 lg:py-20">

          {/* Top label */}
          <div
            style={{
              color: "#0EC8C5",
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: "0.1125em",
            }}
          >
            MODERN DAD
          </div>

          {/* Main layout row */}
          <div className="flex items-start justify-between gap-12 mt-6">

            {/* Left: heading + items */}
            <div className="flex-1">
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.975rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                }}
              >
                How work moves forward here
              </h2>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 64 }}
                className="mt-12 lg:mt-[88px]"
              >
                {items.map(({ sub, main }, index) => (
                  <div
                    key={sub}
                    style={{
                      borderLeft: `2px solid ${hoveredIndex === index ? "#0EC8C5" : "#C8102E"}`,
                      transition: "border-color 0.3s ease",
                      cursor: "default",
                    }}
                    className="pl-6 lg:pl-[50px]"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      style={{
                        color: "#0EC8C5",
                        fontSize: 16,
                        fontWeight: 700,
                        lineHeight: "27px",
                        transition: "opacity 0.3s ease",
                        opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.4,
                      }}
                    >
                      {sub}
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 34,
                        fontWeight: 400,
                        lineHeight: 1.2,
                        transition: "opacity 0.3s ease",
                        opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.4,
                      }}
                    >
                      {main}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image (desktop only) */}
            <div
              className="hidden lg:block flex-shrink-0"
              style={{ width: 260, marginTop: 80 }}
            >
              <div style={{ position: "relative", width: 260, height: 363 }}>
                {items.map(({ image, sub }, index) => (
                  <Image
                    key={sub}
                    src={image}
                    alt=""
                    fill
                    style={{
                      objectFit: "cover",
                      transition: "opacity 0.4s ease",
                      opacity: hoveredIndex === index ? 1 : 0,
                      position: "absolute",
                    }}
                  />
                ))}
                {/* Default image when nothing is hovered */}
                <Image
                  src="/figma/careers/careers-modern-dad.png"
                  alt=""
                  fill
                  style={{
                    objectFit: "cover",
                    transition: "opacity 0.4s ease",
                    opacity: hoveredIndex === null ? 1 : 0,
                    position: "absolute",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <div
            style={{
              marginTop: 80,
              borderTop: "1px solid #262626",
              paddingTop: 49,
              color: "#737373",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8 }}>
              That&apos;s Modern DAD —
            </div>
            <div style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8 }}>
              how we keep work sharp, relevant, and future-ready.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
