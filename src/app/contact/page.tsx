import type { Metadata } from "next";
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
    <main id="contact">
      <section
        aria-label="Contact Hero"
        className="relative overflow-hidden"
        style={{ minHeight: "80vh" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 15% 25%, rgba(226,31,38,0.9) 0%, rgba(226,31,38,0.35) 40%, transparent 60%), radial-gradient(1200px 700px at 80% 55%, rgba(0,160,220,0.85) 0%, rgba(0,160,220,0.35) 45%, transparent 65%), radial-gradient(900px 600px at 50% 60%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.35) 35%, transparent 60%), linear-gradient(120deg, #111 20%, #000 75%)",
          }}
        />

        <div className="relative max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10 pt-[140px] pb-16 sm:pb-24">
          <div className="max-w-[760px]">
            <h1 className="text-white font-extrabold leading-[1.05] tracking-[-0.02em] text-[44px] sm:text-[56px] lg:text-[72px]">
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

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/85 max-w-[640px]">
              We work best with teams that value structure, clarity, and
              long-term thinking.
            </p>

          </div>
        </div>
      </section>

      <section aria-label="Contact Form" className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
            <div className="max-w-[520px]">
              <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-semibold leading-snug tracking-[-0.01em] text-[#111111]">
                <span className="text-[#E21F26]">Tell us</span> about your brand,
                <br />
                your challenge, and what
                <br />
                you’re building.
              </h2>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#6B6B6B] max-w-[420px]">
                We typically respond within 2 business days. If your inquiry
                aligns with our capabilities, we’ll set up a structured
                discovery call.
              </p>
            </div>

            <form className="grid gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
                  Full Name <span className="text-[#E21F26]">*</span>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="mt-2 w-full h-11 rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] placeholder:text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
                  />
                </label>

                <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
                  Work Email <span className="text-[#E21F26]">*</span>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="mt-2 w-full h-11 rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] placeholder:text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
                  Company / Brand
                  <input
                    type="text"
                    placeholder="Company name"
                    className="mt-2 w-full h-11 rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] placeholder:text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
                  />
                </label>

                <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
                  Market / Region
                  <div className="relative mt-2">
                    <select className="h-11 w-full appearance-none rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30">
                      <option value="">Select region</option>
                      <option>North America</option>
                      <option>Europe</option>
                      <option>Middle East</option>
                      <option>Asia Pacific</option>
                      <option>Other</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#B5B5B5]">
                      ▾
                    </span>
                  </div>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
                  Service of Interest
                  <div className="relative mt-2">
                    <select className="h-11 w-full appearance-none rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30">
                      <option value="">Select service</option>
                      <option>Performance, Distribution &amp; Demand</option>
                      <option>Content, Culture &amp; Media Creation</option>
                      <option>Platforms, Web &amp; Digital Experience</option>
                      <option>Strategy, Brand &amp; Growth Intelligence</option>
                      <option>AI Enablement &amp; Decision Systems</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#B5B5B5]">
                      ▾
                    </span>
                  </div>
                </label>

                <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
                  Budget Range
                  <div className="relative mt-2">
                    <select className="h-11 w-full appearance-none rounded-md border border-[#E6E6E6] bg-white px-4 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30">
                      <option value="">Select range</option>
                      <option>$5k–$15k</option>
                      <option>$15k–$50k</option>
                      <option>$50k–$100k</option>
                      <option>$100k+</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#B5B5B5]">
                      ▾
                    </span>
                  </div>
                </label>
              </div>

              <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6B6B6B]">
                Message / Project Details
                <textarea
                  placeholder="Tell us about your project, goals, and timeline..."
                  className="mt-2 min-h-[140px] w-full resize-none rounded-md border border-[#E6E6E6] bg-white px-4 py-3 text-sm text-[#111111] placeholder:text-[#B5B5B5] focus:outline-none focus:ring-2 focus:ring-[#E21F26]/30"
                />
              </label>

              <button
                type="button"
                className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.08em] uppercase text-[#111111] hover:opacity-80 transition"
              >
                <span className="inline-block h-[2px] w-[18px] bg-[#E21F26]" />
                Inquire Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
