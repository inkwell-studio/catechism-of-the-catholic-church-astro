import { getLeafPathIdNumber } from './path-id.ts';
import {
    Article,
    ArticleParagraph,
    Chapter,
    Content,
    ContentBase,
    Language,
    Paragraph,
    ParagraphGroup,
    Part,
    Section,
    SemanticPath,
    SemanticPathSource,
    Subarticle,
} from '../types/types.ts';
import { translate } from '../../../website/src/logic/translation.ts';

/**
 * @param ancestors a list of ancestors of `child`, in descending order (i.e. `ancestors[i]` is the parent of `ancestors[i+1]`)
 */
export function buildSemanticPath(
    language: Language,
    child: SemanticPathSource,
    ancestors: Array<SemanticPathSource>,
): SemanticPath {
    return [...ancestors, child]
        .map((segment) => getSegmentString(language, segment))
        .join('/');
}

export function getSemanticPathSource(content: ContentBase, isFinalContent: boolean): SemanticPathSource {
    return {
        content: content.contentType,
        number: getContentNumber(content),
        isFinalContent,
    };
}

function getContentNumber(content: ContentBase): number | null {
    if (Content.PROLOGUE === content.contentType) {
        return null;
    } else if (Content.PART === content.contentType) {
        return (content as unknown as Part).partNumber;
    } else if (Content.SECTION === content.contentType) {
        return (content as unknown as Section).sectionNumber;
    } else if (Content.CHAPTER === content.contentType) {
        return (content as unknown as Chapter).chapterNumber;
    } else if (Content.ARTICLE === content.contentType) {
        return (content as unknown as Article).articleNumber;
    } else if (Content.ARTICLE_PARAGRAPH === content.contentType) {
        return (content as unknown as ArticleParagraph).articleParagraphNumber;
    } else if (Content.SUB_ARTICLE === content.contentType) {
        return (content as unknown as Subarticle).subarticleNumber;
    } else if (Content.PARAGRAPH_GROUP === content.contentType) {
        return (content as unknown as ParagraphGroup).paragraphGroupNumber;
    } else if (Content.PARAGRAPH === content.contentType) {
        return (content as unknown as Paragraph).paragraphNumber;
    } else {
        const leafPathIdNumber = getLeafPathIdNumber(content.pathID);
        if ('i' === leafPathIdNumber) {
            return null;
        } else if (isNaN(leafPathIdNumber)) {
            throw new Error(
                `A SemanticPath.number value could not be determined for ${content.contentType} ${content.pathID}`,
            );
        } else {
            return leafPathIdNumber + 1;
        }
    }
}

function getSegmentString(language: Language, segment: SemanticPathSource): string {
    if (segment.isFinalContent) {
        return translate('final-content', language);
    } else {
        const words = getSegmentContentString(language, segment.content);
        if (null !== segment.number) {
            return words + `-${segment.number}`;
        } else {
            return words;
        }
    }
}

function getSegmentContentString(language: Language, contentType: Content): string {
    switch (contentType) {
        case Content.PROLOGUE:
            return translate('prologue', language);
        case Content.PART:
            return translate('part', language);
        case Content.SECTION:
            return translate('section', language);
        case Content.CHAPTER:
            return translate('chapter', language);
        case Content.CHAPTER_SECTION:
            return translate('chapter-section', language);
        case Content.ARTICLE:
            return translate('article', language);
        case Content.ARTICLE_PARAGRAPH:
            return translate('article-paragraph', language);
        case Content.SUB_ARTICLE:
            return translate('subarticle', language);
        case Content.IN_BRIEF:
            return translate('in-brief', language);
        case Content.PARAGRAPH_GROUP:
            return translate('paragraph-group', language);
        case Content.GENERIC_CONTENT_CONTAINER:
            return translate('generic-content-container', language);
        case Content.BLOCK_QUOTE:
            return translate('block-quote', language);
        case Content.PARAGRAPH:
            return translate('paragraph', language);
        case Content.PARAGRAPH_SUB_ITEM_CONTAINER:
            return translate('paragraph-sub-item-container', language);
        case Content.PARAGRAPH_SUB_ITEM:
            return translate('paragraph-sub-item', language);
        case Content.TEXT_BLOCK:
            return translate('text-block', language);
        case Content.TEXT_HEADING:
            return translate('text-heading', language);
        case Content.TEXT_WRAPPER:
            return translate('text-wrapper', language);
        case Content.TEXT:
            return translate('text', language);
        case Content.CREED:
            return translate('creed', language);
        case Content.TEN_COMMANDMENTS:
            return translate('ten-commandments', language);
    }
}
