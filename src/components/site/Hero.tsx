import { ArrowRight } from "lucide-react";
import { Badge, LiveDot } from "@/components/ui/badge";
import { Button, nudge } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { wa } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useState } from "react";

const consoles = {
  whatsapp: { label: "WhatsApp AI", title: "WhatsApp AI · 24/7 bot" },
  fleet: { label: "Fleet", title: "Truckana · truckana.com" },
  web: { label: "Web", title: "FBK Traders · fbktraders.com" },
} as const;
type Key = keyof typeof consoles;

const kpis = [
  { v: "35+", l: "Live systems", accent: true },
  { v: "14+", l: "Bots that stay on" },
  { v: "$80", l: "Websites from" },
  { v: "99.9%", l: "Uptime target", accent: true },
];

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between gap-gutter-sm">{children}</div>;
}
const mono = "font-mono text-mono-sm";

function ConsoleBody({ k }: { k: Key }) {
  if (k === "whatsapp")
    return (
      <>
        <Row><span className={cn(mono, "uppercase text-on-surface-variant")}>WhatsApp Business Cloud</span><span className={cn(mono, "tabular-nums text-primary")}>14+ bots active</span></Row>
        <div className="flex flex-col gap-gutter-sm">
          <div className="max-w-xs self-end rounded-md border border-outline-variant bg-surface-container-high px-3 py-2 font-body text-body-sm text-on-surface">Hi, can I book a clinic slot for tomorrow at 9am?</div>
          <div className="max-w-xs self-start rounded-md border border-primary bg-surface-container px-3 py-2 font-body text-body-sm text-on-surface">Confirmed for 09:00 AM tomorrow. Reminder queued and diary updated.</div>
        </div>
        <Row><span className={cn(mono, "text-on-surface-variant")}>Avg reply: 1.2s</span><span className={cn(mono, "text-primary")}>Human handover ready</span></Row>
      </>
    );
  if (k === "fleet")
    return (
      <>
        <Row><span className={cn(mono, "uppercase text-on-surface-variant")}>Trip mix · this month</span><span className={cn(mono, "tabular-nums text-primary")}>10 total trips</span></Row>
        <div className="grid grid-cols-3 gap-gutter-sm">
          {[["Completed", "7", true], ["Approval", "3"], ["Trucks", "5"]].map(([l, v, a]) => (
            <div key={l as string} className="rounded-md border border-outline-variant bg-surface-container p-3">
              <span className={cn(mono, "block text-on-surface-variant")}>{l}</span>
              <span className={cn("font-mono text-title-lg tabular-nums", a ? "text-primary" : "text-on-surface")}>{v}</span>
            </div>
          ))}
        </div>
        <Row><span className={cn(mono, "text-on-surface-variant")}>Month-end: 45 min</span><span className={cn(mono, "text-primary")}>1-click PDF export</span></Row>
      </>
    );
  return (
    <>
      <Row><span className={cn(mono, "uppercase text-on-surface-variant")}>Web &amp; VIP onboarding</span><span className={cn(mono, "tabular-nums text-primary")}>From $80</span></Row>
      <div className="flex flex-col gap-gutter-sm">
        {[["Custom mobile-first build + .com", "Live in 3–5d"], ["Support queries reduced", "−68%"]].map(([a, b]) => (
          <div key={a} className="flex items-center justify-between rounded-md border border-outline-variant bg-surface-container p-3">
            <span className="font-body text-body-sm text-on-surface">{a}</span><span className={cn(mono, "tabular-nums text-primary")}>{b}</span>
          </div>
        ))}
      </div>
      <Row><span className={cn(mono, "text-on-surface-variant")}>SSL + business email</span><span className={cn(mono, "text-primary")}>30-day warranty</span></Row>
    </>
  );
}

export function Hero() {
  const [tab, setTab] = useState<Key>("whatsapp");
  return (
    <section className="mx-auto max-w-7xl px-page-margin-mobile py-section-mobile md:px-page-margin md:py-section">
      <div className="grid grid-cols-1 items-center gap-gutter-xl lg:grid-cols-12">
        <div className="flex flex-col items-start gap-gutter-lg lg:col-span-7">
          <Badge className="animate-fade-up" role="status"><LiveDot />Harare · Worldwide</Badge>
          <h1 className="animate-fade-up font-display text-display-lg-mobile text-on-surface [animation-delay:60ms] md:text-display-lg">
            Websites and AI that <span className="text-primary">work as hard as you do.</span>
          </h1>
          <p className="max-w-prose animate-fade-up font-body text-body-md text-on-surface-variant [animation-delay:120ms] md:text-body-lg">
            Saint Enterprise designs fast websites, WhatsApp assistants, and the operational software a team actually opens. Inspired by passion, driven by excellence.
          </p>
          <div className="flex w-full animate-fade-up flex-col gap-gutter-sm pt-gutter-xs [animation-delay:180ms] sm:w-auto sm:flex-row sm:gap-gutter-md">
            <Button asChild size="lg">
              <a href={wa("Hi Saint Enterprise, I would like a quote for a website or chatbot.")} target="_blank" rel="noopener noreferrer">
                Get a quote <ArrowRight className={cn("h-4 w-4", nudge)} aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary"><a href="#work">See the work</a></Button>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:200ms] lg:col-span-5">
          <Card variant="interactive" className="overflow-hidden rounded-xl">
            <Tabs value={tab} onValueChange={(v) => setTab(v as Key)}>
              <div className="flex items-center justify-between gap-gutter-sm border-b border-outline-variant bg-surface-container px-gutter-md py-3 sm:px-gutter-lg">
                <div className="flex items-center gap-gutter-sm">
                  <LiveDot />
                  <span className={cn(mono, "whitespace-nowrap uppercase text-primary")}>Live<span className="hidden sm:inline"> console</span></span>
                </div>
                <TabsList aria-label="Interactive system preview">
                  {(Object.keys(consoles) as Key[]).map((k) => (
                    <TabsTrigger key={k} value={k}>{consoles[k].label}</TabsTrigger>
                  ))}
                </TabsList>
              </div>
              {(Object.keys(consoles) as Key[]).map((k) => (
                <TabsContent key={k} value={k} className="mt-0">
                  <div className="flex min-h-64 flex-col justify-between gap-gutter-md bg-surface-container-lowest p-gutter-md sm:p-gutter-lg">
                    <ConsoleBody k={k} />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            <div className="flex items-center justify-between gap-gutter-md border-t border-outline-variant bg-surface-container p-gutter-md sm:p-gutter-lg">
              <div className="flex min-w-0 flex-col gap-gutter-xs">
                <span className={cn(mono, "uppercase text-primary")}>Featured live system</span>
                <span className="truncate font-headline text-title-md text-on-surface">{consoles[tab].title}</span>
              </div>
              <Badge variant="outline">99.9% uptime</Badge>
            </div>
          </Card>
        </div>
      </div>

      <dl className="mt-section-mobile grid grid-cols-2 gap-gutter-lg border-t border-outline-variant pt-gutter-xl md:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.l} className="flex flex-col gap-gutter-xs">
            <dt className="order-2 font-body text-body-md text-on-surface-variant">{k.l}</dt>
            <dd className={cn("font-mono text-mono-lg tabular-nums", k.accent ? "text-primary" : "text-on-surface")}>{k.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
