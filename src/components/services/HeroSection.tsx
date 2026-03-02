"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
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

  // ---- MULTI QUOTE SUPPORT ----
  const quotes = useMemo(
    () =>
      Array.isArray(hero.quoteText)
        ? hero.quoteText
        : hero.quoteText
        ? [hero.quoteText]
        : [],
    [hero.quoteText]
  );

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    if (quotes.length <= 1) return;

    const interval = setInterval(
      () => setQuoteIndex((prev) => (prev + 1) % quotes.length),
      3000
    );

    return () => clearInterval(interval);
  }, [quotes.length]);

  const activeQuote =
    quotes.length > 0 ? quotes[quoteIndex] : hero.quoteText ?? "";

  // navbar approx 72px; adjust if needed
  const headerHeight = 100;

  return (
    <section
      className="relative overflow-hidden min-h-screen"
      style={{
        backgroundColor: theme.heroBg,
        color: theme.heroText,
      }}
    >
      {/* Background layer */}
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
            className="absolute inset-0 z-10"
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
          <div className="absolute inset-0 z-10 bg-linear-to-b from-black/10 via-black/30 to-black/65" />
        </div>
      ) : hero.overlay ? (
        <div
          className="absolute inset-0 z-0"
          style={{ background: hero.overlay }}
        />
      ) : null}

      {/* Content wrapper */}
      <div className="relative z-20 w-full max-w-[1280px] mx-auto px-6 md:px-12">
        <div
          className="flex flex-col"
          style={{
            paddingTop: headerHeight,
            minHeight: `calc(100vh - ${headerHeight}px)`,
          }}
        >
          <div
            className={[
              "flex-1 flex flex-col justify-center",
              "pb-10 md:pb-14 lg:pb-20",
              isCentered
                ? "mx-auto max-w-[920px] text-center"
                : "max-w-[1104px]",
            ].join(" ")}
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-0"
            >
              <h1 className="font-bold tracking-[-0.025em] leading-[1.05] text-[36px] sm:text-[48px] lg:text-[96px]">
                {hero.titleLines.map((line, idx) => (
                  <span key={idx} className="block">
                    {line}
                  </span>
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
              {/* Rotating Quote */}
              {activeQuote && (
                <motion.div
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-base sm:text-lg lg:text-2xl font-semibold leading-relaxed"
                  style={{ color: quoteColor, textShadow: hero.quoteShadow }}
                >
                  {activeQuote}
                </motion.div>
              )}

              {/* Body */}
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

              {/* CTA */}
              <div
                className={`pt-2 md:pt-4 lg:pt-7 ${
                  isCentered ? "flex justify-center" : ""
                }`}
              >
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
      </div>
    </section>
  );
}
