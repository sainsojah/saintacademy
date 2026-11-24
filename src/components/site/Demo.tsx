import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useReveal } from "@/hooks/use-reveal";
import { prefersReducedMotion } from "@/hooks/use-scroll";
import { PHONE_DISPLAY, wa } from "@/lib/site";
import { cn } from "@/lib/utils";

type Scenario = "confident" | "unsure";

const replies: Record<Scenario, { tag: string; tone: "primary" | "secondary"; text: string; foot: string }> = {
  confident: {
    tag: "Diagnosis · 93% confidence", tone: "primary",
    text: "Early Alternaria leaf spot detected. Apply copper-based fungicide within 48 hours and isolate heavily spotted lower leaves.",
    foot: "10:14 AM · Auto-verified",
  },
  unsure: {
    tag: "Low confidence · 41%", tone: "secondary",
    text: "This leaf photo is too dark and slightly blurred to confirm a diagnosis. Please take one closer photo in daylight so I do not guess.",
    foot: "10:15 AM · Honest fallback",
  },
};

export function Demo() {
  const [scenario, setScenario] = useState<Scenario>("confident");
  const [stage, setStage] = useState(0); // 0 empty · 1 photo sent · 2 bot typing · 3 reply
  const timers = useRef<number[]>([]);
  const { ref, visible } = useReveal<HTMLDivElement>();

  const play = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (prefersReducedMotion()) { setStage(3); return; }
    setStage(0);
    [[1, 250], [2, 950], [3, 1900]].forEach(([s, ms]) => {
      timers.current.push(window.setTimeout(() => setStage(s), ms));
    });
  }, []);

  // Play once when the chat first scrolls into view.
  useEffect(() => { if (visible) play(); }, [visible, play]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const pick = (s: Scenario) => { setScenario(s); play(); };
  const r = replies[scenario];

  return (
    <Reveal as="section" id="demo" className="mx-auto max-w-7xl px-page-margin-mobile py-section-mobile md:px-page-margin md:py-section">
      <div className="grid grid-cols-1 items-center gap-gutter-xl lg:grid-cols-12">
        <div className="flex flex-col gap-gutter-md lg:col-span-5">
          <SectionHeading className="mb-0" eyebrow="Live demo" title="A bot that admits when it is unsure."
            lede="Trust is the product. When the vision model is not confident, it asks for a sharper photo instead of inventing a diagnosis." />
          <div className="flex flex-wrap items-center gap-gutter-sm pt-gutter-xs" role="group" aria-label="Choose a scenario">
            <Button size="md" variant={scenario === "confident" ? "default" : "tonal"} aria-pressed={scenario === "confident"} onClick={() => pick("confident")}>Sharp leaf photo</Button>
            <Button size="md" variant={scenario === "unsure" ? "default" : "tonal"} aria-pressed={scenario === "unsure"} onClick={() => pick("unsure")}>Blurry photo</Button>
          </div>
          <div className="flex items-center justify-between gap-gutter-md border-t border-outline-variant pt-gutter-md">
            <div className="flex flex-col">
              <span className="font-mono text-mono-sm uppercase text-on-surface-variant">Direct line</span>
              <a href={wa()} target="_blank" rel="noopener noreferrer" className="font-mono text-title-md tabular-nums text-primary hover:underline">{PHONE_DISPLAY}</a>
            </div>
            <Button variant="ghost" size="md" onClick={play}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Replay
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Card className="overflow-hidden rounded-xl">
            <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container px-gutter-md py-gutter-md sm:px-gutter-lg">
              <div className="flex items-center gap-gutter-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-headline text-title-md text-on-primary" aria-hidden="true">T</div>
                <div className="flex flex-col">
                  <span className="font-headline text-title-md text-on-surface">Tobbaco AI</span>
                  <span className="inline-flex items-center gap-gutter-xs font-body text-body-sm text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" /> Online · WhatsApp
                  </span>
                </div>
              </div>
              <span className="hidden font-mono text-mono-sm text-on-surface-variant sm:inline">VISION v2.4</span>
            </div>

            <div ref={ref} aria-live="polite" className="flex min-h-80 flex-col gap-gutter-md bg-surface-container-lowest p-gutter-md sm:p-gutter-lg">
              {stage >= 1 && (
                <div className="max-w-md animate-msg-in self-end rounded-lg border border-outline-variant bg-surface-container-high p-gutter-md">
                  <p className="font-body text-body-md text-on-surface">[Leaf photo uploaded · 1.2 MB]</p>
                  <span className="mt-1 block font-mono text-mono-sm text-on-surface-variant">10:14 AM</span>
                </div>
              )}
              {stage === 2 && (
                <div className="animate-msg-in self-start rounded-lg border border-outline-variant bg-surface-container px-gutter-md py-3" aria-label="Tobbaco AI is typing">
                  <span className="flex gap-1" aria-hidden="true">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-1.5 w-1.5 animate-dot rounded-full bg-on-surface-variant" style={{ animationDelay: `${i * 160}ms` }} />
                    ))}
                  </span>
                </div>
              )}
              {stage >= 3 && (
                <div key={scenario} className={cn("max-w-lg animate-msg-in self-start rounded-lg border bg-surface-container p-gutter-md", r.tone === "primary" ? "border-primary" : "border-secondary")}>
                  <span className={cn("mb-1 block font-mono text-mono-sm uppercase", r.tone === "primary" ? "text-primary" : "text-secondary")}>{r.tag}</span>
                  <p className="font-body text-body-md text-on-surface">{r.text}</p>
                  <span className="mt-2 block font-mono text-mono-sm text-on-surface-variant">{r.foot}</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Reveal>
  );
}
