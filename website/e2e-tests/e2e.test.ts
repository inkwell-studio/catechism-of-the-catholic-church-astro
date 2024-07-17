import { assert, assertStrictEquals } from '$std/assert';
import { getSupportedLanguages } from '@catechism/source/utils/language.ts';

import { Language } from '@catechism/source/types/language.ts';

import { DEFAULT_LANGUAGE } from '../config.ts';

const baseUrl = 'http://localhost:8085';

//#region tests: static content
Deno.test('website: static files', async (test) => {
    const responses: Array<Response> = [];

    async function get(url = ''): Promise<Response> {
        url = url ? `${baseUrl}/${url}` : baseUrl;

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

    await test.step('close all responses', () => {
        close(responses);
    });
});

//#region tests: rendered content
Deno.test('website: rendered content', async (test) => {
    const responses: Array<Response> = [];

    async function get(url = ''): Promise<Response> {
        url = url ? `${baseUrl}/${url}` : baseUrl;

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

    await test.step('paths including the default language code are redirected to the same subpath without the language code', async (t) => {
        const tests = [
            [DEFAULT_LANGUAGE, 'root'],
            [`${DEFAULT_LANGUAGE}/`, 'root (with trailing slash)'],
            [`${DEFAULT_LANGUAGE}/abc`, 'subpath'],
            [`${DEFAULT_LANGUAGE}/abc/123/xyz`, 'subpath (multilevel)'],
        ];

        for (const [url, description] of tests) {
            await t.step(description, async () => {
                const r = await get(url);

                assert(r.redirected);

                const expectedUrl = baseUrl + (DEFAULT_LANGUAGE === url ? '/' : url.slice(2));
                assertStrictEquals(r.url, expectedUrl);

                const html = await r.text();
                const lang = getLangAttribute(html);
                assertStrictEquals(lang, DEFAULT_LANGUAGE);
            });
        }
    });

    await test.step('the `lang` attribute is correct for the landing page of each supported language', async (t) => {
        for (const [languageKey, language] of getSupportedLanguages()) {
            await t.step(`${languageKey}`, async () => {
                const r = await get(language);
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

    await test.step('invalid routes: 404 page', async (t) => {
        await t.step('default language', async () => {
            const r = await get('/invalid-route');
            await assert404(r, DEFAULT_LANGUAGE);
        });

        // invalid language-specific routes
        for (const [languageKey, language] of getSupportedLanguages()) {
            await t.step(`${languageKey}`, async () => {
                const route = `${language}/invalid-route`;
                const r = await get(route);
                await assert404(r, language);
            });
        }
    });

    /*
    await test.step('can navigate to the prologue', async () => {
        const r = await get('en/prologue');
        assertStrictEquals(r.status, 200);
    });

    await test.step('/{paragraph-number} redirects to a SemanticPath URL', async () => {
        const r = await get('1');
        assertStrictEquals(r.status, 308);
        assert(r.headers.get('location')?.includes('/prologue#1'));
    });

    await test.step('/en/{paragraph-number} redirects to a SemanticPath URL', async () => {
        // TODO: Replace all instances of 'en' with DEFAULT_LANGUAGE
        const r = await get('en/1');
        assertStrictEquals(r.status, 308);
        assert(r.headers.get('location')?.includes('/en/prologue#1'));
    });

    await test.step('invalid routes (paragraph number: 0): 404 page', async () => {
        const r = await get('0');
        assert404(r);
    });

    await test.step('invalid routes (paragraph number: negative): 404 page', async () => {
        const r = await get('-1');
        assert404(r);
    });

    await test.step('invalid routes (paragraph number: excessive): 404 page', async () => {
        const r = await get('99999');
        assert404(r);
    });
    */

    await test.step('close all responses', () => {
        close(responses);
    });
});
//#endregion

//#region tests: data API
// TODO: Reimplement
/*
Deno.test('website: data API', async (test) => {
    const responses: Array<Response> = [];

    async function get(url = ''): Promise<Response> {
        url = `${baseUrl}/api/${url}`;
        const response = await fetch(new Request(url));
        responses.push(response);
        return response;
    }

    await test.step('[language]/paragraph/: single paragraph number', async () => {
        const paragraphNumber = 12;

        const r = await get(`en/paragraph/${paragraphNumber}`);
        assertStrictEquals(r.status, 200);

        const data = await r.json();
        assert(Array.isArray(data));
        assertStrictEquals(data.length, 1);
        assertStrictEquals(data[0].paragraphNumber, paragraphNumber);
    });

    await test.step('[language]/paragraph/: paragraph number range (hyphen)', async () => {
        const paragraphNumberStart = 12;
        const paragraphNumberEnd = 15;
        const diff = paragraphNumberEnd - paragraphNumberStart;

        const r = await get(`en/paragraph/${paragraphNumberStart}-${paragraphNumberEnd}`);
        assertStrictEquals(r.status, 200);

        const data = await r.json();
        assert(Array.isArray(data));
        assertStrictEquals(data.length, diff + 1);

        for (let i = 0; i <= diff; i++) {
            assertStrictEquals(data[i].paragraphNumber, i + paragraphNumberStart);
        }
    });

    await test.step('[language]/paragraph/: paragraph number range (en dash)', async () => {
        const paragraphNumberStart = 12;
        const paragraphNumberEnd = 15;
        const diff = paragraphNumberEnd - paragraphNumberStart;

        const r = await get(`en/paragraph/${paragraphNumberStart}–${paragraphNumberEnd}`);
        assertStrictEquals(r.status, 200);

        const data = await r.json();
        assert(Array.isArray(data));
        assertStrictEquals(data.length, diff + 1);

        for (let i = 0; i <= diff; i++) {
            assertStrictEquals(data[i].paragraphNumber, i + paragraphNumberStart);
        }
    });

    await test.step('[language]/paragraph/: out-of-range paragraph number', async () => {
        const r = await get(`en/paragraph/123456789`);
        assertStrictEquals(r.status, 200);

        const data = await r.json();
        assert(Array.isArray(data));
        assertStrictEquals(data.length, 0);
    });

    await test.step('[language]/paragraph/: invalid or unsupported language code', async () => {
        const r = await get(`zz/paragraph/10`);
        assertStrictEquals(r.status, 200);

        const text = await r.text();
        assertEquals(text, '');
    });

    await test.step('close all responses', () => {
        close(responses);
    });
});
*/
//#endregion

//#region helpers
async function assert404(response: Response, expectedLanguage: Language): Promise<void> {
    assertStrictEquals(response.status, 404);
    const html = await response.text();

    const language = getLangAttribute(html);
    assertStrictEquals(language, expectedLanguage);

    // Look for: `<a href="/"`
    const urlRegex = /(<a href=")(\/[a-z,A-Z]*)(")/;
    const homeLinkUrl = urlRegex.exec(html)?.[2];
    const expectedHomeLinkUrl = DEFAULT_LANGUAGE === expectedLanguage ? '/' : `/${expectedLanguage}`;
    assertStrictEquals(homeLinkUrl, expectedHomeLinkUrl);
}

/**
 * @returns the value of the `lang` attribute within the `<html>` element, or `null` if no such element or attribute exists
 */
function getLangAttribute(html: string): string | null {
    // Look for: `<html lang="en"`
    const regex = /(<html lang=")([a-z,A-Z]*)(")/;
    return regex.exec(html)?.[2] ?? null;
}

function close(responses: Array<Response>): void {
    // `Response.text()` closes the response
    responses.forEach((r) => {
        if (!r.bodyUsed) {
            r.text();
        }
    });
}
//#endregion
