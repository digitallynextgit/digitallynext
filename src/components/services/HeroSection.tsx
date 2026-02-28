'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ServiceHeroSection, ServiceTheme } from "@/data/services";

type Props = {
  hero: ServiceHeroSection;
  theme: ServiceTheme;
};

export default function HeroSection({ hero, theme }: Props) {
  const isCentered = hero.layout === "centered" || hero.layout === "stacked";

  const quoteColor = hero.quoteColor ?? theme.accentAlt;

  const ctaTextColor = hero.ctaColor
    ? hero.ctaColor
    : hero.ctaVariant === "accent"
      ? theme.accent
      : hero.ctaVariant === "alt"
        ? theme.accentAlt
        : theme.heroText;

  return (
    <section
      className={[
        "overflow-hidden relative",
        "flex items-center md:items-end",
        "py-10 md:pt-16 lg:pt-20",
      ].join(" ")}
      style={{
        height: "clamp(600px, 100vh, 1500px)",
        backgroundColor: theme.heroBg,
        color: theme.heroText,
      }}
    >
      {hero.backgroundVideo ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            src={hero.backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: "100%",
              minHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "cover",
            }}
          />
          <div
            className="absolute inset-0 z-[1]"
            style={{ background: hero.overlay ?? "rgba(0,0,0,0.6)" }}
          />
        </div>
      ) : hero.backgroundImage ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.backgroundImage}
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 z-1 bg-linear-to-b from-black/10 via-black/30 to-black/65" />
        </div>
      ) : hero.overlay ? (
        <div className="absolute inset-0 z-0" style={{ background: hero.overlay }} />
      ) : null}

      <div className="relative z-2 px-6 md:px-12 w-full max-w-[1280px] mx-auto">
        <div className={isCentered ? "mx-auto max-w-[920px] text-center" : "max-w-[1104px]"}>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-0 text-[10px] font-medium tracking-[0.1875em] uppercase underline underline-offset-4 whitespace-pre-line"
            style={{ color: theme.heroMutedText }}
          >
            {hero.breadcrumb}
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 sm:mt-8"
          >
            <h1 className="font-bold tracking-[-0.025em] leading-[1.05] text-[36px] sm:text-[48px] lg:text-[96px]">
              {hero.titleLines.map((line, idx) => (
                <span key={idx} className="block">{line}</span>
              ))}
            </h1>

            {hero.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg"
                style={{ color: theme.heroMutedText }}
              >
                {hero.subtitle}
              </motion.p>
            )}
          </motion.div>

          {/* Quote + Body + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 sm:mt-10 space-y-1"
          >
            {/* Quote */}
            <div
              className="text-base sm:text-lg lg:text-2xl font-semibold leading-relaxed"
              style={{ color: quoteColor, textShadow: hero.quoteShadow }}
            >
              {hero.quoteText}
            </div>

            {/* Body paragraphs */}
            <div className="flex flex-col mt-5">
              {hero.body.map((p, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base lg:text-xl leading-relaxed"
                  style={{ color: theme.heroMutedText }}
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
            </div>

            {/* CTA — same hover pattern as homepage */}
            <div className={`pt-2 md:pt-4 lg:pt-7 ${isCentered ? "flex justify-center" : ""}`}>
              <Link
                href={hero.ctaHref}
                className="group inline-flex items-center gap-3 no-underline"
              >
                <span className="transition-transform duration-300 ease-out group-hover:-translate-x-2">
                  <Image src={hero.arrowSrc!} alt="" width={30} height={20} />
                </span>
                <span
                  className="capitalize font-normal text-xl mt-1 transition-colors duration-200 group-hover:text-[#E21F26]"
                  style={{ color: ctaTextColor }}
                >
                  {hero.ctaLabel}
                </span>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
