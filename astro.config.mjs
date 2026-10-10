// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Tools that are not yet functional are noindexed, so keep them out of the sitemap.
/** @type {string[]} */
const comingSoonTools = JSON.parse(
  readFileSync(new URL('./src/content/tools.json', import.meta.url), 'utf8')
)
  .filter((/** @type {{ status: string }} */ t) => t.status !== 'available')
  .map((/** @type {{ id: string }} */ t) => `/tools/${t.id}`);

// https://astro.build/config
export default defineConfig({
  site: 'https://falconprosec.com',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // Utility pages that should not appear in search results.
      filter: (page) =>
        !page.includes('/contact/thanks') &&
        !comingSoonTools.some((path) => page.endsWith(path)),
    }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
  vite: {
    // @ts-expect-error - Tailwind plugin returns an array of plugins which conflicts with Astro Vite PluginOption
    plugins: [tailwindcss()],
  },
});
