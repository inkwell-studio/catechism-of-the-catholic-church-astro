import { assertExists, assertStrictEquals } from '$std/assert';

import { Element, getElementAndPathID, getUrl } from './routing.ts';
import { Language, SemanticPath } from '@catechism/source/types/types.ts';

console.log('\nrouting utils (server) ...');

//#region getUrl()
function urlTest(semanticPath: SemanticPath, expectedUrl: string): void {
    const url = getUrl(Language.ENGLISH, semanticPath);
    assertStrictEquals(url, expectedUrl);
}

Deno.test('getUrl(): high-level content', () => {
    [
        [
            'prologue',
            '/en/prologue',
        ],
        [
            'part-1',
            '/en/part-1',
        ],
        [
            'part-1/section-3',
            '/en/part-1/section-3',
        ],
        [
            'part-1/section-3/chapter-2',
            '/en/part-1/section-3/chapter-2',
        ],
        [
            'part-1/section-3/chapter-2/article-4',
            '/en/part-1/section-3/chapter-2/article-4',
        ],
    ].forEach((testCase) => urlTest(testCase[0], testCase[1]));
});

Deno.test('getUrl(): the first Article Paragraphs', () => {
    urlTest(
        'part-1/section-3/chapter-2/article-4/article-paragraph-1',
        '/en/part-1/section-3/chapter-2/article-4#article-paragraph-1',
    );
});

Deno.test('getUrl(): the subsequent Article Paragraphs', () => {
    urlTest(
        'part-1/section-3/chapter-2/article-4/article-paragraph-7',
        '/en/part-1/section-3/chapter-2/article-4/article-paragraph-7',
    );
});

Deno.test('getUrl(): low-level content within a Chapter', () => {
    [
        [
            'part-1/section-3/chapter-2/in-brief',
            '/en/part-1/section-3/chapter-2#in-brief',
        ],
        [
            'part-1/section-3/chapter-2/paragraph-702',
            '/en/part-1/section-3/chapter-2#702',
        ],
        [
            'part-1/section-3/chapter-2/subarticle-5',
            '/en/part-1/section-3/chapter-2#subarticle-5',
        ],
        [
            'part-1/section-3/chapter-2/subarticle-5/paragraph-group-6',
            '/en/part-1/section-3/chapter-2#subarticle-5/paragraph-group-6',
        ],
        [
            'part-1/section-3/chapter-2/subarticle-5/paragraph-group-6/paragraph-702',
            '/en/part-1/section-3/chapter-2#702',
        ],
        [
            'part-1/section-3/chapter-2/subarticle-5/paragraph-702',
            '/en/part-1/section-3/chapter-2#702',
        ],
        [
            'part-1/section-3/chapter-2/paragraph-group-5',
            '/en/part-1/section-3/chapter-2#paragraph-group-5',
        ],
        [
            'part-1/section-3/chapter-2/paragraph-group-5/paragraph-702',
            '/en/part-1/section-3/chapter-2#702',
        ],
        [
            'part-1/section-3/chapter-2/paragraph-702',
            '/en/part-1/section-3/chapter-2#702',
        ],
    ].forEach((testCase) => urlTest(testCase[0], testCase[1]));
});

Deno.test('getUrl(): low-level content within a (Chapter > Article)', () => {
    [
        [
            'part-1/section-3/chapter-2/article-4/in-brief',
            '/en/part-1/section-3/chapter-2/article-4#in-brief',
        ],
        [
            'part-1/section-3/chapter-2/article-4/paragraph-702',
            '/en/part-1/section-3/chapter-2/article-4#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/subarticle-5',
            '/en/part-1/section-3/chapter-2/article-4#subarticle-5',
        ],
        [
            'part-1/section-3/chapter-2/article-4/subarticle-5/paragraph-group-6',
            '/en/part-1/section-3/chapter-2/article-4#subarticle-5/paragraph-group-6',
        ],
        [
            'part-1/section-3/chapter-2/article-4/subarticle-5/paragraph-group-6/paragraph-702',
            '/en/part-1/section-3/chapter-2/article-4#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/subarticle-5/paragraph-702',
            '/en/part-1/section-3/chapter-2/article-4#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/paragraph-group-5',
            '/en/part-1/section-3/chapter-2/article-4#paragraph-group-5',
        ],
        [
            'part-1/section-3/chapter-2/article-4/paragraph-group-5/paragraph-702',
            '/en/part-1/section-3/chapter-2/article-4#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/paragraph-702',
            '/en/part-1/section-3/chapter-2/article-4#702',
        ],
    ].forEach((testCase) => urlTest(testCase[0], testCase[1]));
});

