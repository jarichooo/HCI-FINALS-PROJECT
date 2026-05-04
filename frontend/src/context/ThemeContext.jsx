import { createContext, useContext, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "../theme/theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? darkTheme : lightTheme;

  // Inject CSS variables onto :root whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      // Convert camelCase key to --kebab-case CSS variable
      const cssVar = "--" + key.replace(/([A-Z])/g, (m) => "-" + m.toLowerCase());
      root.style.setProperty(cssVar, value);
    });
    // Also set a data attribute for any CSS selector needs
    root.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [theme, isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
