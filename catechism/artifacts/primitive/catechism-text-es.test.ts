import Catechism from './catechism-es.json' with { type: 'json' };

import { assertStrictEquals } from '$std/assert';

import { CatechismStructure, Language } from '../../source/types/types.ts';

console.log('\nSpanish text fragments ...');

Deno.test('the correct Catechism is loaded', () => {
    const actual = (Catechism as CatechismStructure).language;
    const expected = Language.SPANISH;
    assertStrictEquals(actual, expected, `found [${actual}] instead of [${expected}]`);
});
