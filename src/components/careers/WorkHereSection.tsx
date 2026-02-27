import Image from "next/image";

export default function WorkHereSection() {
  return (
    <section className="container pt-16 lg:pt-24">
      <div style={{ maxWidth: 1103 }}>
        <div
          style={{
            background: "#FAFAFA",
            borderRadius: 10,
            padding: "48px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 64,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 47.565px)",
              fontWeight: 400,
              lineHeight: "55px",
              color: "#000000",
              margin: 0,
            }}
          >
            What It&apos;s Like to{" "}
            <span style={{ color: "#E21F26" }}>Work Here</span>
            <span style={{ color: "#0EC8C5" }}>.</span>
          </h2>

          <div className="flex flex-col md:flex-row md:gap-0">
            {/* LEFT COL */}
            <div
              className="flex-1"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                paddingRight: "clamp(0px, 3vw, 40px)",
              }}
            >
              <div
                style={{
                  color: "#737373",
                  fontWeight: 300,
                  fontSize: 17,
                  lineHeight: "31px",
                }}
              >
                <div>We&apos;re not chaotic.</div>
                <div>We&apos;re not clock-punching either.</div>
              </div>
              <div
                style={{
                  color: "#A1A1A1",
                  fontWeight: 300,
                  fontSize: 16,
                  lineHeight: "29px",
                }}
              >
                Work here has:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div
                  style={{
                    color: "#737373",
                    fontWeight: 300,
                    fontSize: 16,
                    lineHeight: "29px",
                  }}
                >
                  <div>Ideas are welcomed.</div>
                  <div>But they&apos;re expected to stand on something.</div>
                </div>
                <div
                  style={{
                    color: "#A1A1A1",
                    fontWeight: 300,
                    fontSize: 15,
                    lineHeight: "27px",
                  }}
                >
                  <div>If you like clarity more than noise,</div>
                  <div>you&apos;ll feel comfortable fast.</div>
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <Image
                  src="/figma/careers/careers-workhere.png"
                  alt="Work Here"
                  width={477}
                  height={269}
                  className="w-full h-auto"
                  style={{ borderRadius: 5, objectFit: "cover" }}
                />
              </div>
            </div>

            {/* RIGHT COL */}
            <div className="flex-1 flex flex-col mt-10 md:mt-0">
              <div
                style={{
                  border: "1px solid #E5E5E5",
                  padding: "33px 33px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <Image
                  src="/figma/careers/careers-icon-direction.svg"
                  alt=""
                  width={52}
                  height={41}
                />
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 400,
                    lineHeight: "29px",
                    color: "#000000",
                  }}
                >
                  Direction
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 300,
                    lineHeight: "26px",
                    color: "#A1A1A1",
                  }}
                >
                  Every project has a clear brief, a defined scope, and someone
                  accountable.
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #E5E5E5",
                  borderTop: "none",
                  padding: "33px 33px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <Image
                  src="/figma/careers/careers-icon-context.svg"
                  alt=""
                  width={52}
                  height={44}
                />
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 400,
                    lineHeight: "29px",
                    color: "#000000",
                  }}
                >
                  Context
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 300,
                    lineHeight: "26px",
                    color: "#A1A1A1",
                  }}
                >
                  You&apos;ll always know why your work matters — not just what
                  needs to be done.
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #E5E5E5",
                  borderTop: "none",
                  padding: "33px 33px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 400,
                    lineHeight: "29px",
                    color: "#000000",
                  }}
                >
                  Standards
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 300,
                    lineHeight: "26px",
                    color: "#A1A1A1",
                  }}
                >
                  Quality isn&apos;t negotiable. We&apos;d rather do less,
                  better.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
