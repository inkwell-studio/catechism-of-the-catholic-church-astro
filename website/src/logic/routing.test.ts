import { assertExists, assertStrictEquals } from '$std/assert';
import { Language, SemanticPath } from '@catechism/source/types/types.ts';
import { getSupportedLanguages } from '@catechism/source/utils/language.ts';

import { Element, getElementAndPathID, getLanguageFromPathname, getParagraphNumber, getUrl } from './routing.ts';

console.log('\nrouting utils (server) ...');

//#region getUrl()
function urlTest(semanticPath: SemanticPath, expectedUrl: string): void {
    const url = getUrl(Language.ENGLISH, semanticPath);
    assertStrictEquals(url, expectedUrl);
}

Deno.test('getUrl(): high-level content', () => {
    [
        [
            'prologue',
            '/prologue',
        ],
        [
            'part-1',
            '/part-1',
        ],
        [
            'part-1/section-3',
            '/part-1/section-3',
        ],
        [
            'part-1/section-3/chapter-2',
            '/part-1/section-3/chapter-2',
        ],
        [
            'part-1/section-3/chapter-2/article-4',
            '/part-1/section-3/chapter-2/article-4',
        ],
    ].forEach((testCase) => urlTest(testCase[0], testCase[1]));
});

Deno.test('getUrl(): the first Article Paragraphs', () => {
    urlTest(
        'part-1/section-3/chapter-2/article-4/article-paragraph-1',
        '/part-1/section-3/chapter-2/article-4#article-paragraph-1',
    );
});

Deno.test('getUrl(): the subsequent Article Paragraphs', () => {
    urlTest(
        'part-1/section-3/chapter-2/article-4/article-paragraph-7',
        '/part-1/section-3/chapter-2/article-4/article-paragraph-7',
    );
});

Deno.test('getUrl(): low-level content within a Chapter', () => {
    [
        [
            'part-1/section-3/chapter-2/in-brief',
            '/part-1/section-3/chapter-2#in-brief',
        ],
        [
            'part-1/section-3/chapter-2/paragraph-702',
            '/part-1/section-3/chapter-2#702',
        ],
        [
            'part-1/section-3/chapter-2/subarticle-5',
            '/part-1/section-3/chapter-2#subarticle-5',
        ],
        [
            'part-1/section-3/chapter-2/subarticle-5/paragraph-group-6',
            '/part-1/section-3/chapter-2#subarticle-5/paragraph-group-6',
        ],
        [
            'part-1/section-3/chapter-2/subarticle-5/paragraph-group-6/paragraph-702',
            '/part-1/section-3/chapter-2#702',
        ],
        [
            'part-1/section-3/chapter-2/subarticle-5/paragraph-702',
            '/part-1/section-3/chapter-2#702',
        ],
        [
            'part-1/section-3/chapter-2/paragraph-group-5',
            '/part-1/section-3/chapter-2#paragraph-group-5',
        ],
        [
            'part-1/section-3/chapter-2/paragraph-group-5/paragraph-702',
            '/part-1/section-3/chapter-2#702',
        ],
        [
            'part-1/section-3/chapter-2/paragraph-702',
            '/part-1/section-3/chapter-2#702',
        ],
    ].forEach((testCase) => urlTest(testCase[0], testCase[1]));
});

