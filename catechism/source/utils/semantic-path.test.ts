import { assertStrictEquals } from '$std/assert';

import { buildSemanticPath, getSemanticPathSource } from './semantic-path.ts';
import { Article, Chapter, Content, ContentBase, Language, ParagraphGroup, Part, Prologue, Section } from '../types/types.ts';

//#region tests
console.log('\nsemantic paths ...');

Deno.test('getSemanticPathSource(): content with number properties', () => {
    const testCases = [
        [Content.PART, 'partNumber'],
        [Content.SECTION, 'sectionNumber'],
        [Content.CHAPTER, 'chapterNumber'],
        [Content.ARTICLE, 'articleNumber'],
        [Content.ARTICLE_PARAGRAPH, 'articleParagraphNumber'],
        [Content.SUB_ARTICLE, 'subarticleNumber'],
        [Content.PARAGRAPH_GROUP, 'paragraphGroupNumber'],
        [Content.PARAGRAPH, 'paragraphNumber'],
    ];

    testCases.forEach(([contentType, numberProperty]) => {
        const num = randomInt();
        const o: unknown = {
            contentType,
            [numberProperty]: num,
        };

        const result = getSemanticPathSource(o as ContentBase, false);
        assertStrictEquals(
            result.content,
            contentType,
            `${contentType} contentType mismatch: ${result.content}`,
        );
        assertStrictEquals(
            result.number,
            num,
            `${contentType} number mismatch: received ${result.number} instead of ${num}`,
        );
    });
});

Deno.test('getSemanticPathSource(): Prologue', () => {
    const prologue = buildPrologue();
    const result = getSemanticPathSource(prologue, false);
    assertStrictEquals(result.content, Content.PROLOGUE);
    assertStrictEquals(result.number, null);
});

Deno.test('getSemanticPathSource(): other content without number properties', () => {
    const testCases = [
        Content.BLOCK_QUOTE,
        Content.CHAPTER_SECTION,
        Content.GENERIC_CONTENT_CONTAINER,
        Content.IN_BRIEF,
        Content.PARAGRAPH_SUB_ITEM,
        Content.PARAGRAPH_SUB_ITEM_CONTAINER,
        Content.TEXT,
        Content.TEXT_BLOCK,
        Content.TEXT_HEADING,
        Content.TEXT_WRAPPER,
    ];

    testCases.forEach((contentType) => {
        const leafPathID = 13;
        const expectedSemanticPathNumber = leafPathID + 1;

        const o: unknown = { contentType, pathID: `1__m.17__f.${leafPathID}` };
        const result = getSemanticPathSource(o as ContentBase, false);

        assertStrictEquals(
            result.content,
            contentType,
            `${contentType} contentType mismatch: ${result.content}`,
        );
        assertStrictEquals(
            result.number,
            expectedSemanticPathNumber,
            `${contentType} number mismatch: received ${result.number} instead of ${expectedSemanticPathNumber}`,
        );
    });
});

Deno.test('buildSemanticPath(): no ancestors', () => {
    const part = buildPart(2);
    const source = getSemanticPathSource(part, false);
    const result = buildSemanticPath(Language.ENGLISH, source, []);
    assertStrictEquals(result, 'part-2');
});

Deno.test('buildSemanticPath(): single ancestor', () => {
    const part = buildPart(3);
    const section = buildSection(5);

    const child = getSemanticPathSource(section, false);
    const ancestors = [
        getSemanticPathSource(part, false),
    ];

    const result = buildSemanticPath(Language.ENGLISH, child, ancestors);
    assertStrictEquals(result, 'part-3/section-5');
});

Deno.test('buildSemanticPath(): multiple ancestors', () => {
    const part = buildPart(3);
    const section = buildSection(5);
    const chapter = buildChapter(4);
    const article = buildArticle(8);

    const child = getSemanticPathSource(article, false);
    const ancestors = [
        getSemanticPathSource(part, false),
        getSemanticPathSource(section, false),
        getSemanticPathSource(chapter, false),
    ];

    const result = buildSemanticPath(Language.ENGLISH, child, ancestors);
    assertStrictEquals(result, 'part-3/section-5/chapter-4/article-8');
});

Deno.test('buildSemanticPath(): final content', () => {
    const part = buildPart(3);
    const section = buildSection(5);
    const chapter = buildChapter(4);
    const article = buildArticle(8);
    const paragraphGroup = buildParagraphGroup(1);

    const child = getSemanticPathSource(paragraphGroup, true);
    const ancestors = [
        getSemanticPathSource(part, false),
        getSemanticPathSource(section, false),
        getSemanticPathSource(chapter, false),
        getSemanticPathSource(article, false),
    ];

    const result = buildSemanticPath(Language.ENGLISH, child, ancestors);
    assertStrictEquals(result, 'part-3/section-5/chapter-4/article-8/final-content');
});
//#endregion

//#region helpers
function randomInt(): number {
    return Math.floor(Math.random() * 100) + 1;
}

function buildPrologue(): Prologue {
    return {
        contentType: Content.PROLOGUE,
        pathID: '1',
        semanticPath: '',
        title: 'title',
        openingContent: [],
        mainContent: [],
        finalContent: [],
    };
}

function buildPart(partNumber: number): Part {
    return {
        contentType: Content.PART,
        pathID: '1',
        semanticPath: '',
        partNumber,
        title: 'title',
        openingContent: [],
        mainContent: [],
        finalContent: [],
        creed: null,
        tenCommandments: null,
    };
}

function buildSection(sectionNumber: number): Section {
    return {
        contentType: Content.SECTION,
        pathID: '1',
        semanticPath: '',
        sectionNumber,
        title: 'title',
        openingContent: [],
        mainContent: [],
        finalContent: [],
        inBrief: null,
    };
}

function buildChapter(chapterNumber: number): Chapter {
    return {
        contentType: Content.CHAPTER,
        pathID: '1',
        semanticPath: '',
        chapterNumber,
        title: 'title',
        openingContent: [],
        mainContent: [],
        finalContent: [],
        inBrief: null,
    };
}

function buildArticle(articleNumber: number): Article {
    return {
        contentType: Content.ARTICLE,
        pathID: '1',
        semanticPath: '',
        articleNumber,
        title: 'title',
        openingContent: [],
        mainContent: [],
        finalContent: [],
        inBrief: null,
    };
}

function buildParagraphGroup(paragraphGroupNumber: number): ParagraphGroup {
    return {
        contentType: Content.PARAGRAPH_GROUP,
        pathID: '1',
        semanticPath: '',
        paragraphGroupNumber,
        title: 'title',
        openingContent: [],
        mainContent: [],
        finalContent: [],
        paragraphReferences: [],
    };
}
//#endregion
