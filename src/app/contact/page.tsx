import type { Metadata } from "next";
import LiquidEther from "./LiquidEther";
import ContactFormClient from "./ContactFormClient";

export const metadata: Metadata = {
  title: "Contact Us | Digitally Next",
  description:
    "We work best with teams that value structure, clarity, and long-term thinking. Let’s build something that lasts.",
  openGraph: {
    title: "Contact Us | Digitally Next",
    description:
      "We work best with teams that value structure, clarity, and long-term thinking. Let’s build something that lasts.",
  },
};

export default function ContactPage() {
  return (
    <main id="contact" style={{ fontFamily: "Stack Sans Text" }}>
      <section
        aria-label="Contact Hero"
        className="relative overflow-hidden"
        style={{ minHeight: "80vh" }}
      >
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: "scale(1.2)" }}
          >
            <source src="/videos/CTA video.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(0, 0, 0, 0.4)",
            }}
          />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10 pt-[140px] pb-16 sm:pb-24">
          <div className="max-w-[760px]">
            <h1
              className="text-white font-extrabold leading-[1.05] tracking-[-0.02em] text-[44px] sm:text-[56px] lg:text-[72px]"
              style={{ fontFamily: "Stack Sans Text" }}
            >
              Let’s Build Something
              <br />
              <span className="text-white">
                That <span className="text-[#E21F26]">Lasts.</span>
              </span>
            </h1>

            <div
              className="mt-6 h-[3px] w-[60px] rounded"
              style={{ backgroundColor: "#E21F26" }}
            />

            <p
              className="mt-6 text-base sm:text-lg leading-relaxed text-white/85 max-w-[640px]"
              style={{ fontFamily: "Stack Sans Text" }}
            >
              We work best with teams that value structure, clarity, and
              long-term thinking.
            </p>
          </div>
        </div>
      </section>

      <section id="contact-form" aria-label="Contact Form" className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
            <div className="max-w-[520px]">
              <h2
                className="text-[28px] sm:text-[32px] lg:text-[36px] font-semibold leading-snug tracking-[-0.01em] text-[#111111]"
                style={{ fontFamily: "Stack Sans Text" }}
              >
                <span className="text-[#E21F26]">Tell us</span> about your
                brand,
                <br />
                your challenge, and what
                <br />
                you’re building.
              </h2>

              <p
                className="mt-4 text-sm sm:text-base leading-relaxed max-w-[420px] font-light"
                style={{ fontFamily: "Stack Sans Text", color: "#A1A1A1" }}
              >
                We typically respond{" "}
                <span className="font-semibold">
                  within 2 business days
                </span>
                . If your inquiry aligns with our capabilities, we’ll set up a
                structured discovery call.
              </p>
            </div>

            <ContactFormClient />
          </div>
        </div>
      </section>

      <section aria-label="Contact CTA" className="bg-white">
        <div className="bg-black flex items-center">
          <div className="max-w-[1200px] mx-auto w-full px-6 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-22">
            <div className="grid gap-8 md:grid-cols-3 md:gap-16 justify-items-center text-center">
              <div className="space-y-2">
                <div
                  className="text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Stack Sans Text" }}
                >
                  General inquiries
                </div>
                <a
                  href="mailto:contact@digitallynext.com"
                  className="text-white text-base sm:text-lg font-semibold"
                  style={{ fontFamily: "Stack Sans Text" }}
                >
                  contact@digitallynext.com
                </a>
              </div>

              <div className="space-y-2">
                <div
                  className="text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Stack Sans Text" }}
                >
                  Careers
                </div>
                <a
                  href="mailto:careers@digitallynext.com"
                  className="text-white text-base sm:text-lg font-semibold"
                  style={{ fontFamily: "Stack Sans Text" }}
                >
                  careers@digitallynext.com
                </a>
              </div>

              <div className="space-y-2">
                <div
                  className="text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Stack Sans Text" }}
                >
                  Connect
                </div>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white text-base sm:text-lg font-semibold"
                  style={{ fontFamily: "Stack Sans Text" }}
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-sm border border-white/30 text-[12px] leading-none">
                    in
                  </span>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full py-36 sm:py-40 lg:py-44 min-h-[70vh] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <LiquidEther
              colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
              mouseForce={20}
              cursorSize={100}
              isViscous
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10 flex flex-col items-center text-center">
            <h2
              className="text-[#111111] leading-[1.05] tracking-[-0.02em] text-[40px] sm:text-[52px] lg:text-[64px]"
              style={{ fontFamily: "Stack Sans Text" }}
            >
              <span className="font-extrabold">Clarity</span>{" "}
              <span className="font-normal">
                first<span className="text-[#0EC8C5]">.</span>
              </span>
              <br />
              <span className="font-extrabold">Execution</span>{" "}
              <span className="font-normal">
                next<span className="text-[#E21F26]">.</span>
              </span>
            </h2>

            <p
              className="mt-6 text-xl sm:text-2xl text-[#787878] md:whitespace-nowrap"
              style={{ fontFamily: "Stack Sans Text" }}
            >
              Structured conversations lead to better outcomes.
            </p>

            <a
              href="#contact-form"
              className="mt-10 inline-flex items-center justify-center border border-[#E21F26] px-10 py-4 text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#111111] bg-white/90 backdrop-blur-sm transition hover:bg-[#E21F26] hover:text-white"
              style={{ fontFamily: "Stack Sans Text" }}
            >
              Start a conversation
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
