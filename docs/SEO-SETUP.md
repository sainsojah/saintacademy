# SEO, GEO and analytics setup

Everything the code can do is already done. The steps below need **your** accounts. All IDs go in one file:
`src/lib/config.ts`. Anything left empty is simply not added to the site.

## What is already built in

| Item | Where |
| --- | --- |
| Unique title + meta description for every page | `src/lib/services.ts` (service pages), `src/lib/seo.ts` (home, privacy) |
| Pre-rendered HTML for every page (crawlers and AI assistants read full content without running JavaScript) | `scripts/prerender.mjs`, runs inside `npm run build` |
| XML sitemap, generated on every build | `dist/sitemap.xml` |
| `robots.txt`, with search and AI crawlers explicitly allowed | `public/robots.txt` |
| `llms.txt`, a plain-language summary for AI assistants | `public/llms.txt` |
| Structured data: business, website, services, prices, FAQs, breadcrumbs | `src/lib/seo.ts` |
| Canonical URLs, Open Graph and Twitter tags, real 404 page | `src/lib/seo.ts`, `wrangler.jsonc` |
| One landing page per service | `/website-design-zimbabwe/`, `/whatsapp-chatbot-zimbabwe/`, `/business-software-zimbabwe/` |
| Privacy page (needed once analytics is on) | `/privacy/` |

## 1. Deploy first

Push to GitHub and let Cloudflare build. Open `https://saintacademy.com/sitemap.xml` and
`https://saintacademy.com/robots.txt` to confirm they load. Then do the steps below.

## 2. Google Search Console

1. Go to <https://search.google.com/search-console> and click **Add property**.
2. **Easiest, covers the whole domain:** choose **Domain**, enter `saintacademy.com`, and add the TXT record
   Google shows in Cloudflare (**DNS → Records → Add record → TXT**). Click **Verify**.
   *Alternative:* choose **URL prefix**, pick **HTML tag**, copy only the value inside `content="..."`,
   paste it into `GSC_VERIFICATION` in `src/lib/config.ts`, deploy, then click **Verify**.
3. **Sitemaps** → enter `sitemap.xml` → **Submit**.
4. **URL inspection** → paste each of the five URLs from the sitemap → **Request indexing**.
5. Check back in a few days: **Pages** should show them as indexed.

## 3. Bing Webmaster Tools

1. Go to <https://www.bing.com/webmasters> and sign in.
2. Click **Import from Google Search Console** (fastest, no code change). Or add the site manually,
   choose the **HTML meta tag** option, and paste its `content` value into `BING_VERIFICATION` in `src/lib/config.ts`.
3. **Sitemaps** → submit `https://saintacademy.com/sitemap.xml`.
4. Bing also powers ChatGPT search and Copilot results, so this matters for AI visibility too.

## 4. Microsoft Clarity

1. Go to <https://clarity.microsoft.com>, create a project for `saintacademy.com`.
2. **Settings → Overview** and copy the **Project ID** (a short code like `abcd1234ef`).
3. Paste it into `CLARITY_ID` in `src/lib/config.ts` and deploy.
4. Within about 30 minutes, visits and recordings appear. WhatsApp link clicks are sent as a custom
   event called `whatsapp_click`, so you can filter recordings by it.
5. If you expect many visitors from the EU, UK or EEA, add a cookie-consent banner. The privacy page
   already describes Clarity; edit `src/components/site/Privacy.tsx` if you change tools.

## 5. Google Business Profile

This cannot be done in code. It is the biggest factor for "near me" and local searches.

1. Go to <https://business.google.com> and click **Add your business**.
2. **Name:** `Saint Enterprise`, exactly as on the website. **Category:** pick *Website designer* as primary, and
   add the closest others (for example *Software company*). Categories matter more than anything else here.
3. **Location:** if clients do not visit you, choose **service-area business**, hide the street address,
   and add Harare plus the areas you serve.
4. **Phone:** `+263 78 876 2019`. **Website:** `https://saintacademy.com`. Keep name, phone and website
   identical everywhere (Facebook, X, YouTube, directories). Consistency is how search and AI systems
   decide you are one real business.
5. Add **services** with the real prices ($80 websites, $150 chatbots, $35 care) and a description from the
   service pages. Upload your logo and real photos of your work. Do not use stock images.
6. Complete **verification** (Google offers video, phone or postcard depending on the country).
7. Reviews: ask real clients to leave one, using the "Get review link" from your profile.
   **Never buy or write reviews yourself.** Google removes them and can suspend the profile.
8. Once live, paste the listing link into `GBP_URL` and the review link into `GBP_REVIEW_URL` in
   `src/lib/config.ts`. That adds the profile to the site's structured data and a "Review us on Google" link to the footer.
9. Opening hours were removed from the old structured data because they were unverified. Set them in
   the profile instead.

## 6. Getting more out of AI search (GEO)

Already done: answer-first summaries at the top of each page, FAQs with matching schema, prices and facts
stated plainly, `llms.txt`, AI crawlers allowed. To go further:

- **Real proof.** Add client names, results or testimonials only with the client's permission, and only true ones.
  Real Google reviews will do more than anything written on the site.
- **Keep facts in sync.** If you change a price, update `src/lib/content.ts` and `public/llms.txt`.
- **Be listed consistently.** Same name, phone and URL on every profile and directory you use.
- **Helpful content.** One practical article per service (for example, "How much does a website cost in Zimbabwe?")
  tends to get cited by AI assistants. Add a page the same way the service pages are added.
- **To opt out of AI training** (not search), change `Google-Extended` and `Applebot-Extended` in
  `public/robots.txt` from `Allow: /` to `Disallow: /`.

## 7. Check your work after deploy

- View source on a page (`Ctrl+U`): you should see the page text, the `<title>` and a `ld+json` script.
- <https://search.google.com/test/rich-results>: test each page URL. FAQ and breadcrumb items should be detected.
- <https://pagespeed.web.dev>: check mobile score.
- Search Console → **Pages** and **Performance** after a week.
- Visit a made-up URL: you should get the 404 page, not the home page.

## Adding a new landing page later

Add an entry to `servicePages` in `src/lib/services.ts` (copy an existing one). The route, meta tags, schema,
sitemap entry, header and footer links, and prerendered HTML are all generated from it automatically.
