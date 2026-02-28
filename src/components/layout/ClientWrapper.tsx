"use client";

import { ReactNode, useEffect } from "react";
import Preloader from "@/components/ui/Preloader";
import Header from "@/components/layout/Header";
import NextTopLoader from "nextjs-toploader";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function ClientWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
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
            <main>{children}</main>
        </div>
    );
}
