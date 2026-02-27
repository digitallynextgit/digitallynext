import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetailPage from "@/components/case-studies/CaseStudyDetailPage";
import { getCaseStudyBySlug } from "@/data/casestudy";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);

  if (!cs) {
    return { title: "Case Study Not Found | Digitally Next" };
  }

  return {
    title: cs.metaTitle,
    description: cs.metaDescription,
    openGraph: {
      title: cs.metaTitle,
      description: cs.metaDescription,
      type: "website",
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);

  if (!cs) {
    notFound();
  }

  return <CaseStudyDetailPage caseStudy={cs} />;
}

