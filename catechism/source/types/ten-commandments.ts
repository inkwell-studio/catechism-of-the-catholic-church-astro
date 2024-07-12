import { Content } from './content.ts';
import { ContentBase } from './content-base.ts';

export interface TenCommandments extends ContentBase {
    readonly contentType: Content.TEN_COMMANDMENTS;
}
