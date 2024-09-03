import { assertStrictEquals } from '$std/assert';
import { DEFAULT_LANGUAGE, Language } from '@catechism/source/types/language.ts';

import { getLanguageTag, path, removeLanguageTag } from './utils.ts';

Deno.test('path()', async (test) => {
    await test.step('paths never end with a trailing slash', async (t) => {
        const testCases = [
            [[], ''],
            [[''], ''],
            [['/'], ''],
            [['', '/'], ''],
            [['/', ''], ''],
            [['/', '/'], ''],
            [['123'], '123'],
            [['123/'], '123'],
            [['abc', '123'], 'abc/123'],
            [['abc/', '123'], 'abc/123'],
            [['abc', '123/'], 'abc/123'],
            [['abc/', '123/'], 'abc/123'],

            // with hashes
            [['#123'], '#123'],
            [['', '#123'], '#123'],
            [['/#123'], '#123'],
            [['/', '#123'], '#123'],

            [['abc#123'], 'abc#123'],
            [['abc/#123'], 'abc#123'],

            [['abc', '#123'], 'abc#123'],
            [['abc/', '#123'], 'abc#123'],
        ] as const;

        for (const [args, expectedResult] of testCases) {
            // deno-fmt-ignore
            const testDescription = args.length === 1
                ? `'${args[0]}'`
                : args.map((a) => `'${a}'`).join(' + ');

            await t.step(testDescription, () => {
                const result = path(...args);
                assertStrictEquals(result, expectedResult);
            });
        }
    });
});

Deno.test('getLanguageTag()', async (t) => {
    const testCases = [
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
        await t.step(path, () => {
            const result = getLanguageTag(path);
            assertStrictEquals(result, expectedResult);
        });
    }
});

Deno.test('removeLanguageTag()', async (t) => {
    const testCases = [
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
        await t.step(path, () => {
            const result = removeLanguageTag(path, language);
            assertStrictEquals(result, expectedResult);
        });
    }
});
