import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { notFound } from 'next/navigation';
import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { getServiceBySlug } from '@/data/services';
import { buildMetadata, webPageJsonLd } from '@/app/utils/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: 'Service Not Found | Digitally Next' };
  }

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd
        id={`ld-service-${slug}`}
        data={webPageJsonLd({
          title: service.metaTitle,
          description: service.metaDescription,
          path: `/services/${slug}`,
        })}
      />
      <ServiceDetailPage service={service} />
    </>
  );
}
