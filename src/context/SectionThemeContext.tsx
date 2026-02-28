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

interface ContextType {
  theme: Theme;
  registerSection: (el: HTMLElement, theme: Theme) => () => void;
}

const SectionThemeContext = createContext<ContextType>({
  theme: "light",
  registerSection: () => () => {},
});

export function SectionThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const currentThemeRef = useRef<Theme>("light");

  // Map element → its theme
  const themeMapRef = useRef<Map<HTMLElement, Theme>>(new Map());

  // Single shared IntersectionObserver for all sections
  const observerRef = useRef<IntersectionObserver | null>(null);

  const getObserver = useCallback(() => {
    if (observerRef.current) return observerRef.current;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the first entry that became intersecting (crossed viewport center)
        const intersecting = entries.find((e) => e.isIntersecting);
        if (!intersecting) return;

        const sectionTheme = themeMapRef.current.get(
          intersecting.target as HTMLElement
        );
        if (!sectionTheme || sectionTheme === currentThemeRef.current) return;

        currentThemeRef.current = sectionTheme;
        setThemeState(sectionTheme);
      },
      {
        // Only fires when section crosses the vertical midpoint of the viewport
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    return observerRef.current;
  }, []);

  const registerSection = useCallback(
    (el: HTMLElement, sectionTheme: Theme) => {
      themeMapRef.current.set(el, sectionTheme);
      getObserver().observe(el);

      return () => {
        themeMapRef.current.delete(el);
        observerRef.current?.unobserve(el);
      };
    },
    [getObserver]
  );

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <SectionThemeContext.Provider value={{ theme, registerSection }}>
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          transition: "background-color 550ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
      {children}
    </SectionThemeContext.Provider>
  );
}

export const useSectionTheme = () => useContext(SectionThemeContext);
