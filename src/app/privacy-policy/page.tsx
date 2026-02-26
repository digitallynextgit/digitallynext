"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <main className="bg-black text-white">
            <section className="pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24">
                <div className="w-[92%] sm:w-[90%] max-w-5xl mx-auto">
                    <div className="space-y-6">
                        <p className="text-[11px] sm:text-xs tracking-[0.35em] text-white/50 uppercase">
                            Legal
                        </p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                            Privacy <span className="text-[#E21F26]">Policy</span>
                            <span className="text-[#0EC8C5]">.</span>
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-3xl leading-relaxed">
                            Empowering businesses with next-generation digital solutions and innovative
                            strategies. We collect and use your information to provide and improve our
                            services.
                        </p>
                    </div>
                </div>
            </section>

            <section className="pb-20 md:pb-28">
                <div className="w-[92%] sm:w-[90%] max-w-5xl mx-auto space-y-6">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 md:p-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Information Collection &amp; Use</h2>
                        <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-4">
                            We collect and use your information to provide and improve our services. This
                            includes:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-white/70 leading-relaxed">
                            <li>Contact details for communication</li>
                            <li>Usage data to enhance user experience</li>
                            <li>Payment information for transactions</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 md:p-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Data Protection</h2>
                        <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                            Your data security is our priority. We implement industry-standard measures to
                            protect your information and never share it without your consent.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 md:p-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Your Rights</h2>
                        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-white/70 leading-relaxed">
                            <li>Access and control your data</li>
                            <li>Request data deletion</li>
                            <li>Opt-out of communications</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 md:p-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Contact</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base text-white/70">
                            <div className="space-y-2">
                                <p>Questions about privacy?</p>
                                <Link
                                    href="mailto:privacy@digitallynext.com"
                                    className="text-white hover:text-[#0EC8C5] transition-colors duration-200"
                                >
                                    privacy@digitallynext.com
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
