import type { MetadataRoute } from 'next';
import { siteConfig } from '@/app/utils/seo';
import { services } from '@/data/services';
import { caseStudies } from '@/data/casestudy';
import {
  CAREERS_MODES,
  getCareerDepartmentHref,
  getCareerGroupHref,
  getCareerModeHref,
  getCareerRoleHref,
  isCollapsedGroup,
} from '@/data/careersDepartments';
import { fetchCareersOrFallback, getAllCareerRoleEntries } from '@/data/careers.server';
import { client } from '@/sanity/client';
import { allPostsQuery } from '@/sanity/queries';

// Rebuild hourly so newly published blog posts appear without a redeploy.
export const revalidate = 3600;

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
};

type SanityPost = { slug?: { current?: string }; publishedAt?: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.siteUrl;
  const now = new Date();

  const staticRoutes: Entry[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/case-studies', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/careers', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/design-portfolio', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms-of-use', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const serviceRoutes: Entry[] = services.map((s) => ({
    path: `/services/${s.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
  }));

  const caseRoutes: Entry[] = caseStudies.map((c) => ({
    path: `/case-studies/${c.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

  // Career hierarchy:
  //   /careers/<mode>                                            - mode landing
  //   /careers/<mode>/<group>                                    - group page
  //   /careers/<mode>/<group>/<department>                       - sub-department
  //   /careers/<mode>/<group>/<department>/<role>                - role
  // Sourced live from the HRMS. A careers outage degrades to a sitemap without
  // the careers branch rather than a failed build.
  const careerPaths = new Set<string>();
  // Mode landings
  for (const mode of CAREERS_MODES) careerPaths.add(getCareerModeHref(mode));
  // Group + department pages for both modes. Collapsed groups (1 sub-dept)
  // don't get a separate department URL - the group URL is the dept URL.
  for (const mode of CAREERS_MODES) {
    for (const group of await fetchCareersOrFallback(mode)) {
      careerPaths.add(getCareerGroupHref(group, mode));
      if (!isCollapsedGroup(group)) {
        for (const dept of group.subDepartments) {
          careerPaths.add(getCareerDepartmentHref(dept, group, mode));
        }
      }
    }
  }
  // Role detail pages
  for (const r of await getAllCareerRoleEntries()) careerPaths.add(getCareerRoleHref(r));
  const careerRoutes: Entry[] = [...careerPaths].map((path) => ({
    path,
    priority: 0.5,
    changeFrequency: 'weekly',
  }));

  const staticEntries: MetadataRoute.Sitemap = [...staticRoutes, ...serviceRoutes, ...caseRoutes, ...careerRoutes].map(
    (r) => ({
      url: `${base}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })
  );

  // Blog posts from Sanity - the dynamic content the old static sitemap missed.
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await client.fetch<SanityPost[]>(allPostsQuery);
    blogEntries = posts
      .filter((p) => p.slug?.current)
      .map((p) => ({
        url: `${base}/blog/${p.slug!.current}`,
        lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
  } catch {
    // If Sanity is unreachable at build/revalidate time, still emit static routes.
    blogEntries = [];
  }

  return [...staticEntries, ...blogEntries];
}
