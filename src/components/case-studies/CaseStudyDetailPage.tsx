"use client";

import CaseStudyDetailHero from "@/components/case-studies/CaseStudyDetailHero";
import CaseStudyAboutAndApproach from "@/components/case-studies/CaseStudyAboutAndApproach";
import CaseStudyFocusArea from "@/components/case-studies/CaseStudyFocusArea";
import CaseStudyStrategicMarketing from "@/components/case-studies/CaseStudyStrategicMarketing";
import CaseStudyCoreDigitalAssets from "@/components/case-studies/CaseStudyCoreDigitalAssets";
import CaseStudyOtherTeams from "@/components/case-studies/CaseStudyOtherTeams";
import CaseStudyRelatedGrid from "@/components/case-studies/CaseStudyRelatedGrid";
import CTASection from "../sections/CTASection";
import { ThemeSection } from "@/components/ui/ThemeSection.tsx";
import type { CaseStudy } from "@/data/casestudy";

export default function CaseStudyDetailPage({ caseStudy }: { caseStudy: CaseStudy }) {
  const detail = caseStudy.detail;
  const pageTheme = detail.theme === "light" ? "light" : "dark";

  return (
    <ThemeSection theme={pageTheme}>
      <div className="mx-auto w-full pt-28 md:pt-36">
        <CaseStudyDetailHero detail={detail} metaTitle={caseStudy.metaTitle} />
        <CaseStudyAboutAndApproach detail={detail} />
        <CaseStudyFocusArea detail={detail} />
        <CaseStudyStrategicMarketing detail={detail} />
        <CaseStudyCoreDigitalAssets detail={detail} />
        <CaseStudyOtherTeams detail={detail} />
        <CaseStudyRelatedGrid detail={detail} />
        <CTASection />
      </div>
    </ThemeSection>
  );
}
