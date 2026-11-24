import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, nudge } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Process } from "./Process";
import { Faq } from "./Faq";
import { Contact } from "./Contact";
import { PlanCard } from "./Pricing";
import { ProjectCard } from "./Work";
import { serviceIcons } from "./Services";
import { plans, projects } from "@/lib/content";
import { bySlug, quoteLink, type ServicePage as Page } from "@/lib/services";
import { wa } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServicePageView({ page: s }: { page: Page }) {
  const related = s.related.map(bySlug).filter((x): x is Page => !!x);
  const plan = s.planIndex !== null ? plans[s.planIndex] : null;

  return (
    <>
      <section className="mx-auto max-w-7xl px-page-margin-mobile pb-section-mobile pt-gutter-lg md:px-page-margin md:pb-section md:pt-gutter-xl">
        <nav aria-label="Breadcrumb" className="mb-gutter-lg flex items-center gap-gutter-xs font-body text-body-sm text-on-surface-variant">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span aria-current="page" className="text-on-surface">{s.name}</span>
        </nav>
        <div className="grid grid-cols-1 items-start gap-gutter-xl lg:grid-cols-12">
          <div className="flex flex-col items-start gap-gutter-lg lg:col-span-7">
            <Badge className="animate-fade-up">{s.priceLabel}</Badge>
            <h1 className="animate-fade-up font-display text-display-md-mobile text-on-surface [animation-delay:60ms] md:text-display-md">{s.h1}</h1>
            <p className="max-w-prose animate-fade-up font-body text-body-md text-on-surface-variant [animation-delay:120ms] md:text-body-lg">{s.summary}</p>
            <div className="flex w-full animate-fade-up flex-col gap-gutter-sm [animation-delay:180ms] sm:w-auto sm:flex-row sm:gap-gutter-md">
              <Button asChild size="lg">
                <a href={quoteLink(s)} target="_blank" rel="noopener noreferrer">Get a quote <ArrowRight className={cn("h-4 w-4", nudge)} aria-hidden="true" /></a>
              </Button>
              <Button asChild size="lg" variant="secondary"><a href="#included">What is included</a></Button>
            </div>
          </div>
          <Card className="animate-fade-up overflow-hidden rounded-xl [animation-delay:200ms] lg:col-span-5">
            <div className="border-b border-outline-variant bg-surface-container px-gutter-lg py-3">
              <span className="font-mono text-mono-sm uppercase text-primary">At a glance</span>
            </div>
            <dl className="divide-y divide-outline-variant">
              {s.facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-gutter-md px-gutter-lg py-gutter-md">
                  <dt className="font-body text-body-md text-on-surface-variant">{f.label}</dt>
                  <dd className="text-right font-headline text-title-md text-on-surface">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </section>

      <Reveal as="section" id="included" className="border-y border-outline-variant bg-surface-container-lowest/65 py-section-mobile md:py-section">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-gutter-xl px-page-margin-mobile md:px-page-margin lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Included" title="What you get." className="mb-gutter-lg" />
            <ul className="grid grid-cols-1 gap-gutter-sm font-body text-body-md text-on-surface sm:grid-cols-2">
              {s.includes.map((f) => (
                <li key={f} className="flex items-start gap-gutter-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /><span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading tone="secondary" eyebrow="Who it is for" title="Built for teams like these." className="mb-gutter-lg" />
            <ul className="flex flex-wrap gap-gutter-sm">
              {s.audience.map((a) => (
                <li key={a} className="rounded-full border border-outline-variant bg-surface-container-low px-3 py-1.5 font-body text-body-sm text-on-surface">{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Process steps={s.steps} tone="primary" title="How it works." />

      <Reveal as="section" id="pricing" className="mx-auto max-w-7xl px-page-margin-mobile py-section-mobile md:px-page-margin md:py-section">
        <SectionHeading eyebrow="Pricing" title={plan ? `${plan.name} package.` : "Scoped to your workflow."} />
        <div className="grid grid-cols-1 gap-gutter-lg md:grid-cols-2 lg:grid-cols-3">
          {plan ? <PlanCard p={plan} /> : (
            <Card variant="featured" className="flex flex-col justify-between gap-gutter-lg p-gutter-lg">
              <div className="flex flex-col gap-gutter-sm">
                <h3 className="font-headline text-title-lg text-on-surface">Custom quote</h3>
                <p className="font-body text-body-md text-on-surface-variant">Tell us about the workflow. After a short consultation you receive a scope and a price to approve before work starts.</p>
              </div>
              <Button asChild><a href={quoteLink(s)} target="_blank" rel="noopener noreferrer">Request a quote <ArrowRight className={cn("h-4 w-4", nudge)} aria-hidden="true" /></a></Button>
            </Card>
          )}
          <Card className="flex flex-col justify-between gap-gutter-lg self-start p-gutter-lg md:col-span-1 lg:col-span-2">
            <div className="flex flex-col gap-gutter-sm">
              <h3 className="font-headline text-title-lg text-on-surface">Keep it running: Care, $35 a month</h3>
              <p className="font-body text-body-md text-on-surface-variant">Hosting and SSL renewal, up to two hours of updates a month, uptime monitoring, daily backups and priority WhatsApp support. Cancel or pause any month.</p>
            </div>
            <Button asChild variant="tonal" className="self-start"><a href={wa("Hi Saint Enterprise, I want to know more about the $35 a month care plan.")} target="_blank" rel="noopener noreferrer">Ask about Care</a></Button>
          </Card>
        </div>
      </Reveal>

      <Reveal as="section" id="work" className="border-y border-outline-variant bg-surface-container-lowest/65 py-section-mobile md:py-section">
        <div className="mx-auto max-w-7xl px-page-margin-mobile md:px-page-margin">
          <SectionHeading eyebrow="Related work" title="Built with this approach." />
          <div className="grid grid-cols-1 items-stretch gap-gutter-lg md:grid-cols-2">
            {s.work.map((k) => <ProjectCard key={k} p={projects[k]} />)}
          </div>
        </div>
      </Reveal>

      <Faq items={s.faqs} title={`${s.name}: common questions.`} />

      <Reveal as="section" className="mx-auto max-w-7xl px-page-margin-mobile pb-section-mobile md:px-page-margin md:pb-section">
        <SectionHeading eyebrow="Also from Saint Enterprise" title="Other services." className="mb-gutter-lg" />
        <div className="grid grid-cols-1 gap-gutter-lg md:grid-cols-2">
          {related.map((r) => {
            const Icon = serviceIcons[r.icon];
            return (
              <Link key={r.slug} to={r.path} className="group/btn block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <Card variant="interactive" className="flex items-center justify-between gap-gutter-md p-gutter-lg">
                  <div className="flex items-start gap-gutter-md">
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <h3 className="font-headline text-title-md text-on-surface">{r.name}</h3>
                      <p className="font-body text-body-sm text-on-surface-variant">{r.short}</p>
                    </div>
                  </div>
                  <ArrowRight className={cn("h-4 w-4 shrink-0 text-primary", nudge)} aria-hidden="true" />
                </Card>
              </Link>
            );
          })}
        </div>
      </Reveal>

      <Contact defaultService={s.contactService} />
    </>
  );
}
