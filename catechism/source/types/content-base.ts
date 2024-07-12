import { Content } from './content.ts';
import { PathID } from './path-id.ts';
import { SemanticPath } from './semantic-path.ts';

export interface ContentBase {
    readonly contentType: Content;
    readonly pathID: PathID;
    readonly semanticPath: SemanticPath;
}
