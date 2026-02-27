import HeroSection from "@/components/careers/HeroSection";
import WorkHereSection from "@/components/careers/WorkHereSection";
import GrowthSection from "@/components/careers/GrowthSection";
import ModernDadSection from "@/components/careers/ModernDadSection";
import AdacSection from "@/components/careers/AdacSection";
import WhoThrivesSection from "@/components/careers/WhoThrivesSection";

export default function CareersPage() {
  return (
    <main style={{ background: "#FAFAFA", color: "#000000" }}>
      <HeroSection />
      <WorkHereSection />
      <GrowthSection />
      <ModernDadSection />
      <AdacSection />
      <WhoThrivesSection />
      <div id="open-positions" />
    </main>
  );
}
