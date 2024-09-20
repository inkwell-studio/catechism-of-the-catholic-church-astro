import { buildTextBlock } from './text-block.ts';
import { getLimits } from '../../config/limits.ts';
import { intArrayOfRandomLength } from '../../utils.ts';
import { Content, ParagraphSubitem, TextBlock } from '../../../source/types/types.ts';

export function buildParagraphSubitem(): ParagraphSubitem {
    return {
        contentType: Content.PARAGRAPH_SUB_ITEM,
        // This will be set later, after all content is created
        pathID: '0',
        // This will be set later, after all content is created
        semanticPath: '',
        openingContent: [],
        mainContent: buildContent(),
        finalContent: [],
    };
}

function buildContent(): Array<TextBlock> {
    return intArrayOfRandomLength(getLimits().paragraphSubitem.textBlock).map(() => buildTextBlock());
}
