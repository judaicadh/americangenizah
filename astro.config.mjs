// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import partytown from '@astrojs/partytown';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://judaicadh.github.io',
  base: 'americangenizah',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), partytown()],
  adapter: netlify()
});