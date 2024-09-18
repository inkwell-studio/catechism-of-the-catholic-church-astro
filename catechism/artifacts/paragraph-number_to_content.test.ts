import { assertExists, assertStrictEquals } from '$std/assert';

import { getAllParagraphs, getCatechism } from '../source/utils/content.ts';
import { CatechismStructure, ParagraphNumberContentMap } from '../source/types/types.ts';
import { getParagraphNumberContentMap } from '../source/utils/artifacts.ts';
import { getLanguages } from '../source/utils/language.ts';

console.log('\nParagraph number to content map ...');
for await (const [key, language] of getLanguages()) {
    const catechism = await getCatechism(language);
    const contentMap = await getParagraphNumberContentMap(language);

    runTests(key, catechism, contentMap);
}

function runTests(
    languageKey: string,
    catechism: CatechismStructure,
    contentMap: ParagraphNumberContentMap,
): void {
    const catechismParagraphs = getAllParagraphs(catechism);

    Deno.test(`[${languageKey}] every paragraph is included`, () => {
        catechismParagraphs.map((p) => p.paragraphNumber).forEach((paragraphNumber) => {
            const mapParagraph = contentMap[paragraphNumber];
            assertExists(mapParagraph, `missing paragraph: ${paragraphNumber}`);
            assertStrictEquals(
                mapParagraph.paragraphNumber,
                paragraphNumber,
                `mismatch: the map entry for key ${paragraphNumber} has a paragraph number of ${mapParagraph.paragraphNumber}`,
            );
        });
    });

    Deno.test(`[${languageKey}] there are no extra paragraphs`, () => {
        const numCatechismParagraphs = catechismParagraphs.length;
        const numMapParagraphs = Object.keys(contentMap).length;
        const difference = numMapParagraphs - numCatechismParagraphs;
        assertStrictEquals(difference, 0, `the map has ${difference} extra paragraph${difference === 0 ? '' : 's'}`);
    });
}
