import { assertEquals, assertExists, assertStrictEquals } from '$std/assert';

import { CatechismStructure, NumberOrNumberRange, ParagraphCrossReferenceContentMap } from '../source/types/types.ts';
import { getAllCrossReferences, getCatechism, getParagraphNumbers } from '../source/utils/content.ts';
import { getParagraphCrossReferenceContentMap } from '../source/utils/artifacts.ts';
import { getLanguages } from '../source/utils/language.ts';

console.log('\nParagraph cross-reference to content map ...');
for await (const [key, language] of getLanguages()) {
    const catechism = await getCatechism(language);
    const contentMap = await getParagraphCrossReferenceContentMap(language);

    runTests(key, catechism, contentMap);
}

function runTests(
    languageKey: string,
    catechism: CatechismStructure,
    contentMap: ParagraphCrossReferenceContentMap,
): void {
    const crossReferences = getAllCrossReferences(catechism);

    Deno.test(`[${languageKey}] every cross reference is included`, () => {
        crossReferences.forEach((reference) => {
            const mapReference = contentMap[reference];
            assertExists(mapReference, `missing cross-reference: ${reference}`);
        });

        const numActual = Object.keys(contentMap).length;
        const numExpected = new Set(crossReferences).size;
        const difference = numActual - numExpected;
        assertStrictEquals(difference, 0, `the map has ${difference} extra cross-reference${difference === 0 ? '' : 's'}`);
    });

    Deno.test(`[${languageKey}] every cross-reference contains all referenced paragraphs, and no others`, () => {
        Object.entries(contentMap).forEach(([reference, paragraphs]) => {
            const paragraphNumbersFromKey = getParagraphNumbers(reference as NumberOrNumberRange);
            const paragraphNumbersFromValue = paragraphs.map((p) => p.paragraphNumber);
            assertEquals(paragraphNumbersFromKey, paragraphNumbersFromValue);
        });
    });
}
