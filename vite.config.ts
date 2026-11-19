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
