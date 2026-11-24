import { Link } from "react-router-dom";
import { Mail, Star } from "lucide-react";
import logo from "@/assets/images/logo.webp";
import { GBP_REVIEW_URL } from "@/lib/config";
import { servicePages } from "@/lib/services";
import { EMAIL, SOCIALS } from "@/lib/site";
import { FacebookIcon, InstagramIcon, XIcon, YouTubeIcon } from "./icons";

const icons = { Facebook: FacebookIcon, Instagram: InstagramIcon, X: XIcon, YouTube: YouTubeIcon };
const company = [["/#work", "Work"], ["/#pricing", "Pricing"], ["/#faq", "FAQ"], ["/#contact", "Contact"], ["/privacy/", "Privacy"]] as const;
const social = "flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant text-on-surface transition-colors duration-state-change hover:border-primary hover:text-primary";
const link = "transition-colors duration-state-change hover:text-primary";

export function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-lowest py-gutter-xl">
      <div className="mx-auto max-w-7xl px-page-margin-mobile md:px-page-margin">
        <div className="grid grid-cols-1 gap-gutter-xl md:grid-cols-12">
          <div className="flex max-w-sm flex-col gap-gutter-sm md:col-span-5">
            <div className="flex items-center gap-gutter-sm">
              <img src={logo} alt="" width={32} height={32} loading="lazy" className="h-8 w-8 rounded-sm object-contain" />
              <span className="font-headline text-title-md text-on-surface">Saint Enterprise</span>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant">Websites, WhatsApp chatbots and custom software. Harare, Zimbabwe.</p>
          </div>
          <nav aria-label="Services" className="md:col-span-2">
            <h3 className="mb-gutter-sm font-mono text-mono-sm uppercase text-on-surface">Services</h3>
            <ul className="flex flex-col gap-gutter-sm font-body text-body-sm text-on-surface-variant">
              {servicePages.map((s) => <li key={s.slug}><Link to={s.path} className={link}>{s.nav}</Link></li>)}
            </ul>
          </nav>
          <nav aria-label="Company" className="md:col-span-2">
            <h3 className="mb-gutter-sm font-mono text-mono-sm uppercase text-on-surface">Company</h3>
            <ul className="flex flex-col gap-gutter-sm font-body text-body-sm text-on-surface-variant">
              {company.map(([to, l]) => <li key={to}><Link to={to} className={link}>{l}</Link></li>)}
            </ul>
          </nav>
          <div className="md:col-span-3">
            <h3 className="mb-gutter-sm font-mono text-mono-sm uppercase text-on-surface">Connect</h3>
            <div className="flex flex-wrap gap-gutter-sm">
              {SOCIALS.map((s) => {
                const Icon = icons[s.label];
                return <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={social}><Icon className="h-4 w-4" /></a>;
              })}
              <a href={`mailto:${EMAIL}`} aria-label="Email" className={social}><Mail className="h-4 w-4" /></a>
            </div>
            {GBP_REVIEW_URL && (
              <a href={GBP_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="mt-gutter-md inline-flex items-center gap-gutter-xs font-body text-body-sm text-primary hover:underline">
                <Star className="h-4 w-4" aria-hidden="true" /> Review us on Google
              </a>
            )}
          </div>
        </div>
        <div className="mt-gutter-xl border-t border-outline-variant pt-gutter-lg font-body text-body-sm text-on-surface-variant">
          © {new Date().getFullYear()} Saint Enterprise
        </div>
      </div>
    </footer>
  );
}
