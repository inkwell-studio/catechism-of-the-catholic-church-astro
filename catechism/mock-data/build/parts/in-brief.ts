import { buildParagraph } from './paragraph.ts';
import { intArrayOfRandomLength } from '../utils.ts';
import { Content, InBrief, Paragraph } from '../../../source/types/types.ts';
import { getLimits } from '../config/limits.ts';

export function buildInBrief(): InBrief {
    return {
        contentType: Content.IN_BRIEF,
        // This will be set later, after all content is created
        pathID: '0',
        // This will be set later, after all content is created
        semanticPath: '',
        openingContent: [],
        mainContent: buildContent(),
        finalContent: [],
    };
}

function buildContent(): Array<Paragraph> {
    return intArrayOfRandomLength(getLimits().inBrief.paragraph).map(() => buildParagraph());
}
