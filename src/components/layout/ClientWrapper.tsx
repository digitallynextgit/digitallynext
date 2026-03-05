"use client";

import { ReactNode, useEffect } from "react";
import Preloader from "@/components/ui/Preloader";
import Header from "@/components/layout/Header";
import NextTopLoader from "nextjs-toploader";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { SectionThemeProvider } from "../../context/SectionThemeContext";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    // Safari fix: "instant" behavior for scrollTo not supported before Safari 15.4
    // Use scrollTop assignment as fallback for older Safari
    try {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return (
    <div id="top">
      <NextTopLoader
        color="#E21F26"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #your-brand-color, 0 0 5px #your-brand-color"
      />
      <Preloader />
      <Header />
      <Toaster position="top-right" />
      <SectionThemeProvider>
        <main>{children}</main>
      </SectionThemeProvider>
    </div>
  );
}
