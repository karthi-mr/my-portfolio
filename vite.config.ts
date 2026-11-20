import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

type FirebaseHeaderRule = { source: string; headers: { key: string; value: string }[] };

/** Headers that firebase.json sends for every URL ("**"): security headers incl. the CSP. */
function firebaseSiteHeaders(): Record<string, string> {
  const config = JSON.parse(readFileSync(new URL("./firebase.json", import.meta.url), "utf8"));
  const rule: FirebaseHeaderRule | undefined = (config.hosting.headers as FirebaseHeaderRule[]).find(r => r.source === "**");
  return Object.fromEntries((rule?.headers ?? []).map(h => [h.key, h.value]));
}

/**
 * Fails the build when an inline <script> in index.html is not allowed by the CSP in firebase.json
 * (e.g. after editing the theme script), instead of it silently breaking in production.
 */
function checkCspHashes(): Plugin {
  return {
    name: "check-csp-hashes",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        const csp: string = firebaseSiteHeaders()["Content-Security-Policy"] ?? "";
        for (const match of html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)) {
          const hash: string = `'sha256-${createHash("sha256").update(match[1]).digest("base64")}'`;
          if (!csp.includes(hash)) {
            throw new Error(`Inline script in index.html is blocked by the Content-Security-Policy in firebase.json. Replace the old sha256 value in script-src with ${hash}`);
          }
        }
      },
    },
  };
}

/**
 * Adds <link rel="preload"> for the Latin font files to index.html, so the browser starts
 * downloading them immediately instead of waiting until the page has rendered text.
 * Only the Latin subsets are preloaded: other subsets are still downloaded on demand.
 */
function preloadFonts(patterns: RegExp[]): Plugin {
  return {
    name: "preload-fonts",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(_html, ctx) {
        const files: string[] = Object.keys(ctx.bundle ?? {}).filter(
          (file: string) => file.endsWith(".woff2") && patterns.some((pattern: RegExp) => pattern.test(file))
        );
        return files.map((file: string): HtmlTagDescriptor => ({
          tag: "link",
          attrs: { rel: "preload", href: `/${file}`, as: "font", type: "font/woff2", crossorigin: "" },
          injectTo: "head",
        }));
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    preloadFonts([/inter-latin-wght-normal/, /plus-jakarta-sans-latin-wght-normal/]),
    checkCspHashes(),
  ],
  server: {
    host: "0.0.0.0",
    port: 5173
  },
  // `vite preview` (used by the browser tests) sends the same security headers as Firebase Hosting
  preview: {
    headers: firebaseSiteHeaders(),
  },
  build: {
    // never inline font files as data: URLs (the Content-Security-Policy only allows fonts from this site)
    assetsInlineLimit: (filePath: string) => (filePath.endsWith(".woff2") || filePath.endsWith(".woff") ? false : undefined),
    rolldownOptions: {
      output: {
        // big libraries get their own files, so browsers can keep them cached across deploys
        codeSplitting: {
          groups: [
            { name: "react", test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/ },
            { name: "icons", test: /node_modules[\\/]lucide-react[\\/]/ },
            { name: "motion", test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/ },
            { name: "swiper", test: /node_modules[\\/]swiper[\\/]/ },
            // add more big libs here if you use them, e.g.
            // { name: "charts", test: /node_modules[\\/]recharts[\\/]/ },
          ],
        },
      },
    },
  },
})
