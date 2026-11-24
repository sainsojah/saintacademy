// Renders every page to static HTML after `vite build`, so search engines and AI crawlers
// get full content, titles, descriptions and schema without running JavaScript.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const serverDir = path.resolve("dist-server");
const entry = ["entry-server.js", "entry-server.mjs"].map((f) => path.join(serverDir, f)).find(fs.existsSync);
if (!entry) throw new Error("SSR bundle not found in dist-server/");

const { render, pages, notFoundPage, headHtml } = await import(pathToFileURL(entry).href);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--seo-->") || !template.includes("<!--app-html-->")) {
  throw new Error("index.html template markers are missing");
}

const SITE = "https://saintacademy.com";
const fill = (meta, url) => template.replace("<!--seo-->", headHtml(meta)).replace("<!--app-html-->", render(url));

for (const page of pages) {
  const out = page.path === "/" ? path.join(dist, "index.html") : path.join(dist, page.path, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, fill(page, page.path));
  console.log("prerendered", page.path);
}

// Served with a real 404 status by Cloudflare (not_found_handling: "404-page").
fs.writeFileSync(path.join(dist, "404.html"), fill(notFoundPage, "/page-not-found/"));

const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .filter((p) => !p.noindex)
  .map((p) => `  <url>\n    <loc>${SITE}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${p.priority.toFixed(1)}</priority>\n  </url>`)
  .join("\n");
fs.writeFileSync(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log("wrote sitemap.xml");

fs.rmSync(serverDir, { recursive: true, force: true });
