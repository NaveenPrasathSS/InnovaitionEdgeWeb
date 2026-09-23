import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://innovaitionedge.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  compressHTML: true,
});
