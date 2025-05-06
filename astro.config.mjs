// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: "https://www.judaicadhpenn.org",
  base: "/americangenizah",
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), partytown()]
});