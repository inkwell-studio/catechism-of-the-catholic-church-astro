import { DEFAULT_LANGUAGE, Language } from '../../source/types/types.ts';

let languageState = DEFAULT_LANGUAGE;

export function getLanguage(): Language {
    return languageState;
}

export function setLanguage(language: Language): void {
    languageState = language;
}
