import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import logo from "@/assets/images/logo.webp";
import { Button, nudge } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { NAV } from "@/lib/site";
import { useActiveSection, useScrolledPast } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

const IDS = NAV.map((n) => n.href.slice(1));

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolledPast(8);
  const active = useActiveSection(IDS);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => innerWidth >= 768 && setOpen(false);
    addEventListener("keydown", onKey);
    addEventListener("resize", onResize);
    return () => { removeEventListener("keydown", onKey); removeEventListener("resize", onResize); };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-surface-container-lowest/85 backdrop-blur-md transition-[border-color,box-shadow] duration-card-hover ease-card-hover",
        scrolled ? "border-outline-variant shadow-[0_8px_24px_-18px_rgb(var(--on-surface)/0.35)]" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-gutter-md px-page-margin-mobile md:h-16 md:px-page-margin">
        <a href="#top" className="flex shrink-0 items-center gap-gutter-sm rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <img src={logo} alt="" width={40} height={40} className="h-9 w-9 rounded-sm object-contain md:h-10 md:w-10" />
          <span className="font-headline text-title-md tracking-tight text-on-surface">
            SAINT<span className="hidden sm:inline"> ENTERPRISE</span>
          </span>
          <span className="sr-only">Saint Enterprise, home</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-gutter-lg md:flex lg:gap-gutter-xl">
          {NAV.map((n) => {
            const on = active === n.href.slice(1);
            return (
              <a
                key={n.href}
                href={n.href}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "relative font-body text-label-lg transition-colors duration-state-change ease-state-change hover:text-primary",
                  "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-primary after:transition-transform after:duration-card-hover after:ease-card-hover",
                  on ? "text-primary after:scale-x-100" : "text-on-surface-variant after:scale-x-0 hover:after:scale-x-100",
                )}
              >
                {n.label}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-gutter-sm">
          <ThemeToggle />
          <Button asChild size="md" className="hidden md:inline-flex">
            <a href="#contact">
              Start a project <ArrowRight className={cn("h-4 w-4", nudge)} aria-hidden="true" />
            </a>
          </Button>
          <Button asChild size="sm" className="md:hidden">
            <a href="#contact">Get a quote</a>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Collapsible mobile drawer */}
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={cn(
          "grid overflow-hidden border-t border-outline-variant bg-surface-container-low transition-[grid-template-rows,opacity] duration-card-hover ease-card-hover md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] border-t-transparent opacity-0",
        )}
        {...({ inert: open ? undefined : "" } as object)}
      >
        <div className="min-h-0">
          <div className="flex flex-col px-page-margin-mobile py-gutter-sm">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-outline-variant/60 py-3 font-body text-body-md text-on-surface last:border-0">
                {n.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="py-3 font-body text-body-md text-primary">
              Start a project →
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