Deno.test('getUrl(): low-level content within a (Chapter > Article)', () => {
    [
        [
            'part-1/section-3/chapter-2/article-4/in-brief',
            '/part-1/section-3/chapter-2/article-4#in-brief',
        ],
        [
            'part-1/section-3/chapter-2/article-4/paragraph-702',
            '/part-1/section-3/chapter-2/article-4#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/subarticle-5',
            '/part-1/section-3/chapter-2/article-4#subarticle-5',
        ],
        [
            'part-1/section-3/chapter-2/article-4/subarticle-5/paragraph-group-6',
            '/part-1/section-3/chapter-2/article-4#subarticle-5/paragraph-group-6',
        ],
        [
            'part-1/section-3/chapter-2/article-4/subarticle-5/paragraph-group-6/paragraph-702',
            '/part-1/section-3/chapter-2/article-4#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/subarticle-5/paragraph-702',
            '/part-1/section-3/chapter-2/article-4#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/paragraph-group-5',
            '/part-1/section-3/chapter-2/article-4#paragraph-group-5',
        ],
        [
            'part-1/section-3/chapter-2/article-4/paragraph-group-5/paragraph-702',
            '/part-1/section-3/chapter-2/article-4#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/paragraph-702',
            '/part-1/section-3/chapter-2/article-4#702',
        ],
    ].forEach((testCase) => urlTest(testCase[0], testCase[1]));
});

Deno.test('getUrl(): low-level content within a (Section > Article)', () => {
    [
        [
            'part-1/section-3/article-4/in-brief',
            '/part-1/section-3/article-4#in-brief',
        ],
        [
            'part-1/section-3/article-4/paragraph-702',
            '/part-1/section-3/article-4#702',
        ],
        [
            'part-1/section-3/article-4/subarticle-5',
            '/part-1/section-3/article-4#subarticle-5',
        ],
        [
            'part-1/section-3/article-4/subarticle-5/paragraph-group-6',
            '/part-1/section-3/article-4#subarticle-5/paragraph-group-6',
        ],
        [
            'part-1/section-3/article-4/subarticle-5/paragraph-group-6/paragraph-702',
            '/part-1/section-3/article-4#702',
        ],
        [
            'part-1/section-3/article-4/subarticle-5/paragraph-702',
            '/part-1/section-3/article-4#702',
        ],
        [
            'part-1/section-3/article-4/paragraph-group-5',
            '/part-1/section-3/article-4#paragraph-group-5',
        ],
        [
            'part-1/section-3/article-4/paragraph-group-5/paragraph-702',
            '/part-1/section-3/article-4#702',
        ],
        [
            'part-1/section-3/article-4/paragraph-702',
            '/part-1/section-3/article-4#702',
        ],
    ].forEach((testCase) => urlTest(testCase[0], testCase[1]));
});

Deno.test('getUrl(): low-level content within an initial ArticleParagraph', () => {
    [
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/in-brief',
            '/part-1/section-3/chapter-2/article-4#article-paragraph-1/in-brief',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/subarticle-5',
            '/part-1/section-3/chapter-2/article-4#article-paragraph-1/subarticle-5',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/subarticle-5/paragraph-group-6',
            '/part-1/section-3/chapter-2/article-4#article-paragraph-1/subarticle-5/paragraph-group-6',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/subarticle-5/paragraph-group-6/paragraph-702',
            '/part-1/section-3/chapter-2/article-4#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/subarticle-5/paragraph-702',
            '/part-1/section-3/chapter-2/article-4#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/paragraph-group-5',
            '/part-1/section-3/chapter-2/article-4#article-paragraph-1/paragraph-group-5',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/paragraph-group-5/paragraph-702',
            '/part-1/section-3/chapter-2/article-4#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/paragraph-702',
            '/part-1/section-3/chapter-2/article-4#702',
        ],
    ].forEach((testCase) => urlTest(testCase[0], testCase[1]));
});

Deno.test('getUrl(): low-level content within a subsequent ArticleParagraph', () => {
    [
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-7/in-brief',
            '/part-1/section-3/chapter-2/article-4/article-paragraph-7#in-brief',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-7/subarticle-5',
            '/part-1/section-3/chapter-2/article-4/article-paragraph-7#subarticle-5',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-7/subarticle-5/paragraph-group-6',
            '/part-1/section-3/chapter-2/article-4/article-paragraph-7#subarticle-5/paragraph-group-6',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-7/subarticle-5/paragraph-group-6/paragraph-702',
            '/part-1/section-3/chapter-2/article-4/article-paragraph-7#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-7/subarticle-5/paragraph-702',
            '/part-1/section-3/chapter-2/article-4/article-paragraph-7#702',
        ],
    ].forEach((testCase) => urlTest(testCase[0], testCase[1]));
});
//#endregion

