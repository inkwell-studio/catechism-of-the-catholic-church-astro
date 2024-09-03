import { CatechismStructure, ParagraphCrossReferenceContentMap, ParagraphNumberContentMap } from '../source/types/types.ts';
import { getAllCrossReferences, getParagraphNumbers } from '../source/utils/content.ts';

export function build(catechism: CatechismStructure, paragraphMap: ParagraphNumberContentMap): ParagraphCrossReferenceContentMap {
    const contentMap: ParagraphCrossReferenceContentMap = {};

    const crossReferences = getAllCrossReferences(catechism);
    const uniqueCrossReferences = Array.from(new Set(crossReferences));

    uniqueCrossReferences.forEach((reference) => {
        const paragraphNumbers = getParagraphNumbers(reference);
        const paragraphs = paragraphNumbers.map((n) => paragraphMap[n]);

        contentMap[reference] = paragraphs;
    });

    return contentMap;
}
