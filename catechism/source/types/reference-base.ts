import { ReferenceEnum } from './reference-enum.ts';

export interface ReferenceBase {
    readonly referenceType: ReferenceEnum.BIBLE | ReferenceEnum.OTHER;
    readonly direct: boolean;
}
