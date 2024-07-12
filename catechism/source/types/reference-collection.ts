import { Reference } from './reference.ts';

export interface ReferenceCollection {
    readonly referenceNumber: number;
    readonly references: Array<Reference>;
}
