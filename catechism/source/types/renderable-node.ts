import { PathID } from './path-id.ts';

export interface RenderableNode {
    readonly pathID: PathID;
    readonly url: string;
}
