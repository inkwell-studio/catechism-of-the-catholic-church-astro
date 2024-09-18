import { getLeafPathIdNumber } from './path-id.ts';
import { Content, ContentBase, Language, SemanticPath, SemanticPathSource } from '../types/types.ts';
import {
    isArticle,
    isArticleParagraph,
    isChapter,
    isParagraph,
    isParagraphGroup,
    isPart,
    isPrologue,
    isSection,
    isSubarticle,
} from '../utils/content.ts';
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
    // deno-fmt-ignore
    if (isPrologue(content)) {
        return null;

    } else if (isPart(content)) {
        return content.partNumber;

    } else if (isSection(content)) {
        return content.sectionNumber;

    } else if (isChapter(content)) {
        return content.chapterNumber;

    } else if (isArticle(content)) {
        return content.articleNumber;

    } else if (isArticleParagraph(content)) {
        return content.articleParagraphNumber;

    } else if (isSubarticle(content)) {
        return content.subarticleNumber;

    } else if (isParagraphGroup(content)) {
        return content.paragraphGroupNumber;

    } else if (isParagraph(content)) {
        return content.paragraphNumber;

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
    // `switch` is used here to ensure that every content type is handled
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
