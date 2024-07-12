import { Content } from './content.ts';
import { ContentContainer } from './content-container.ts';
import { Paragraph } from './paragraph.ts';
import { ParagraphGroup } from './paragraph-group.ts';
import { TextContent } from './text-content.ts';

export interface Subarticle extends ContentContainer {
    readonly contentType: Content.SUB_ARTICLE;
    readonly subarticleNumber: number;
    readonly title: string;
    readonly openingContent: Array<TextContent>;
    readonly mainContent: Array<ParagraphGroup | Paragraph>;
    readonly finalContent: Array<never>;
}
