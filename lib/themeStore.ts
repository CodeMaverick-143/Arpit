/**
 * Tiny external store for the colour theme so components can subscribe via
 * useSyncExternalStore (no setState-in-effect, no hydration mismatch).
 * The <html> class is also set pre-hydration by the inline script in layout.
 */
export type Theme = "dark" | "light";

const EVENT = "themechange";
const KEY = "theme";

export function readTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  localStorage.setItem(KEY, theme);
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeTheme(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export const getServerTheme = (): Theme => "dark";

/** Runs before paint (inlined in <head>) to avoid a theme flash. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t)}catch(e){}})();`;
