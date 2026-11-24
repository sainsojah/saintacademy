import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, nudge } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { servicePages } from "@/lib/services";
import { wa } from "@/lib/site";
import { cn } from "@/lib/utils";

const facts = [
  { v: "From $80", l: "Websites" },
  { v: "From $150", l: "Chatbots" },
  { v: "3–5 days", l: "Typical delivery" },
  { v: "Yours", l: "Code, domain and accounts" },
];

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-page-margin-mobile py-section-mobile md:px-page-margin md:py-section">
      <div className="grid grid-cols-1 items-center gap-gutter-xl lg:grid-cols-12">
        <div className="flex flex-col items-start gap-gutter-lg lg:col-span-7">
          <Badge className="animate-fade-up">Harare, Zimbabwe</Badge>
          <h1 className="animate-fade-up font-display text-display-lg-mobile text-on-surface [animation-delay:60ms] md:text-display-lg">
            Websites and AI that <span className="text-primary">work as hard as you do.</span>
          </h1>
          <p className="max-w-prose animate-fade-up font-body text-body-md text-on-surface-variant [animation-delay:120ms] md:text-body-lg">
            Saint Enterprise builds business websites, WhatsApp chatbots and custom software for companies in Zimbabwe and beyond.
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
          <Card className="overflow-hidden rounded-xl">
            <div className="border-b border-outline-variant bg-surface-container px-gutter-lg py-3">
              <span className="font-mono text-mono-sm uppercase text-primary">What we build</span>
            </div>
            <ul>
              {servicePages.map((s) => (
                <li key={s.slug} className="border-b border-outline-variant last:border-0">
                  <Link to={s.path} className="group/btn flex items-center justify-between gap-gutter-md px-gutter-lg py-gutter-md transition-colors duration-state-change hover:bg-surface-container">
                    <span className="flex flex-col">
                      <span className="font-headline text-title-md text-on-surface">{s.name}</span>
                      <span className="font-mono text-mono-sm text-primary">{s.priceLabel}</span>
                    </span>
                    <ArrowRight className={cn("h-4 w-4 text-primary", nudge)} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <dl className="mt-section-mobile grid grid-cols-2 gap-gutter-lg border-t border-outline-variant pt-gutter-xl md:grid-cols-4">
        {facts.map((k) => (
          <div key={k.l} className="flex flex-col gap-gutter-xs">
            <dt className="order-2 font-body text-body-md text-on-surface-variant">{k.l}</dt>
            <dd className="font-mono text-title-lg tabular-nums text-on-surface">{k.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
