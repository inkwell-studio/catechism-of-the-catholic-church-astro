import { ReferenceBase } from './reference-base.ts';
import { ReferenceEnum } from './reference-enum.ts';

export interface ParagraphReference extends ReferenceBase {
    readonly referenceType: ReferenceEnum.CATECHISM_PARAGRAPH;
    readonly paragraphNumber: number;
}
