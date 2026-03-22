"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: ResolvedTheme;
  systemTheme: ResolvedTheme;
  themes: Theme[];
};

type ThemeProviderProps = React.PropsWithChildren<{
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  attribute?: "class";
}>;

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

const THEME_STORAGE_KEY = "theme";
const themes: Theme[] = ["light", "dark", "system"];
const systemQuery = "(prefers-color-scheme: dark)";

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia(systemQuery).matches ? "dark" : "light";

const disableTransitionsTemporarily = () => {
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{transition:none !important;}",
    ),
  );
  document.head.appendChild(style);
  return () => {
    window.getComputedStyle(document.body);
    setTimeout(() => {
      document.head.removeChild(style);
    }, 1);
  };
};

const applyTheme = (
  theme: Theme,
  systemTheme: ResolvedTheme,
  disableTransitionOnChange?: boolean,
) => {
  const resolved = theme === "system" ? systemTheme : theme;
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;

  const cleanup = disableTransitionOnChange
    ? disableTransitionsTemporarily()
    : null;

  cleanup?.();
  return resolved;
};

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = THEME_STORAGE_KEY,
  enableSystem = true,
  disableTransitionOnChange,
}: ThemeProviderProps) => {
  const [theme, setThemeState] = React.useState<Theme>(() => defaultTheme);
  const [systemTheme, setSystemTheme] = React.useState<ResolvedTheme>("light");
  const [resolvedTheme, setResolvedTheme] =
    React.useState<ResolvedTheme>("light");

  React.useEffect(() => {
    if (!enableSystem && theme === "system") {
      setThemeState("light");
      return;
    }

    setSystemTheme(getSystemTheme());
  }, [enableSystem, theme]);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark" || stored === "system") {
      setThemeState(stored);
    }
  }, [storageKey]);

  React.useEffect(() => {
    const media = window.matchMedia(systemQuery);
    const onChange = () => setSystemTheme(getSystemTheme());

    if (media.addEventListener) {
      media.addEventListener("change", onChange);
    } else {
      media.addListener(onChange);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", onChange);
      } else {
        media.removeListener(onChange);
      }
    };
  }, []);

  React.useEffect(() => {
    const resolved = applyTheme(theme, systemTheme, disableTransitionOnChange);
    setResolvedTheme(resolved);
  }, [theme, systemTheme, disableTransitionOnChange]);

  React.useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      if (!event.newValue) return;

      if (
        event.newValue === "light" ||
        event.newValue === "dark" ||
        event.newValue === "system"
      ) {
        setThemeState(event.newValue);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey]);

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      setThemeState(nextTheme);
      try {
        window.localStorage.setItem(storageKey, nextTheme);
      } catch {
        // ignore storage failures
      }
    },
    [storageKey],
  );

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      systemTheme,
      themes,
    }),
    [theme, setTheme, resolvedTheme, systemTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
