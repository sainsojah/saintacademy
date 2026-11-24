import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { applyMeta, getPage } from "@/lib/seo";
import { CLARITY_ID } from "@/lib/config";

/** Scroll to the top on page changes, or to the #section when the link has one. */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start", behavior: first.current ? "auto" : "smooth" }));
    } else if (!first.current) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    first.current = false;
  }, [pathname, hash]);
  return null;
}

/** Keeps title, description, canonical and schema in step with the route on client navigation. */
export function RouteSeo() {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; } // first paint is prerendered already
    applyMeta(getPage(pathname));
  }, [pathname]);
  return null;
}

/** Loads Microsoft Clarity once, after the page is idle. Does nothing until CLARITY_ID is set. */
export function Analytics() {
  useEffect(() => {
    if (!CLARITY_ID || document.getElementById("clarity-script")) return;
    const load = () => {
      /* eslint-disable */
      (function (c: any, l: Document, a: string, r: string, i: string) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        const t = l.createElement(r) as HTMLScriptElement;
        t.async = true; t.id = "clarity-script"; t.src = "https://www.clarity.ms/tag/" + i;
        l.head.appendChild(t);
      })(window, document, "clarity", "script", CLARITY_ID);
      /* eslint-enable */
    };
    const w = window as unknown as { requestIdleCallback?: (cb: () => void) => void };
    if (w.requestIdleCallback) w.requestIdleCallback(load); else setTimeout(load, 2000);
  }, []);
  return null;
}
