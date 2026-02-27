import Image from "next/image";

export default function ModernDadSection() {
  return (
    <section
      className="mt-16 lg:mt-32"
      style={{ background: "#000000", color: "#FFFFFF" }}
    >
      <div className="container relative py-16 lg:py-32">
        <div style={{ maxWidth: 1103 }}>
          <div
            style={{
              color: "#0EC8C5",
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: "0.1125em",
            }}
          >
            MODERN DAD
          </div>
          <h2
            style={{
              marginTop: 24,
              fontSize: "clamp(2rem, 4vw, 2.975rem)",
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            How work moves forward here
          </h2>

          <div
            style={{ display: "flex", flexDirection: "column", gap: 64 }}
            className="mt-12 lg:mt-[88px]"
          >
            {[
              {
                sub: "Data doesn't sit in dashboards.",
                main: "It shapes decisions.",
              },
              {
                sub: "AI doesn't replace thinking.",
                main: "It removes friction.",
              },
              {
                sub: "Digital isn't a channel.",
                main: "It's the system.",
              },
            ].map(({ sub, main }) => (
              <div
                key={sub}
                style={{ borderLeft: "2px solid #C8102E" }}
                className="pl-6 lg:pl-[50px]"
              >
                <div
                  style={{
                    color: "#0EC8C5",
                    fontSize: 16,
                    fontWeight: 700,
                    lineHeight: "27px",
                  }}
                >
                  {sub}
                </div>
                <div
                  style={{ marginTop: 8, fontSize: 34, fontWeight: 400, lineHeight: 1.2 }}
                >
                  {main}
                </div>
              </div>
            ))}
          </div>

          <Image
            src="/figma/careers/careers-modern-dad.png"
            alt=""
            width={260}
            height={363}
            style={{
              position: "absolute",
              right: 0,
              top: 320,
              objectFit: "cover",
            }}
            className="hidden lg:block"
          />

          <div
            style={{
              marginTop: 80,
              borderTop: "1px solid #262626",
              paddingTop: 49,
              color: "#737373",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8 }}>
              That&apos;s Modern DAD —
            </div>
            <div style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8 }}>
              how we keep work sharp, relevant, and future-ready.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
