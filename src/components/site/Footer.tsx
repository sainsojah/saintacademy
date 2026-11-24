import logo from "@/assets/images/logo.webp";
import { EMAIL, SOCIALS } from "@/lib/site";
import { FacebookIcon, InstagramIcon, XIcon, YouTubeIcon } from "./icons";
import { Mail } from "lucide-react";

const icons = { Facebook: FacebookIcon, Instagram: InstagramIcon, X: XIcon, YouTube: YouTubeIcon };
const links = [["#services", "Services"], ["#pricing", "Pricing"], ["#work", "Work"], ["#faq", "FAQ"], ["#contact", "Contact"]];
const social = "flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant text-on-surface transition-[transform,border-color,color] duration-card-hover ease-card-hover hover:-translate-y-0.5 hover:border-primary hover:text-primary";

export function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-lowest py-gutter-xl">
      <div className="mx-auto max-w-7xl px-page-margin-mobile md:px-page-margin">
        <div className="grid grid-cols-1 gap-gutter-xl md:grid-cols-12">
          <div className="flex max-w-md flex-col gap-gutter-sm md:col-span-6">
            <div className="flex items-center gap-gutter-sm">
              <img src={logo} alt="" width={32} height={32} loading="lazy" className="h-8 w-8 rounded-sm object-contain" />
              <span className="font-headline text-title-md text-on-surface">Saint Enterprise</span>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant">
              Inspired by passion, driven by excellence. Websites, WhatsApp AI, and operational software for businesses that intend to use what they pay for.
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <h3 className="mb-gutter-sm font-mono text-mono-sm uppercase text-on-surface">Visit</h3>
            <ul className="flex flex-col gap-gutter-sm font-body text-body-sm text-on-surface-variant">
              {links.map(([h, l]) => (
                <li key={h}><a href={h} className="transition-colors duration-state-change hover:text-primary">{l}</a></li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-3">
            <h3 className="mb-gutter-sm font-mono text-mono-sm uppercase text-on-surface">Connect</h3>
            <div className="flex flex-wrap gap-gutter-sm">
              {SOCIALS.map((s) => {
                const Icon = icons[s.label];
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={social}>
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
              <a href={`mailto:${EMAIL}`} aria-label="Email" className={social}><Mail className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
        <div className="mt-gutter-xl flex flex-wrap items-center justify-between gap-gutter-md border-t border-outline-variant pt-gutter-lg font-body text-body-sm text-on-surface-variant">
          <span>© {new Date().getFullYear()} Saint Enterprise · Inspired by passion, driven by excellence.</span>
          <a href="#top" className="text-primary hover:underline">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
