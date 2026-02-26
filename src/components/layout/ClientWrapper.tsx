"use client";

import { ReactNode } from "react";
import Preloader from "@/components/ui/Preloader";
import Header from "@/components/layout/Header";

export default function ClientWrapper({ children }: { children: ReactNode }) {
    return (
        <div id="top">
            <Preloader />
            <Header />
            <main>{children}</main>
        </div>
    );
}
