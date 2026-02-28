"use client";

import { useEffect, useRef } from "react";
import { useSectionTheme } from "../../context/SectionThemeContext";

type Props = {
  theme: "light" | "dark";
  children: React.ReactNode;
};

export function ThemeSection({ theme, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { registerSection } = useSectionTheme();

  useEffect(() => {
    if (!ref.current) return;
    // registerSection returns unregister fn — cleanup automatic
    return registerSection(ref.current, theme);
  }, [theme, registerSection]);

  return <div ref={ref}>{children}</div>;
}
