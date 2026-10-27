import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const maxBytes = 25 * 1024 * 1024;

const rootFiles = ["index.html", "logo.png", "og-image.jpg"];

async function copyInto(source, destination) {
  await cp(source, destination, { recursive: true });
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of rootFiles) {
  await copyInto(path.join(root, file), path.join(dist, file));
}

await copyInto(path.join(root, "src"), path.join(dist, "src"));

const publicDir = path.join(root, "public");
for (const entry of await readdir(publicDir)) {
  await copyInto(path.join(publicDir, entry), path.join(dist, entry));
}

const tooLarge = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") {
        tooLarge.push(`${path.relative(dist, fullPath)} (directory must not be deployed)`);
      }
      await walk(fullPath);
      continue;
    }
    const { size } = await stat(fullPath);
    if (size > maxBytes) {
      tooLarge.push(`${path.relative(dist, fullPath)} (${(size / 1024 / 1024).toFixed(1)} MiB)`);
    }
  }
}

await walk(dist);

if (tooLarge.length > 0) {
  console.error("Refusing to build: Cloudflare Workers assets must be 25 MiB or smaller.");
  for (const item of tooLarge) console.error(` - ${item}`);
  process.exit(1);
}

console.log("Static site written to dist/");
