import { ContentBase } from './content-base.ts';

export interface ContentContainer extends ContentBase {
    // When this interface is extended, these three properties may be typed as `Array<never>`
    readonly openingContent: Array<ContentBase>;
    readonly mainContent: Array<ContentBase>;
    // "final content" comes after the "In Brief" content (e.g. §1061)
    readonly finalContent: Array<ContentBase>;
}
