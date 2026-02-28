import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from "@/components/layout/ClientWrapper";
import Footer from "@/components/layout/Footer";
import { ThemeSection } from "@/components/ui/ThemeSection.tsx";

export const metadata: Metadata = {
  title: "Digitally Next | Full-Stack Digital Marketing Agency",
  description:
    "Partner with Digitally Next for strategy, branding, performance marketing, content, web development, and AI-driven decisions. We transform brands digitally.",
  keywords: [
    "digital marketing agency",
    "branding",
    "performance marketing",
    "SEO",
    "social media",
    "content marketing",
    "Digitally Next",
  ],
  openGraph: {
    title: "Digitally Next | Full-Stack Digital Marketing Agency",
    description:
      "Strategy, branding, performance marketing, AI-driven decisions — all under one roof.",
    siteName: "Digitally Next",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Stack+Sans+Text:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "Stack Sans Text" }}>
        <ClientWrapper>{children}</ClientWrapper>
        <ThemeSection theme="dark">
          <Footer />
        </ThemeSection>
      </body>
    </html>
  );
}
