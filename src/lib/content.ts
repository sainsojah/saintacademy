import { wa } from "./site";

export const steps = [
  { title: "Consult", body: "We agree the goal, the customer and the launch date." },
  { title: "Design", body: "You approve the visual direction before production starts." },
  { title: "Build", body: "Mobile-first build, with the integrations you need." },
  { title: "Launch", body: "Domain, hosting, SSL, testing and a staff walkthrough." },
] as const;

export const plans = [
  { name: "Website", about: "A responsive site designed to turn a visit into an enquiry.", price: "$80", was: "$200", per: "",
    features: ["Custom design for the brand", "Mobile and tablet layouts", "Free .com domain, year one", "Hosting and SSL", "Branded business email", "SEO basics and link previews", "30-day warranty after launch"],
    cta: "Request this", featured: false, variant: "tonal" as const,
    href: wa("Hi Saint Enterprise, I would like the $80 website package.") },
  { name: "Chatbot", about: "A 24-hour assistant for sales, booking, and support.", price: "$150", was: "$200", per: "",
    features: ["WhatsApp Business Cloud API", "A chat widget on the website", "FAQs, orders, and lead capture", "Booking and reminder flows", "Handover to a person", "Sheets, CRM, or email sync", "A handover session for staff"],
    cta: "Request this", featured: true, variant: "default" as const,
    href: wa("Hi Saint Enterprise, I would like the $150 WhatsApp chatbot package.") },
  { name: "Care", about: "Hosting, small updates, and someone watching the bot.", price: "$35", was: "", per: "/month",
    features: ["Hosting and SSL renewal", "Up to 2 hours of updates a month", "Bot uptime monitoring", "Daily backups", "Priority WhatsApp support", "Meta API changes kept current", "Pause or cancel any month"],
    cta: "Add care", featured: false, variant: "tonal" as const,
    href: wa("Hi Saint Enterprise, I want to know more about the $35 a month care plan.") },
] as const;
export type Plan = (typeof plans)[number];

export const faqBank = {
  com: { q: "Does the .com stay free after the first year?", a: "The first year of .com registration is included in the $80 website. After that, renewal is the registrar’s price, about $14 a year, with no agency markup." },
  meta: { q: "Does Meta charge for WhatsApp messages?", a: "Meta includes 1,000 free customer-service conversations a month. Marketing broadcasts, and anything past that allowance, are billed by Meta to your own business account. We set the account up so you pay Meta directly, at their price." },
  own: { q: "What do we own after launch?", a: "The source, the domain, the hosting, and the WhatsApp accounts are yours. There is a 30-day warranty for faults, plus a walkthrough your team can keep. The $35 care plan is optional, for updates, backups, and monitoring." },
  excluded: { q: "What is not included?", a: "Third-party model fees past the testing credit, licensed stock photography, ongoing blog writing, and a payment processor’s own onboarding charges sit outside the base fee. We say so before the work starts." },
  live: { q: "How soon can it be live?", a: "A standard website or a lead-capture bot is typically live in three to five business days once the content and the brief are approved." },
} as const;

export const faqs = [faqBank.com, faqBank.meta, faqBank.own, faqBank.excluded, faqBank.live];

export interface Project { key: string; href: string; eyebrow: string; eyebrowTone?: "primary" | "secondary"; title: string; body: string; meta: string; cta: string; image?: boolean }

export const projects: Record<string, Project> = {
  fbk: { key: "fbk", href: "https://fbktraders.com/", eyebrow: "Trading · Web platform", title: "FBK Forex Broker Killers",
    body: "Live market tickers, a bull and bear gauge, light and dark themes, and a VIP signals path with payment built in.", meta: "fbktraders.com", cta: "Visit site" },
  truckana: { key: "truckana", href: "https://truckana.com/", eyebrow: "Logistics · Fleet platform", title: "Truckana",
    body: "Cross-border trips, driver logs, maintenance alerts, fuel, payroll, and a one-click PDF report.", meta: "truckana.com", cta: "Visit site", image: true },
  tobacco: { key: "tobacco", href: wa("Hi Saint Enterprise, I would like to try the Tobacco AI leaf diagnosis bot."), eyebrow: "Agriculture · Vision on WhatsApp", title: "Tobacco AI",
    body: "A farmer sends a leaf photo. Computer vision returns a diagnosis and a treatment, and asks for a clearer photo when it is unsure.", meta: "WhatsApp", cta: "Try on WhatsApp" },
  zimsec: { key: "zimsec", href: wa("Hi Saint Enterprise, tell me about the ZIMSEC maths assistant."), eyebrow: "Education · Revision assistant", eyebrowTone: "secondary", title: "ZIMSEC Maths",
    body: "O-Level problems on WhatsApp, with a three-step hint ladder that teaches the method before it shows the full solution.", meta: "WhatsApp", cta: "Enquire" },
};

export const SERVICE_OPTIONS = [
  "Website, from $80",
  "WhatsApp and web chatbot, from $150",
  "Website and chatbot together",
  "Care plan, $35 a month",
  "Custom operational software",
] as const;
