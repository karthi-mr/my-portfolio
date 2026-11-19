import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

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
  ],
  server: {
    host: "0.0.0.0",
    port: 5173
  },
  build: {
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
