import { ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, nudge } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { plans, type Plan } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PlanCard({ p }: { p: Plan }) {
  return (
    <Card variant={p.featured ? "featured" : "lift"} className="flex h-full flex-col justify-between gap-gutter-lg p-gutter-lg">
      <div className="flex flex-col gap-gutter-md">
        <header className="flex flex-col gap-gutter-xs">
          <div className="flex items-center justify-between gap-gutter-sm">
            <h3 className="font-headline text-title-lg text-on-surface">{p.name}</h3>
            {p.featured && <Badge variant="solid">Most chosen</Badge>}
          </div>
          <p className="font-body text-body-sm text-on-surface-variant">{p.about}</p>
        </header>
        <div className="flex items-baseline gap-gutter-sm">
          <span className={cn("font-mono text-mono-lg tabular-nums", p.featured ? "text-primary" : "text-on-surface")}>{p.price}</span>
          {p.was && <span className="font-mono text-body-sm tabular-nums text-on-surface-variant line-through">{p.was}</span>}
          {p.per && <span className="font-body text-body-md text-on-surface-variant">{p.per}</span>}
        </div>
        <ul className="flex flex-col gap-gutter-sm border-t border-outline-variant pt-gutter-md font-body text-body-md text-on-surface-variant">
          {p.features.map((f) => (
            <li key={f} className="flex items-start gap-gutter-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span className={p.featured ? "text-on-surface" : undefined}>{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button asChild variant={p.variant} size="md" className="w-full">
        <a href={p.href} target="_blank" rel="noopener noreferrer">
          {p.cta} <ArrowRight className={cn("h-4 w-4", nudge)} aria-hidden="true" />
        </a>
      </Button>
    </Card>
  );
}

export function Pricing() {
  return (
    <Reveal as="section" id="pricing" className="mx-auto max-w-7xl px-page-margin-mobile py-section-mobile md:px-page-margin md:py-section">
      <SectionHeading eyebrow="Pricing" title="Straightforward fees." lede="Launch on its own, or keep the system in care after it is live. Custom software is scoped per project." />
      <div className="grid grid-cols-1 items-stretch gap-gutter-lg md:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 60} className="h-full"><PlanCard p={p} /></Reveal>
        ))}
      </div>
    </Reveal>
  );
}
