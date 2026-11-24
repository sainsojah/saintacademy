import { useState, type FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button, nudge } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SERVICE_OPTIONS } from "@/lib/content";
import { EMAIL, PHONE_DISPLAY, wa } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Contact({ defaultService }: { defaultService?: string }) {
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) || "").trim();
    const lines = ["Hi Saint Enterprise, I would like to send a project enquiry.", "", `Name: ${v("name")}`, `Phone: ${v("phone")}`];
    if (v("email")) lines.push(`Email: ${v("email")}`);
    lines.push(`Service: ${v("service")}`, "", v("brief"));
    const url = wa(lines.join("\n"));
    window.open(url, "_blank", "noopener");
    setSentUrl(url);
  };

  return (
    <Reveal as="section" id="contact" className="border-t border-outline-variant bg-surface-container-lowest py-section-mobile md:py-section">
      <div className="mx-auto max-w-7xl px-page-margin-mobile md:px-page-margin">
        <div className="grid grid-cols-1 gap-gutter-xl lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-gutter-lg lg:col-span-5">
            <SectionHeading className="mb-0" eyebrow="Contact" title="Tell us what to build."
              lede="Describe what you need. WhatsApp opens with your message ready to send." />
            <Card className="flex flex-col gap-gutter-md p-gutter-lg">
              <div className="flex flex-col gap-gutter-xs">
                <span className="font-mono text-mono-sm uppercase text-on-surface-variant">WhatsApp</span>
                <a href={wa()} target="_blank" rel="noopener noreferrer" className="font-mono text-title-md tabular-nums text-primary hover:underline">{PHONE_DISPLAY}</a>
              </div>
              <div className="flex flex-col gap-gutter-xs">
                <span className="font-mono text-mono-sm uppercase text-on-surface-variant">Email</span>
                <a href={`mailto:${EMAIL}`} className="break-all font-body text-body-md text-on-surface transition-colors hover:text-primary">{EMAIL}</a>
              </div>
              <div className="flex flex-col gap-gutter-xs">
                <span className="font-mono text-mono-sm uppercase text-on-surface-variant">Location</span>
                <span className="font-body text-body-md text-on-surface-variant">Harare, Zimbabwe</span>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} className="flex flex-col gap-gutter-md rounded-xl border border-outline-variant bg-card p-gutter-lg md:p-gutter-xl">
              <div className="grid grid-cols-1 gap-gutter-md md:grid-cols-2">
                <Field label="Name" htmlFor="f-name"><Input id="f-name" name="name" required autoComplete="name" placeholder="Your name" /></Field>
                <Field label="Phone or WhatsApp" htmlFor="f-phone"><Input id="f-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" placeholder="+263 7…" /></Field>
              </div>
              <div className="grid grid-cols-1 gap-gutter-md md:grid-cols-2">
                <Field label="Email (optional)" htmlFor="f-email">
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" aria-hidden="true" />
                    <Input id="f-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@company.com" className="pl-10" />
                  </div>
                </Field>
                <Field label="What you need" htmlFor="f-service">
                  <Select id="f-service" name="service" required defaultValue={defaultService ?? SERVICE_OPTIONS[0]}>
                    {SERVICE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                  </Select>
                </Field>
              </div>
              <Field label="The brief" htmlFor="f-brief">
                <Textarea id="f-brief" name="brief" required rows={4} placeholder="What slows the business down, and when should it be live?" />
              </Field>
              <Button type="submit" size="lg" className="w-full">
                Send on WhatsApp <ArrowRight className={cn("h-4 w-4", nudge)} aria-hidden="true" />
              </Button>
              {sentUrl && (
                <div role="status" className="animate-fade-up rounded-md border border-primary/40 bg-primary/10 p-gutter-md font-body text-body-md text-on-surface">
                  <strong className="font-medium">Press Send in WhatsApp.</strong> Your enquiry reaches us once you press Send.{" "}
                  <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">Open WhatsApp again</a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
