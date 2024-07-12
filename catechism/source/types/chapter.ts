import { Article } from './article.ts';
import { ChapterSection } from './chapter-section.ts';
import { Content } from './content.ts';
import { InBrief } from './in-brief.ts';
import { InBriefContainer } from './in-brief-container.ts';
import { Paragraph } from './paragraph.ts';
import { ParagraphGroup } from './paragraph-group.ts';
import { Subarticle } from './subarticle.ts';
import { TextContent } from './text-content.ts';

export interface Chapter extends InBriefContainer {
    readonly contentType: Content.CHAPTER;
    readonly chapterNumber: number;
    readonly title: string;
    readonly openingContent: Array<ChapterSection | ParagraphGroup | Paragraph | TextContent>;
    readonly mainContent: Array<Article> | Array<Subarticle>;
    readonly finalContent: Array<never>;
    readonly inBrief: InBrief | null;
}
