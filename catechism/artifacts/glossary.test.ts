import { assertStrictEquals } from '$std/assert';

import { CatechismStructure, Glossary } from '../source/types/types.ts';
import { getGlossary } from '../source/utils/artifacts.ts';
import { getCatechism } from '../source/utils/catechism.ts';
import { getAllParagraphs, isParagraphReference, isReference } from '../source/utils/content.ts';
import { getLanguages } from '../source/utils/language.ts';

console.log('\nGlossary ...');
for await (const [key, language] of getLanguages()) {
    const catechism = await getCatechism(language);
    const glossary = await getGlossary(language);

    runTests(key, catechism, glossary);
}

function runTests(
    languageKey: string,
    catechism: CatechismStructure,
    glossary: Glossary,
): void {
    const terms = glossary.map((entry) => entry.term);

    Deno.test(`[${languageKey}] every entry's term is unique`, () => {
        const numUniqueTerms = new Set(terms).size;

        const numTerms = terms.length;
        assertStrictEquals(
            numTerms,
            numUniqueTerms,
            `${numTerms - numUniqueTerms} duplicate entry PathIDs exist`,
        );
    });

    Deno.test(`[${languageKey}] every entry's "seeAlso" field maps to another term in the glossary`, () => {
        const seeAlsoTerms = glossary.flatMap((entry) => entry.seeAlso);
        const orphanedTerms = seeAlsoTerms.filter((seeAlsoTerm) => !terms.includes(seeAlsoTerm));

        assertStrictEquals(
            orphanedTerms.length,
            0,
            `${orphanedTerms.length} "see also" terms exist that don't map to another glossary entry: ${orphanedTerms.join(', ')}`,
        );
    });

    Deno.test(`[${languageKey}] all Catechism paragraph references correspond to an actual paragraph in the Catechism`, () => {
        const catechismParagraphNumbers = getAllParagraphs(catechism).map((p) => p.paragraphNumber);

        const paragraphReferences = glossary
            .flatMap((entry) => entry.content)
            .filter((item) => isReference(item) && isParagraphReference(item));

        const orphanedParagraphReferences = paragraphReferences.filter((ref) => !catechismParagraphNumbers.includes(ref.paragraphNumber));

        assertStrictEquals(
            orphanedParagraphReferences.length,
            0,
            `${orphanedParagraphReferences.length} orphaned paragraph references exist: ${
                orphanedParagraphReferences.map((r) => r.paragraphNumber).join(', ')
            }`,
        );
    });
}
