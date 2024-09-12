import { TableOfContentsEntry, TableOfContentsType } from '../types/types.ts';

export function getTopLevelEntries(tableOfContents: TableOfContentsType): Array<TableOfContentsEntry> {
    return getAllEntries(tableOfContents).filter((entry) => !entry.url.includes('#'));
}

export function getTopLevelUrls(tableOfContents: TableOfContentsType): Array<string> {
    return getTopLevelEntries(tableOfContents as TableOfContentsType).map((entry) => entry.url);
}

export function getAllEntries(tableOfContents: TableOfContentsType): Array<TableOfContentsEntry> {
    return getAllEntriesHelper([tableOfContents.prologue, ...tableOfContents.parts]);
}

function getAllEntriesHelper(entries: Array<TableOfContentsEntry>): Array<TableOfContentsEntry> {
    return entries.flatMap((entry) =>
        // deno-fmt-ignore
        entry.children.length > 0
            ? [ entry, ...getAllEntriesHelper(entry.children) ]
            : [ entry ]
    );
}
