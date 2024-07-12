import { Limit } from '../config/limit.ts';
import { Probability } from '../config/probability.ts';
import { getTitleText } from './general.ts';
import { buildParagraphGroup } from './paragraph-group.ts';
import { buildSection } from './section.ts';
import { chance, intArrayOfRandomLength, randomBoolean } from '../utils.ts';
import { Content, Paragraph, ParagraphGroup, Part, Section } from '../../../source/types/types.ts';
import { buildParagraph } from './paragraph.ts';

export function buildPart(partNumber: number): Part {
    const openingContent = buildOpeningContent();
    const mainContent = buildSections();

    return {
        contentType: Content.PART,
        pathID: `${partNumber}`,
        // This will be set later, after all content is created
        semanticPath: '',
        partNumber,
        title: getTitleText(Content.PART, partNumber),
        openingContent,
        mainContent,
        finalContent: [],
        creed: null,
        tenCommandments: null,
    };
}

function buildOpeningContent(): Array<ParagraphGroup | Paragraph> {
    if (chance(Probability.part.hasOpeningContent)) {
        const useParagraphGroups = randomBoolean();
        return useParagraphGroups
            ? intArrayOfRandomLength(Limit.part.openingContent).map((i) => buildParagraphGroup(i))
            : intArrayOfRandomLength(Limit.part.openingContent).map(() => buildParagraph());
    } else {
        return [];
    }
}

function buildSections(): Array<Section> {
    const multipleSections = chance(Probability.part.multipleSections);
    if (multipleSections) {
        return intArrayOfRandomLength(Limit.part.multipleSections).map((i) => buildSection(i));
    } else {
        return [buildSection(1)];
    }
}
