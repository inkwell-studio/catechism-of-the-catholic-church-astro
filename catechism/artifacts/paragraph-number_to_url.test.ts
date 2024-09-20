import { assertExists, assertStrictEquals } from '$std/assert';

import { CatechismStructure, ParagraphNumberUrlMap } from '../source/types/types.ts';
import { getParagraphNumberUrlMap } from '../source/utils/artifacts.ts';
import { getCatechism } from '../source/utils/catechism.ts';
import { getAllParagraphs } from '../source/utils/content.ts';
import { getLanguages } from '../source/utils/language.ts';

console.log('\nParagraph number to URL map ...');
for await (const [key, language] of getLanguages()) {
    const catechism = await getCatechism(language);
    const urlMap = await getParagraphNumberUrlMap(language);

    runTests(key, catechism, urlMap);
}

function runTests(
    languageKey: string,
    catechism: CatechismStructure,
    urlMap: ParagraphNumberUrlMap,
): void {
    const catechismParagraphs = getAllParagraphs(catechism);

    Deno.test(`[${languageKey}] every paragraph is included`, () => {
        catechismParagraphs.map((p) => p.paragraphNumber).forEach((paragraphNumber) => {
            const mapParagraph = urlMap[paragraphNumber];
            assertExists(mapParagraph, `missing paragraph: ${paragraphNumber}`);
        });
    });

    Deno.test(`[${languageKey}] there are no extra paragraphs`, () => {
        const numCatechismParagraphs = catechismParagraphs.length;
        const numMapParagraphs = Object.keys(urlMap).length;
        const difference = numMapParagraphs - numCatechismParagraphs;
        assertStrictEquals(difference, 0, `the map has ${difference} extra paragraph${difference === 0 ? '' : 's'}`);
    });
}
