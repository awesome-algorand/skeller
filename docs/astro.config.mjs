// @ts-check
import "dotenv/config"
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import clerk from "@clerk/astro";
import remarkGfm from 'remark-gfm'
import { rehypeGithubAlerts } from 'rehype-github-alerts'
import octicons from '@primer/octicons'
import remarkGithub from 'remark-github'

const rehypeGithubAlertsOptions = {
  alerts: [
    {
      keyword: 'NOTE',
      icon: octicons.info.toSVG(),
      title: 'Note',
    },
    {
      keyword: 'TIP',
      icon: octicons['light-bulb'].toSVG(),
      title: 'Tip',
    },
    {
      keyword: 'IMPORTANT',
      icon: octicons.report.toSVG(),
      title: 'Important',
    },
    {
      keyword: 'WARNING',
      icon: octicons.alert.toSVG(),
      title: 'Warning',
    },
    {
      keyword: 'CAUTION',
      icon: octicons.stop.toSVG(),
      title: 'Caution',
    },
  ]
}
// https://astro.build/config
export default defineConfig({
  site: process.env.SKELLER_URL,
  markdown: {
    remarkPlugins: [ remarkGfm, [remarkGithub, {repository: "https://github.com/awesome-algorand/skeller"}] ],
    rehypePlugins: [[rehypeGithubAlerts, rehypeGithubAlertsOptions]],
  },
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
