import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://innovaitionedge.com',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  compressHTML: true,
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
