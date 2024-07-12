import { CatechismStructure, ParagraphNumberContentMap } from '../source/types/types.ts';
import { getAllParagraphs } from '../source/utils/content.ts';

export function build(catechism: CatechismStructure): ParagraphNumberContentMap {
    const contentMap: ParagraphNumberContentMap = {};

    getAllParagraphs(catechism).forEach((p) => contentMap[p.paragraphNumber] = p);

    return contentMap;
}
