import { getParagraphNumber } from './routing.ts';
import { ElementID } from './ui.ts';

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

export function respondToNavigationEvent(): void {
    updateLanguageSwitcher();

    /*
    Scroll to the paragraph number at the end of the URL when the page
    is initially loaded (not on a refresh or back/forward navigation event)
    */
    const event = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const initialLoad = 'navigate' === event?.type;
    if (initialLoad) {
        const paragraphNumber = getParagraphNumber(document.location.href);
        if (paragraphNumber) {
            document.getElementById(paragraphNumber + '')?.scrollIntoView();
        }
    }
}

/**
 * This responds to DOM changes, including those made by HTMX,
 * which users may find indistinguishable from actual navigation changes
 */
export function watchForDomChanges(): void {
    const body = document.querySelector('body');

    if (body) {
        const observer = createDomChangeObserver();
        observer.observe(body, { childList: true, subtree: true });
    }
}

function createDomChangeObserver(): MutationObserver {
    let previousHref = document.location.href;

    return new MutationObserver(() => {
        const urlChanged = document.location.href !== previousHref;
        const hash = document.location.hash;

        /*
            During a URL change from an HTMX invocation, auto-scroll to the anchor tag specified
            by the URL hash, or the start of the page's content, if there is no URL hash
        */
        if (urlChanged) {
            if (hash) {
                document.getElementById(hash.slice(1))?.scrollIntoView();
            } else {
                document.getElementById(ElementID.CATECHISM_CONTENT_WRAPPER)?.scrollIntoView();
            }
        }

        if (hash) {
            updateLanguageSwitcher(hash);
        }

        previousHref = document.location.href;
    });
}

/**
 * The language switcher's navigation links are statically generated, and thus don't have access to the
 * current URL's `hash` value, so this function dynamically adds the hash value to the links' `href` value.
 */
function updateLanguageSwitcher(hash?: string): void {
    hash = hash || document.location.hash;

    if (hash) {
        const languageSwitcher = document.getElementById(ElementID.LANGUAGE_SWITCHER_WRAPPER);
        if (languageSwitcher) {
            const languageSwitcherLinks = languageSwitcher.getElementsByTagName('a');
            const links = Array.from(languageSwitcherLinks);

            for (const link of links) {
                link.setAttribute('href', link.getAttribute('href') + hash);
            }
        }
    }
}
