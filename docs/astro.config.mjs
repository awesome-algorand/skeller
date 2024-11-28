// @ts-check
import "dotenv/config"
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import clerk from "@clerk/astro";

// https://astro.build/config
export default defineConfig({
  site: process.env.SKELLER_URL,
  integrations: [
    clerk(),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
  ],
  output: 'server',
  adapter: cloudflare({
      imageService:"cloudflare"
  }),
});
