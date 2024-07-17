import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import deno from '@deno/astro-adapter';

import { baseUrl, DEFAULT_LANGUAGE, port } from './config.ts';
import { getSupportedLanguages } from '../catechism/source/utils/language.ts';

export default defineConfig({
    // TODO: Implement the correct value once this is deployed (and update `baseUrl` in `e2e.test.ts` and run all e2e tests)
    site: baseUrl,
    output: 'hybrid',
    adapter: deno({ port }),
    integrations: [
        react(),
        sitemap(buildSitemapConfig()),
        tailwind(),
    ],
    prefetch: {
        prefetchAll: true,
    },
});

function buildSitemapConfig() {
    const locales: Record<string, string> = {};
    getSupportedLanguages().forEach(([_languageKey, language]) => locales[language] = language);

    return {
        i18n: {
            defaultLocale: DEFAULT_LANGUAGE,
            locales,
        },
    };
}
