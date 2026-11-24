import { ArrowUpRight } from "lucide-react";
import fbk from "@/assets/images/fbk-trading.jpg";
import tobacco from "@/assets/images/tobacco-field.jpg";
import truckana from "@/assets/images/truckana-dashboard.webp";
import { Card } from "@/components/ui/card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { wa } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

function Project({
  href, eyebrow, eyebrowTone = "primary", title, body, metric, meta, media, children,
}: {
  href: string; eyebrow: string; eyebrowTone?: "primary" | "secondary"; title: string; body: string;
  metric: string; meta: string; media?: ReactNode; children?: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
      <Card variant="interactive" className="flex h-full flex-col justify-between overflow-hidden">
        {media}
        <div className={cn("flex flex-1 flex-col justify-between gap-gutter-md p-gutter-lg")}>
          <div className="flex flex-col gap-gutter-sm">
            <div className="flex items-center justify-between gap-gutter-sm">
              <span className={cn("font-mono text-mono-sm uppercase", eyebrowTone === "primary" ? "text-primary" : "text-secondary")}>{eyebrow}</span>
              <ArrowUpRight className="h-5 w-5 text-primary transition-transform duration-card-hover ease-card-hover group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </div>
            <h3 className="font-headline text-title-lg text-on-surface">{title}</h3>
            <p className="font-body text-body-md text-on-surface-variant">{body}</p>
            {children}
          </div>
          <div className="flex items-center justify-between gap-gutter-sm border-t border-outline-variant pt-gutter-md">
            <span className="font-mono text-mono-sm tabular-nums text-primary">{metric}</span>
            <span className="font-body text-body-sm text-on-surface-variant">{meta}</span>
          </div>
        </div>
      </Card>
    </a>
  );
}

const photo = (src: string, alt: string) => (
  <div className="h-56 w-full overflow-hidden border-b border-outline-variant bg-surface-container">
    <img src={src} alt={alt} width={1280} height={720} loading="lazy" decoding="async"
      className="h-full w-full object-cover transition-transform duration-[900ms] ease-card-hover group-hover:scale-[1.04]" />
  </div>
);

export function Work() {
  return (
    <Reveal as="section" id="work" className="border-y border-outline-variant bg-surface-container-lowest/65 py-section-mobile md:py-section">
      <div className="mx-auto max-w-7xl px-page-margin-mobile md:px-page-margin">
        <SectionHeading eyebrow="Selected work" title="Systems that are already in use." />
        <div className="grid grid-cols-1 items-stretch gap-gutter-lg md:grid-cols-2">
          <Reveal className="h-full">
            <Project
              href="https://fbktraders.com/" eyebrow="Trading · Web platform" title="FBK Forex Broker Killers"
              body="Live market tickers, a bull and bear gauge, a light and dark theme, and a VIP signals path with payment built in."
              metric="Support messages down 68%" meta="fbktraders.com"
              media={photo(fbk, "FBK Forex Broker Killers trading platform")}
            />
          </Reveal>
          <Reveal delay={80} className="h-full">
            <Project
              href="https://truckana.com/" eyebrow="Logistics · Fleet platform" title="Truckana"
              body="Cross-border trips, driver logs, maintenance alerts, fuel, payroll, and a one-click PDF of where the revenue went."
              metric="Month-end in 45 minutes" meta="truckana.com"
              media={
                <div className="flex h-56 w-full flex-col justify-center gap-gutter-xs border-b border-outline-variant bg-surface-container-lowest p-gutter-md">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-mono-sm text-primary">truckana.com · Live fleet desk</span>
                    <span className="font-mono text-mono-sm text-on-surface-variant">Trip mix</span>
                  </div>
                  <img src={truckana} alt="Truckana live fleet dashboard showing trip mix, awaiting approval, completed trips, available drivers and trucks"
                    width={1600} height={328} loading="lazy" decoding="async" className="h-40 w-full rounded-sm object-contain" />
                </div>
              }
            />
          </Reveal>
          <Reveal className="h-full">
            <Project
              href={wa("Hi Tobbaco AI, I would like to diagnose a crop leaf.")} eyebrow="Agriculture · Vision on WhatsApp" title="Tobbaco AI"
              body="A farmer sends a leaf photo. Computer vision returns a diagnosis, a confidence score, and a treatment, and asks for a clearer photo when unsure."
              metric="4,200+ field scans · 91% accuracy" meta="Try on WhatsApp"
              media={photo(tobacco, "A phone resting among tobacco leaves in warm field light")}
            />
          </Reveal>
          <Reveal delay={80} className="h-full">
            <Project
              href={wa("Hi Saint Enterprise, tell me about the ZIMSEC maths assistant.")} eyebrow="Education · Revision assistant" eyebrowTone="secondary" title="ZIMSEC Maths"
              body="O-Level problems on WhatsApp, with a three-step hint ladder that teaches the method before it shows the full solution."
              metric="1,800+ questions a month" meta="Enquire"
            >
              <div className="mt-gutter-sm flex flex-col gap-gutter-xs rounded-md border border-outline-variant bg-surface-container p-gutter-md">
                <span className="font-mono text-mono-sm text-primary">3-STEP HINT LADDER</span>
                <p className="font-body text-body-sm text-on-surface-variant">
                  1. Identify formula → 2. Substitute values → 3. Verify final unit. Students work the steps rather than copying a finished answer.
                </p>
              </div>
            </Project>
          </Reveal>
        </div>
      </div>
    </Reveal>
  );
}
