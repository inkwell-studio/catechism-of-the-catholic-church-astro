import { ArticleParagraph } from './article-paragraph.ts';
import { Content } from './content.ts';
import { InBrief } from './in-brief.ts';
import { InBriefContainer } from './in-brief-container.ts';
import { Paragraph } from './paragraph.ts';
import { ParagraphGroup } from './paragraph-group.ts';
import { Subarticle } from './subarticle.ts';
import { TextContent } from './text-content.ts';

export interface Article extends InBriefContainer {
    readonly contentType: Content.ARTICLE;
    readonly articleNumber: number;
    readonly title: string;
    readonly openingContent: Array<ParagraphGroup | Paragraph | TextContent>;
    readonly mainContent: Array<ArticleParagraph> | Array<Subarticle> | Array<ParagraphGroup | Paragraph>;
    readonly inBrief: InBrief | null;
    // e.g. §1061
    readonly finalContent: Array<ParagraphGroup>;
}
