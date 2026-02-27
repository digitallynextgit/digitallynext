import Image from "next/image";

const traits = [
  "Like structure, but hate rigidity",
  'Ask "why" before "how"',
  "Care about outcomes, not just effort",
  "Want to grow without pretending",
];

export default function WhoThrivesSection() {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <Image
        src="/figma/careers/careers-thrives-bg-48937d.png"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      <div
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)" }}
      />

      <div
        className="container relative py-16 lg:pt-[129px] lg:pb-20"
        style={{ color: "#FFFFFF" }}
      >
        <div style={{ maxWidth: 1103 }}>
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 2.975rem)",
                fontWeight: 400,
                lineHeight: 1.15,
              }}
            >
              Who Thrives at{" "}
              <span style={{ color: "#0EC8C5" }}>Digitally</span>{" "}
              <span style={{ fontWeight: 700 }}>Next</span>
              <span style={{ color: "#0EC8C5" }}>.</span>
            </h2>
            <div
              style={{
                marginTop: 24,
                color: "#D1D1D1",
                fontWeight: 300,
                fontSize: 16,
                lineHeight: 1.8,
              }}
            >
              People who do well here usually:
            </div>
          </div>

          <div
            style={{
              marginTop: 64,
              maxWidth: 800,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            className="grid grid-cols-1 md:grid-cols-2"
          >
            {traits.map((text, idx) => (
              <div
                key={text}
                style={{
                  paddingTop: 25,
                  borderTop: "1px solid #E5E5E5",
                  paddingBottom: 25,
                }}
                className={`${idx % 2 === 0 ? "md:pr-8" : "md:pl-8"} px-0`}
              >
                <div
                  style={{ fontSize: 17, fontWeight: 400, lineHeight: 1.5 }}
                >
                  {text}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 56,
              textAlign: "center",
              color: "#FFFFFF",
              fontWeight: 300,
              fontSize: 15,
              lineHeight: 1.8,
            }}
          >
            <div>This isn&apos;t the place for shortcuts.</div>
            <div>But it is a place to build something solid.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
