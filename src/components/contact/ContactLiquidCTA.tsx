import LiquidEther from "@/app/contact/LiquidEther";

export default function ContactLiquidCTA() {
    return (
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
                <h2 className="text-[#111111] leading-[1.05] tracking-[-0.02em] text-[40px] sm:text-[52px] lg:text-[64px]">
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

                <p className="mt-6 text-xl sm:text-2xl text-[#787878] md:whitespace-nowrap">
                    Structured conversations lead to better outcomes.
                </p>

                <a
                    href="#contact-form"
                    className="mt-10 inline-flex items-center justify-center border border-[#E21F26] px-10 py-4 text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#111111] bg-transparent backdrop-blur-sm transition hover:bg-[#E21F26] hover:text-white"
                >
                    Start a conversation
                </a>
            </div>
        </div>
    );
}
