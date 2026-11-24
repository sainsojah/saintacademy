import { ArrowRight, Bot, Globe, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { nudge } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons = { globe: Globe, bot: Bot, terminal: Terminal };

export function Services() {
  return (
    <Reveal as="section" id="services" className="mx-auto max-w-7xl px-page-margin-mobile py-section-mobile md:px-page-margin md:py-section">
      <SectionHeading eyebrow="Services" title="Three kinds of system. One standard of finish." />
      <div className="grid grid-cols-1 items-stretch gap-gutter-lg md:grid-cols-3">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <Reveal key={s.n} delay={i * 70} className="h-full">
              <Card variant="interactive" className="group/btn flex h-full flex-col justify-between gap-gutter-lg p-gutter-lg">
                <div className="flex flex-col gap-gutter-md">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-mono-sm text-primary">{s.n}</span>
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-headline text-title-lg text-on-surface">{s.title}</h3>
                  <p className="font-body text-body-md text-on-surface-variant">{s.body}</p>
                </div>
                <footer className="border-t border-outline-variant pt-gutter-md">
                  <a href={s.href} className="inline-flex items-center gap-gutter-sm font-body text-label-lg text-primary hover:underline">
                    {s.cta} <ArrowRight className={cn("h-4 w-4", nudge)} aria-hidden="true" />
                  </a>
                </footer>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Reveal>
  );
}
