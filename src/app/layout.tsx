import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import ClientWrapper from '@/components/layout/ClientWrapper';
import Footer from '@/components/layout/Footer';
import { ThemeSection } from '@/components/ui/ThemeSection.tsx';
import { ScrollToHash } from '@/components/layout/ScrollToHash';
import { organizationJsonLd, siteConfig } from '@/app/utils/seo';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digitallynext.com'),
  title: 'Digitally Next | Growth-Driven Global Digital Marketing Agency',
  description:
    'Partner with Digitally Next for strategy, branding, performance marketing, content, web development, and AI-driven decisions. We transform brands digitally.',
  keywords: [
    'digital marketing agency',
    'branding',
    'performance marketing',
    'SEO',
    'social media',
    'content marketing',
    'Digitally Next',
  ],
  openGraph: {
    title: 'Digitally Next | Growth-Driven Global Digital Marketing Agency',
    description: 'Strategy, branding, performance marketing, AI-driven decisions — all under one roof.',
    siteName: 'Digitally Next',
    url: 'https://www.digitallynext.com',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/logo1.webp',
        width: 600,
        height: 60,
        alt: 'Digitally Next Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digitally Next | Growth-Driven Global Digital Marketing Agency',
    description: 'Strategy, branding, performance marketing, AI-driven decisions — all under one roof.',
    images: ['/logo1.webp'],
  },
  alternates: {
    canonical: 'https://www.digitallynext.com',
  },
  verification: {
    google: 'Eq2pQQ2GuXvTaAbyOw860Gw6mwe4VLxMIlBLuwIfXrk',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Stack+Sans+Text:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: 'Stack Sans Text' }}>
        {/* Google Analytics - Only load in production or when GA_TRACKING_ID is available */}
        {GA_TRACKING_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}
        <Script
          id="clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wjq6d51bbm");`,
          }}
        />
        {/* Organization JSON-LD */}
        <Script id="ld-organization" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(organizationJsonLd())}
        </Script>
        <ScrollToHash delay={100} />
        <ClientWrapper>{children}</ClientWrapper>
        <ThemeSection theme="dark">
          <Footer />
        </ThemeSection>
      </body>
    </html>
  );
}
