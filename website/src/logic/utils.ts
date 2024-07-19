import { Language } from '@catechism/source/types/types.ts';
import { getLanguage } from '@catechism/source/utils/language.ts';

export const IS_BROWSER = !!globalThis.window;

export function getLanguageFromPathname(pathname: string): Language | null {
    // Look for `/en/`, where the last slash is optional
    const firstSegment = /(\/)([a-zA-Z]*)(\/?)/.exec(pathname)?.[2] ?? '';
    return getLanguage(firstSegment);
}
