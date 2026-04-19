import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkReadingTime from './src/lib/remark-reading-time.mjs';

export default defineConfig({
  site: 'https://sanchez0523.github.io',
  integrations: [
    mdx({
      remarkPlugins: [remarkReadingTime],
    }),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
      wrap: false,
    },
  },
});