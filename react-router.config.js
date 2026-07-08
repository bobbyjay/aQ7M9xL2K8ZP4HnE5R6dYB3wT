const { vercelPreset } = require("@vercel/react-router/vite");

module.exports = {
  ssr: true,
  presets: [vercelPreset()],

  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
};
