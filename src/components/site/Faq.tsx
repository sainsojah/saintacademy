import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Faq({ items, title = "Questions that usually come first." }: { items: readonly { q: string; a: string }[]; title?: string }) {
  return (
    <Reveal as="section" id="faq" className="mx-auto max-w-7xl px-page-margin-mobile py-section-mobile md:px-page-margin md:py-section">
      <div className="grid grid-cols-1 gap-gutter-xl lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading className="mb-0" eyebrow="FAQ" title={title} />
        </div>
        <div className="lg:col-span-8">
          <Accordion type="single" collapsible defaultValue="q0" className="flex flex-col gap-gutter-sm">
            {items.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Reveal>
  );
}
