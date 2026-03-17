// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import node from "@astrojs/node";

import sitemap from "@astrojs/sitemap";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://sagency.tech",
  security: {
    checkOrigin: false,
  },
  integrations: [react(), icon(), sitemap(), robotsTxt()],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["lenis"],
    },
  },

  adapter: node({
    mode: "standalone",
  }),
});