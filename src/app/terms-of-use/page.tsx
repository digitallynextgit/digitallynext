"use client";

import Link from "next/link";

export default function TermsOfUsePage() {
    return (
        <main className="bg-black text-white">
            <section className="pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24">
                <div className="w-[92%] sm:w-[90%] max-w-5xl mx-auto">
                    <div className="space-y-6">
                        <p className="text-[11px] sm:text-xs tracking-[0.35em] text-white/50 uppercase">
                            Legal
                        </p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                            Terms of <span className="text-[#E21F26]">Use</span>
                            <span className="text-[#0EC8C5]">.</span>
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-3xl leading-relaxed">
                            Empowering businesses with next-generation digital solutions and innovative
                            strategies. By using our website and services, you agree to these terms.
                            Please read them carefully.
                        </p>
                    </div>
                </div>
            </section>

            <section className="pb-20 md:pb-28">
                <div className="w-[92%] sm:w-[90%] max-w-5xl mx-auto space-y-6">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 md:p-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Agreement</h2>
                        <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                            By using our website and services, you agree to these terms.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 md:p-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Usage Rules</h2>
                        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-white/70 leading-relaxed">
                            <li>Use content for personal, non-commercial purposes only</li>
                            <li>Do not modify or distribute our materials without permission</li>
                            <li>Respect intellectual property rights</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 md:p-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Liability</h2>
                        <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                            We provide our services &quot;as is&quot; without warranties. We&apos;re not liable
                            for any damages arising from your use of our services.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 md:p-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Contact</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base text-white/70">
                            <div className="space-y-2">
                                <p>Questions about these terms?</p>
                                <Link
                                    href="mailto:legal@digitallynext.com"
                                    className="text-white hover:text-[#0EC8C5] transition-colors duration-200"
                                >
                                    legal@digitallynext.com
                                </Link>
                                <p className="pt-2 text-white/60">General inquiries</p>
                                <Link
                                    href="mailto:contact@digitallynext.com"
                                    className="text-white hover:text-[#0EC8C5] transition-colors duration-200"
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
                                        className="text-white hover:text-[#0EC8C5] transition-colors duration-200"
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
