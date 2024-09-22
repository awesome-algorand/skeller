// @ts-check
import "dotenv/config"
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import auth from 'auth-astro';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: process.env.SKELLER_URL,
  integrations: [
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    auth(),
    mdx(),
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
});
