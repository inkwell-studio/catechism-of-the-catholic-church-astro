import { assertStrictEquals } from '$std/assert';

import { path } from './navigation-utils.ts';

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
