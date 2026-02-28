"use client";

import Link from "next/link";
import { useSectionTheme } from "@/context/SectionThemeContext";
import { ThemeSection } from "@/components/ui/ThemeSection.tsx";

function TermsContent() {
  const { theme } = useSectionTheme();
  const isDark = theme === "dark";

  const cardClass = [
    "rounded-2xl border p-6 sm:p-8 md:p-10 transition-colors duration-500",
    isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5",
  ].join(" ");

  const headingClass = [
    "transition-colors duration-500",
    isDark ? "text-white" : "text-[#1a1a1a]",
  ].join(" ");

  const mutedClass = [
    "transition-colors duration-500",
    isDark ? "text-white/70" : "text-black/60",
  ].join(" ");

  return (
    <main>
      {/* Hero */}
      <section className="pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="w-[92%] sm:w-[90%] max-w-5xl mx-auto">
          <div className="space-y-6">
            <p
              className={[
                "text-[11px] sm:text-xs tracking-[0.35em] uppercase transition-colors duration-500",
                isDark ? "text-white/50" : "text-black/40",
              ].join(" ")}
            >
              Legal
            </p>
            <h1
              className={[
                "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight",
                headingClass,
              ].join(" ")}
            >
              Terms of <span className="text-[#E21F26]">Use</span>
              <span className="text-[#0EC8C5]">.</span>
            </h1>
            <p className={["text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed", mutedClass].join(" ")}>
              Empowering businesses with next-generation digital solutions and innovative
              strategies. By using our website and services, you agree to these terms.
              Please read them carefully.
            </p>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="pb-20 md:pb-28">
        <div className="w-[92%] sm:w-[90%] max-w-5xl mx-auto space-y-6">

          {/* Agreement */}
          <div className={cardClass}>
            <h2 className={["text-2xl sm:text-3xl font-bold mb-3", headingClass].join(" ")}>
              Agreement
            </h2>
            <p className={["text-sm sm:text-base leading-relaxed", mutedClass].join(" ")}>
              By using our website and services, you agree to these terms.
            </p>
          </div>

          {/* Usage Rules */}
          <div className={cardClass}>
            <h2 className={["text-2xl sm:text-3xl font-bold mb-4", headingClass].join(" ")}>
              Usage Rules
            </h2>
            <ul className={["list-disc pl-5 space-y-2 text-sm sm:text-base leading-relaxed", mutedClass].join(" ")}>
              <li>Use content for personal, non-commercial purposes only</li>
              <li>Do not modify or distribute our materials without permission</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </div>

          {/* Liability */}
          <div className={cardClass}>
            <h2 className={["text-2xl sm:text-3xl font-bold mb-3", headingClass].join(" ")}>
              Liability
            </h2>
            <p className={["text-sm sm:text-base leading-relaxed", mutedClass].join(" ")}>
              We provide our services &quot;as is&quot; without warranties. We&apos;re not liable
              for any damages arising from your use of our services.
            </p>
          </div>

          {/* Contact */}
          <div className={cardClass}>
            <h2 className={["text-2xl sm:text-3xl font-bold mb-4", headingClass].join(" ")}>
              Contact
            </h2>
            <div className={["grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base", mutedClass].join(" ")}>
              <div className="space-y-2">
                <p>Questions about these terms?</p>
                <Link
                  href="mailto:legal@digitallynext.com"
                  className={[
                    "transition-colors duration-200 hover:text-[#0EC8C5]",
                    isDark ? "text-white" : "text-[#1a1a1a]",
                  ].join(" ")}
                >
                  legal@digitallynext.com
                </Link>
                <p className={["pt-2", isDark ? "text-white/60" : "text-black/50"].join(" ")}>
                  General inquiries
                </p>
                <Link
                  href="mailto:contact@digitallynext.com"
                  className={[
                    "transition-colors duration-200 hover:text-[#0EC8C5]",
                    isDark ? "text-white" : "text-[#1a1a1a]",
                  ].join(" ")}
                >
                  contact@digitallynext.com
                </Link>
              </div>
              <div className="space-y-2">
                <p>Digitally Next</p>
                <p>268 Business India Complex, Uday Park</p>
                <p>Adjacent to August Kranti Marg, Delhi 110 049</p>
                <p>Nearest Metro Station – Green Park/South Ex</p>
                <p>
                  Phone:{" "}
                  <Link
                    href="tel:+919810409943"
                    className={[
                      "transition-colors duration-200 hover:text-[#0EC8C5]",
                      isDark ? "text-white" : "text-[#1a1a1a]",
                    ].join(" ")}
                  >
                    +91 981-040-9943
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

export default function TermsOfUsePage() {
  return (
    <ThemeSection theme="dark">
      <TermsContent />
    </ThemeSection>
  );
}
