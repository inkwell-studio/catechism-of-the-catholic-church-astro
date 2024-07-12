import { Language } from './language.ts';
import { Part } from './part.ts';
import { Prologue } from './prologue.ts';

export interface CatechismStructure {
    readonly language: Language;
    readonly prologue: Prologue;
    readonly parts: Array<Part>;
}
