import { PathID } from './path-id.ts';
import { RenderableNode } from './renderable-node.ts';

export type RenderableNodeMap = Record<PathID, {
    here: RenderableNode;
    next: RenderableNode | null;
    previous: RenderableNode | null;
}>;
