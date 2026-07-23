import { defineConfig } from "astro/config";
import react from "@astrojs/react";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  site: "https://aduoer-music.github.io",
  base: isProduction ? "/langding-page" : "/",
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
