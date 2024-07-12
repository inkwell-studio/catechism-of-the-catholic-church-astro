import { SemanticPathPathIdMap, TableOfContentsEntry, TableOfContentsType } from '../source/types/types.ts';

export function build(tableOfContents: TableOfContentsType): SemanticPathPathIdMap {
    const pathMaps = [
        tableOfContents.prologue,
        ...tableOfContents.parts,
    ].flatMap((entry) => entryToPathMaps(entry));

    return pathMaps.reduce((previous, current) => (
        {
            ...previous,
            ...current,
        }
    ));
}

function entryToPathMaps(entry: TableOfContentsEntry): Array<SemanticPathPathIdMap> {
    return [
        getRenderablePathMap(entry),
        ...entry.children.flatMap((childEntry) => entryToPathMaps(childEntry)),
    ];
}

function getRenderablePathMap(entry: TableOfContentsEntry): SemanticPathPathIdMap {
    return {
        [entry.semanticPath]: entry.pathID,
    };
}
