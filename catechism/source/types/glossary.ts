import { ReferenceBase } from '@catechism/source/types/reference-base.ts';
import { TextSimple } from './text-simple.ts';

export type Glossary = Array<GlossaryEntry>;

export interface GlossaryEntry {
    readonly term: string;
    readonly content: Array<TextSimple | ReferenceBase>;
    readonly seeAlso: Array<string>;
}
