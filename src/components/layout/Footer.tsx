import Image from "next/image";
import Link from "next/link";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "#contact" },
    { label: "About", href: "#about" },
    { label: "Case Studies", href: "#case-studies" },
];

const socialItems = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/8">
            {/* Main footer content */}
            <div className="w-full max-w-7xl mx-auto py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
                    {/* Left — Tagline */}
                    <div>
                        <h3 className="text-xl md:text-4xl font-bold text-white leading-snug">
                            Modern DAD-enabled.
                            <br />
                            Decision-led.
                            <br />
                            Built for{" "}
                            <span className="text-red-600">global scale.</span>
                        </h3>
                    </div>

                    {/* Center — Navigation */}
                    <div>
                        <h4 className="text-xl font-semibold uppercase tracking-widest text-white mb-5">
                            NAVIGATION
                        </h4>
                        <ul className="space-y-3">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right — Social Media */}
                    <div>
                        <h4 className="text-xl font-semibold uppercase tracking-widest text-white mb-5">
                            SOCIAL MEDIA
                        </h4>
                        <ul className="space-y-3">
                            {socialItems.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider + Bottom row */}
                <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-lg text-white/80">
                        © 2026 Digitally Next. All Rights Reserved.
                    </span>
                    <div className="flex gap-6">
                        <Link
                            href="#"
                            className="text-lg text-white/80 hover:text-white transition-colors duration-200"
                        >
                            Terms of Use
                        </Link>
                        <Link
                            href="#"
                            className="text-lg text-white/80 hover:text-white transition-colors duration-200"
                        >
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>

            {/* Large colored logo */}
            <div className="w-full flex justify-center items-center pt-12 md:pt-16 px-10 bg-black"
             style={{ WebkitMaskImage: "linear-gradient(to bottom, white 20%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)", }}>
                <Image
                    src="/logo1-white.webp"
                    alt="Digitally Next Logo"
                    width={800}
                    height={200}
                    className="w-full max-w-8xl h-auto object-contain"
                priority={false}
            />
        </div>
        </footer >
    );
}
