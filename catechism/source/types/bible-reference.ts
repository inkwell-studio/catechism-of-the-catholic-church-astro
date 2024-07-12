import { BibleBook } from './bible-book.ts';
import { NumberOrNumberRange } from './number-or-number-range.ts';
import { ReferenceBase } from './reference-base.ts';
import { ReferenceEnum } from './reference-enum.ts';

export interface BibleReference extends ReferenceBase {
    readonly referenceType: ReferenceEnum.BIBLE;
    readonly direct: boolean;
    readonly book: BibleBook;
    readonly chapter: number;
    // A number designates a single verse; a string like `3-10` designates a range of verses
    readonly verses: NumberOrNumberRange;
    readonly auxillaryText: string | null;
}
