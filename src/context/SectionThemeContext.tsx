"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

type Theme = "light" | "dark";

interface SectionEntry {
  el: HTMLElement;
  theme: Theme;
}

interface ContextType {
  theme: Theme;
  registerSection: (el: HTMLElement, theme: Theme) => () => void;
}

const SectionThemeContext = createContext<ContextType>({
  theme: "light",
  registerSection: () => () => { },
});

export function SectionThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>("light");
  const sectionsRef = useRef<SectionEntry[]>([]);
  const rafRef = useRef<number | null>(null);
  const currentThemeRef = useRef<Theme>("light");

  const registerSection = useCallback(
    (el: HTMLElement, sectionTheme: Theme) => {
      const entry: SectionEntry = { el, theme: sectionTheme };
      sectionsRef.current.push(entry);

      // Immediately check on register (handles initial load)
      checkActiveSection();

      return () => {
        sectionsRef.current = sectionsRef.current.filter((s) => s !== entry);
      };
    },
    []
  );

  const checkActiveSection = useCallback(() => {
    const viewportCenter = window.innerHeight / 2;
    let closestSection: SectionEntry | null = null;
    let closestDistance = Infinity;

    for (const section of sectionsRef.current) {
      const rect = section.el.getBoundingClientRect();
      const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!isVisible) continue;

      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = section;
      }
    }

    if (closestSection && closestSection.theme !== currentThemeRef.current) {
      currentThemeRef.current = closestSection.theme;
      setThemeState(closestSection.theme);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      // ✅ rAF — smooth, no jank, batches multiple scroll events
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(checkActiveSection);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    checkActiveSection(); // initial check

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [checkActiveSection]);

  return (
    <SectionThemeContext.Provider value={{ theme, registerSection }}>
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          transition: "background-color 1000ms cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />
      {children}
    </SectionThemeContext.Provider>
  );
}

export const useSectionTheme = () => useContext(SectionThemeContext);
