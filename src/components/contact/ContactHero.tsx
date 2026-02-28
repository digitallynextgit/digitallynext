export default function ContactHero() {
    return (
        <section
            aria-label="Contact Hero"
            className="relative overflow-hidden"
            style={{ minHeight: "80vh" }}
        >
            <div className="absolute inset-0">
                <video
                    autoPlay loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ transform: "scale(1.2)" }}
                >
                    <source src="/videos/CTA video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10 pt-[140px] pb-16 sm:pb-24">
                <div className="max-w-[760px]">
                    <h1 className="text-white font-extrabold leading-[1.05] tracking-[-0.02em] text-[44px] sm:text-[56px] lg:text-[72px]">
                        Let&apos;s Build Something
                        <br />
                        <span>
                            That <span className="text-[#E21F26]">Lasts.</span>
                        </span>
                    </h1>
                    <div className="mt-6 h-[3px] w-[60px] rounded bg-[#E21F26]" />
                    <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/85 max-w-[640px]">
                        We work best with teams that value structure, clarity, and
                        long-term thinking.
                    </p>
                </div>
            </div>
        </section>
    );
}
