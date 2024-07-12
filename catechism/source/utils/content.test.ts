import { assertEquals } from '$std/assert';

import { getParagraphNumbers } from './content.ts';

console.log('\nContent logic ...');

Deno.test('getParagraphNumbers(): number', () => {
    assertEquals(getParagraphNumbers(7), [7]);
});

Deno.test('getParagraphNumbers(): number range (no gap)', () => {
    assertEquals(getParagraphNumbers('10–11'), [10, 11]);
});

Deno.test('getParagraphNumbers(): number range (with gap)', () => {
    assertEquals(getParagraphNumbers('10–12'), [10, 11, 12]);
});
