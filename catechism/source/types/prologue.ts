import { Content } from './content.ts';
import { ContentContainer } from './content-container.ts';
import { Subarticle } from './subarticle.ts';
import { TextContent } from './text-content.ts';

export interface Prologue extends ContentContainer {
    readonly contentType: Content.PROLOGUE;
    readonly title: string;
    readonly openingContent: Array<TextContent>;
    readonly mainContent: Array<Subarticle>;
    readonly finalContent: Array<never>;
}
