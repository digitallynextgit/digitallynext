import Image from "next/image";
import Link from "next/link";
import type { ServiceCTA, ServiceTheme } from "@/data/services";

type Props = {
  cta: ServiceCTA;
  theme: ServiceTheme;
};

export default function CTASection({ cta, theme }: Props) {
  return (
    <section style={{ backgroundColor: theme.heroBg, color: theme.heroText }}>
      <div className="container py-[var(--section-padding-mobile)] lg:py-[var(--section-padding)]">
        <div className="max-w-[1104px] mx-auto flex flex-col items-center gap-8 text-center">
          <h2 className="text-[40px] sm:text-[48px] lg:text-[60px] font-bold leading-[1.12] tracking-[-0.02em]">
            {cta.heading}
          </h2>
          <Link
            href={cta.buttonHref}
            className="inline-flex items-center gap-3 border border-white/20 bg-white/5 px-6 py-4 text-xs sm:text-sm font-medium tracking-[0.1875em] uppercase transition hover:bg-white/10"
          >
            <span>{cta.buttonLabel}</span>
            <Image src="/figma/services/arrow.svg" alt="" width={37} height={25} />
          </Link>
        </div>
      </div>
    </section>
  );
}

