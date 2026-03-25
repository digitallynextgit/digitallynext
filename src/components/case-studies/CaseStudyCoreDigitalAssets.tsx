'use client';

import AnimatedList from '@/components/ui/AnimatedList';
import type { CaseStudyDetail } from '@/data/casestudy';
import { useSectionTheme } from '@/context/SectionThemeContext';
import Image from 'next/image';
import Link from 'next/link';

interface CaseStudyCoreDigitalAssetsProps {
  detail: CaseStudyDetail;
  theme?: 'dark' | 'light';
}

export default function CaseStudyCoreDigitalAssets({ detail, theme }: CaseStudyCoreDigitalAssetsProps) {
  const { theme: contextTheme } = useSectionTheme();
  const isDark = (theme ?? contextTheme) === 'dark';

  return (
    <section
      className={[
        'w-full mt-[-10px] md:mt-[-25px] relative transition-colors duration-500',
        isDark ? 'bg-black' : 'bg-white',
      ].join(' ')}
    >
      <div className="w-full px-4 sm:px-6 md:px-[59px] py-10 relative">
        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-[142px] justify-center">
          {/* Heading */}
          <div className="w-full max-w-[463px] flex flex-col gap-6 md:gap-[54px]">
            <div className="flex flex-col">
              <div
                className={[
                  'text-center md:text-start text-[44px] sm:text-[56px] md:text-[80px]',
                  'leading-[1.1] md:leading-[1.3] font-normal transition-colors duration-500',
                  isDark ? 'text-white' : 'text-black',
                ].join(' ')}
              >
                <span className="text-[#E21F26]">{detail.coreDigitalAssets.headingPrefix}</span>{' '}
                {detail.coreDigitalAssets.headingHighlight}
              </div>
              {/* GET IN TOUCH CTA */}
              <div className="w-full flex justify-start ml-2 mt-5">
                <Link href="/contact" className="group inline-flex items-center gap-2">
                  <span className="text-[#E21F26] transition-transform duration-300 ease-out group-hover:-translate-x-1">
                    <Image src="/icons/enter.svg" alt="arrow" width={24} height={24} />
                  </span>
                  <span
                    className={[
                      'mt-1 font-light text-xl tracking-wide transition-colors duration-200 group-hover:text-[#E21F26]',
                    ].join(' ')}
                  >
                    GET IN TOUCH
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Animated list */}
          <div className="w-full max-w-[560px]">
            <AnimatedList
              items={detail.coreDigitalAssets.items}
              showGradients={false}
              enableArrowNavigation
              className="mt-1"
              itemClassName="min-h-[58px] flex items-center"
              selectedItemClassName={isDark ? 'ring-1 ring-white/10' : 'ring-1 ring-black/10'}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
