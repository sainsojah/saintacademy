import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";
const KEY = "sa-theme";

function current(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(current());
    // Follow the OS until the visitor picks a theme themselves.
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      try { if (localStorage.getItem(KEY)) return; } catch { /* ignore */ }
      apply(mq.matches ? "dark" : "light", false, setTheme);
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    apply(current() === "dark" ? "light" : "dark", true, setTheme);
  }, []);

  return { theme, toggle };
}

function apply(next: Theme, persist: boolean, set: (t: Theme) => void) {
  document.documentElement.classList.toggle("dark", next === "dark");
  document.querySelector('meta[name="color-scheme"]')?.setAttribute("content", next);
  if (persist) { try { localStorage.setItem(KEY, next); } catch { /* ignore */ } }
  set(next);
}
