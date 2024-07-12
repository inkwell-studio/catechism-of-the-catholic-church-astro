import { Article } from './article.ts';
import { Chapter } from './chapter.ts';
import { Content } from './content.ts';
import { InBrief } from './in-brief.ts';
import { InBriefContainer } from './in-brief-container.ts';
import { Paragraph } from './paragraph.ts';
import { ParagraphGroup } from './paragraph-group.ts';

export interface Section extends InBriefContainer {
    readonly contentType: Content.SECTION;
    readonly sectionNumber: number;
    readonly title: string;
    readonly openingContent: Array<ParagraphGroup | Paragraph>;
    readonly mainContent: Array<Chapter> | Array<Article> | Array<ParagraphGroup>;
    readonly finalContent: Array<never>;
    // e.g. §2075
    readonly inBrief: InBrief | null;
}
