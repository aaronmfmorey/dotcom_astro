// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: "https://aaronmorey.com",
  trailingSlash: 'ignore',

  vite: {
    resolve: {
        preserveSymlinks: true
    },

    plugins: [tailwindcss()]
  },

  integrations: [sitemap()],
  adapter: cloudflare()
});