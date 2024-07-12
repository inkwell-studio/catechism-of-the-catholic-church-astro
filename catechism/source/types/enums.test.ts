import { assertStrictEquals } from '$std/assert';
import { Artifact, BibleBook, Container, Content, Language, OtherSourceEnum, ReferenceEnum } from './types.ts';

console.log('\nEnums ...');
Deno.test('have unique values', () => {
    const allEnumValues = [
        ...Object.values(Artifact),
        ...Object.values(BibleBook),
        ...Object.values(Container),
        ...Object.values(Content),
        ...Object.values(Language),
        ...Object.values(OtherSourceEnum),
        ...Object.values(ReferenceEnum),
    ];

    const uniqueEnumValues = new Set(allEnumValues);

    assertStrictEquals(allEnumValues.length, uniqueEnumValues.size, 'Duplicate enum values exist');
});
