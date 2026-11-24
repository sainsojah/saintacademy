import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  // Never inline assets: the client and SSR bundles must reference identical URLs for hydration.
  build: { target: "es2020", sourcemap: false, assetsInlineLimit: 0 },
});