Deno.test('getUrl(): low-level content within a (Section > Article)', () => {
    [
        [
            'part-1/section-3/article-4/in-brief',
            '/en/part-1/section-3/article-4#in-brief',
        ],
        [
            'part-1/section-3/article-4/paragraph-702',
            '/en/part-1/section-3/article-4#702',
        ],
        [
            'part-1/section-3/article-4/subarticle-5',
            '/en/part-1/section-3/article-4#subarticle-5',
        ],
        [
            'part-1/section-3/article-4/subarticle-5/paragraph-group-6',
            '/en/part-1/section-3/article-4#subarticle-5/paragraph-group-6',
        ],
        [
            'part-1/section-3/article-4/subarticle-5/paragraph-group-6/paragraph-702',
            '/en/part-1/section-3/article-4#702',
        ],
        [
            'part-1/section-3/article-4/subarticle-5/paragraph-702',
            '/en/part-1/section-3/article-4#702',
        ],
        [
            'part-1/section-3/article-4/paragraph-group-5',
            '/en/part-1/section-3/article-4#paragraph-group-5',
        ],
        [
            'part-1/section-3/article-4/paragraph-group-5/paragraph-702',
            '/en/part-1/section-3/article-4#702',
        ],
        [
            'part-1/section-3/article-4/paragraph-702',
            '/en/part-1/section-3/article-4#702',
        ],
    ].forEach((testCase) => urlTest(testCase[0], testCase[1]));
});

Deno.test('getUrl(): low-level content within an initial ArticleParagraph', () => {
    [
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/in-brief',
            '/en/part-1/section-3/chapter-2/article-4#article-paragraph-1/in-brief',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/subarticle-5',
            '/en/part-1/section-3/chapter-2/article-4#article-paragraph-1/subarticle-5',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/subarticle-5/paragraph-group-6',
            '/en/part-1/section-3/chapter-2/article-4#article-paragraph-1/subarticle-5/paragraph-group-6',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/subarticle-5/paragraph-group-6/paragraph-702',
            '/en/part-1/section-3/chapter-2/article-4#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/subarticle-5/paragraph-702',
            '/en/part-1/section-3/chapter-2/article-4#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/paragraph-group-5',
            '/en/part-1/section-3/chapter-2/article-4#article-paragraph-1/paragraph-group-5',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/paragraph-group-5/paragraph-702',
            '/en/part-1/section-3/chapter-2/article-4#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-1/paragraph-702',
            '/en/part-1/section-3/chapter-2/article-4#702',
        ],
    ].forEach((testCase) => urlTest(testCase[0], testCase[1]));
});

Deno.test('getUrl(): low-level content within a subsequent ArticleParagraph', () => {
    [
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-7/in-brief',
            '/en/part-1/section-3/chapter-2/article-4/article-paragraph-7#in-brief',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-7/subarticle-5',
            '/en/part-1/section-3/chapter-2/article-4/article-paragraph-7#subarticle-5',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-7/subarticle-5/paragraph-group-6',
            '/en/part-1/section-3/chapter-2/article-4/article-paragraph-7#subarticle-5/paragraph-group-6',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-7/subarticle-5/paragraph-group-6/paragraph-702',
            '/en/part-1/section-3/chapter-2/article-4/article-paragraph-7#702',
        ],
        [
            'part-1/section-3/chapter-2/article-4/article-paragraph-7/subarticle-5/paragraph-702',
            '/en/part-1/section-3/chapter-2/article-4/article-paragraph-7#702',
        ],
    ].forEach((testCase) => urlTest(testCase[0], testCase[1]));
});
//#endregion

//#region getElementAndPathID()
Deno.test('getElementAndPathID(): empty path', () => {
    const result = getElementAndPathID(Language.ENGLISH, '');
    assertExists(result);
    assertStrictEquals(result.element, Element.TABLE_OF_CONTENTS);
    assertStrictEquals(result.pathID, null);
});

Deno.test('getElementAndPathID(): Table of Contents', () => {
    const result = getElementAndPathID(Language.ENGLISH, 'table-of-contents');
    assertExists(result);
    assertStrictEquals(result.element, Element.TABLE_OF_CONTENTS);
    assertStrictEquals(result.pathID, null);
});

Deno.test('getElementAndPathID(): Content', () => {
    const result = getElementAndPathID(Language.ENGLISH, 'prologue');
    assertExists(result);
    assertStrictEquals(result.element, Element.CONTENT);
    assertExists(result.pathID);
});
//#endregion
