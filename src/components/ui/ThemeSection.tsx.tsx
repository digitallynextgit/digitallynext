// components/ui/ThemeSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { useSectionTheme } from "./SectionThemeContext";

type Props = {
  theme: "light" | "dark";
  children: React.ReactNode;
};

export function ThemeSection({ theme, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { setTheme } = useSectionTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTheme(theme);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [theme, setTheme]);

  // ✅ Sirf ek transparent wrapper — koi padding nahi
  return <div ref={ref}>{children}</div>;
}
