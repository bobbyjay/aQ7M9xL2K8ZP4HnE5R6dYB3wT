import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactRouter } from "@react-router/dev/vite";
import { vercelPreset } from "@vercel/react-router/vite";

export default defineConfig({
  plugins: [
    react(),
    reactRouter({
      presets: [vercelPreset()],
    }),
  ],
});