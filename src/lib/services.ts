import { wa } from "./site";
import { faqBank, plans, SERVICE_OPTIONS } from "./content";

export interface ServicePage {
  slug: string; path: string; name: string; nav: string; icon: "globe" | "bot" | "terminal";
  short: string; priceLabel: string;
  h1: string; title: string; description: string; summary: string;
  facts: { label: string; value: string }[];
  includes: string[]; audience: string[];
  steps: { title: string; body: string }[];
  planIndex: number | null;
  faqs: { q: string; a: string }[];
  work: string[];
  contactService: string; waMessage: string;
  related: string[];
}

export const servicePages: ServicePage[] = [
  {
    slug: "website-design-zimbabwe", path: "/website-design-zimbabwe/", name: "Website design", nav: "Websites", icon: "globe",
    short: "Fast, mobile-first business websites with the domain, hosting and email included.", priceLabel: "From $80",
    h1: "Website design for businesses in Zimbabwe",
    title: "Website Design in Zimbabwe from $80 | Saint Enterprise",
    description: "Fast, mobile-first business websites from $80. Includes a .com for year one, hosting, SSL and business email. Built in Harare, live in 3–5 days.",
    summary: "Saint Enterprise designs mobile-first business websites for companies in Zimbabwe and abroad. The $80 package includes a custom design, a .com domain for the first year, hosting, SSL, branded business email and SEO basics. A standard site typically goes live within three to five business days once content is approved.",
    facts: [{ label: "Starting at", value: "$80" }, { label: "Typical delivery", value: "3–5 business days" }, { label: "You own", value: "Code, domain and accounts" }],
    includes: [...plans[0].features],
    audience: ["Clinics and health practices", "Restaurants and shops", "Salons and beauty studios", "Schools and training providers", "Agencies and consultancies", "Professional practices"],
    steps: [
      { title: "Brief", body: "We agree the pages, the content and the one action a visitor should take." },
      { title: "Design", body: "You approve a visual direction that belongs to your brand." },
      { title: "Build", body: "Mobile and tablet layouts, SEO basics and link previews." },
      { title: "Launch", body: "Domain, hosting, SSL, business email and a 30-day warranty." },
    ],
    planIndex: 0,
    faqs: [
      faqBank.com, faqBank.live,
      { q: "Will the site work well on phones?", a: "Yes. Every site is designed mobile-first and checked on phone and tablet layouts before launch." },
      { q: "Can visitors contact us on WhatsApp?", a: "Yes. Buttons and enquiry forms can open WhatsApp with the visitor’s message ready to send. A chatbot can be added later." },
      faqBank.own, faqBank.excluded,
    ],
    work: ["fbk"], contactService: SERVICE_OPTIONS[0], waMessage: "Hi Saint Enterprise, I would like the $80 website package.",
    related: ["whatsapp-chatbot-zimbabwe", "business-software-zimbabwe"],
  },
  {
    slug: "whatsapp-chatbot-zimbabwe", path: "/whatsapp-chatbot-zimbabwe/", name: "WhatsApp and web chatbots", nav: "Chatbots", icon: "bot",
    short: "Assistants that answer questions, take bookings and orders, and hand over to a person.", priceLabel: "From $150",
    h1: "WhatsApp and website chatbots for businesses in Zimbabwe",
    title: "WhatsApp Chatbot Development in Zimbabwe | Saint Enterprise",
    description: "WhatsApp Business and website chatbots from $150. Answers, bookings, orders and lead capture with handover to a person. Built in Harare.",
    summary: "Saint Enterprise builds chatbots on the WhatsApp Business Cloud API and on your website. They answer common questions, take bookings and orders, and capture leads, then hand the conversation to a person when needed. The chatbot package starts at $150 and connects to Google Sheets, a CRM or email.",
    facts: [{ label: "Starting at", value: "$150" }, { label: "Typical delivery", value: "3–5 business days (lead-capture bot)" }, { label: "Messaging fees", value: "Paid to Meta, on your account" }],
    includes: [...plans[1].features],
    audience: ["Clinics taking appointments", "Salons and spas", "Shops and parts dealers", "Tour and travel operators", "Schools and tutors", "Any team answering the same questions daily"],
    steps: [
      { title: "Map", body: "We list the questions, bookings and orders the bot should handle." },
      { title: "Write", body: "Conversation flows and answers in your tone, with a clear handover to a person." },
      { title: "Connect", body: "WhatsApp Business Cloud API, your website, and Sheets, CRM or email." },
      { title: "Test and hand over", body: "A test pass, then a session so your staff can run it." },
    ],
    planIndex: 1,
    faqs: [
      faqBank.meta,
      { q: "What happens when the bot cannot answer?", a: "It hands the conversation to a person on your team, so customers are not left stuck." },
      { q: "Can it connect to our spreadsheet or CRM?", a: "Yes. Leads and bookings can sync to Google Sheets, a CRM or email notifications." },
      faqBank.live, faqBank.own, faqBank.excluded,
    ],
    work: ["tobacco", "zimsec"], contactService: SERVICE_OPTIONS[1], waMessage: "Hi Saint Enterprise, I would like the $150 WhatsApp chatbot package.",
    related: ["website-design-zimbabwe", "business-software-zimbabwe"],
  },
  {
    slug: "business-software-zimbabwe", path: "/business-software-zimbabwe/", name: "Operational software", nav: "Software", icon: "terminal",
    short: "Fleet desks, ledgers, portals and live reports built around how your team works.", priceLabel: "Scoped per project",
    h1: "Custom business software for teams in Zimbabwe",
    title: "Custom Business Software in Zimbabwe | Saint Enterprise",
    description: "Fleet desks, ledgers, client portals and live reports built around how your team works. Custom software from Saint Enterprise in Harare.",
    summary: "Saint Enterprise builds custom operational software for teams: fleet and trip management, ledgers, client portals and live reporting. Each project is scoped after a short consultation, so you pay for the workflow you need rather than a generic package.",
    facts: [{ label: "Pricing", value: "Scoped per project" }, { label: "Timeline", value: "Agreed in the consultation" }, { label: "You own", value: "Code, data and accounts" }],
    includes: ["Fleet, trip and driver tracking", "Ledgers and records", "Client portals", "Live dashboards and one-click PDF reports", "Maintenance, fuel and payroll tracking", "A handover session for your staff"],
    audience: ["Logistics and transport firms", "Finance and trading teams", "Service businesses with manual records", "Teams working from spreadsheets and paper"],
    steps: [
      { title: "Consult", body: "We map the workflow, the people involved and the records that matter." },
      { title: "Scope", body: "You agree the features, the timeline and the price before work starts." },
      { title: "Build", body: "Quick, mobile-friendly screens with live reports and exports." },
      { title: "Launch", body: "Deployment, testing and a walkthrough your staff can replay." },
    ],
    planIndex: null,
    faqs: [
      { q: "How is custom software priced?", a: "Each project is scoped after a short consultation. You agree the scope and the price before any work starts." },
      { q: "Can you replace our spreadsheets or paper records?", a: "Yes. A common first step is moving a spreadsheet or paper process into a shared system with live reports." },
      { q: "Who owns the software and the data?", a: "You do. The source, the domain, the hosting and the accounts are yours." },
      { q: "How long does a project take?", a: "It depends on the scope. We agree a timeline during the consultation." },
      faqBank.excluded,
    ],
    work: ["truckana"], contactService: SERVICE_OPTIONS[4], waMessage: "Hi Saint Enterprise, I would like to discuss custom operational software.",
    related: ["website-design-zimbabwe", "whatsapp-chatbot-zimbabwe"],
  },
];

export const bySlug = (slug: string) => servicePages.find((s) => s.slug === slug);
export const quoteLink = (s: ServicePage) => wa(s.waMessage);
