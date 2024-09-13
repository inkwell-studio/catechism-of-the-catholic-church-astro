import { assert, assertStrictEquals } from '$std/assert';
import { DEFAULT_LANGUAGE } from '@catechism/source/types/language.ts';
import { getSupportedLanguages } from '@catechism/source/utils/language.ts';

import { translate } from '../src/logic/translation.ts';

const baseUrl = 'http://localhost:8085';
const supportedLanguages = getSupportedLanguages();

//#region tests: static files
Deno.test('website: static files', async (test) => {
    const responses: Array<Response> = [];

    async function get(url = ''): Promise<Response> {
        url = new URL(url, baseUrl).href;

        const response = await fetch(new Request(url));
        responses.push(response);

        return response;
    }

    await test.step('a robots.txt file is accessible', async () => {
        const r = await get('robots.txt');
        assertStrictEquals(r.status, 200);
    });

    await test.step('a sitemap is accessible', async () => {
        const r = await get('sitemap-index.xml');
        assertStrictEquals(r.status, 200);
    });

    await test.step('close all responses', async () => {
        await close(responses);
    });
});
//#endregion

//#region tests: rendered content
Deno.test('website: rendered content', async (test) => {
    const responses: Array<Response> = [];

    async function get(url = ''): Promise<Response> {
        url = new URL(url, baseUrl).href;

        const response = await fetch(new Request(url));
        responses.push(response);

        return response;
    }

    await test.step('the root page is accessible', async () => {
        const r = await get('');
        assertStrictEquals(r.status, 200);
    });

    await test.step('the `lang` attribute is correct for the root page', async () => {
        const r = await get('');
        assertStrictEquals(r.status, 200);
        const html = await r.text();
        const lang = getLangAttribute(html);
        assertStrictEquals(lang, DEFAULT_LANGUAGE);
    });

    await test.step('paths with the default language code are redirected to the same subpath without the language code', async () => {
        const testCases = [
            `${DEFAULT_LANGUAGE}/`,
            `${DEFAULT_LANGUAGE}/prologue/`,
        ];

        for (const url of testCases) {
            const r = await get(url);

            assert(r.redirected);

            const expectedUrl = baseUrl + url.slice(2);
            assertStrictEquals(r.url, expectedUrl);

            const html = await r.text();
            const lang = getLangAttribute(html);
            assertStrictEquals(lang, DEFAULT_LANGUAGE);
        }
    });

    await test.step('the `lang` attribute is correct for the landing page of each supported language', async (t) => {
        for (const [_languageKey, language] of supportedLanguages) {
            const url = `${language}/`;

            await t.step(url, async () => {
                const r = await get(url);
                assertStrictEquals(r.status, 200);

                if (DEFAULT_LANGUAGE === language) {
                    assert(r.redirected);
                } else {
                    assert(!r.redirected);
                }

                const html = await r.text();
                const lang = getLangAttribute(html);
                assertStrictEquals(lang, language);
            });
        }
    });

    await test.step('can navigate to the prologue', async (t) => {
        const routes = getAllTranslatableRoutes('/prologue/');

        for (const route of routes) {
            await t.step(route, async () => {
                const r = await get(route);
                assertStrictEquals(r.status, 200);
            });
        }
    });

    await test.step('can navigate by paragraph number', async (t) => {
        const paragraphRoute = `/2/`;

        await t.step(paragraphRoute, async () => {
            const r = await get(paragraphRoute);
            assertStrictEquals(r.status, 200);
        });

        for (const [_languageKey, language] of supportedLanguages) {
            const route = `/${language}${paragraphRoute}`;
            await t.step(`${route}`, async () => {
                const r = await get(route);
                assertStrictEquals(r.status, 200);
            });
        }
    });

    await test.step('close all responses', async () => {
        await close(responses);
    });
});
//#endregion

