import { Content } from './content.ts';

/**
 * A SemanticPath is like "part-1" or "part-2/section-1/chapter-3/article-7".
 */
export type SemanticPath =
    | `${string}`
    | `${string}/${string}`
    | `${string}/${string}/${string}`
    | `${string}/${string}/${string}/${string}`
    | `${string}/${string}/${string}/${string}/${string}`
    | `${string}/${string}/${string}/${string}/${string}/${string}`
    | `${string}/${string}/${string}/${string}/${string}/${string}/${string}`;

export type SemanticPathSource = {
    content: Content;
    number: number | null;
    isFinalContent: boolean;
};
