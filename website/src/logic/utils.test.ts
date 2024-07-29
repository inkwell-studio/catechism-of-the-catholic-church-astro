import { assertStrictEquals } from '$std/assert';
import { DEFAULT_LANGUAGE, Language } from '@catechism/source/types/language.ts';

import { path, removeLanguageTag } from './utils.ts';

Deno.test('path()', async (t) => {
    const testCases = [
        [[], '/'],
        [[''], '/'],
        [['/'], '/'],
        [['', '/'], '/'],
        [['/', ''], '/'],
        [['/', '/'], '/'],
        [['abc', '123'], 'abc/123/'],
        [['abc/', '123'], 'abc/123/'],
        [['abc', '123/'], 'abc/123/'],
        [['abc/', '123/'], 'abc/123/'],
    ] as const;

    for (const [args, expectedResult] of testCases) {
        // deno-fmt-ignore
        const testDescription = args.length === 1
            ? `'${args[0]}'`
            : args.map(a => `'${a}'`).join(' + ');

        await t.step(testDescription, () => {
            const result = path(...args);
            assertStrictEquals(result, expectedResult);
        });
    }
});

Deno.test('removeLanguageTag()', async (t) => {
    const testCases = [
        [DEFAULT_LANGUAGE, 'abc/xyz', 'abc/xyz'],
        [DEFAULT_LANGUAGE, '/abc/xyz', '/abc/xyz'],
        [Language.ENGLISH, 'en/abc/xyz', 'abc/xyz'],
        [Language.ENGLISH, '/en/abc/xyz', '/abc/xyz'],
        [Language.LATIN, 'la/abc/xyz', 'abc/xyz'],
        [Language.LATIN, '/la/abc/xyz', '/abc/xyz'],
    ] as const;

    for (const [language, path, expectedResult] of testCases) {
        await t.step(path, () => {
            const result = removeLanguageTag(path, language);
            assertStrictEquals(result, expectedResult);
        });
    }
});
