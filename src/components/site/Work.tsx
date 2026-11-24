import { ArrowUpRight } from "lucide-react";
import truckana from "@/assets/images/truckana-dashboard.webp";
import { Card } from "@/components/ui/card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { projects, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ProjectCard({ p }: { p: Project }) {
  return (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
      <Card variant="interactive" className="flex h-full flex-col overflow-hidden">
        {p.image && (
          <div className="border-b border-outline-variant bg-surface-container-lowest p-gutter-md">
            <img src={truckana} alt="Truckana fleet dashboard showing trip mix, trips awaiting approval, completed trips, available drivers and trucks"
              width={1600} height={328} loading="lazy" decoding="async" className="h-auto w-full rounded-sm" />
          </div>
        )}
        <div className="flex flex-1 flex-col justify-between gap-gutter-md p-gutter-lg">
          <div className="flex flex-col gap-gutter-sm">
            <div className="flex items-center justify-between gap-gutter-sm">
              <span className={cn("font-mono text-mono-sm uppercase", p.eyebrowTone === "secondary" ? "text-secondary" : "text-primary")}>{p.eyebrow}</span>
              <ArrowUpRight className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-headline text-title-lg text-on-surface">{p.title}</h3>
            <p className="font-body text-body-md text-on-surface-variant">{p.body}</p>
          </div>
          <div className="flex items-center justify-between gap-gutter-sm border-t border-outline-variant pt-gutter-md">
            <span className="font-mono text-mono-sm text-on-surface-variant">{p.meta}</span>
            <span className="font-body text-label-lg text-primary">{p.cta}</span>
          </div>
        </div>
      </Card>
    </a>
  );
}

export function Work() {
  const list = [projects.fbk, projects.truckana, projects.tobacco, projects.zimsec];
  return (
    <Reveal as="section" id="work" className="border-y border-outline-variant bg-surface-container-lowest/65 py-section-mobile md:py-section">
      <div className="mx-auto max-w-7xl px-page-margin-mobile md:px-page-margin">
        <SectionHeading eyebrow="Selected work" title="Systems already in use." />
        <div className="grid grid-cols-1 items-stretch gap-gutter-lg md:grid-cols-2">
          {list.map((p, i) => (<Reveal key={p.key} delay={(i % 2) * 60} className="h-full"><ProjectCard p={p} /></Reveal>))}
        </div>
      </div>
    </Reveal>
  );
}
