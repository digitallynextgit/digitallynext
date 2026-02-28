import CareersCtaSection from "@/components/careers/CareersCtaSection";
import CaseStudiesList from "@/components/careers/CaseStudiesList";
import CaseStudiesHero from "@/components/case-studies/CaseStudiesHero";
import ClientLogos from "@/components/sections/ClientLogos";

export const metadata = {
  title: "Case Studies | Digitally Next",
  description: "Explore case studies from Digitally Next.",
};

export default function CaseStudiesPage() {
  return (
    <div className="bg-white">
      <CaseStudiesHero />
      <ClientLogos theme="light" />
      <CaseStudiesList />
      <CareersCtaSection />
    </div>
  );
}
