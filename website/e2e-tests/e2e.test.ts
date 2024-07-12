import { assert, assertStrictEquals } from '$std/assert';
import { getSupportedLanguages } from '@catechism/source/utils/language.ts';

import { DEFAULT_LANGUAGE } from '../src/logic/utils.ts';

const baseUrl = 'http://localhost:4321';

//#region tests: rendered content
Deno.test('website: rendered content', async (test) => {
    const responses: Array<Response> = [];

    async function get(url = ''): Promise<Response> {
        url = url ? `${baseUrl}/${url}` : baseUrl;

        const response = await fetch(new Request(url));
        responses.push(response);

        return response;
    }

    async function isRedirected(requestUrl: string, expectedRedirectUrl: string): Promise<boolean> {
        const r = await get(requestUrl);
        assertStrictEquals(r.status, 200);
        const html = await r.text();
        return html.includes(`<meta http-equiv="Refresh" content="0; url=${expectedRedirectUrl}">`);
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

    await test.step(`the '${DEFAULT_LANGUAGE}' route is redirected to the root page`, async () => {
        assert(await isRedirected(DEFAULT_LANGUAGE, `${baseUrl}/`));
    });

    await test.step(`the '${DEFAULT_LANGUAGE}/' route is redirected to the root page`, async () => {
        assert(await isRedirected(`${DEFAULT_LANGUAGE}/`, `${baseUrl}/`));
    });

    // TODO: Implement when valid subpage routing has been implemented
    /*
    await test.step(`the '${DEFAULT_LANGUAGE}/some/sub/page' route is redirected to the same subpage without the default language path`, () => {
        testForRedirect(`${DEFAULT_LANGUAGE}/some/sub/page`, `${baseUrl}/some/sub/page`);
    });
    */

    await test.step('the `lang` attribute is correct for the landing page of each supported language', async (t) => {
        for (const [languageKey, language] of getSupportedLanguages()) {
            await t.step(`${languageKey}`, async () => {
                const r = await get(language);
                assertStrictEquals(r.status, 200);
                const html = await r.text();
                const lang = getLangAttribute(html);
                assertStrictEquals(lang, language);
            });
        }
    });

    // TODO: Reimplement
    /*
    await test.step('unsupported valid language codes are recognized', async () => {
        // Force the language to be English for the next error page
        await get('en');

        const r = await get('fr');
        assertStrictEquals(r.status, 200);
        await assertContent(r, 'Unsupported language: ');
    });
    */

    await test.step('invalid routes: 404 page', async () => {
        const r = await get('qwertyuiop');
        assert404(r);
    });

    /*
    await test.step('can navigate to the prologue', async () => {
        const r = await get('en/prologue');
        assertStrictEquals(r.status, 200);
    });

    await test.step('/{paragraph-number} redirects to a SemanticPath URL', async () => {
        const r = await get('1');
        assertStrictEquals(r.status, 307);
        assert(r.headers.get('location')?.includes('/prologue#1'));
    });

    await test.step('/en/{paragraph-number} redirects to a SemanticPath URL', async () => {
        const r = await get('en/1');
        assertStrictEquals(r.status, 307);
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
async function assert404(response: Response): Promise<void> {
    assertStrictEquals(response.status, 404);
    const html = await response.text();
    assert(html.includes('Page not found.'));
}

/**
 * @returns the value of the `lang` attribute within the `<html>` element, or `null` if no such element or attribute exists
 */
function getLangAttribute(html: string): string | null {
    // Look for: `<html lang="en">`
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
