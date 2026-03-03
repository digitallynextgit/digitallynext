"use client";

import Hero from "@/components/sections/Hero";
import ClientLogos from "@/components/sections/ClientLogos";
import HowWeOperate from "@/components/sections/HowWeOperate";
import Services from "@/components/sections/Services";
import CaseStudies from "@/components/sections/CaseStudies";
import ADAC from "@/components/sections/ADAC";
import GlobalServicingModel from "@/components/sections/GlobalServicingModel";
import InstagramReels from "@/components/sections/InstagramReels";
import CTASection from "@/components/sections/CTASection";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ThemeSection } from "@/components/ui/ThemeSection.tsx";
import AwardsAndRecognition from "@/components/sections/AwardsAndRecognition";
import ProudlyWorkingWith from "@/components/sections/ProudlyWorkingWith";

export default function Home() {
  return (
    <>
      <ThemeSection theme="light">
        <Hero />
      </ThemeSection>

      <ThemeSection theme="light">
        <Link href="/contact" className="block cursor-pointer" style={{ position: "relative", zIndex: 10 }}>
          {/* Mobile */}
          <Image
            src="/banner/ipl-desktop.webp"
            alt="IPL Banner"
            width={768}
            height={240}
            className="w-full h-auto object-contain block md:hidden"
            priority
          />
          {/* Tablet + Desktop */}
          <Image
            src="/banner/ipl-desktop.webp"
            alt="IPL Banner"
            width={2900}
            height={240}
            className="w-full h-auto object-contain hidden md:block"
            priority
          />
        </Link>
      </ThemeSection>

      <ThemeSection theme="light">
        <AwardsAndRecognition />
      </ThemeSection>

      <ThemeSection theme="light">
        <ProudlyWorkingWith />
      </ThemeSection>

      <ThemeSection theme="light">
        <HowWeOperate />
      </ThemeSection>

      <ThemeSection theme="dark">
        <ClientLogos />
      </ThemeSection>

      <ThemeSection theme="dark">
        <Services />
      </ThemeSection>

      <ThemeSection theme="light">
        <CaseStudies />
      </ThemeSection>

      <ThemeSection theme="light">
        <ADAC />
      </ThemeSection>

      <ThemeSection theme="dark">
        <GlobalServicingModel />
      </ThemeSection>

      <ThemeSection theme="light">
        <InstagramReels />
      </ThemeSection>

      <ThemeSection theme="dark">
        <CTASection />
      </ThemeSection>
    </>
  );
}
