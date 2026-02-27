"use client";

import CaseStudyDetailHero from "@/components/case-studies/CaseStudyDetailHero";
import CaseStudyAboutAndApproach from "@/components/case-studies/CaseStudyAboutAndApproach";
import CaseStudyFocusArea from "@/components/case-studies/CaseStudyFocusArea";
import CaseStudyStrategicMarketing from "@/components/case-studies/CaseStudyStrategicMarketing";
import CaseStudyCoreDigitalAssets from "@/components/case-studies/CaseStudyCoreDigitalAssets";
import CaseStudyOtherTeams from "@/components/case-studies/CaseStudyOtherTeams";
import CaseStudyRelatedGrid from "@/components/case-studies/CaseStudyRelatedGrid";
import type { CaseStudy } from "@/data/casestudy";
import CTASection from "../sections/CTASection";

export default function CaseStudyDetailPage({ caseStudy }: { caseStudy: CaseStudy }) {
  const detail = caseStudy.detail;

  return (
    <div className={detail.theme === "light" ? "bg-white text-black" : "bg-black text-white"}>
      <div className="mx-auto w-full max-w-[1440px]">
        <CaseStudyDetailHero detail={detail} metaTitle={caseStudy.metaTitle} />
        <CaseStudyAboutAndApproach detail={detail} />
        <CaseStudyFocusArea detail={detail} />
        <CaseStudyStrategicMarketing detail={detail} />
        <CaseStudyCoreDigitalAssets detail={detail} />
        <CaseStudyOtherTeams detail={detail} />
        <CaseStudyRelatedGrid detail={detail} />
        <CTASection />
      </div>
    </div>
  );
}

