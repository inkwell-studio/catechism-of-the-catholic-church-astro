import { Content } from './content.ts';
import { ContentContainer } from './content-container.ts';
import { Creed } from './creed.ts';
import { Paragraph } from './paragraph.ts';
import { ParagraphGroup } from './paragraph-group.ts';
import { Section } from './section.ts';
import { TenCommandments } from './ten-commandments.ts';

export interface Part extends ContentContainer {
    readonly contentType: Content.PART;
    readonly partNumber: number;
    readonly title: string;
    readonly openingContent: Array<ParagraphGroup | Paragraph>;
    readonly mainContent: Array<Section>;
    readonly finalContent: Array<never>;
    readonly creed: Creed | null;
    readonly tenCommandments: TenCommandments | null;
}
