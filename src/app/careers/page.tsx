import Script from 'next/script';
import { client } from '@/sanity/client';
import { postsByCategoryTitleQuery } from '@/sanity/queries';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';
import CareersPageClient, { type HrCornerPost } from './CareersPageClient';

export const metadata = buildMetadata({
  title: 'Careers | Digitally Next',
  description:
    'Join Digitally Next - a growth-driven global digital marketing agency. Explore open roles across strategy, performance, content, design, and engineering.',
  path: '/careers',
});

// Revalidate every 60 seconds so newly published HR Corner posts show up promptly
export const revalidate = 60;

export default async function CareersPage() {
  const hrCornerPosts: HrCornerPost[] = await client.fetch(postsByCategoryTitleQuery, {
    title: 'Career Talks - HR Corner',
  });

  return (
    <>
      <Script id="ld-careers" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          webPageJsonLd({
            title: 'Careers | Digitally Next',
            description:
              'Join Digitally Next - explore open roles across strategy, performance, content, design, and engineering.',
            path: '/careers',
          })
        )}
      </Script>
      <CareersPageClient hrCornerPosts={hrCornerPosts} />
    </>
  );
}
