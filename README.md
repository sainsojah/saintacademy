# Saint Enterprise

Marketing site for Saint Enterprise: websites from $80, WhatsApp and web chatbots from $150, custom software.

**Stack:** Vite · React 18 · TypeScript · React Router · Tailwind CSS 3 · shadcn/ui (Radix) · lucide-react.
Every page is prerendered to static HTML at build time for SEO and AI crawlers.
Deployed to Cloudflare Workers static assets (`dist/`).

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, build, prerender pages and sitemap into dist/
npm run preview    # serve dist/ locally
```

## Deploy (Cloudflare Workers)

Same settings as before. `wrangler.jsonc` is unchanged and points at `./dist`.

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

Or from your machine: `npx wrangler login && npm run deploy`.

## Where things live

| Path | What it is |
| --- | --- |
| `src/lib/config.ts` | **Your IDs**: Search Console, Bing, Clarity, Google Business Profile. See `docs/SEO-SETUP.md` |
| `src/lib/services.ts` | The three service landing pages: copy, meta title and description, FAQs |
| `src/lib/content.ts` | Pricing, process steps, FAQs, selected work |
| `src/lib/seo.ts` | Meta tags and structured data for every page |
| `src/lib/site.ts` | Phone, email, nav and social links, `wa()` WhatsApp link helper |
| `scripts/prerender.mjs` | Writes each page as static HTML, plus `sitemap.xml` |
| `tailwind.config.ts`, `src/index.css` | Design-system tokens, light and dark |
| `src/components/ui/` | shadcn-style primitives (Button, Badge, Card, Accordion, Input) |
| `src/components/site/` | Page sections and pages |
| `public/` | `logo.png`, `og-image.jpg`, `robots.txt`, `llms.txt` |

## Design system

Tokens follow the Stitch "Saint Enterprise" system. Light (`#F9F9FF` surface, `#006C49` primary) is the
default; dark (`#0F131C`, `#4EDEA3`) follows the visitor's OS and can be toggled in the header.
Use token classes (`bg-surface-container-low`, `text-on-surface-variant`, `font-mono text-mono-sm`) rather
than raw hex values. The look is flat and professional: no shadows or lifting effects, colour changes on hover, and a short fade as
sections scroll in. Everything respects `prefers-reduced-motion`.

Add more shadcn components with `npx shadcn@latest add <component>` (`components.json` is set up).
