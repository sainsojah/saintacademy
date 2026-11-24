import { useEffect, useRef, useState } from "react";

/** Writes scroll progress (0..1) to a CSS var on the ref'd element, and reports scrollY past a threshold. */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      ref.current?.style.setProperty("--p", String(max > 0 ? Math.min(1, h.scrollTop / max) : 0));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return ref;
}

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
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    const onTop = () => { if (window.scrollY < 200) setActive(""); };
    addEventListener("scroll", onTop, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", onTop); };
  }, [ids]);
  return active;
}

export const prefersReducedMotion = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
