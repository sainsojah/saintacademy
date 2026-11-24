import { EMAIL } from "@/lib/site";

const h = "mb-gutter-xs mt-gutter-xl font-headline text-title-lg text-on-surface";
const p = "font-body text-body-md text-on-surface-variant";

export function Privacy() {
  return (
    <section className="mx-auto max-w-3xl px-page-margin-mobile py-section-mobile md:px-page-margin md:py-section">
      <span className="font-mono text-mono-sm uppercase text-primary">Legal</span>
      <h1 className="mt-gutter-sm font-display text-display-md-mobile text-on-surface md:text-display-md">Privacy policy</h1>
      <p className={`${p} mt-gutter-md`}>Last updated November 2026. This page explains what Saint Enterprise (saintacademy.com) collects when you use this website.</p>

      <h2 className={h}>Enquiries</h2>
      <p className={p}>The enquiry form does not send your details to our servers. It opens WhatsApp with your message ready to send, and we receive it only if you press Send. WhatsApp’s own privacy terms then apply. You can also email us at {EMAIL}.</p>

      <h2 className={h}>Analytics and cookies</h2>
      <p className={p}>We may use Microsoft Clarity to understand how visitors use the site, such as clicks, scrolling and page views. Clarity sets cookies and records anonymised interaction data, and it masks form fields. See Microsoft’s privacy statement for details. Google Search Console and Bing Webmaster Tools report how our pages appear in search and do not track you on this site.</p>

      <h2 className={h}>Stored on your device</h2>
      <p className={p}>Your browser stores your light or dark theme choice, and a local count of WhatsApp link clicks. This stays on your device.</p>

      <h2 className={h}>Contact</h2>
      <p className={p}>Questions about this policy: <a className="text-primary underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
    </section>
  );
}
