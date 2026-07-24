import { defineConfig } from "astro/config";
import react from "@astrojs/react";

const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = productionDomain
  ? `https://${productionDomain}`
  : "http://localhost:4321";

export default defineConfig({
  site,
  base: "/",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
  integrations: [react()],
});
