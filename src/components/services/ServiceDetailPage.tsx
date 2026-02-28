import { getServiceBySlug, type ServiceDetail, type ServiceSection } from "@/data/services";
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

type Props = {
  service: ServiceDetail;
};

export default function ServiceDetailPage({ service }: Props) {
  const caseStudySection = service.sections.find(
    (s): s is Extract<ServiceSection, { type: "caseStudy" }> =>
      s.type === "caseStudy"
  );
  const servicess = getServiceBySlug(service.slug);
  if (!servicess) notFound();

  return (
    <main>
      <HeroSection hero={service.hero} theme={service.theme} />
      {service.sections.map((section, idx) => {
        if (section.type === "realBrief") {
          return <RealBriefSection key={idx} section={section} theme={service.theme} />;
        }
        if (section.type === "featureGrid") {
          return <FeatureGridSection key={idx} section={section} theme={service.theme} />;
        }
        if (section.type === "scope") {
          return <ScopeSection key={idx} section={section} theme={service.theme} />;
        }
        return null;
      })}

      {service.slug === "ai-enablement" ? <SADAC /> : <ADAC />}

      <HowWeOperate theme="dark" />
      <YourAskSection yourAsk={servicess.yourAsk} />
      {caseStudySection && (
        <CaseStudySection section={caseStudySection} theme={service.theme} />
      )}
    </main>
  );
}
