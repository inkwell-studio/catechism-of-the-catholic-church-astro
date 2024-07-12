import { Content } from './content.ts';
import { ContentContainer } from './content-container.ts';
import { TextWrapper } from './text-wrapper.ts';

export interface TextBlock extends ContentContainer {
    readonly contentType: Content.TEXT_BLOCK;
    // Text blocks are considered to be supplementary if they are historical or apologetic in nature, or if they are supplementary doctrinal explanations (see §20).
    readonly supplementary: boolean;
    readonly openingContent: Array<never>;
    readonly mainContent: Array<TextWrapper>;
    readonly finalContent: Array<never>;
}
