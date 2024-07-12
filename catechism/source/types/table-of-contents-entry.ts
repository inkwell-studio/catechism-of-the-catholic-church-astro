import { Content } from './content.ts';
import { PathID } from './path-id.ts';
import { SemanticPath } from './semantic-path.ts';

export interface TableOfContentsEntry {
    readonly contentType: Content;
    readonly title: string;
    readonly pathID: PathID;
    readonly semanticPath: SemanticPath;
    readonly url: string;
    readonly firstParagraphNumber: number;
    readonly lastParagraphNumber: number;
    readonly children: Array<TableOfContentsEntry>;
}
