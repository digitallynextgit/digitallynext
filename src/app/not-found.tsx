import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-black text-white">
      <section className="pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="w-[92%] sm:w-[90%] max-w-5xl mx-auto text-center">
          <div className="space-y-6">
            <p className="text-[11px] sm:text-xs tracking-[0.35em] text-white/50 uppercase">
              Error
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              Page <span className="text-[#E21F26]">Not</span> Found
              <span className="text-[#0EC8C5]">.</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-3xl leading-relaxed mx-auto">
              The page you’re looking for doesn’t exist or has been moved.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="w-[92%] sm:w-[90%] max-w-5xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 md:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Go Somewhere Useful</h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              Try these links to get back on track.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center border border-white/20 bg-white/5 px-6 py-4 text-xs sm:text-sm font-medium tracking-[0.1875em] uppercase transition hover:bg-white/10"
              >
                Back Home
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center border border-white/20 bg-white/5 px-6 py-4 text-xs sm:text-sm font-medium tracking-[0.1875em] uppercase transition hover:bg-white/10"
              >
                Case Studies
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-[#E21F26]/50 bg-[#E21F26]/10 px-6 py-4 text-xs sm:text-sm font-medium tracking-[0.1875em] uppercase transition hover:bg-[#E21F26]/20"
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
