import { Content } from './content.ts';
import { ContentBase } from './content-base.ts';

export interface Text extends ContentBase {
    readonly contentType: Content.TEXT;
    readonly content: string;
    readonly strong: boolean;
    readonly emphasis: boolean;
    readonly smallCaps: boolean;
}
