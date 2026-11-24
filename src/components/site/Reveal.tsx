import { createElement, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

interface RevealProps {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
}

/**
 * Fades + rises 16px into place when scrolled into view.
 * Keep this on a wrapper, not on an element that also has a hover transform.
 */
export function Reveal({ as = "div", delay = 0, className, children, id }: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>();
  return createElement(
    as,
    { ref, id, className: cn("reveal", className), "data-visible": visible, style: { "--reveal-delay": `${delay}ms` } as CSSProperties },
    children,
  );
}
