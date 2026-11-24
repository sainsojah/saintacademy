import { BING_VERIFICATION, GSC_VERIFICATION, SITE_NAME, SITE_URL } from "./config";
import { faqs, plans } from "./content";
import { servicePages, type ServicePage } from "./services";
import { EMAIL, SAME_AS } from "./site";

export interface PageMeta {
  path: string; title: string; description: string; noindex?: boolean;
  ld: Record<string, unknown>[]; priority: number;
}

const abs = (p: string) => `${SITE_URL}${p}`;
const ORG_ID = `${SITE_URL}/#org`;

const org = {
  "@type": "ProfessionalService", "@id": ORG_ID, name: SITE_NAME, url: abs("/"),
  logo: { "@type": "ImageObject", url: abs("/logo.png") }, image: abs("/og-image.jpg"),
  telephone: "+263788762019", email: EMAIL,
  description: "Saint Enterprise builds business websites, WhatsApp and website chatbots, and custom operational software for companies in Zimbabwe and abroad.",
  address: { "@type": "PostalAddress", addressLocality: "Harare", addressCountry: "ZW" },
  areaServed: [{ "@type": "Country", name: "Zimbabwe" }, "Worldwide"],
  sameAs: SAME_AS,
};

const faqLd = (items: readonly { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const crumbs = (items: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(p) })),
});

const money = (s: string) => Number(s.replace(/[^0-9.]/g, ""));

function servicePage(s: ServicePage): PageMeta {
  const plan = s.planIndex !== null ? plans[s.planIndex] : null;
  return {
    path: s.path, title: s.title, description: s.description, priority: 0.9,
    ld: [
      org,
      {
        "@type": "Service", "@id": `${abs(s.path)}#service`, name: s.name, serviceType: s.name, description: s.summary,
        url: abs(s.path), provider: { "@id": ORG_ID },
        areaServed: [{ "@type": "Country", name: "Zimbabwe" }, "Worldwide"],
        ...(plan ? { offers: { "@type": "Offer", priceCurrency: "USD", price: money(plan.price), description: `${plan.name} package, from ${plan.price}` } } : {}),
      },
      faqLd(s.faqs),
      crumbs([["Home", "/"], [s.name, s.path]]),
    ],
  };
}

const home: PageMeta = {
  path: "/", priority: 1,
  title: "Websites & WhatsApp Chatbots in Zimbabwe | Saint Enterprise",
  description: "Saint Enterprise builds business websites from $80, WhatsApp and web chatbots from $150, and custom software for teams in Harare and beyond.",
  ld: [
    { ...org, hasOfferCatalog: { "@type": "OfferCatalog", name: "Packages", itemListElement: plans.map((p) => ({
      "@type": "Offer", name: p.name, description: p.about, priceCurrency: "USD", price: money(p.price) })) } },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: abs("/"), name: SITE_NAME, publisher: { "@id": ORG_ID }, inLanguage: "en" },
    faqLd(faqs),
  ],
};

const privacy: PageMeta = {
  path: "/privacy/", priority: 0.3,
  title: "Privacy Policy | Saint Enterprise",
  description: "How Saint Enterprise handles enquiries, analytics and cookies on saintacademy.com.",
  ld: [org, crumbs([["Home", "/"], ["Privacy", "/privacy/"]])],
};

const notFound: PageMeta = {
  path: "/404.html", noindex: true, priority: 0,
  title: "Page not found | Saint Enterprise",
  description: "The page you were looking for does not exist.", ld: [],
};

export const pages: PageMeta[] = [home, ...servicePages.map(servicePage), privacy];

export function normalize(p: string) {
  const clean = p.split(/[?#]/)[0] || "/";
  return clean === "/" ? "/" : clean.replace(/\/+$/, "") + "/";
}

export function getPage(path: string): PageMeta {
  const n = normalize(path);
  return pages.find((p) => p.path === n) ?? notFound;
}
export const notFoundPage = notFound;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export function ldJson(meta: PageMeta) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": meta.ld }).replace(/</g, "\\u003c");
}

/** Everything that goes in <head> for a page. Used by the prerender step. */
export function headHtml(meta: PageMeta) {
  const url = abs(meta.path === "/404.html" ? "/" : meta.path);
  const robots = meta.noindex ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1";
  const t = esc(meta.title), d = esc(meta.description);
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}">`,
    `<meta name="robots" content="${robots}">`,
    !meta.noindex && `<link rel="canonical" href="${url}">`,
    GSC_VERIFICATION && `<meta name="google-site-verification" content="${esc(GSC_VERIFICATION)}">`,
    BING_VERIFICATION && `<meta name="msvalidate.01" content="${esc(BING_VERIFICATION)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    `<meta property="og:title" content="${t}">`,
    `<meta property="og:description" content="${d}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${abs("/og-image.jpg")}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${t}">`,
    `<meta name="twitter:description" content="${d}">`,
    `<meta name="twitter:image" content="${abs("/og-image.jpg")}">`,
    meta.ld.length ? `<script type="application/ld+json" id="ld-json">${ldJson(meta)}</script>` : "",
  ].filter(Boolean).join("\n");
}

/** Client-side navigation: keep title, description, canonical and schema in step with the route. */
export function applyMeta(meta: PageMeta) {
  const url = abs(meta.path === "/404.html" ? "/" : meta.path);
  document.title = meta.title;
  const set = (sel: string, make: () => HTMLElement, attr: string, value: string) => {
    let el = document.head.querySelector<HTMLElement>(sel);
    if (!el) { el = make(); document.head.appendChild(el); }
    el.setAttribute(attr, value);
  };
  const m = (key: string, v: string, prop = false) =>
    set(`meta[${prop ? "property" : "name"}="${key}"]`, () => { const e = document.createElement("meta"); e.setAttribute(prop ? "property" : "name", key); return e; }, "content", v);
  m("description", meta.description);
  m("robots", meta.noindex ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1");
  m("og:title", meta.title, true); m("og:description", meta.description, true); m("og:url", url, true);
  m("twitter:title", meta.title); m("twitter:description", meta.description);
  set('link[rel="canonical"]', () => { const e = document.createElement("link"); e.rel = "canonical"; return e; }, "href", url);
  document.getElementById("ld-json")?.remove();
  if (meta.ld.length) {
    const s = document.createElement("script");
    s.type = "application/ld+json"; s.id = "ld-json"; s.textContent = ldJson(meta);
    document.head.appendChild(s);
  }
}
