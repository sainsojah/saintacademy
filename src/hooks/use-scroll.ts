import { useEffect, useState } from "react";

export function useScrolledPast(px: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const on = () => setPast(window.scrollY > px);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, [px]);
  return past;
}

/** Id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: readonly string[], key: string) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    setActive("");
    const onTop = () => { if (window.scrollY < 200) setActive(""); };
    addEventListener("scroll", onTop, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", onTop); };
  }, [ids, key]);
  return active;
}

export const prefersReducedMotion = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
