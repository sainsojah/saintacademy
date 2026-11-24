export const PHONE_E164 = "263788762019";
export const PHONE_DISPLAY = "+263 78 876 2019";
export const EMAIL = "saintsprinting1@gmail.com";

/** Build a wa.me link with a prefilled message. */
export function wa(text?: string) {
  return `https://wa.me/${PHONE_E164}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export const NAV = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
  { href: "#demo", label: "Live demo" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
] as const;

export const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/saintsain07/" },
  { label: "Instagram", href: "https://www.instagram.com/kudzaisainv/?hl=en" },
  { label: "X", href: "https://x.com/sainsojahfx1" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCrVNskwUWep96EBqH6Fc0pA" },
] as const;

/** Counts WhatsApp link clicks on this browser (same key as the old site). */
export function trackWhatsAppClicks() {
  const onClick = (e: MouseEvent) => {
    const link = (e.target as HTMLElement | null)?.closest?.('a[href*="wa.me"]');
    if (!link) return;
    try {
      const n = parseInt(localStorage.getItem("sa_wa_clicks") || "0", 10) + 1;
      localStorage.setItem("sa_wa_clicks", String(n));
    } catch {
      /* storage unavailable */
    }
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
