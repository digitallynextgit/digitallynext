'use client';

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
        <div style={{ position: "relative", zIndex: 10 }}>
          <Image src="/banner/ipl-desktop.webp" alt="IPL Banner" width={768} height={60}
            className="w-full object-contain block md:hidden" priority />
          <Image src="/banner/ipl-desktop.webp" alt="IPL Banner" width={2900} height={60}
            className="w-full h-[140px] object-cover hidden md:block" priority />
        </div>
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
        <AwardsAndRecognition />
      </ThemeSection>

      <ThemeSection theme="light">
        <ADAC />
      </ThemeSection>

      <ThemeSection theme="dark">
        <GlobalServicingModel />
      </ThemeSection>

      <ThemeSection theme="dark">
        <ProudlyWorkingWith />
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
