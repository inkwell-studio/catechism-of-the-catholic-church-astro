import { TableOfContentsEntry } from './table-of-contents-entry.ts';

export interface TableOfContentsType {
    readonly prologue: TableOfContentsEntry;
    readonly parts: Array<TableOfContentsEntry>;
}
