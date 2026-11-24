import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "primary" | "secondary";
  className?: string;
  action?: ReactNode;
}

export function SectionHeading({ eyebrow, title, lede, tone = "primary", className, action }: Props) {
  return (
    <div className={cn("mb-gutter-xl flex items-end justify-between gap-gutter-lg", className)}>
      <div className="flex max-w-2xl flex-col gap-gutter-sm">
        <span className={cn("font-mono text-mono-sm uppercase", tone === "primary" ? "text-primary" : "text-secondary")}>{eyebrow}</span>
        <h2 className="font-headline text-headline-lg-mobile text-on-surface md:text-headline-lg">{title}</h2>
        {lede && <p className="max-w-prose font-body text-body-lg text-on-surface-variant">{lede}</p>}
      </div>
      {action}
    </div>
  );
}
