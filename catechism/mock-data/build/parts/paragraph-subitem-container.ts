import { buildParagraphSubitem } from './paragraph-subitem.ts';
import { Limit } from '../config/limit.ts';
import { intArrayOfRandomLength, randomBoolean } from '../utils.ts';
import { Content, ParagraphSubitem, ParagraphSubitemContainer } from '../../../source/types/types.ts';

export function buildParagraphSubitemContainer(): ParagraphSubitemContainer {
    return {
        contentType: Content.PARAGRAPH_SUB_ITEM_CONTAINER,
        // This will be set later, after all content is created
        pathID: '0',
        // This will be set later, after all content is created
        semanticPath: '',
        ordered: randomBoolean(),
        openingContent: [],
        mainContent: buildContent(),
        finalContent: [],
    };
}

function buildContent(): Array<ParagraphSubitem> {
    return intArrayOfRandomLength(Limit.paragraphSubitemContainer.subitem).map(() => buildParagraphSubitem());
}
