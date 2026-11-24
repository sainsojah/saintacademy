import { GBP_URL } from "./config";

export const PHONE_E164 = "263788762019";
export const PHONE_DISPLAY = "+263 78 876 2019";
export const EMAIL = "saintsprinting1@gmail.com";

/** Build a wa.me link with a prefilled message. */
export function wa(text?: string) {
  return `https://wa.me/${PHONE_E164}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export const NAV = [
  { to: "/website-design-zimbabwe/", label: "Websites" },
  { to: "/whatsapp-chatbot-zimbabwe/", label: "Chatbots" },
  { to: "/business-software-zimbabwe/", label: "Software" },
  { to: "/#work", label: "Work" },
  { to: "/#pricing", label: "Pricing" },
  { to: "/#faq", label: "FAQ" },
] as const;

export const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/saintsain07/" },
  { label: "Instagram", href: "https://www.instagram.com/kudzaisainv/?hl=en" },
  { label: "X", href: "https://x.com/sainsojahfx1" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCrVNskwUWep96EBqH6Fc0pA" },
] as const;

export const SAME_AS = [
  `https://wa.me/${PHONE_E164}`,
  ...SOCIALS.map((s) => s.href),
  ...(GBP_URL ? [GBP_URL] : []),
];

/** Counts WhatsApp link clicks on this browser and reports them to Clarity when it is installed. */
export function trackWhatsAppClicks() {
  const onClick = (e: MouseEvent) => {
    const link = (e.target as HTMLElement | null)?.closest?.('a[href*="wa.me"]');
    if (!link) return;
    try {
      const n = parseInt(localStorage.getItem("sa_wa_clicks") || "0", 10) + 1;
      localStorage.setItem("sa_wa_clicks", String(n));
    } catch { /* storage unavailable */ }
    try {
      (window as unknown as { clarity?: (...a: unknown[]) => void }).clarity?.("event", "whatsapp_click");
    } catch { /* ignore */ }
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
