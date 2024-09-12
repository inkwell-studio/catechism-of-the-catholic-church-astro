import { assertEquals, assertStrictEquals } from '$std/assert';

import { DEFAULT_LANGUAGE } from '../source/types/types.ts';
import { getPathIdLanguageUrlMap, getTableOfContents } from '../source/utils/artifacts.ts';
import { getSupportedLanguages } from '../source/utils/language.ts';
import { getAllEntries } from '../source/utils/table-of-contents.ts';

console.log('\nPathID to Language to URL map ...');
const urlMap = await getPathIdLanguageUrlMap();
const tableOfContents = await getTableOfContents(DEFAULT_LANGUAGE);

Deno.test('all entries have a submap with every language populated', () => {
    const allLanguages = getSupportedLanguages().map(([_languageKey, language]) => language).sort();

    for (const [pathID, submap] of Object.entries(urlMap)) {
        const languages = Object.keys(submap).sort();
        assertEquals(languages, allLanguages, `missing or extra mappings for PathID ${pathID}`);

        const urls = Object.values(submap);

        const numUrls = urls.length;
        const numUniqueUrls = new Set(urls).size;

        assertStrictEquals(numUrls, numUniqueUrls, `${numUrls - numUniqueUrls} duplicate URLs exist for PathID ${pathID}`);
    }
});

Deno.test('every PathID in the table of contents is accounted for', () => {
    const tocPathIDs = getAllEntries(tableOfContents).map((e) => e.pathID).sort();
    const pathIDs = Object.keys(urlMap).sort();

    assertEquals(pathIDs, tocPathIDs);
});
