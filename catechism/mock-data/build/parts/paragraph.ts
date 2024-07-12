import { buildTextBlock } from './text-block.ts';
import { Limit } from '../config/limit.ts';
import { intArrayOfRandomLength } from '../utils.ts';
import { Content, Paragraph, ParagraphSubitemContainer, TextBlock } from '../../../source/types/types.ts';

export function buildParagraph(): Paragraph {
    return {
        contentType: Content.PARAGRAPH,
        openingContent: [],
        mainContent: buildContent(),
        finalContent: [],

        // These will be set later, after all content is created
        pathID: '0',
        semanticPath: '',
        paragraphNumber: 1,
        url: '',
    };
}

function buildContent(): Array<ParagraphSubitemContainer | TextBlock> {
    return intArrayOfRandomLength(Limit.paragraph.textBlock).map(() => buildTextBlock());
}
