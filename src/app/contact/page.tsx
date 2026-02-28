import type { Metadata } from "next";
import ContactFormClient from "./ContactFormClient";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfoBar from "@/components/contact/ContactInfoBar";
import ContactLiquidCTA from "@/components/contact/ContactLiquidCTA";

export const metadata: Metadata = {
  title: "Contact Us | Digitally Next",
  description:
    "We work best with teams that value structure, clarity, and long-term thinking. Let's build something that lasts.",
  openGraph: {
    title: "Contact Us | Digitally Next",
    description:
      "We work best with teams that value structure, clarity, and long-term thinking. Let's build something that lasts.",
  },
};

export default function ContactPage() {
  return (
    <main id="contact" className="font-[Stack_Sans_Text]">

      <ContactHero />

      <section id="contact-form" aria-label="Contact Form" className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
            <div className="max-w-[520px]">
              <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-semibold leading-snug tracking-[-0.01em] text-[#111111]">
                <span className="text-[#E21F26]">Tell us</span> about your brand,
                <br />
                your challenge, and what
                <br />
                you&apos;re building.
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed max-w-[420px] font-light text-[#A1A1A1]">
                We typically respond{" "}
                <span className="font-semibold">within 2 business days</span>. If
                your inquiry aligns with our capabilities, we&apos;ll set up a
                structured discovery call.
              </p>
            </div>
            <ContactFormClient />
          </div>
        </div>
      </section>

      <section aria-label="Contact CTA" className="bg-white">
        <ContactInfoBar />
        <ContactLiquidCTA />
      </section>

    </main>
  );
}
