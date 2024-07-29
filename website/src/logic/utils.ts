import { Language } from '@catechism/source/types/types.ts';

export const IS_BROWSER = !!globalThis.window;

/**
 * @returns a new path constructed constructed from the segments.
 * Doubled slashes are de-duplicated, and the returned value always ends with a slash.
 */
export function path(...segments: Array<string>): string {
    return [...segments, '/'].join('/').replaceAll(/\/{2,}/g, '/');
}

/**
 * @returns the given `path` without the language segment `zz/`, if such a language segment exists.
 * It assumes that the language segment will either be the first segment or absent.
 * `path` may or may not start with a slash (`/`).
 */
export function removeLanguageTag(path: string, language: Language): string {
    const regex = new RegExp('^/?' + language + '/');

    const containsLanguageTag = regex.test(path);
    if (containsLanguageTag) {
        return path.replace(`${language}/`, '/').slice(1);
    }

    return path;
}
