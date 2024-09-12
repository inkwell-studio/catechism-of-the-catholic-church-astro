import { getContentTitle } from './utils.ts';
import {
    CatechismStructure,
    Content,
    ContentBase,
    ContentContainer,
    Language,
    SemanticPathSource,
    TableOfContentsEntry,
    TableOfContentsType,
} from '../source/types/types.ts';
import { getFinalContent, getInBrief, getMainContent, getParagraphs } from '../source/utils/content.ts';
import { buildSemanticPath, getSemanticPathSource } from '../source/utils/semantic-path.ts';
import { getUrl } from '../../website/src/logic/routing.ts';

//#region builders
export function build(catechism: CatechismStructure): TableOfContentsType {
    return {
        language: catechism.language,
        prologue: buildEntry(catechism.language, catechism.prologue, [], { forceIncludeChildren: true }),
        parts: catechism.parts.map((part) => buildEntry(catechism.language, part, [])),
    };
}

function buildEntry(
    language: Language,
    content: ContentBase | ContentContainer,
    ancestors: Array<SemanticPathSource>,
    flags?: {
        finalContent?: boolean;
        forceIncludeChildren?: boolean;
    },
): TableOfContentsEntry {
    const { firstParagraphNumber, lastParagraphNumber } = getTerminalParagraphNumbers(content);

    const isFinalContent = !!flags?.finalContent;

    const semanticPathSource = getSemanticPathSource(content, isFinalContent);
    const semanticPath = buildSemanticPath(language, semanticPathSource, ancestors);
    const children = isFinalContent
        ? []
        : buildChildEntries(language, content, [...ancestors, semanticPathSource], !!flags?.forceIncludeChildren);

    return {
        contentType: content.contentType,
        title: getTitle(language, content, isFinalContent),
        pathID: content.pathID,
        semanticPath,
        url: getUrl(language, semanticPath),
        firstParagraphNumber,
        lastParagraphNumber,
        children,
    };
}

function buildChildEntries(
    language: Language,
    parent: ContentBase | ContentContainer,
    ancestors: Array<SemanticPathSource>,
    forceIncludeChildren: boolean,
): Array<TableOfContentsEntry> {
    const childEntries = getMainContent(parent)
        .filter((child) => forceIncludeChildren || shouldGenerateChildEntry(parent, child))
        .map((child) => buildEntry(language, child, ancestors));

    const inBrief = getInBrief(parent);
    if (inBrief) {
        childEntries.push(buildEntry(language, inBrief, ancestors));
    }

    const finalContent = getFinalContent(parent);
    if (finalContent.length > 0) {
        childEntries.push(buildEntry(language, finalContent[0], ancestors, { finalContent: true }));
    }

    return childEntries;
}
//#endregion

//#region helpers
/**
 * @returns `true` if a table-of-contents entry should be generated for the provided parent-child pairing, and `false` otherwise
 */
function shouldGenerateChildEntry(parent: ContentBase, child: ContentBase): boolean {
    // A list of [parent, child] pairings that will trigger the generation of a table-of-contents entry for the child
    return [
        [Content.PART, Content.SECTION],
        [Content.SECTION, Content.CHAPTER],
        [Content.SECTION, Content.ARTICLE],
        [Content.CHAPTER, Content.ARTICLE],
        [Content.CHAPTER, Content.SUB_ARTICLE],
        [Content.ARTICLE, Content.ARTICLE_PARAGRAPH],
        [Content.ARTICLE, Content.SUB_ARTICLE],
    ].some((validPairing) => parent.contentType === validPairing[0] && child.contentType === validPairing[1]);
}

function getTitle(language: Language, content: ContentBase, isFinalContent: boolean): string {
    const number = getSemanticPathSource(content, isFinalContent).number;
    const numberSuffix = number ? ` ${number}` : '';

    const contentTitle = getContentTitle(language, content.contentType);
    if (!contentTitle) {
        throw new Error(`Unprepared to generate a title: ${language}, ${content.contentType}`);
    }

    return contentTitle + numberSuffix;
}

/**
 * @returns the first and last `paragraphNumber` values of all the `Paragraph`s contained by the provided content
 */
function getTerminalParagraphNumbers(
    content: ContentBase,
): { firstParagraphNumber: number; lastParagraphNumber: number } {
    const paragraphs = getParagraphs([content]);
    const firstParagraphNumber = paragraphs.at(0)?.paragraphNumber ?? null;
    const lastParagraphNumber = paragraphs.at(-1)?.paragraphNumber ?? null;

    if (firstParagraphNumber === null || lastParagraphNumber === null) {
        throw new Error(
            `A terminal paragraph could not be found for the given content: ${content.contentType}, pathID: ${content.pathID}. ` +
                `Terminal paragraph numbers: ${firstParagraphNumber}, ${lastParagraphNumber}`,
        );
    }

    return { firstParagraphNumber, lastParagraphNumber };
}
//#endregion
