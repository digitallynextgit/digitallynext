"use client";

import { ReactNode } from "react";
import Preloader from "@/components/ui/Preloader";
import Header from "@/components/layout/Header";

export default function ClientWrapper({ children }: { children: ReactNode }) {
    return (
        <>
            <Preloader />
            <Header />
            <main>{children}</main>
        </>
    );
}
