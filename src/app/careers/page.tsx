import JsonLd from '@/components/seo/JsonLd';
import { client } from '@/sanity/client';
import { serverClient } from '@/sanity/serverClient';
import { employeeStoriesQuery, postsByCategoryTitleQuery } from '@/sanity/queries';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';
import CareersPageClient, { type EmployeeStory, type HrCornerPost } from './CareersPageClient';

export const metadata = buildMetadata({
  title: 'Careers | Digitally Next',
  description:
    'Join Digitally Next - a growth-driven global digital marketing agency. Explore open roles across strategy, performance, content, design, and engineering.',
  path: '/careers',
});

// Revalidate every 60 seconds so newly published HR Corner posts show up promptly
export const revalidate = 60;

export default async function CareersPage() {
  const [hrCornerPosts, employeeStories] = await Promise.all([
    client.fetch<HrCornerPost[]>(postsByCategoryTitleQuery, { title: 'Career Talks - HR Corner' }),
    serverClient.fetch<EmployeeStory[]>(employeeStoriesQuery),
  ]);

  return (
    <>
      <JsonLd
        id="ld-careers"
        data={webPageJsonLd({
          title: 'Careers | Digitally Next',
          description:
            'Join Digitally Next - explore open roles across strategy, performance, content, design, and engineering.',
          path: '/careers',
        })}
      />
      <CareersPageClient hrCornerPosts={hrCornerPosts} employeeStories={employeeStories} />
    </>
  );
}
