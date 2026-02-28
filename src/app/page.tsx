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

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    // Thoda delay — page render hone do pehle
    const timer = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Hero />
      <div style={{ position: "relative", zIndex: 10, background: "var(--bg-primary)" }}>
        <div className={`w-full transition-all duration-300 overflow-hidden`}>
          <Image
            src="/banner/ipl-desktop.webp"
            alt="IPL Banner"
            width={768}
            height={60}
            className="w-full object-contain block md:hidden "
            priority
          />
          <Image
            src="/banner/ipl-desktop.webp"
            alt="IPL Banner"
            width={2900}
            height={60}
            className="w-full h-[140px] object-cover hidden md:block"
            priority
          />
        </div>
        <HowWeOperate />
        <ClientLogos />
        <Services />
        <CaseStudies />
        <ADAC />
        <GlobalServicingModel />
        <InstagramReels />
        <CTASection />
      </div>
    </>
  );
}
