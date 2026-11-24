import { Link } from "react-router-dom";
import { ArrowRight, Bot, Globe, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { nudge } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { servicePages } from "@/lib/services";
import { cn } from "@/lib/utils";

export const serviceIcons = { globe: Globe, bot: Bot, terminal: Terminal };

export function Services() {
  return (
    <Reveal as="section" id="services" className="mx-auto max-w-7xl px-page-margin-mobile py-section-mobile md:px-page-margin md:py-section">
      <SectionHeading eyebrow="Services" title="Three kinds of system. One standard of finish." />
      <div className="grid grid-cols-1 items-stretch gap-gutter-lg md:grid-cols-3">
        {servicePages.map((s, i) => {
          const Icon = serviceIcons[s.icon];
          return (
            <Reveal key={s.slug} delay={i * 60} className="h-full">
              <Link to={s.path} className="group/btn block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
                <Card variant="interactive" className="flex h-full flex-col justify-between gap-gutter-lg p-gutter-lg">
                  <div className="flex flex-col gap-gutter-md">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-mono-sm text-primary">0{i + 1}</span>
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-headline text-title-lg text-on-surface">{s.name}</h3>
                    <p className="font-body text-body-md text-on-surface-variant">{s.short}</p>
                  </div>
                  <footer className="flex items-center justify-between border-t border-outline-variant pt-gutter-md">
                    <span className="font-mono text-mono-sm text-on-surface-variant">{s.priceLabel}</span>
                    <span className="inline-flex items-center gap-gutter-sm font-body text-label-lg text-primary">
                      Details <ArrowRight className={cn("h-4 w-4", nudge)} aria-hidden="true" />
                    </span>
                  </footer>
                </Card>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Reveal>
  );
}
