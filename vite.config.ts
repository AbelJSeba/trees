import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
export default defineConfig({
  plugins: [react()],
  base: "./", // <-- critical for Cloudflare Pages
  build: {
    outDir: "dist", // <-- make sure this matches your Cloudflare output directory
  },
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
    },
  },
});
