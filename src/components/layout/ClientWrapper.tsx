"use client";

import { ReactNode } from "react";
import Preloader from "@/components/ui/Preloader";
import Header from "@/components/layout/Header";
import NextTopLoader from "nextjs-toploader";

export default function ClientWrapper({ children }: { children: ReactNode }) {
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
            <main>{children}</main>
        </div>
    );
}
