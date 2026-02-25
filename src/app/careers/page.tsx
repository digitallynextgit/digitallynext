 "use client";

import Image from "next/image";
import Link from "next/link";
import ImageTrail from "@/components/ui/ImageTrail";

export default function CareersPage() {
  return (
    <main style={{ background: "#FAFAFA", color: "#000000" }}>
      <section style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src="/figma/careers/careers-hero-bg-2f942c.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 z-0" style={{ opacity: 0.55 }}>
          <div className="h-full w-full" style={{ position: "relative", overflow: "hidden" }}>
            <ImageTrail
              key="careers-hero-trail"
              items={[
                "https://picsum.photos/id/287/300/300",
                "https://picsum.photos/id/1001/300/300",
                "https://picsum.photos/id/1025/300/300",
                "https://picsum.photos/id/1026/300/300",
                "https://picsum.photos/id/1027/300/300",
                "https://picsum.photos/id/1028/300/300",
                "https://picsum.photos/id/1029/300/300",
                "https://picsum.photos/id/1031/300/300",
              ]}
              variant={2}
            />
          </div>
        </div>
        <div
          className="container relative z-10 flex min-h-screen flex-col items-center justify-center gap-14 pb-10 pt-[112px] pointer-events-none"
          style={{
            position: "relative",
          }}
        >
          <div style={{ width: "100%", maxWidth: 1103, textAlign: "center" }}>
            <div className="mx-auto max-w-[848px] mt-20 md:mt-16 lg:mt-12">
              <h1
                style={{
                  fontSize: "clamp(2rem, 6vw, 4rem)",
                  lineHeight: 1.25,
                  fontWeight: 300,
                  letterSpacing: "-0.032em",
                }}
              >
                Build work that matters.
              </h1>
              <h1
                style={{
                  fontSize: "clamp(2rem, 6vw, 4rem)",
                  lineHeight: 1.25,
                  fontWeight: 700,
                  letterSpacing: "-0.032em",
                  marginTop: 8,
                }}
              >
                Build yourself along the way.
              </h1>
            </div>

            <div className="mt-16 ">
              <div style={{ color: "#737373", fontWeight: 300, lineHeight: 1.8 }} className="text-center text-sm md:text-lg">
                <div>Some places hire for skills.</div>
                <div>Some hire for speed.</div>
                <div>We hire for how you think.</div>
              </div>
              <div style={{ color: "#A1A1A1", fontWeight: 300, lineHeight: 1.8 }} className="mt-7 text-[12px] md:text-base">
                <div>DigitallyNext is where structure meets ambition —</div>
                <div>and where good thinking gets taken seriously.</div>
              </div>
            </div>

            <div style={{ marginTop: 56 }} className="flex justify-center">
              <Link
                href="#open-positions"
                className="pointer-events-auto"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 32px",
                  background: "#E21F26",
                  color: "#FFFFFF",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                <Image src="/figma/careers/careers-arrow.svg" alt="" width={36} height={20} />
                VIEW OPEN POSITIONS
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container pt-16 lg:pt-24">
        <div
          style={{
            border: "1px solid #E5E5E5",
            borderRadius: 10,
            background: "#FFFFFF",
          }}
          className="p-6 lg:p-16"
        >
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.975rem)", fontWeight: 400, lineHeight: 1.15 }}>
            What It&apos;s Like to Work Here.
          </h2>

          <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_395px] lg:gap-16">
            <div>
              <div style={{ color: "#737373", fontWeight: 300, fontSize: 16, lineHeight: 1.8 }}>
                <div>We&apos;re not chaotic.</div>
                <div>We&apos;re not clock-punching either.</div>
              </div>

              <div style={{ marginTop: 32, color: "#A1A1A1", fontWeight: 300, fontSize: 15, lineHeight: 1.7 }}>
                Work here has:
              </div>

              <div style={{ marginTop: 20 }}>
                <div style={{ color: "#737373", fontWeight: 300, fontSize: 15, lineHeight: 1.7 }}>
                  <div>Ideas are welcomed.</div>
                  <div>But they&apos;re expected to stand on something.</div>
                </div>
                <div style={{ marginTop: 16, color: "#A1A1A1", fontWeight: 300, fontSize: 15, lineHeight: 1.8 }}>
                  <div>If you like clarity more than noise,</div>
                  <div>you&apos;ll feel comfortable fast.</div>
                </div>
              </div>

              <div style={{ marginTop: 32 }}>
                <Image
                  src="/figma/careers/careers-workhere.png"
                  alt=""
                  width={544}
                  height={361}
                  className="w-full h-auto rounded-[5px] object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div style={{ border: "1px solid #E5E5E5", borderRadius: 8, padding: 24 }}>
                <Image src="/figma/careers/careers-icon-direction.svg" alt="" width={52} height={41} />
                <div style={{ marginTop: 16, fontSize: 22, fontWeight: 400, color: "#000000" }}>Direction</div>
                <div style={{ marginTop: 12, fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: "#A1A1A1" }}>
                  Every project has a clear brief, a defined scope, and someone accountable.
                </div>
              </div>

              <div style={{ border: "1px solid #E5E5E5", borderRadius: 8, padding: 24 }}>
                <Image src="/figma/careers/careers-icon-context.svg" alt="" width={52} height={44} />
                <div style={{ marginTop: 16, fontSize: 22, fontWeight: 400, color: "#000000" }}>Context</div>
                <div style={{ marginTop: 12, fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: "#A1A1A1" }}>
                  You&apos;ll always know why your work matters, not just what needs to be done.
                </div>
              </div>

              <div style={{ border: "1px solid #E5E5E5", borderRadius: 8, padding: 24 }}>
                <div style={{ fontSize: 22, fontWeight: 400, color: "#000000" }}>Standards</div>
                <div style={{ marginTop: 12, fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: "#A1A1A1" }}>
                  Quality isn&apos;t negotiable. We&apos;d rather do less, better.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pt-16 lg:pt-[129px]">
        <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: 0 }}>
          <div style={{ maxWidth: 1103 }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.975rem)", fontWeight: 400, lineHeight: 1.15 }}>
              How Growth Actually Happens...
            </h2>
            <div style={{ marginTop: 24, color: "#A1A1A1", fontWeight: 300, fontSize: 16, lineHeight: 1.8 }}>
              <div>You won&apos;t be &quot;trained&quot; for months before doing real work.</div>
              <div>And you won&apos;t be thrown into the deep end without context.</div>
            </div>

            <div style={{ marginTop: 80, borderTop: "1px solid #E5E5E5" }}>
              <div
                style={{
                  padding: "44px 0",
                  borderTop: "1px solid #E5E5E5",
                }}
                className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[80px_minmax(0,435px)_minmax(0,1fr)] lg:items-center lg:gap-0"
              >
                <div style={{ color: "#D4D4D4", fontSize: 13, letterSpacing: "0.05em" }}>01</div>
                <div style={{ fontSize: 28, fontWeight: 400, color: "#000000" }}>Learn by building</div>
                <div style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "#A1A1A1" }}>
                  Real projects from day one. You learn by doing the work — not watching someone else do it.
                </div>
              </div>

              <div
                style={{
                  background: "#F5F5F5",
                  padding: "44px 0",
                  borderTop: "1px solid #E5E5E5",
                }}
                className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[80px_minmax(0,435px)_minmax(0,1fr)] lg:items-center lg:gap-0"
              >
                <div style={{ color: "#D4D4D4", fontSize: 13, letterSpacing: "0.05em" }}>02</div>
                <div style={{ fontSize: 28, fontWeight: 400, color: "#000000" }}>Grow by owning</div>
                <div style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "#A1A1A1" }}>
                  Ownership isn&apos;t a perk. It&apos;s the default. You&apos;ll own outcomes, not just tasks.
                </div>
              </div>

              <div
                style={{
                  padding: "44px 0",
                  borderTop: "1px solid #E5E5E5",
                  borderBottom: "1px solid #E5E5E5",
                }}
                className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[80px_minmax(0,435px)_minmax(0,1fr)] lg:items-center lg:gap-0"
              >
                <div style={{ color: "#D4D4D4", fontSize: 13, letterSpacing: "0.05em" }}>03</div>
                <div style={{ fontSize: 28, fontWeight: 400, color: "#000000" }}>Improve by questioning</div>
                <div style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "#A1A1A1" }}>
                  We don&apos;t reward blind agreement. We reward people who ask better questions.
                </div>
              </div>
            </div>

            <div style={{ marginTop: 64, color: "#A1A1A1", fontWeight: 300, fontSize: 15, lineHeight: 1.8 }}>
              <div>Growth here isn&apos;t loud.</div>
              <div>But it is real — and it compounds.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 lg:mt-32" style={{ background: "#000000", color: "#FFFFFF" }}>
        <div className="container relative py-16 lg:py-32">
          <div style={{ maxWidth: 1103 }}>
            <div style={{ color: "#0EC8C5", fontSize: 16, fontWeight: 500, letterSpacing: "0.1125em" }}>
              MODERN DAD
            </div>
            <h2 style={{ marginTop: 24, fontSize: "clamp(2rem, 4vw, 2.975rem)", fontWeight: 400, lineHeight: 1.15 }}>
              How work moves forward here
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 64 }} className="mt-12 lg:mt-[88px]">
              <div style={{ borderLeft: "2px solid #C8102E" }} className="pl-6 lg:pl-[50px]">
                <div style={{ color: "#A1A1A1", fontSize: 16, fontWeight: 300, lineHeight: 1.7 }}>
                  Data doesn&apos;t sit in dashboards.
                </div>
                <div style={{ marginTop: 8, fontSize: 34, fontWeight: 400, lineHeight: 1.2 }}>
                  It shapes decisions.
                </div>
              </div>
              <div style={{ borderLeft: "2px solid #C8102E" }} className="pl-6 lg:pl-[50px]">
                <div style={{ color: "#A1A1A1", fontSize: 16, fontWeight: 300, lineHeight: 1.7 }}>
                  AI doesn&apos;t replace thinking.
                </div>
                <div style={{ marginTop: 8, fontSize: 34, fontWeight: 400, lineHeight: 1.2 }}>
                  It removes friction.
                </div>
              </div>
              <div style={{ borderLeft: "2px solid #C8102E" }} className="pl-6 lg:pl-[50px]">
                <div style={{ color: "#A1A1A1", fontSize: 16, fontWeight: 300, lineHeight: 1.7 }}>
                  Digital isn&apos;t a channel.
                </div>
                <div style={{ marginTop: 8, fontSize: 34, fontWeight: 400, lineHeight: 1.2 }}>
                  It&apos;s the system.
                </div>
              </div>
            </div>

            <Image
              src="/figma/careers/careers-modern-dad.png"
              alt=""
              width={260}
              height={363}
              style={{ position: "absolute", right: 0, top: 320, objectFit: "cover" }}
              className="hidden lg:block"
            />

            <div style={{ marginTop: 80, borderTop: "1px solid #262626", paddingTop: 49, color: "#737373" }}>
              <div style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8 }}>That&apos;s Modern DAD —</div>
              <div style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8 }}>
                how we keep work sharp, relevant, and future-ready.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-[72px]">
        <div className="container">
          <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ color: "#C8102E", fontSize: 12, fontWeight: 500, letterSpacing: "0.15em" }}>ADAC</div>

          <div style={{ maxWidth: 1103 }}>
            <div style={{ fontSize: "clamp(2rem, 4vw, 2.975rem)", fontWeight: 400, lineHeight: 1.15 }}>
              How we stay intelligent
            </div>
            <div style={{ fontSize: "clamp(2rem, 4vw, 2.975rem)", fontWeight: 700, lineHeight: 1.15 }}>
              without losing control
            </div>
          </div>

          <div style={{ maxWidth: 520, color: "#A1A1A1", fontWeight: 300, fontSize: 16, lineHeight: 1.8 }}>
            <div>We don&apos;t use AI everywhere.</div>
            <div>And we don&apos;t avoid it either.</div>
            <div>ADAC is how we decide:</div>
          </div>

          <div
            style={{
              gap: 0,
              border: "1px solid #E5E5E5",
            }}
            className="grid grid-cols-1 lg:grid-cols-3"
          >
            <div style={{ padding: 33, background: "#FFFFFF" }}>
              <div style={{ fontSize: 22, fontWeight: 400, color: "#000000", lineHeight: 1.25 }}>What AI should touch</div>
              <div style={{ marginTop: 16, fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: "#A1A1A1" }}>
                Repetitive workflows, data processing, pattern recognition — AI accelerates what doesn&apos;t need human
                nuance.
              </div>
            </div>
            <div
              style={{ padding: 33, background: "rgba(14, 200, 197, 0.05)" }}
              className="border-t border-[#E5E5E5] lg:border-t-0 lg:border-l"
            >
              <div style={{ fontSize: 22, fontWeight: 400, color: "#000000", lineHeight: 1.25 }}>What humans must own</div>
              <div style={{ marginTop: 16, fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: "#A1A1A1" }}>
                Strategy, relationships, ethical judgment, creative vision — the work that defines who we are.
              </div>
            </div>
            <div style={{ padding: 33, background: "#FFFFFF" }} className="border-t border-[#E5E5E5] lg:border-t-0 lg:border-l">
              <div style={{ fontSize: 22, fontWeight: 400, color: "#000000", lineHeight: 1.25 }}>Where judgment matters</div>
              <div style={{ marginTop: 16, fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: "#A1A1A1" }}>
                The grey zone. Where speed and quality collide. Where the answer isn&apos;t obvious — and shouldn&apos;t be
                automated.
              </div>
            </div>
          </div>

          <div
            style={{
              maxWidth: 1103,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 48,
              flexWrap: "wrap",
            }}
          >
            <div style={{ color: "#A1A1A1", fontWeight: 300, fontSize: 15, lineHeight: 1.8 }}>
              <div>It&apos;s how we stay modern</div>
              <div>without becoming careless.</div>
            </div>

            <Link
              href="#open-positions"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 15,
                color: "#000000",
                fontSize: 24,
                fontWeight: 400,
                lineHeight: 1.3,
              }}
            >
              <Image src="/figma/careers/careers-arrow-link.svg" alt="" width={35} height={16} />
              Open Roles in ADAC
            </Link>
          </div>
          </div>
        </div>
      </section>

      <section className="mt-16 lg:mt-[129px]" style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src="/figma/careers/careers-thrives-bg-48937d.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)" }} />
        <div className="container relative py-16 lg:pt-[129px] lg:pb-20" style={{ color: "#FFFFFF" }}>
          <div style={{ maxWidth: 1103 }}>
            <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.975rem)", fontWeight: 400, lineHeight: 1.15 }}>
                Who Thrives at Digitally Next.
              </h2>
              <div style={{ marginTop: 24, color: "#D1D1D1", fontWeight: 300, fontSize: 16, lineHeight: 1.8 }}>
                People who do well here usually:
              </div>
            </div>

            <div
              style={{
                marginTop: 64,
                maxWidth: 800,
                marginLeft: "auto",
                marginRight: "auto",
                gap: 0,
              }}
              className="grid grid-cols-1 md:grid-cols-2"
            >
              {[
                "Like structure, but hate rigidity",
                'Ask "why" before "how"',
                "Care about outcomes, not just effort",
                "Want to grow without pretending",
              ].map((text, idx) => (
                <div
                  key={text}
                  style={{
                    paddingTop: 25,
                    borderTop: "1px solid #E5E5E5",
                    paddingBottom: 25,
                  }}
                  className={`${idx % 2 === 0 ? "md:pr-8" : "md:pl-8"} px-0`}
                >
                  <div style={{ fontSize: 17, fontWeight: 400, lineHeight: 1.5 }}>{text}</div>
                </div>
              ))}
            </div>

            <div
              style={{ marginTop: 56, textAlign: "center", color: "#FFFFFF", fontWeight: 300, fontSize: 15, lineHeight: 1.8 }}
            >
              <div>This isn&apos;t the place for shortcuts.</div>
              <div>But it is a place to build something solid.</div>
            </div>
          </div>
        </div>
      </section>

      <div id="open-positions" />
    </main>
  );
}

