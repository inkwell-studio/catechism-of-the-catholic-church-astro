import { TableOfContentsEntry, TableOfContentsType } from '../types/types.ts';

export function getTopLevelEntries(tableOfContents: TableOfContentsType): Array<TableOfContentsEntry> {
    return getAllEntries([tableOfContents.prologue, ...tableOfContents.parts]).filter((entry) => !entry.url.includes('#'));
}

export function getTopLevelUrls(tableOfContents: TableOfContentsType): Array<string> {
    return getTopLevelEntries(tableOfContents as TableOfContentsType).map((entry) => entry.url);
}

function getAllEntries(entries: Array<TableOfContentsEntry>): Array<TableOfContentsEntry> {
    return entries.flatMap((entry) =>
        // deno-fmt-ignore
        entry.children.length > 0
            ? [ entry, ...getAllEntries(entry.children) ]
            : [ entry ]
    );
}
