import { Content } from './content.ts';
import { ContentContainer } from './content-container.ts';
import { Paragraph } from './paragraph.ts';

export interface InBrief extends ContentContainer {
    readonly contentType: Content.IN_BRIEF;
    readonly openingContent: Array<never>;
    readonly mainContent: Array<Paragraph>;
    readonly finalContent: Array<never>;
}
