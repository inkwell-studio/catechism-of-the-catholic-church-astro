import { Content } from './content.ts';
import { ContentBase } from './content-base.ts';
import { TextSimple } from './text-simple.ts';

export interface Text extends ContentBase, TextSimple {
    readonly contentType: Content.TEXT;
}
