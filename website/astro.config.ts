import { defineConfig } from 'astro/config';
import deno from '@deno/astro-adapter';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

import { baseUrl, outputDirectoryName } from './config.ts';
import { DEFAULT_LANGUAGE } from '../catechism/source/types/types.ts';
import { getLanguages } from '../catechism/source/utils/language.ts';

export default defineConfig({
    site: baseUrl,
    output: 'hybrid',
    trailingSlash: 'never',
    srcDir: 'source',
    outDir: outputDirectoryName,
    adapter: deno(),
    integrations: [
        react(),
        sitemap(buildSitemapConfig()),
        tailwind(),
    ],
    prefetch: {
        prefetchAll: true,
    },
    devToolbar: {
        enabled: false,
    },
});

function buildSitemapConfig() {
    const locales: Record<string, string> = {};
    getLanguages().forEach(([_languageKey, language]) => locales[language] = language);

    return {
        i18n: {
            defaultLocale: DEFAULT_LANGUAGE,
            locales,
        },
        filter: (page: string) => !page.includes('/partials/'),
    };
}
