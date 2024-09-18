import { assertExists, assertStrictEquals } from '$std/assert';

import { CatechismStructure, ParagraphNumberPathIdMap } from '../source/types/types.ts';
import { getParagraphNumberPathMap } from '../source/utils/artifacts.ts';
import { getAllParagraphs, getCatechism } from '../source/utils/content.ts';
import { getLanguages } from '../source/utils/language.ts';

console.log('\nParagraph number to renderable PathID map ...');
for await (const [key, language] of getLanguages()) {
    const catechism = await getCatechism(language);
    const renderablePathMap = await getParagraphNumberPathMap(language);

    runTests(key, catechism, renderablePathMap);
}

function runTests(
    languageKey: string,
    catechism: CatechismStructure,
    pathMap: ParagraphNumberPathIdMap,
): void {
    const catechismParagraphs = getAllParagraphs(catechism);

    Deno.test(`[${languageKey}] every paragraph is included`, () => {
        catechismParagraphs.map((p) => p.paragraphNumber).forEach((paragraphNumber) => {
            const mapParagraph = pathMap[paragraphNumber];
            assertExists(mapParagraph, `missing paragraph: ${paragraphNumber}`);
        });
    });

    Deno.test(`[${languageKey}] there are no extra paragraphs`, () => {
        const numCatechismParagraphs = catechismParagraphs.length;
        const numMapParagraphs = Object.keys(pathMap).length;
        const difference = numMapParagraphs - numCatechismParagraphs;
        assertStrictEquals(difference, 0, `the map has ${difference} extra paragraph${difference === 0 ? '' : 's'}`);
    });
}
