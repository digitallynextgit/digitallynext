"use client";

import Link from "next/link";
import { useSectionTheme } from "@/context/SectionThemeContext";
import { ThemeSection } from "@/components/ui/ThemeSection.tsx";

function NotFoundContent() {
  const { theme } = useSectionTheme();
  const isDark = theme === "dark";

  return (
    <main>
      {/* Hero */}
      <section className="pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="w-[92%] sm:w-[90%] max-w-5xl mx-auto text-center">
          <div className="space-y-6">
            <p
              className={[
                "text-[11px] sm:text-xs tracking-[0.35em] uppercase transition-colors duration-500",
                isDark ? "text-white/50" : "text-black/40",
              ].join(" ")}
            >
              Error
            </p>
            <h1
              className={[
                "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight transition-colors duration-500",
                isDark ? "text-white" : "text-[#1a1a1a]",
              ].join(" ")}
            >
              Page <span className="text-[#E21F26]">Not</span> Found
              <span className="text-[#0EC8C5]">.</span>
            </h1>
            <p
              className={[
                "text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed mx-auto transition-colors duration-500",
                isDark ? "text-white/70" : "text-black/60",
              ].join(" ")}
            >
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>
        </div>
      </section>

      {/* Links card */}
      <section className="pb-20 md:pb-28">
        <div className="w-[92%] sm:w-[90%] max-w-5xl mx-auto">
          <div
            className={[
              "rounded-2xl border p-6 sm:p-8 md:p-10 text-center transition-colors duration-500",
              isDark
                ? "border-white/10 bg-white/5"
                : "border-black/10 bg-black/5",
            ].join(" ")}
          >
            <h2
              className={[
                "text-2xl sm:text-3xl font-bold mb-3 transition-colors duration-500",
                isDark ? "text-white" : "text-[#1a1a1a]",
              ].join(" ")}
            >
              Go Somewhere Useful
            </h2>
            <p
              className={[
                "text-sm sm:text-base leading-relaxed transition-colors duration-500",
                isDark ? "text-white/70" : "text-black/60",
              ].join(" ")}
            >
              Try these links to get back on track.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className={[
                  "inline-flex items-center justify-center border px-6 py-4",
                  "text-xs sm:text-sm font-medium tracking-[0.1875em] uppercase transition-all duration-300",
                  isDark
                    ? "border-white/20 bg-white/5 text-white hover:bg-white/10"
                    : "border-black/15 bg-black/5 text-[#1a1a1a] hover:bg-black/10",
                ].join(" ")}
              >
                Back Home
              </Link>
              <Link
                href="/case-studies"
                className={[
                  "inline-flex items-center justify-center border px-6 py-4",
                  "text-xs sm:text-sm font-medium tracking-[0.1875em] uppercase transition-all duration-300",
                  isDark
                    ? "border-white/20 bg-white/5 text-white hover:bg-white/10"
                    : "border-black/15 bg-black/5 text-[#1a1a1a] hover:bg-black/10",
                ].join(" ")}
              >
                Case Studies
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-[#E21F26]/50 bg-[#E21F26]/10 text-[#E21F26] px-6 py-4 text-xs sm:text-sm font-medium tracking-[0.1875em] uppercase transition-all duration-300 hover:bg-[#E21F26]/20"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function NotFound() {
  return (
    <ThemeSection theme="dark">
      <NotFoundContent />
    </ThemeSection>
  );
}
