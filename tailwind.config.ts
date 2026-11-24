import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * Saint Enterprise design system -> Tailwind.
 * Colour tokens are CSS variables (see src/index.css) so light/dark swap
 * without touching components. Names mirror the Stitch tokens.
 */
const c = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        // Stitch / Material-style tokens
        surface: c("surface"),
        "surface-dim": c("surface-dim"),
        "surface-bright": c("surface-bright"),
        "surface-container-lowest": c("surface-container-lowest"),
        "surface-container-low": c("surface-container-low"),
        "surface-container": c("surface-container"),
        "surface-container-high": c("surface-container-high"),
        "surface-container-highest": c("surface-container-highest"),
        "surface-variant": c("surface-variant"),
        "on-surface": c("on-surface"),
        "on-surface-variant": c("on-surface-variant"),
        outline: c("outline"),
        "outline-variant": c("outline-variant"),
        "on-primary": c("on-primary"),
        "primary-container": c("primary-container"),
        "on-primary-container": c("on-primary-container"),
        "on-secondary": c("on-secondary"),
        "secondary-container": c("secondary-container"),
        tertiary: c("tertiary"),
        error: c("error"),
        "inverse-surface": c("inverse-surface"),
        "inverse-on-surface": c("inverse-on-surface"),
        "inverse-primary": c("inverse-primary"),
        brand: "#10B981",

        // shadcn/ui aliases
        background: c("surface"),
        foreground: c("on-surface"),
        border: c("outline-variant"),
        input: c("outline-variant"),
        ring: c("primary"),
        primary: { DEFAULT: c("primary"), foreground: c("on-primary") },
        secondary: { DEFAULT: c("secondary"), foreground: c("on-secondary") },
        muted: { DEFAULT: c("surface-container"), foreground: c("on-surface-variant") },
        accent: { DEFAULT: c("surface-container-high"), foreground: c("on-surface") },
        destructive: { DEFAULT: c("error"), foreground: c("on-primary") },
        card: { DEFAULT: c("surface-container-low"), foreground: c("on-surface") },
        popover: { DEFAULT: c("surface-container-lowest"), foreground: c("on-surface") },
      },
      borderRadius: { sm: "4px", DEFAULT: "8px", md: "12px", lg: "16px", xl: "24px", full: "9999px" },
      spacing: {
        "gutter-xs": "4px",
        "gutter-sm": "8px",
        "gutter-md": "16px",
        "gutter-lg": "24px",
        "gutter-xl": "32px",
        section: "64px",
        "section-mobile": "48px",
        "page-margin": "24px",
        "page-margin-mobile": "16px",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        headline: ['"Space Grotesk"', "system-ui", "sans-serif"],
        title: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ["Ubuntu", "system-ui", "sans-serif"],
        label: ["Ubuntu", "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-lg": ["56px", { lineHeight: "62px", letterSpacing: "-1.2px", fontWeight: "700" }],
        "display-lg-mobile": ["32px", { lineHeight: "38px", letterSpacing: "-0.6px", fontWeight: "700" }],
        "display-md": ["44px", { lineHeight: "50px", letterSpacing: "-0.8px", fontWeight: "700" }],
        "display-md-mobile": ["28px", { lineHeight: "34px", letterSpacing: "-0.4px", fontWeight: "700" }],
        "headline-lg": ["36px", { lineHeight: "42px", letterSpacing: "-0.5px", fontWeight: "600" }],
        "headline-lg-mobile": ["26px", { lineHeight: "32px", letterSpacing: "-0.3px", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "30px", letterSpacing: "-0.2px", fontWeight: "600" }],
        "title-lg": ["20px", { lineHeight: "26px", letterSpacing: "-0.1px", fontWeight: "600" }],
        "title-md": ["16px", { lineHeight: "22px", letterSpacing: "0px", fontWeight: "600" }],
        "body-lg": ["17px", { lineHeight: "27px", letterSpacing: "0px", fontWeight: "400" }],
        "body-md": ["15px", { lineHeight: "23px", letterSpacing: "0px", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "19px", letterSpacing: "0.1px", fontWeight: "400" }],
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.2px", fontWeight: "500" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.4px", fontWeight: "500" }],
        "mono-lg": ["28px", { lineHeight: "34px", letterSpacing: "-0.5px", fontWeight: "700" }],
        "mono-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.8px", fontWeight: "400" }],
      },
      transitionDuration: { "state-change": "150ms", "card-hover": "280ms", "surface-enter": "500ms" },
      transitionTimingFunction: {
        "state-change": "ease-out",
        "card-hover": "cubic-bezier(0.22, 1, 0.36, 1)",
        "surface-enter": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "fade-up": { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "none" } },
        "msg-in": { from: { opacity: "0", transform: "translateY(8px) scale(0.98)" }, to: { opacity: "1", transform: "none" } },
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        dot: { "0%,80%,100%": { opacity: "0.3" }, "40%": { opacity: "1" } },
      },
      animation: {
        marquee: "marquee 24s linear infinite",
        "fade-up": "fade-up 500ms cubic-bezier(0.22,1,0.36,1) both",
        "msg-in": "msg-in 320ms cubic-bezier(0.22,1,0.36,1) both",
        "accordion-down": "accordion-down 280ms cubic-bezier(0.22,1,0.36,1)",
        "accordion-up": "accordion-up 220ms cubic-bezier(0.22,1,0.36,1)",
        dot: "dot 1.2s infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
