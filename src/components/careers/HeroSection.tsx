"use client";

import Image from "next/image";
import Link from "next/link";
import ImageTrail from "@/components/ui/ImageTrail";

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        height: "clamp(600px, 100vh, 907px)",
      }}
    >
        
      {/* 1. Background image */}
      <Image
        src="/figma/careers/careers-hero-bg-2f942c.png"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />

      {/* 2. ImageTrail */}
      <div className="absolute inset-0 z-[2]" style={{ opacity: 0.55 }}>
        <div
          className="h-full w-full"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <ImageTrail
            key="careers-hero-trail"
            items={[
              "https://picsum.photos/id/287/300/300",
              "https://picsum.photos/id/1001/300/300",
              "https://picsum.photos/id/1025/300/300",
              "https://picsum.photos/id/1026/300/300",
              "https://picsum.photos/id/1027/300/300",
              "https://picsum.photos/id/1028/300/300",
              "https://picsum.photos/id/1029/300/300",
              "https://picsum.photos/id/1031/300/300",
            ]}
            variant={2}
          />
        </div>
      </div>

      {/* 3. Hero content */}
      <div
        className="relative z-[3] pointer-events-none"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 24px",
          gap: 56,
        }}
      >
        {/* Heading block */}
        <div
          style={{
            width: "100%",
            maxWidth: 848,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            textAlign: "center",
          }}
          className="mt-12"
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              lineHeight: 1.25,
              fontWeight: 300,
              letterSpacing: "-2.0385px",
              color: "#000000",
              margin: 0,
            }}
          >
            Build work that matters
            <span style={{ color: "#0EC8C5" }}>.</span>
          </h1>
          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              lineHeight: 1.25,
              fontWeight: 700,
              letterSpacing: "-2.0385px",
              color: "#000000",
              margin: 0,
            }}
          >
            Build yourself along the way
            <span style={{ color: "#E21F26" }}>.</span>
          </h1>
        </div>

        {/* Sub-content block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#737373",
                fontWeight: 300,
                fontSize: 18,
                lineHeight: "31px",
              }}
            >
              <div>Some places hire for skills.</div>
              <div>Some hire for speed.</div>
              <div>We hire for how you think.</div>
            </div>
            <div
              style={{
                color: "#A1A1A1",
                fontWeight: 300,
                fontSize: 16,
                lineHeight: "27px",
                textAlign: "center",
              }}
            >
              <div>DigitallyNext is where structure meets ambition —</div>
              <div>and where good thinking gets taken seriously.</div>
            </div>
          </div>

          <Link
            href="#open-positions"
            className="pointer-events-auto"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "15px 41px",
              background: "#E21F26",
              color: "#FFFFFF",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "1.04px",
              textTransform: "uppercase",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            <Image
              src="/figma/careers/careers-arrow.svg"
              alt=""
              width={36}
              height={15}
            />
            VIEW OPEN POSITIONS
          </Link>
        </div>
      </div>
    </section>
  );
}
