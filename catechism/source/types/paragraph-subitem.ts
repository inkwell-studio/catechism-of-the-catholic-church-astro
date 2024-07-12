import { Content } from './content.ts';
import { ContentContainer } from './content-container.ts';
import { TextBlock } from './text-block.ts';

export interface ParagraphSubitem extends ContentContainer {
    readonly contentType: Content.PARAGRAPH_SUB_ITEM;
    readonly openingContent: Array<never>;
    readonly mainContent: Array<TextBlock>;
    readonly finalContent: Array<never>;
}
