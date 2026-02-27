import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
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
      <div className="w-full py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24 xl:gap-62">
            {/* Left — Tagline */}
            <div className="text-center md:text-left">
              <h3
                className="text-3xl md:text-4xl text-white leading-snug"
                style={{ fontFamily: "Stack Sans Text" }}
              >
                <span className="font-bold xl:whitespace-nowrap">
                  Modern DAD-enabled
                </span>
                <span style={{ color: "#0EC8C5" }}>.</span>
                <br />
                <span className="font-light xl:whitespace-nowrap">
                  Decision-led
                </span>
                <span style={{ color: "#0EC8C5" }}>.</span>
                <br />
                <span className="font-light xl:whitespace-nowrap">
                  Built for <span className="text-red-600">global scale</span>
                </span>
                <span style={{ color: "#0EC8C5" }}>.</span>
              </h3>
            </div>

            {/* Center — Navigation */}
            <div className="text-center md:text-left md:pl-8 lg:pl-12 xl:pl-16">
              <h4
                className="text-2xl font-normal uppercase tracking-widest text-white mb-5"
                style={{ fontFamily: "Stack Sans Text" }}
              >
                NAVIGATION
              </h4>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-lg font-light text-gray-300 hover:text-white transition-colors duration-200"
                      style={{ fontFamily: "Stack Sans Text" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — Social Media */}
            <div className="text-center md:text-left">
              <h4
                className="text-2xl font-normal uppercase tracking-widest text-white mb-5"
                style={{ fontFamily: "Stack Sans Text" }}
              >
                SOCIAL MEDIA
              </h4>
              <ul className="space-y-3">
                {socialItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-light text-gray-300 hover:text-white transition-colors duration-200"
                      style={{ fontFamily: "Stack Sans Text" }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider + Bottom row */}
        <div className="border-t border-white/8 pt-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24 xl:gap-72 items-center">
            {/* Left — Copyright */}
            <span
              className="lg:text-lg text-sm text-white/80 text-center md:text-left block xl:whitespace-nowrap"
              style={{ fontFamily: "Stack Sans Text" }}
            >
              © 2026 Digitally Next. All Rights Reserved.
            </span>

            {/* Center — Terms of Use */}
            <Link
              href="/terms-of-use"
              className="text-lg text-white/80 hover:text-white transition-colors duration-200 text-center md:text-left block md:pl-8 lg:pl-12 xl:pl-16 md:-ml-3.75"
              style={{ fontFamily: "Stack Sans Text" }}
            >
              Terms of Use
            </Link>

            {/* Right — Privacy Policy + Arrow */}
            <div className="flex items-center gap-2 justify-center md:justify-start md:-ml-4">
              <Link
                href="/privacy-policy"
                className="text-lg text-white/80 hover:text-white transition-colors duration-200"
                style={{ fontFamily: "Stack Sans Text" }}
              >
                Privacy Policy
              </Link>
              <a
                href="#top"
                className="text-white/80 hover:text-white transition-colors duration-200 inline-flex items-center ml-10"
                aria-label="Back to top"
              >
                <Image
                  src="/ani-icons/up_arrow.svg"
                  alt="Back to top"
                  width={10}
                  height={10}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Large colored logo */}
      <div
        className="w-full flex justify-center items-center pt-12 md:pt-16 px-10 bg-black"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, white 20%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
        }}
      >
        <Image
          src="/logo1-white.webp"
          alt="Digitally Next Logo"
          width={800}
          height={200}
          className="w-full max-w-8xl h-auto object-contain"
          priority={false}
        />
      </div>
    </footer>
  );
}
