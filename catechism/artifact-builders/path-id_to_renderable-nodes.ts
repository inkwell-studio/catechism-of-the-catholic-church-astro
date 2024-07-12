import { RenderableNode, RenderableNodeMap, TableOfContentsEntry, TableOfContentsType } from '../source/types/types.ts';

export function build(tableOfContents: TableOfContentsType): RenderableNodeMap {
    const map: RenderableNodeMap = {};

    const topLevelEntries = getAllEntries([tableOfContents.prologue, ...tableOfContents.parts]).filter((entry) => !entry.url.includes('#'));

    topLevelEntries.forEach((entry, index, entries) => {
        const here = buildNode(entry);
        const next = buildNode(entries[index + 1]);
        const previous = buildNode(entries[index - 1]);

        if (here) {
            map[entry.pathID] = { here, next, previous };
        } else {
            throw new Error(`Failed to build a RenderableNode entry for PathID ${entry.pathID}`);
        }
    });

    return map;
}

function getAllEntries(entries: Array<TableOfContentsEntry>): Array<TableOfContentsEntry> {
    return entries.flatMap((entry) =>
        // deno-fmt-ignore
        entry.children.length > 0
            ? [ entry, ...getAllEntries(entry.children) ]
            : [ entry ]
    );
}

function buildNode(entry: TableOfContentsEntry): RenderableNode | null {
    return entry
        ? {
            pathID: entry.pathID,
            url: entry.url,
        }
        : null;
}
