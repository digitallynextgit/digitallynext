"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToHash({ delay = 100 }: { delay?: number }) {
  const pathname = usePathname();
  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (!hash) return;
    const t = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, delay);
    return () => clearTimeout(t);
  }, [pathname]);
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash?.slice(1);
      if (!hash) return;
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, delay);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [delay]);
  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (!href.includes("#")) return;

      const hash = href.split("#")[1];
      if (!hash) return;

      const el = document.getElementById(hash);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${hash}`);
    };
    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, []);
  return null;
}
