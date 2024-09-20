import { buildTextBlock } from './text-block.ts';
import { intArrayOfRandomLength } from '../../utils.ts';
import { BlockQuote, Content, TextBlock } from '../../../source/types/types.ts';
import { getLimits } from '../../config/limits.ts';

export function buildBlockQuote(): BlockQuote {
    return {
        contentType: Content.BLOCK_QUOTE,
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
    return intArrayOfRandomLength(getLimits().blockQuote.text).map(() => buildTextBlock());
}
