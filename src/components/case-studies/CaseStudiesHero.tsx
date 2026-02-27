import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/casestudy";

export default function CaseStudiesHero() {
  const featuredCaseStudy = caseStudies[0];

  return (
    <section
      style={{
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 0,
        gap: 47,
        width: "100%",
      }}
      className="py-12 md:py-16 lg:py-24"
    >
      {/* Top text block — centered */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 0",
          gap: 56,
          width: "100%",
          maxWidth: 848,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 200,
            lineHeight: 1.25,
            textAlign: "center",
            letterSpacing: "-2.0385px",
            color: "#000000",
            margin: 0,
          }}
        >
          We help brands show up{" "}
          <br />
          <span style={{ fontWeight: 500 }}>where world is watching</span>
          <span style={{ color: "#0EC8C5" }}>.</span>
        </h1>

        <p
          style={{
            maxWidth: 803,
            fontWeight: 300,
            fontSize: 18,
            lineHeight: "31px",
            textAlign: "center",
            color: "#737373",
            margin: 0,
          }}
        >
          {featuredCaseStudy?.listing.introText ??
            "From ambitious startups to scaling enterprises — Digitally Next builds performance-driven creative systems that turn attention into measurable growth."}
        </p>
      </div>

      {/* Featured case study block */}
      {featuredCaseStudy && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 41,
            width: "100%",
            maxWidth: 937,
            paddingBottom: 80,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {/* Case study image */}
          <div
            style={{
              width: "100%",
              borderRadius: 5.39,
              overflow: "hidden",
              boxShadow: "0 24px 80px rgba(0,0,0,0.10)",
            }}
          >
            <Image
              src={featuredCaseStudy.listing.imageSrc}
              alt={featuredCaseStudy.metaTitle}
              width={1874}
              height={1249}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1024px) 100vw, 937px"
              priority
            />
          </div>

          {/* Case study info — LEFT aligned (same as image) */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 48,
            }}
          >
            {/* Title + caption */}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 15,
              }}
            >
              <h2
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 4vw, 3.15rem)",
                  lineHeight: 1.3,
                  color: "#000000",
                  margin: 0,
                  textAlign: "left",
                }}
                dangerouslySetInnerHTML={{ __html: featuredCaseStudy.listing.title }}
              />
              <p
                style={{
                  fontWeight: 300,
                  fontSize: 24,
                  lineHeight: "31px",
                  color: "#787878",
                  margin: 0,
                  textAlign: "left",
                }}
              >
                {featuredCaseStudy.listing.caption}
              </p>
            </div>

            {/* Pill button — left */}
            <Link
              href={`/case-studies/${featuredCaseStudy.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "18px 28px",
                border: "0.9px solid #E21F26",
                borderRadius: 37.95,
                fontSize: 21,
                fontWeight: 400,
                lineHeight: "28px",
                color: "#000000",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "background 0.3s ease",
              }}
              className="hover:bg-[#E21F26]/10"
            >
              {featuredCaseStudy.listing.pillLabel ??
                featuredCaseStudy.listing.buttonLabel}
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
