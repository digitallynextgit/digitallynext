import CareersCtaSection from "@/components/careers/CareersCtaSection";
import CaseStudiesList from "@/components/careers/CaseStudiesList";
import CaseStudiesHero from "@/components/case-studies/CaseStudiesHero";
import ClientLogos from "@/components/sections/ClientLogos";
import { caseStudies } from "@/data/casestudy";

export const metadata = {
  title: "Case Studies | Digitally Next",
  description: "Explore case studies from Digitally Next.",
};

export default function CaseStudiesPage() {
  const remainingCaseStudies = caseStudies.slice(1);
  return (
    <div className="bg-white">
      <CaseStudiesHero />
      <ClientLogos theme="light" />
      <CaseStudiesList />
      <CareersCtaSection />
    </div>
  );
}
