import { Language } from './language.ts';
import { TableOfContentsEntry } from './table-of-contents-entry.ts';

export interface TableOfContentsType {
    readonly language: Language;
    readonly prologue: TableOfContentsEntry;
    readonly parts: Array<TableOfContentsEntry>;
}
