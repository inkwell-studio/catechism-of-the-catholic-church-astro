import { BlockQuote } from './block-quote.ts';
import { Content } from './content.ts';
import { ContentContainer } from './content-container.ts';
import { ParagraphSubitemContainer } from './paragraph-subitem-container.ts';
import { TextBlock } from './text-block.ts';
import { TextHeading } from './text-heading.ts';

export interface Paragraph extends ContentContainer {
    readonly contentType: Content.PARAGRAPH;
    readonly paragraphNumber: number;
    readonly openingContent: Array<never>;
    readonly mainContent: Array<BlockQuote | ParagraphSubitemContainer | TextHeading | TextBlock>;
    readonly finalContent: Array<never>;
}
