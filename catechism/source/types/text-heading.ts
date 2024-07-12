import { Content } from './content.ts';
import { ContentBase } from './content-base.ts';

export interface TextHeading extends ContentBase {
    readonly contentType: Content.TEXT_HEADING;
    readonly content: string;
}
