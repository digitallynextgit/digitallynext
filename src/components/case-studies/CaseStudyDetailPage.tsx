"use client";

import CaseStudyBreadcrumb from "@/components/case-studies/CaseStudyBreadcrumb";
import CaseStudyDetailHero from "@/components/case-studies/CaseStudyDetailHero";
import CaseStudyAboutAndApproach from "@/components/case-studies/CaseStudyAboutAndApproach";
import CaseStudyFocusArea from "@/components/case-studies/CaseStudyFocusArea";
import CaseStudyStrategicMarketing from "@/components/case-studies/CaseStudyStrategicMarketing";
import CaseStudyCoreDigitalAssets from "@/components/case-studies/CaseStudyCoreDigitalAssets";
import CaseStudyOtherTeams from "@/components/case-studies/CaseStudyOtherTeams";
import CaseStudyRelatedGrid from "@/components/case-studies/CaseStudyRelatedGrid";
import CaseStudyDetailCTA from "@/components/case-studies/CaseStudyDetailCTA";
import type { CaseStudy } from "@/data/casestudy";

export default function CaseStudyDetailPage({ caseStudy }: { caseStudy: CaseStudy }) {
  const detail = caseStudy.detail;

  return (
    <div className={detail.theme === "light" ? "bg-white text-black" : "bg-black text-white"}>
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mx-auto w-full max-w-[1265px] px-4 sm:px-6 md:px-12">
          <CaseStudyBreadcrumb theme={detail.theme} />
        </div>
        <CaseStudyDetailHero detail={detail} metaTitle={caseStudy.metaTitle} />
        <CaseStudyAboutAndApproach detail={detail} />
        <CaseStudyFocusArea detail={detail} />
        <CaseStudyStrategicMarketing detail={detail} />
        <CaseStudyCoreDigitalAssets detail={detail} />
        <CaseStudyOtherTeams detail={detail} />
        <CaseStudyRelatedGrid detail={detail} />
        <CaseStudyDetailCTA detail={detail} />
      </div>
    </div>
  );
}