//#region tests: data API
Deno.test('website: data API', async (test) => {
    const responses: Array<Response> = [];

    async function get(url = ''): Promise<Response> {
        url = new URL(`api/${url}`, baseUrl).href;

        const response = await fetch(new Request(url));
        responses.push(response);

        return response;
    }

    await test.step('[language]/paragraph/: single paragraph number', async (t) => {
        const paragraphNumber = 12;

        for (const [_languageKey, language] of supportedLanguages) {
            await t.step(`[${language}]`, async () => {
                const r = await get(`${language}/paragraph/${paragraphNumber}.json`);
                assertStrictEquals(r.status, 200);

                const data = await r.json();
                assert('object' === typeof data);
                assert(!Array.isArray(data));
                assertStrictEquals(data.paragraphNumber, paragraphNumber);
            });
        }
    });

    await test.step('[language]/paragraph/: single paragraph number (out of range)', async (t) => {
        const paragraphNumber = 12000;

        for (const [_languageKey, language] of supportedLanguages) {
            await t.step(`[${language}]`, async () => {
                const r = await get(`${language}/paragraph/${paragraphNumber}.json`);
                assertStrictEquals(r.status, 404);
            });
        }
    });

    await test.step('[language]/paragraph/: single paragraph number (invalid language)', async () => {
        const paragraphNumber = 12;

        const r = await get(`zz/paragraph/${paragraphNumber}.json`);
        assertStrictEquals(r.status, 404);
    });

    await test.step('[language]/paragraphs/: single paragraph number', async (t) => {
        const paragraphNumber = 13;

        for (const [_languageKey, language] of supportedLanguages) {
            await t.step(`[${language}]`, async () => {
                const r = await get(`${language}/paragraphs/${paragraphNumber}`);
                assertStrictEquals(r.status, 200);

                const data = await r.json();
                assert(Array.isArray(data));
                assertStrictEquals(data.length, 1);
                assertStrictEquals(data[0].paragraphNumber, paragraphNumber);
            });
        }
    });

    await test.step('[language]/paragraphs/: single paragraph number (out of range)', async (t) => {
        const paragraphNumber = 13000;

        for (const [_languageKey, language] of supportedLanguages) {
            await t.step(`[${language}]`, async () => {
                const r = await get(`${language}/paragraphs/${paragraphNumber}`);
                assertStrictEquals(r.status, 200);

                const data = await r.json();
                assert(Array.isArray(data));
                assertStrictEquals(data.length, 0);
            });
        }
    });

    await test.step('[language]/paragraphs/: single paragraph number (invalid language)', async () => {
        const paragraphNumber = 13;

        const r = await get(`zz/paragraphs/${paragraphNumber}`);
        assertStrictEquals(r.status, 404);
    });

    await test.step('[language]/paragraph/: paragraph number range (hyphen)', async (t) => {
        const paragraphNumberStart = 8;
        const paragraphNumberEnd = 13;
        const diff = paragraphNumberEnd - paragraphNumberStart;

        for (const [_languageKey, language] of supportedLanguages) {
            await t.step(`[${language}]`, async () => {
                const r = await get(`${language}/paragraphs/${paragraphNumberStart}-${paragraphNumberEnd}`);
                assertStrictEquals(r.status, 200);

                const data = await r.json();
                assert(Array.isArray(data));
                assertStrictEquals(data.length, diff + 1);

                for (let i = 0; i <= diff; i++) {
                    assertStrictEquals(data[i].paragraphNumber, i + paragraphNumberStart);
                }
            });
        }
    });

    await test.step('[language]/paragraph/: paragraph number range (en dash)', async (t) => {
        const paragraphNumberStart = 8;
        const paragraphNumberEnd = 13;
        const diff = paragraphNumberEnd - paragraphNumberStart;

        for (const [_languageKey, language] of supportedLanguages) {
            await t.step(`[${language}]`, async () => {
                const r = await get(`${language}/paragraphs/${paragraphNumberStart}–${paragraphNumberEnd}`);
                assertStrictEquals(r.status, 200);

                const data = await r.json();
                assert(Array.isArray(data));
                assertStrictEquals(data.length, diff + 1);

                for (let i = 0; i <= diff; i++) {
                    assertStrictEquals(data[i].paragraphNumber, i + paragraphNumberStart);
                }
            });
        }
    });

    await test.step('close all responses', async () => {
        await close(responses);
    });
});
//#endregion

//#region helpers
/**
 * @returns the value of the `lang` attribute within the `<html>` element, or `null` if no such element or attribute exists
 */
function getLangAttribute(html: string): string | null {
    // Look for: `<html lang="en"`
    const regex = /(<html lang=")([a-z,A-Z]*)(")/;
    return regex.exec(html)?.[2] ?? null;
}

function getAllTranslatableRoutes(subpath: string): Array<string> {
    const routes = [
        // the default-language route
        subpath,
    ];

    for (const [_languageKey, language] of supportedLanguages) {
        // deno-fmt-ignore
        // This is a simple path translation function, and only needs to be robust enough for the corresponding e2e tests to pass
        const translatedSubpath = subpath
            .split('/')
            .map((part) => part && DEFAULT_LANGUAGE !== language
                ? translate(part, language)
                : part
            )
            .join('/');

        // It is assumed that `translatedSubpath` includes a preceding slash
        routes.push(language + translatedSubpath);
    }

    return routes;
}

async function close(responses: Array<Response>): Promise<void> {
    for await (const r of responses) {
        if (!r.bodyUsed) {
            await r.body?.cancel();
        }
    }
}
//#endregion
