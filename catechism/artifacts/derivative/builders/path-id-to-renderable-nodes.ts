import { RenderableNode, RenderableNodeMap, TableOfContentsEntry, TableOfContentsType } from '../../../source/types/types.ts';
import { getTopLevelEntries } from '../../../source/utils/table-of-contents.ts';

export function build(tableOfContents: TableOfContentsType): RenderableNodeMap {
    const map: RenderableNodeMap = {};

    const topLevelEntries = getTopLevelEntries(tableOfContents);

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

function buildNode(entry: TableOfContentsEntry): RenderableNode | null {
    return entry
        ? {
            pathID: entry.pathID,
            url: entry.url,
        }
        : null;
}
