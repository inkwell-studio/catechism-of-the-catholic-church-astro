import { getSupportedLanguages } from '@catechism/source/utils/language.ts';
import { Language } from '@catechism/source/types/types.ts';

import { ElementID } from './element-id.ts';
import { getParagraphNumber } from './routing.ts';

export const IS_BROWSER = !!globalThis.window;

/**
 * @returns a new path constructed constructed from the segments.
 * Doubled slashes are de-duplicated, and the returned value never ends with a slash.
 */
export function path(...segments: Array<string | number>): string {
    // Change all numbers to strings
    segments = segments.map((s) => '' + s);

    return [...segments, '/'].join('/')
        // De-duplicate slashes
        .replaceAll(/\/{2,}/g, '/')
        // Remove any slash that precedes the hash
        .replace(/\/+#/, '#')
        // Remove the trailing slash
        .replace(/\/+$/, '');
}

/**
 * @returns the language tag from the start of the given path, or `null` if no language tag is present at the start
 */
export function getLanguageTag(path: string): Language | null {
    for (const [_key, language] of getSupportedLanguages()) {
        const regex = new RegExp(`(^|\/)?${language}(?=\/|$)`);
        const matches = path.match(regex);

        if (matches?.[0]) {
            return matches?.[0].replaceAll('/', '') as Language;
        }
    }

    return null;
}

/**
 * @returns the given `path` without the language segment `zz/`, if such a language segment exists.
 * It assumes that the language segment will either be the first segment or absent.
 * `path` may or may not start with a slash (`/`).
 */
export function removeLanguageTag(path: string, language: Language): string {
    const regex = new RegExp('^/?' + language + '(\/|$)');

    const containsLanguageTag = regex.test(path);
    if (containsLanguageTag) {
        path = path.replace(language, '');
        if (path.length > 1) {
            path = path.slice(1);
        }
    }

    return path;
}

export function autoScroll(): void {
    autoScrollToParagraphNumberInUrl(document.location.href);

    let previousHref = document.location.href;
    const body = document.querySelector('body');

    /*
    During a page refresh or URL change from an HTMX invocation, this auto-scrolls to:
     - the anchor tag specified by the URL hash (except during a page refresh)
     - the paragraph at the end of the URL (e.g. `.../123`)
     - the start of the page's content, if no URL doesn't have a hash or end with a paragraph number
    */
    const observer = new MutationObserver(() => {
        const hash = document.location.hash.replaceAll('/', '');
        const newHref = document.location.href;

        if (hash && newHref !== previousHref) {
            document.getElementById(hash.slice(1))?.scrollIntoView();
        } else if (newHref !== previousHref) {
            document.getElementById(ElementID.CATECHISM_CONTENT)?.scrollIntoView();
        }

        if (newHref !== previousHref) {
            previousHref = newHref;
        }
    });

    if (body) {
        observer.observe(body, { childList: true, subtree: true });
    }
}

/**
 * Auto-scroll to the paragraph number at the end of the URL when the page is initially loaded (not on a refresh or back/forward navigation)
 */
function autoScrollToParagraphNumberInUrl(url: string): void {
    const event = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const initialLoad = 'navigate' === event?.type;

    if (initialLoad) {
        const paragraphNumber = getParagraphNumber(url);
        if (paragraphNumber) {
            document.getElementById(paragraphNumber + '')?.scrollIntoView();
        }
    }
}
