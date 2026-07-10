import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactRouter } from "@react-router/dev/vite";
import { vercelPreset } from "@vercel/react-router/vite";
import path from "path";

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      reactRouter({
        presets: [vercelPreset()],
      }),
    ],
    resolve: {
      alias: {
        // Only use the strict CommonJS path during production builds for Vercel.
        // During 'serve' (local dev), let Vite resolve the native ESM file automatically.
        "react-helmet-async": command === "build"
          ? path.resolve("./node_modules/react-helmet-async/lib/index.js")
          : "react-helmet-async",
      },
    },
  };
});

// older version of vite.config.js
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { reactRouter } from "@react-router/dev/vite";
// import { vercelPreset } from "@vercel/react-router/vite";
// import path from "path";

// export default defineConfig({
//   plugins: [
//     react(),
//     reactRouter({
//       presets: [vercelPreset()],
//     }),
//   ],
//   resolve: {
//     alias: {
//       // Directs Node/Vite to use the server-safe CommonJS file variant
//       "react-helmet-async": path.resolve(
//         "./node_modules/react-helmet-async/lib/index.js"
//       ),
//     },
//   },
// });
