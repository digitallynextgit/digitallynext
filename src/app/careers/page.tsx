import HeroSection from "@/components/careers/HeroSection";
import WorkHereSection from "@/components/careers/WorkHereSection";
import GrowthSection from "@/components/careers/GrowthSection";
import ModernDadSection from "@/components/careers/ModernDadSection";
import AdacSection from "@/components/careers/AdacSection";
import WhoThrivesSection from "@/components/careers/WhoThrivesSection";
import OpenRolesSection from "@/components/careers/OpenRoleSection";
import CareersCtaSection from "@/components/careers/CareersCtaSection";

export default function CareersPage() {
  return (
    <main style={{ background: "#FAFAFA", color: "#000000" }}>
      <HeroSection />
      <WorkHereSection />
      <GrowthSection />
      <ModernDadSection />
      <AdacSection />
      <WhoThrivesSection />
      <OpenRolesSection />
      <CareersCtaSection />
      <div id="open-positions" />
    </main>
  );
}
