import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./icons";
import { useScrolledPast } from "@/hooks/use-scroll";
import { wa } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Mobile: sticky quote bar after the hero. Desktop: small WhatsApp button. */
export function FloatingCta() {
  const past = useScrolledPast(480);
  return (
    <>
      <aside
        aria-label="Quick actions"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-gutter-md border-t border-outline-variant bg-surface-container-lowest/90 px-page-margin-mobile pt-3 backdrop-blur-md md:hidden",
          "pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] transition-[transform,opacity] duration-surface-enter ease-surface-enter",
          past ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
        )}
      >
        <div className="flex flex-col leading-tight">
          <strong className="font-headline text-title-md text-on-surface">Saint Enterprise</strong>
          <span className="font-body text-body-sm text-on-surface-variant">Websites and AI systems</span>
        </div>
        <Button asChild size="md">
          <a href={wa("Hi Saint Enterprise, I need a website or a chatbot.")} target="_blank" rel="noopener noreferrer">Get a quote</a>
        </Button>
      </aside>

      <a
        href={wa("Hi Saint Enterprise, I would like to enquire about a website or a chatbot.")}
        target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-primary text-on-primary transition-transform duration-card-hover ease-card-hover hover:-translate-y-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface md:flex"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>
    </>
  );
}
