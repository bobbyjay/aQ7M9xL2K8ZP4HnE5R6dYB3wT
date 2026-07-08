import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactRouter } from "@react-router/dev/vite";
import { vercelPreset } from "@vercel/react-router/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    reactRouter({
      presets: [vercelPreset()],
    }),
  ],
  resolve: {
    alias: {
      // Directs Node/Vite to use the server-safe CommonJS file variant
      "react-helmet-async": path.resolve(
        "./node_modules/react-helmet-async/lib/index.js"
      ),
    },
  },
});
