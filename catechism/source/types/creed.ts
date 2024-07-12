import { Content } from './content.ts';
import { ContentBase } from './content-base.ts';

export interface Creed extends ContentBase {
    readonly contentType: Content.CREED;
}
