import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import logo from "@/assets/images/logo.webp";
import { Button, nudge } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { NAV } from "@/lib/site";
import { useActiveSection, useScrolledPast } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

const IDS = ["work", "pricing", "faq"];

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolledPast(8);
  const { pathname } = useLocation();
  const active = useActiveSection(IDS, pathname);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => innerWidth >= 768 && setOpen(false);
    addEventListener("keydown", onKey);
    addEventListener("resize", onResize);
    return () => { removeEventListener("keydown", onKey); removeEventListener("resize", onResize); };
  }, []);

  const isOn = (to: string) => (to.includes("#") ? pathname === "/" && active === to.split("#")[1] : pathname === to);

  return (
    <header className={cn("sticky top-0 z-40 border-b bg-surface-container-lowest/90 backdrop-blur-md transition-colors duration-card-hover", scrolled ? "border-outline-variant" : "border-transparent")}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-gutter-md px-page-margin-mobile md:h-16 md:px-page-margin">
        <Link to="/" className="flex shrink-0 items-center gap-gutter-sm rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <img src={logo} alt="" width={40} height={40} className="h-9 w-9 rounded-sm object-contain md:h-10 md:w-10" />
          <span className="font-headline text-title-md tracking-tight text-on-surface">
            SAINT<span className="hidden sm:inline"> ENTERPRISE</span>
          </span>
          <span className="sr-only">Saint Enterprise, home</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-gutter-lg md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} aria-current={isOn(n.to) ? "page" : undefined}
              className={cn("font-body text-label-lg transition-colors duration-state-change hover:text-primary", isOn(n.to) ? "text-primary" : "text-on-surface-variant")}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-gutter-sm">
          <ThemeToggle />
          <Button asChild size="md" className="hidden md:inline-flex">
            <Link to="/#contact">Start a project <ArrowRight className={cn("h-4 w-4", nudge)} aria-hidden="true" /></Link>
          </Button>
          <Button asChild size="sm" className="md:hidden"><Link to="/#contact">Get a quote</Link></Button>
          <Button variant="secondary" size="icon" className="md:hidden" aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <nav id="mobile-menu" aria-label="Mobile" {...({ inert: open ? undefined : "" } as object)}
        className={cn("grid overflow-hidden border-t border-outline-variant bg-surface-container-low transition-[grid-template-rows,opacity] duration-card-hover ease-card-hover md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] border-t-transparent opacity-0")}>
        <div className="min-h-0">
          <div className="flex flex-col px-page-margin-mobile py-gutter-sm">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b border-outline-variant/60 py-3 font-body text-body-md text-on-surface">{n.label}</Link>
            ))}
            <Link to="/#contact" onClick={() => setOpen(false)} className="py-3 font-body text-body-md text-primary">Start a project →</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
