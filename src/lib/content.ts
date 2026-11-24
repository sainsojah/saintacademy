import { wa } from "./site";

export const services = [
  { n: "01", icon: "globe", title: "Websites", href: "#pricing", cta: "Packages",
    body: "A considered design, a fast mobile layout, a .com domain for the first year, hosting, SSL, business email, and the SEO basics. From the first sketch to a live address." },
  { n: "02", icon: "bot", title: "WhatsApp and web AI", href: "#demo", cta: "Watch a demo",
    body: "Assistants that answer, book, take orders, and collect leads, then hand the conversation to a person when it should. On WhatsApp Business and on the site itself." },
  { n: "03", icon: "terminal", title: "Operational software", href: "#work", cta: "Recent work",
    body: "Fleet desks, ledgers, client portals, and live reports. Tools a team uses on a Tuesday morning, built to stay quick and to keep the data where it belongs." },
] as const;

export const steps = [
  { title: "Consult", body: "We settle the goal, the customer, the path to a sale, and the date it needs to be live." },
  { title: "Design", body: "You approve a visual direction that belongs to the brand, before a line of production code." },
  { title: "Build", body: "Fast, careful, mobile-first work, with the prompts, data, and integrations the system needs." },
  { title: "Launch", body: "Domain, hosting, SSL, email, a proper test pass, and a walkthrough your staff can replay." },
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

export const faqs = [
  { q: "Does the .com stay free after the first year?", a: "The first year of .com registration is included in the $80 website. After that, renewal is the registrar’s price, about $14 a year, with no agency markup." },
  { q: "Does Meta charge for WhatsApp messages?", a: "Meta includes 1,000 free customer-service conversations a month. Marketing broadcasts, and anything past that allowance, are billed by Meta to your own business account. We set the account up so you pay Meta directly, at their price." },
  { q: "What do we own after launch?", a: "The source, the domain, the hosting, and the WhatsApp accounts are yours. There is a 30-day warranty for faults, plus a walkthrough your team can keep. The $35 care plan is optional, for updates, backups, and monitoring." },
  { q: "What is not included?", a: "Third-party model fees past the testing credit, licensed stock photography, ongoing blog writing, and a payment processor’s own onboarding charges sit outside the base fee. We say so before the work starts." },
  { q: "How soon can it be live?", a: "A standard website or a lead-capture bot is typically live in three to five business days once the content and the brief are approved." },
] as const;

export interface Review { name: string; company: string; service: string; rating: number; text: string }

export const reviews: Review[] = [
  { name: "Tinashe M.", company: "FBK Forex Broker Killers", service: "Web platform", rating: 5, text: "We were buried in messages every morning asking for prices and payment details. Saint Enterprise built a site with an automated VIP path. Manual queries fell by 68%, and sign-ups moved much faster." },
  { name: "Farai C.", company: "Truckana Logistics", service: "Fleet platform", rating: 5, text: "Paper driver logs and fuel receipts used to take three days at month-end. The fleet desk gives us live trips, fuel, and a PDF export. Month-end now takes 45 minutes." },
  { name: "Rumbidzai K.", company: "Harare Health Clinic", service: "WhatsApp booking", rating: 5, text: "Patients needed appointments after reception had closed. The WhatsApp bot checks the diary and confirms a slot. In the first month it caught 42 bookings we would have missed." },
  { name: "Munashe T.", company: "ZimAgro Tobacco Co.", service: "Vision bot", rating: 5, text: "Farmers photograph a leaf from the field and get a disease name and a treatment. More than 4,200 scans, at 91% accuracy." },
  { name: "Chipo N.", company: "Royal Crown Beauty & Spa", service: "WhatsApp booking", rating: 5, text: "Weekends used to mean double bookings and a phone that never stopped. The assistant sends reminders. No-shows dropped by 85% in the first month." },
  { name: "Brian D.", company: "Victoria Falls Horizon", service: "Tour booking", rating: 5, text: "International guests pay by card, regional guests by EcoCash or ZIPIT. Saint Enterprise shipped a booking site that issues the voucher on the spot." },
  { name: "Tariro M.", company: "Mutare Auto Spares", service: "Stock bot", rating: 5, text: "People ask if we have the part before they travel in. The bot checks the catalogue, quotes the price, and takes a delivery address. Daily dispatch has doubled." },
  { name: "Nigel K.", company: "Apex STEM Academy", service: "Maths assistant", rating: 5, text: "The hint ladder walks students through O-Level problems before it shows the solution. More than 1,800 questions are worked every month." },
];

export const marqueeItems = ["Websites", "WhatsApp AI", "Computer Vision", "Fleet Systems", "Lead Capture", "Booking", "Human Handover", "Dashboards"];
