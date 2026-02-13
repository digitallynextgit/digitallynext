import Hero from "@/components/sections/Hero";
import ClientLogos from "@/components/sections/ClientLogos";
import HowWeOperate from "@/components/sections/HowWeOperate";
import Services from "@/components/sections/Services";
import CaseStudies from "@/components/sections/CaseStudies";
import Stats from "@/components/sections/Stats";
import PeopleCulture from "@/components/sections/PeopleCulture";
import Insights from "@/components/sections/Insights";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <div style={{ position: "relative", zIndex: 10, background: "var(--bg-primary)" }}>
        
        <HowWeOperate />
        <ClientLogos />
        <Services />
        <CaseStudies />
        <Stats />
        <PeopleCulture />
        <Insights />
        <CTASection />
      </div>
    </>
  );
}
