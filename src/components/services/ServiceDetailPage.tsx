// ServiceDetailPage.tsx

import {
  getServiceBySlug,
  type ServiceDetail,
  type ServiceSection,
  type ServiceTheme,
} from "@/data/services";
import FeatureGridSection from "./FeatureGridSection";
import HeroSection from "./HeroSection";
import RealBriefSection from "./RealBriefSection";
import ADAC from "../sections/ADAC";
import SADAC from "./SADAC";
import ScopeSection from "./ScopeSection";
import HowWeOperate from "../sections/HowWeOperate";
import YourAskSection from "./YourAskSection";
import CaseStudySection from "./CaseStudySection";
import { notFound } from "next/navigation";
import { ThemeSection } from "../ui/ThemeSection.tsx";

type Props = {
  service: ServiceDetail;
};

function heroBaseTheme(theme: ServiceTheme): "light" | "dark" {
  const lightColors = ["#ffffff", "#fff", "#fafafa", "#f5f5f5"];
  return lightColors.includes(theme.heroBg.toLowerCase()) ? "light" : "dark";
}

function surfaceBaseTheme(theme: ServiceTheme): "light" | "dark" {
  const lightColors = ["#ffffff", "#fff", "#fafafa", "#f5f5f5"];
  return lightColors.includes(theme.surfaceBg.toLowerCase()) ? "light" : "dark";
}

export default function ServiceDetailPage({ service }: Props) {
  const caseStudySection = service.sections.find(
    (s): s is Extract<ServiceSection, { type: "caseStudy" }> =>
      s.type === "caseStudy",
  );
  const servicess = getServiceBySlug(service.slug);
  if (!servicess) notFound();

  const heroTheme = heroBaseTheme(service.theme);
  const contentTheme = surfaceBaseTheme(service.theme);

  return (
    <main>
      {/* ── Hero — dark background ── */}
      <ThemeSection theme={"light"}>
        <HeroSection hero={service.hero} theme={service.theme} />
      </ThemeSection>

      {/* ── Dynamic Sections — light surface ── */}
      {service.sections.map((section, idx) => {
        if (section.type === "realBrief") {
          return (
            <ThemeSection key={idx} theme={contentTheme}>
              <RealBriefSection section={section} theme={service.theme} />
            </ThemeSection>
          );
        }
        if (section.type === "featureGrid") {
          return (
            <ThemeSection key={idx} theme={contentTheme}>
              <FeatureGridSection section={section} theme={service.theme} />
            </ThemeSection>
          );
        }
        if (section.type === "scope") {
          return (
            <ThemeSection key={idx} theme="dark">
              <ScopeSection section={section} theme={service.theme} />
            </ThemeSection>
          );
        }
        return null;
      })}

      {/* ── ADAC / SADAC ── */}
      <ThemeSection theme="light">
        {service.slug === "ai-enablement" ? <SADAC /> : <ADAC />}
      </ThemeSection>

      {/* ── How We Operate ── */}
      <ThemeSection theme="dark">
        <HowWeOperate />
      </ThemeSection>

      {/* ── Your Ask ── */}
      <ThemeSection theme="light">
        <YourAskSection yourAsk={servicess.yourAsk} />
      </ThemeSection>

      {/* ── Case Study ── */}
      {caseStudySection && (
        <ThemeSection theme={"light"}>
          <CaseStudySection section={caseStudySection} theme={service.theme} />
        </ThemeSection>
      )}
    </main>
  );
}
