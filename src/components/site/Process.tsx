import { Card } from "@/components/ui/card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { steps } from "@/lib/content";

export function Process() {
  return (
    <Reveal as="section" id="process" className="border-y border-outline-variant bg-surface-container-lowest/65 py-section-mobile md:py-section">
      <div className="mx-auto max-w-7xl px-page-margin-mobile md:px-page-margin">
        <SectionHeading tone="secondary" eyebrow="Process" title="From the first conversation to a live system." />
        <ol className="grid grid-cols-1 items-stretch gap-gutter-lg md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 70} className="h-full list-none">
              <Card variant="lift" className="flex h-full flex-col gap-gutter-sm p-gutter-lg">
                <span className="font-mono text-mono-sm text-primary">STEP 0{i + 1}</span>
                <h3 className="font-headline text-title-lg text-on-surface">{s.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant">{s.body}</p>
              </Card>
            </Reveal>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
