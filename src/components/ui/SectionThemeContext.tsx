// context/SectionThemeContext.tsx
"use client";

import { createContext, useContext, useState, useCallback } from "react";

type Theme = "light" | "dark";

const SectionThemeContext = createContext<{
  setTheme: (theme: Theme) => void;
}>({ setTheme: () => {} });

export function SectionThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
  }, []);

  return (
    <SectionThemeContext.Provider value={{ setTheme }}>
      {/* ✅ Fixed background layer — yahi morph hoga */}
      <div
        className="fixed inset-0 -z-10 transition-colors duration-700 ease-in-out"
        style={{
          backgroundColor: theme === "dark" ? "#0a0a0a" : "#ffffff",
        }}
      />
      {children}
    </SectionThemeContext.Provider>
  );
}

export const useSectionTheme = () => useContext(SectionThemeContext);
