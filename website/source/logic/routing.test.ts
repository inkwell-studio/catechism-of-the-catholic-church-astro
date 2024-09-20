import { assertStrictEquals } from '$std/assert';
import { DEFAULT_LANGUAGE, Language, SemanticPath } from '@catechism/source/types/types.ts';
import { getLanguages } from '@catechism/source/utils/language.ts';

import { getLanguageFromPathname, getLanguageTag, getParagraphNumber, getUrl, removeLanguageTag } from './routing.ts';

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

//#region getLanguageTag
Deno.test('getLanguageTag()', async (t) => {
    const testCases = [
        [undefined, null],
        ['', null],
        ['/', null],
        ['abc', null],
        ['abc/', null],
        ['/abc', null],
        ['/abc/', null],
        ['abc/xyz', null],
        ['abc/xyz/', null],
        ['/abc/xyz', null],
        ['/abc/xyz/', null],
        ['la', Language.LATIN],
        ['/la', Language.LATIN],
        ['la/', Language.LATIN],
        ['/la/', Language.LATIN],
        ['la/abc', Language.LATIN],
        ['/la/abc', Language.LATIN],
        ['la/abc/', Language.LATIN],
        ['/la/abc/', Language.LATIN],
        ['la/abc/xyz', Language.LATIN],
        ['/la/abc/xyz', Language.LATIN],
        ['la/abc/xyz/', Language.LATIN],
        ['/la/abc/xyz/', Language.LATIN],
    ] as const;

    for (const [path, expectedResult] of testCases) {
        await t.step(path ?? `(${JSON.stringify(path)})`, () => {
            const result = getLanguageTag(path);
            assertStrictEquals(result, expectedResult);
        });
    }
});
//#endregion

//#region removeLanguageTag
Deno.test('removeLanguageTag()', async (t) => {
    const testCases = [
        [DEFAULT_LANGUAGE, undefined, ''],
        [DEFAULT_LANGUAGE, 'abc/xyz', 'abc/xyz'],
        [DEFAULT_LANGUAGE, 'abc/xyz/', 'abc/xyz/'],
        [DEFAULT_LANGUAGE, '/abc/xyz', '/abc/xyz'],
        [DEFAULT_LANGUAGE, '/abc/xyz/', '/abc/xyz/'],
        [Language.ENGLISH, 'en/abc/xyz', 'abc/xyz'],
        [Language.ENGLISH, 'en/abc/xyz/', 'abc/xyz/'],
        [Language.ENGLISH, '/en/abc/xyz', '/abc/xyz'],
        [Language.ENGLISH, '/en/abc/xyz/', '/abc/xyz/'],
        [Language.LATIN, '', ''],
        [Language.LATIN, '/', '/'],
        [Language.LATIN, 'la', ''],
        [Language.LATIN, '/la', '/'],
        [Language.LATIN, 'la/', '/'],
        [Language.LATIN, '/la/', '/'],
        [Language.LATIN, 'la/abc/xyz', 'abc/xyz'],
        [Language.LATIN, 'la/abc/xyz/', 'abc/xyz/'],
        [Language.LATIN, '/la/abc/xyz', '/abc/xyz'],
        [Language.LATIN, '/la/abc/xyz/', '/abc/xyz/'],
    ] as const;

    for (const [language, path, expectedResult] of testCases) {
        await t.step(path ?? `(${JSON.stringify(path)})`, () => {
            const result = removeLanguageTag(path, language);
            assertStrictEquals(result, expectedResult);
        });
    }
});
//#endregion

//#region getLanguageFromPathname()
Deno.test('getLanguageFromPathname()', async (test) => {
    await test.step('supported languages', async (t) => {
        for (const [_languageKey, language] of getLanguages()) {
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

Deno.test('getParagraphNumberUrl(): 123', () => {
    const result = getParagraphNumber('123');
    assertStrictEquals(result, 123);
});

Deno.test('getParagraphNumberUrl(): /123', () => {
    const result = getParagraphNumber('/123');
    assertStrictEquals(result, 123);
});

Deno.test('getParagraphNumberUrl(): 123/', () => {
    const result = getParagraphNumber('123/');
    assertStrictEquals(result, 123);
});

Deno.test('getParagraphNumberUrl(): /123/', () => {
    const result = getParagraphNumber('/123/');
    assertStrictEquals(result, 123);
});

Deno.test('getParagraphNumberUrl(): all languages', async (t) => {
    const num = 123;

    for (const [_languageKey, language] of getLanguages()) {
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
