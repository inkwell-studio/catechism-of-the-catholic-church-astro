import { Language } from '../types/types.ts';

export function getLanguage(language: string): Language | null {
    return language
        ? getSupportedLanguages()
            .find(([_key, value]) => language === value)
            ?.at(1) as Language ?? null
        : null;
}

export function getSupportedLanguages(): Array<[string, Language]> {
    return Object.entries(Language).map(([key, language]) => [
        // Change "ENGLISH" to "English"
        key[0] + key.slice(1).toLowerCase(),
        language,
    ]);
}

export function getAllLanguages(): Array<[string, string]> {
    return [
        ['ar', 'Arabic'],
        ['zh', 'Traditional Chinese'],
        ['en', 'English'],
        ['fr', 'French'],
        ['de', 'German'],
        ['it', 'Italian'],
        ['la', 'Latin'],
        ['mg', 'Malagasy'],
        ['pt', 'Portuguese'],
        ['es', 'Spanish'],
    ];
}

/**
 * The value of the returned `language` property will be set if `languageParam` is a valid and supported language code.
 * The value of the returned `valid` property will be `true` if `languageParam` is a valid language code.
 * The value of the returned `supported` property will be `true` if `languageParam` is a valid and supported language code.
 */
export function getLanguageInfo(languageParam = ''): { language: Language | null; valid: boolean; supported: boolean } {
    const language = getLanguage(languageParam);
    if (language) {
        return { language, valid: true, supported: true };
    } else {
        const valid = isValidAndUnsupported(languageParam);
        return {
            language: null,
            valid,
            supported: false,
        };
    }
}

export function getNativeLanguageText(languageCode: string): string {
    switch (languageCode) {
        case Language.ENGLISH:
            return 'English';
        case Language.LATIN:
            return 'Latinus';
        case Language.SPANISH:
            return 'Español';
        case 'ar':
            return 'عربي';
        case 'zh':
            return '中文';
        case 'fr':
            return 'Français';
        case 'de':
            return 'Deutsch';
        case 'it':
            return 'Italiano';
        case 'mg':
            return 'Malagasy';
        case 'pt':
            return 'Português';
        default:
            return '';
    }
}

/**
 * @returns `true` if the given language is valid but not supported
 */
function isValidAndUnsupported(languageCode: string): boolean {
    const match = getLanguage(languageCode);
    if (match) {
        return false;
    } else {
        return getAllLanguages()
            .map((language) => language[0])
            .includes(languageCode);
    }
}
