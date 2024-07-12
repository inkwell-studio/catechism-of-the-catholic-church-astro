import { buildTextWrapper } from './text-wrapper.ts';
import { Limit } from '../config/limit.ts';
import { Probability } from '../config/probability.ts';
import { chance, intArrayOfRandomLength } from '../utils.ts';
import { Content, TextBlock, TextWrapper } from '../../../source/types/types.ts';

export function buildTextBlock(): TextBlock {
    const supplementary = chance(Probability.textBlock.supplementary);

    return {
        contentType: Content.TEXT_BLOCK,
        // This will be set later, after all content is created
        pathID: '0',
        // This will be set later, after all content is created
        semanticPath: '',
        supplementary,
        openingContent: [],
        mainContent: buildContent(),
        finalContent: [],
    };
}

function buildContent(): Array<TextWrapper> {
    return intArrayOfRandomLength(Limit.textBlock.textWrapper).map(() => buildTextWrapper());
}
