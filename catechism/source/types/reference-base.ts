import { ReferenceEnum } from './reference-enum.ts';

export interface ReferenceBase {
    readonly referenceType: ReferenceEnum.BIBLE | ReferenceEnum.CATECHISM_PARAGRAPH | ReferenceEnum.OTHER;
    readonly direct: boolean;
    // Meaning "and the following pages" (often abbreviated as "ff.")
    readonly folio: boolean;
}
