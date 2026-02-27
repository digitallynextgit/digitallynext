import Image from "next/image";
import Link from "next/link";

export default function CareersCtaSection() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        height: "clamp(500px, 80vh, 790px)",
      }}
    >
      {/* Background image */}
      <Image
        src="/figma/careers/careers-team.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center top" }}
      />

      {/* Gradient overlay — transparent top to dark bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.80) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "76px 24px",
          gap: 48,
        }}
      >
        {/* Heading block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          <div
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#FFFFFF",
            }}
          >
            Work that lasts.
          </div>
          <div
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#FFFFFF",
            }}
          >
            Systems that scale.
          </div>
          <div
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#FFFFFF",
            }}
          >
            People who grow with both.
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="#open-positions"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 40px",
            background: "linear-gradient(90deg, #E21F26 0%, #7C1115 100%)",
            color: "#FFFFFF",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.9815px",
            textTransform: "uppercase",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "opacity 0.3s ease",
          }}
          className="hover:opacity-90"
        >
          EXPLORE CAREERS
        </Link>
      </div>
    </section>
  );
}
