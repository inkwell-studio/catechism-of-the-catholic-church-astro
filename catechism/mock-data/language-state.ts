import { Language } from '../source/types/types.ts';

let languageState = Language.ENGLISH;

export function getLanguage(): Language {
    return languageState;
}

export function setLanguage(language: Language): void {
    languageState = language;
}
