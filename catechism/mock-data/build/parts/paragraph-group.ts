import { getTitleText } from './general.ts';
import { buildParagraph } from './paragraph.ts';
import { Limit } from '../config/limit.ts';
import { intArrayOfRandomLength } from '../utils.ts';
import { Content, Paragraph, ParagraphGroup } from '../../../source/types/types.ts';

export function buildParagraphGroup(paragraphGroupNumber: number): ParagraphGroup {
    return {
        contentType: Content.PARAGRAPH_GROUP,
        // This will be set later, after all content is created
        pathID: '0',
        // This will be set later, after all content is created
        semanticPath: '',
        paragraphGroupNumber,
        title: getTitleText(Content.PARAGRAPH_GROUP, paragraphGroupNumber),
        openingContent: [],
        mainContent: buildContent(),
        finalContent: [],
        // These are set later, after all content is created
        paragraphReferences: [],
    };
}

function buildContent(): Array<Paragraph> {
    return intArrayOfRandomLength(Limit.paragraphGroup.text).map(() => buildParagraph());
}
