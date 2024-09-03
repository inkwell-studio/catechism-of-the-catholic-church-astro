import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import deno from '@deno/astro-adapter';

import { baseUrl } from './config.ts';
import { DEFAULT_LANGUAGE } from '../catechism/source/types/types.ts';
import { getSupportedLanguages } from '../catechism/source/utils/language.ts';

export default defineConfig({
    site: baseUrl,
    output: 'hybrid',
    trailingSlash: 'never',
    adapter: deno(),
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
        filter: (page: string) => !page.includes('/partials/'),
    };
}
