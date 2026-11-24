# Saint Enterprise

Marketing site for Saint Enterprise: websites from $80, WhatsApp and web AI chatbots from $150.

**Stack:** Vite · React 18 · TypeScript · Tailwind CSS 3 · shadcn/ui (Radix) · lucide-react.
Deployed to Cloudflare Workers static assets (`dist/`).

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
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
| `tailwind.config.ts` | Design-system tokens: colours, type scale, spacing, radii, motion |
| `src/index.css` | Light and dark colour variables, background grid, reveal styles |
| `src/lib/content.ts` | **All copy**: services, pricing, FAQ, reviews. Edit text here |
| `src/lib/site.ts` | Phone, email, nav links, social links, `wa()` WhatsApp link helper |
| `src/components/ui/` | shadcn-style primitives: Button, Badge, Card, Accordion, Tabs, Dialog, Input |
| `src/components/site/` | Page sections (Hero, Services, Pricing, Work, Demo, Reviews, FAQ, Contact...) |
| `src/assets/images/` | Project images (imported, so they get hashed and cached) |
| `public/` | `logo.png`, `og-image.jpg`, `robots.txt`, `sitemap.xml` (copied to the site root) |

## Design system

Tokens follow the Stitch "Saint Enterprise" system. Light (`#F9F9FF` surface, `#006C49` primary) is the
default; dark (`#0F131C`, `#4EDEA3`) follows the visitor's OS and can be toggled in the header.
Use token classes (`bg-surface-container-low`, `text-on-surface-variant`, `font-mono text-mono-sm`) rather
than raw hex values. Cards lift 4px on hover, buttons lift 2px and settle on press, sections fade up once
on scroll. Everything respects `prefers-reduced-motion`.

Add more shadcn components with `npx shadcn@latest add <component>` (`components.json` is set up).
