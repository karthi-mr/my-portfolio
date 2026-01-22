import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: "0.0.0.0",
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          icons: ["lucide-react"],
          // add more big libs here if you use them:
          // ui: ["@radix-ui/react-dialog", "@radix-ui/react-popover"],
          // charts: ["recharts"],
          // editor: ["monaco-editor"],
        },
      },
    },
  },
})
