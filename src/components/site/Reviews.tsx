import { useEffect, useRef, useState, type FormEvent } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { reviews as builtIn, type Review } from "@/lib/content";
import { wa } from "@/lib/site";
import { prefersReducedMotion } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

const KEY = "sa_client_reviews";
const SERVICES = ["Website", "WhatsApp AI", "Operational software", "Care plan", "A full suite"];

function loadSaved(): Review[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch { return []; }
}

const initials = (name: string) => name.split(/\s+/).map((w) => w[0] || "").join("").slice(0, 2).toUpperCase() || "SE";

function ReviewCard({ r, fading }: { r: Review; fading: boolean }) {
  const n = Math.max(1, Math.min(5, r.rating || 5));
  return (
    <Card variant="lift" className={cn("flex h-full flex-col justify-between gap-gutter-lg p-gutter-lg transition-[opacity,transform,border-color] duration-[320ms]", fading && "translate-y-1 opacity-0")}>
      <div className="flex flex-col gap-gutter-md">
        <span className="font-mono text-mono-sm text-primary" role="img" aria-label={`${n} out of 5 stars`}>{"★".repeat(n)}</span>
        <p className="font-body text-body-md text-on-surface">“{r.text}”</p>
      </div>
      <footer className="flex items-center gap-gutter-md border-t border-outline-variant pt-gutter-md">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high font-mono text-mono-sm text-primary" aria-hidden="true">{initials(r.name)}</div>
        <div className="flex min-w-0 flex-col">
          <span className="font-headline text-title-md text-on-surface">{r.name}</span>
          <span className="truncate font-body text-body-sm text-on-surface-variant">{r.company} · {r.service}</span>
        </div>
      </footer>
    </Card>
  );
}

function ReviewDialog({ onAdd }: { onAdd: (r: Review) => void }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [done, setDone] = useState<Review | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const rev: Review = {
      name: String(f.get("name") || "").trim(), company: String(f.get("company") || "").trim(),
      service: String(f.get("service") || SERVICES[0]), rating, text: String(f.get("text") || "").trim(),
    };
    if (!rev.name || !rev.company || !rev.text) return;
    try { localStorage.setItem(KEY, JSON.stringify([rev, ...loadSaved()])); } catch { /* ignore */ }
    onAdd(rev);
    setDone(rev);
  };

  const waUrl = (r: Review) =>
    wa(`Hi Saint Enterprise, here is a review for ${r.service}.\n\n${r.rating}/5\n${r.name} (${r.company})\n${r.text}`);

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (o) { setDone(null); setRating(5); } }}>
      <DialogTrigger asChild><Button variant="outline" size="md">Leave a review</Button></DialogTrigger>
      <DialogContent>
        {done ? (
          <div className="flex flex-col gap-gutter-md pr-6">
            <DialogTitle>Thank you.</DialogTitle>
            <DialogDescription>Your review is in the rotation on this browser. Send it on WhatsApp as well if you would like Saint Enterprise to keep it.</DialogDescription>
            <div className="flex flex-wrap gap-gutter-sm pt-gutter-sm">
              <Button asChild><a href={waUrl(done)} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a></Button>
              <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-gutter-md">
            <div className="pr-6">
              <DialogTitle>Leave a review</DialogTitle>
              <DialogDescription>It joins the rotation on this browser straight away.</DialogDescription>
            </div>
            <div className="flex flex-col gap-gutter-xs">
              <span className="font-body text-label-lg text-on-surface" id="rating-label">Rating</span>
              <div role="radiogroup" aria-labelledby="rating-label" className="flex gap-1">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button key={v} type="button" role="radio" aria-checked={rating === v} aria-label={`${v} star${v > 1 ? "s" : ""}`}
                    onClick={() => setRating(v)}
                    className="rounded p-1 transition-transform duration-state-change hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <Star className={cn("h-6 w-6", v <= rating ? "fill-primary text-primary" : "text-outline-variant")} />
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-gutter-md sm:grid-cols-2">
              <Field label="Name" htmlFor="r-name"><Input id="r-name" name="name" required maxLength={80} autoComplete="name" placeholder="Nyasha Chisango" /></Field>
              <Field label="Business" htmlFor="r-company"><Input id="r-company" name="company" required maxLength={80} placeholder="ZimTransport" /></Field>
            </div>
            <Field label="Work" htmlFor="r-service">
              <Select id="r-service" name="service" required>{SERVICES.map((s) => <option key={s}>{s}</option>)}</Select>
            </Field>
            <Field label="What changed" htmlFor="r-text">
              <Textarea id="r-text" name="text" required maxLength={500} placeholder="The problem, what Saint Enterprise built, and the result." />
            </Field>
            <Button type="submit" size="lg" className="w-full">Add review</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function Reviews() {
  const [all, setAll] = useState<Review[]>(builtIn);
  const [slots, setSlots] = useState<number[]>([0, 1, 2]);
  const [fading, setFading] = useState<number | null>(null);
  const paused = useRef(false);

  useEffect(() => { const saved = loadSaved(); if (saved.length) setAll([...saved, ...builtIn]); }, []);

  // Swap one card at a time, gently. Paused on hover/focus, hidden tab, or reduced motion.
  useEffect(() => {
    if (all.length <= 3 || prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      if (paused.current || document.hidden) return;
      const slot = Math.floor(Math.random() * 3);
      const pool = all.map((_, i) => i).filter((i) => !slots.includes(i));
      if (!pool.length) return;
      const next = pool[Math.floor(Math.random() * pool.length)];
      setFading(slot);
      window.setTimeout(() => {
        setSlots((s) => s.map((v, i) => (i === slot ? next : v)));
        setFading(null);
      }, 320);
    }, 8000);
    return () => clearInterval(id);
  }, [all, slots]);

  const add = (r: Review) => { setAll((a) => [r, ...a]); setSlots([0, 1, 2]); };

  return (
    <Reveal as="section" id="reviews" className="border-y border-outline-variant bg-surface-container-lowest/65 py-section-mobile md:py-section">
      <div className="mx-auto max-w-7xl px-page-margin-mobile md:px-page-margin">
        <SectionHeading eyebrow="Clients" title="In their own words." action={<ReviewDialog onAdd={add} />} className="flex-wrap" />
        <div
          className="grid grid-cols-1 items-stretch gap-gutter-lg md:grid-cols-3"
          onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}
          onFocusCapture={() => (paused.current = true)} onBlurCapture={() => (paused.current = false)}
        >
          {slots.map((idx, slot) => {
            const r = all[idx % all.length];
            return r ? <ReviewCard key={slot} r={r} fading={fading === slot} /> : null;
          })}
        </div>
      </div>
    </Reveal>
  );
}
