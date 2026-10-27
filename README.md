# Saint Academy

Marketing site for Saint Academy: websites from $80 and WhatsApp and web AI chatbots from $150. The live page is a single static `index.html` plus images. Express is only used to preview it on your machine.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy on Cloudflare Workers

This site is deployed as [Workers static assets](https://developers.cloudflare.com/workers/static-assets/). There is no Worker script. `npm run build` copies the page and images into `dist/`, and Wrangler uploads only that folder.

In the Cloudflare Workers Builds settings for this repo, use:

| Setting | Command |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

The Worker name in `wrangler.jsonc` is `saintacademy`, which matches the project Cloudflare already created.

Deploy from your own machine with:

```bash
npx wrangler login
npm run deploy
```

`npm run deploy` builds `dist/` and then runs `wrangler deploy`. You need a Cloudflare account that can publish the `saintacademy` Worker.

### Why the previous deploy failed

`npx wrangler deploy` ran with no config file, so Wrangler guessed this was a static site and set the asset directory to the repository root. That upload included `node_modules`, and Cloudflare rejected it:

```text
Asset too large.
Cloudflare Workers supports assets with sizes of up to 25 MiB.
We found a file .../node_modules/workerd/bin/workerd with a size of 137 MiB.
```

`wrangler.jsonc` now points `assets.directory` at `./dist`. The build does not copy `node_modules`, `.git`, the Express server, or markdown notes. Unknown paths still fall back to `index.html`, same as the local server.

## Project layout

| Path | Purpose |
| --- | --- |
| `index.html` | The site |
| `logo.png`, `og-image.jpg` | Logo and link-preview image |
| `src/assets/images/` | Project screenshots used on the page |
| `public/` | Extra static files, copied to the site root |
| `server.js` | Local preview server |
| `scripts/build-static.mjs` | Builds the `dist/` folder Wrangler uploads |
| `wrangler.jsonc` | Cloudflare Workers config |
