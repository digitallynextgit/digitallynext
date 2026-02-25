import Link from "next/link";
import Image from "next/image";
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
    <section className="relative overflow-hidden min-h-screen" style={{ backgroundColor: theme.heroBg, color: theme.heroText }}>
      {hero.backgroundVideo ? (
        <div className="absolute inset-0">
          <video src={hero.backgroundVideo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: hero.overlay ?? "rgba(0,0,0,0.6)" }} />
        </div>
      ) : hero.backgroundImage ? (
        <div className="absolute inset-0">
          <Image src={hero.backgroundImage} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: hero.overlay ?? "rgba(0,0,0,0.6)" }} />
        </div>
      ) : hero.overlay ? (
        <div className="absolute inset-0" style={{ background: hero.overlay }} />
      ) : null}

      <div className="relative container ">
        <div className={isCentered ? "mx-auto max-w-[920px] text-center" : "max-w-[1104px]"}>
          <div className="mt-24 md:mt-28 text-[10px] font-medium tracking-[0.1875em] uppercase underline underline-offset-4 whitespace-pre-line" style={{ color: theme.heroMutedText }}>
            {hero.breadcrumb}
          </div>

          <div className="mt-6 sm:mt-8">
            <h1 className="font-bold tracking-[-0.025em] leading-[1.05] text-[36px] sm:text-[48px] lg:text-[96px]">
              {hero.titleLines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {hero.subtitle ? (
              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg" style={{ color: theme.heroMutedText }}>
                {hero.subtitle}
              </p>
            ) : null}
          </div>

          <div className="mt-8 sm:mt-10 space-y-1">
            {hero.quoteLead ? (
              <div className="text-[11px] sm:text-xs lg:text-sm font-semibold tracking-[0.1875em] uppercase" style={{ color: theme.heroText }}>
                {hero.quoteLead}
              </div>
            ) : null}

            <div className="text-base sm:text-lg lg:text-2xl font-semibold leading-relaxed" style={{ color: quoteColor, textShadow: hero.quoteShadow }}>
              {hero.quoteText}
            </div>

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

            <div className={`pt-2 ${isCentered ? "flex justify-center" : ""}`}>
              <Link
                href={hero.ctaHref}
                className="inline-flex items-center gap-3 text-[11px] sm:text-xs lg:text-base font-semibold tracking-[0.1875em] capitalize transition-opacity hover:opacity-75"
                style={{ color: ctaTextColor }}
              >
                <Image src={hero.arrowSrc!} alt="" width={30} height={20} />
                <span className="">{hero.ctaLabel}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
