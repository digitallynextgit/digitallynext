'use client';

import HeroSection from '@/components/careers/HeroSection';
import WorkHereSection from '@/components/careers/WorkHereSection';
import GrowthSection from '@/components/careers/GrowthSection';
import GrowthCarouselSection from '@/components/careers/GrowthCarouselSection';
import ModernDadSection from '@/components/careers/ModernDadSection';
import AdacSection from '@/components/careers/AdacSection';
import WhoThrivesSection from '@/components/careers/WhoThrivesSection';
import EmployeeStoriesSection from '@/components/careers/EmployeeStoriesSection';
import PeoplePlaybookSection, { type PlaybookPost } from '@/components/careers/PeoplePlaybookSection';
import OpenRolesSection from '@/components/careers/OpenRoleSection';
import CareersCtaSection from '@/components/careers/CareersCtaSection';
import { ThemeSection } from '@/components/ui/ThemeSection.tsx';

export type HrCornerPost = PlaybookPost;

interface CareersPageClientProps {
  hrCornerPosts: HrCornerPost[];
}

export default function CareersPageClient({ hrCornerPosts }: CareersPageClientProps) {
  return (
    <main>
      <ThemeSection theme="light">
        <HeroSection />
      </ThemeSection>

      <ThemeSection theme="light">
        <WorkHereSection />
      </ThemeSection>

      <ThemeSection theme="light">
        <EmployeeStoriesSection />
      </ThemeSection>

      <ThemeSection theme="light">
        <GrowthSection />
      </ThemeSection>

      <ThemeSection theme="light">
        <PeoplePlaybookSection posts={hrCornerPosts} />
      </ThemeSection>

      <ThemeSection theme="light">
        <GrowthCarouselSection />
      </ThemeSection>

      {/* <ThemeSection theme="dark">
        <ModernDadSection />
      </ThemeSection> */}

      {/* <ThemeSection theme="light">
        <AdacSection />
      </ThemeSection> */}

      <ThemeSection theme="light">
        <WhoThrivesSection />
      </ThemeSection>

      <ThemeSection theme="light">
        <OpenRolesSection />
      </ThemeSection>

      <ThemeSection theme="light">
        <CareersCtaSection />
      </ThemeSection>
    </main>
  );
}
