"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";
import {
  applyTheme,
  getServerTheme,
  readTheme,
  subscribeTheme,
  type Theme,
} from "@/lib/themeStore";

interface ToggleOptions {
  /** Viewport coordinates to start the circular reveal from */
  x?: number;
  y?: number;
}

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: (opts?: ToggleOptions) => void;
}>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, getServerTheme);

  /**
   * Flip the theme. When the View Transitions API is available (and the
   * user hasn't asked for reduced motion) the new theme expands as a circle
   * from the toggle button.
   */
  const toggleTheme = useCallback((opts?: ToggleOptions) => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    const doc = document as DocWithVT;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!doc.startViewTransition || reduce) {
      applyTheme(next);
      return;
    }

    const x = opts?.x ?? window.innerWidth / 2;
    const y = opts?.y ?? window.innerHeight / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(() => applyTheme(next));

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
