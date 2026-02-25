import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center">
      <div className="container py-24">
        <div className="max-w-2xl">
          <div className="text-xs sm:text-sm font-medium tracking-[0.1875em] uppercase text-[#E21F26]">
            404
          </div>
          <h1 className="mt-6 text-[44px] sm:text-[56px] lg:text-[72px] font-light tracking-[-0.03em] leading-[1.08]">
            Page not found.
          </h1>
          <p className="mt-6 text-base sm:text-lg lg:text-2xl leading-relaxed text-[#787878]">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center border border-black/15 bg-black/[0.03] px-6 py-4 text-xs sm:text-sm font-medium tracking-[0.1875em] uppercase transition hover:bg-black/[0.06]"
            >
              Back Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-[#E21F26]/40 bg-[#E21F26]/5 px-6 py-4 text-xs sm:text-sm font-medium tracking-[0.1875em] uppercase transition hover:bg-[#E21F26]/10"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