//#region getElementAndPathID()
Deno.test('getElementAndPathID(): empty path', () => {
    const result = getElementAndPathID(Language.ENGLISH, '');
    assertExists(result);
    assertStrictEquals(result.element, Element.TABLE_OF_CONTENTS);
    assertStrictEquals(result.pathID, null);
});

Deno.test('getElementAndPathID(): Table of Contents', () => {
    const result = getElementAndPathID(Language.ENGLISH, 'table-of-contents');
    assertExists(result);
    assertStrictEquals(result.element, Element.TABLE_OF_CONTENTS);
    assertStrictEquals(result.pathID, null);
});

Deno.test('getElementAndPathID(): Content', () => {
    const result = getElementAndPathID(Language.ENGLISH, 'prologue');
    assertExists(result);
    assertStrictEquals(result.element, Element.CONTENT);
    assertExists(result.pathID);
});
//#endregion

//#region getLanguageFromPathname()
Deno.test('getLanguageFromPathname()', async (test) => {
    await test.step('supported languages', async (t) => {
        for (const [_languageKey, language] of getSupportedLanguages()) {
            const tests = buildTestCases(language);
            for (const pathname of tests) {
                await t.step(pathname, () => {
                    const result = getLanguageFromPathname(pathname);
                    assertStrictEquals(result, language);
                });
            }
        }
    });

    await test.step('unsupported language', async (t) => {
        const tests = buildTestCases('fake');
        for (const pathname of tests) {
            await t.step(pathname, () => {
                const result = getLanguageFromPathname(pathname);
                assertStrictEquals(result, null);
            });
        }
    });

    function buildTestCases(language: string): Array<string> {
        return [
            language,
            `/${language}`,
            `/${language}/`,
            `/${language}/123`,
            `/${language}/123/456`,
            `/${language}/prologue`,
            `/${language}/prologue/something-more`,
        ];
    }
});
//#endregion

//#region getParagraphNumberUrl()
Deno.test('getParagraphNumberUrl(): null', () => {
    const result = getParagraphNumber('');
    assertStrictEquals(result, null);
});

Deno.test('getParagraphNumberUrl(): ""', () => {
    const result = getParagraphNumber('');
    assertStrictEquals(result, null);
});

Deno.test('getParagraphNumberUrl(): /123', () => {
    const result = getParagraphNumber('/123');
    assertStrictEquals(result, 123);
});

Deno.test('getParagraphNumberUrl(): 123', () => {
    const result = getParagraphNumber('123');
    assertStrictEquals(result, 123);
});

Deno.test('getParagraphNumberUrl(): all languages', async (t) => {
    const num = 123;

    for (const [_languageKey, language] of getSupportedLanguages()) {
        await t.step(`${language}/${num}`, () => {
            const result = getParagraphNumber(`${language}/${num}`);
            assertStrictEquals(result, num);
        });

        await t.step(`/${language}/${num}`, () => {
            const result = getParagraphNumber(`/${language}/${num}`);
            assertStrictEquals(result, num);
        });
    }
});

Deno.test('getParagraphNumberUrl(): semantic paths', async (t) => {
    const paths = [
        '/prologue',
        '/part-1',
        '/part-2/section-1',
        '/part-3/section-3/chapter-2',
        // Same paths as above, but without the leading slash
        'prologue',
        'part-1',
        'part-2/section-1',
        'part-3/section-3/chapter-2',
    ];

    for (const path of paths) {
        await t.step(path, () => {
            const result = getParagraphNumber(path);
            assertStrictEquals(result, null);
        });
    }
});
//#endregion
