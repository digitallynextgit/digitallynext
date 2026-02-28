"use client";

import Image from "next/image";
import Link from "next/link";
import ImageTrail from "@/components/ui/ImageTrail";
import { useEffect, useRef } from "react";
import SquareBg from './SquareBg'

export default function HeroSection() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  // GSAP animation for floating elements
  useEffect(() => {
    if (!backgroundRef.current) return

    const elements = backgroundRef.current.querySelectorAll('.floating-element')

    elements.forEach((el) => {
      const randomDelay = Math.random() * 2
      const randomDuration = 3 + Math.random() * 2

      gsap.to(el, {
        y: '30px',
        duration: randomDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: randomDelay
      })
    })

    return () => {
      gsap.killTweensOf(elements)
    }
  }, []);

  return (
    <div
      className="bg-white text-black overflow-hidden"
      style={{
        position: "relative",
        overflow: "hidden",
        height: "clamp(600px, 100vh, 907px)",
      }}
    >
      <div className="absolute inset-0 opacity-20">
        <SquareBg
          direction="diagonal"
          speed={0.5}
          borderColor="rgba(239, 68, 68, 0.3)"
          squareSize={60}
          hoverFillColor="rgba(239, 68, 68, 0.2)"
        />
      </div>

      <div className="mt-6 md:mt-12 lg:mt-20">
        {/* 1. ImageTrail */}
        <div className="absolute inset-0 z-1">
          <div
            className="h-full w-full"
            style={{ position: "relative", overflow: "hidden" }}
          >
            <ImageTrail
              key="careers-hero-trail"
              items={[
                "/careers/c1.png",
                "/careers/c2.png",
                "/careers/c3.png",
                "/careers/c4.png",
                "/careers/c5.png",
                "/careers/c6.png",
                "/careers/c7.png",
                "/careers/c8.png",
                "/careers/c9.png",
                "/careers/c10.png",
                "/careers/c11.png",
              ]}
              variant={2}
            />
          </div>
        </div>

        {/* 2. Hero content */}
        <div
          className="relative z-2 pointer-events-none"
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
      </div>
    </div>
  );
}
