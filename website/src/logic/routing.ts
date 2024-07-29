import ParagraphUrlMapEnglish from '@catechism/artifacts/paragraph-number_to_url-en.json' with { type: 'json' };
import ParagraphUrlMapLatin from '@catechism/artifacts/paragraph-number_to_url-la.json' with { type: 'json' };
import ParagraphUrlMapSpanish from '@catechism/artifacts/paragraph-number_to_url-es.json' with { type: 'json' };

import { DEFAULT_LANGUAGE, Language, ParagraphNumberUrlMap, PathID, SemanticPath } from '@catechism/source/types/types.ts';
import { getLanguage } from '@catechism/source/utils/language.ts';

import { getPathMap } from './artifacts.ts';
import { translate } from './translation.ts';

const paragraphUrlMaps = {
    [Language.ENGLISH]: ParagraphUrlMapEnglish,
    [Language.LATIN]: ParagraphUrlMapLatin,
    [Language.SPANISH]: ParagraphUrlMapSpanish,
} as const;

export enum Element {
    TABLE_OF_CONTENTS = 'TABLE_OF_CONTENTS',
    CONTENT = 'CONTENT',
    GLOSSARY = 'GLOSSARY',
    INDEX = 'INDEX',
}

/**
 * @returns the renderable `PathID` corresponding to the given value, or `null` if no such `PathID` exists
 */
export function getRenderablePathID(language: Language, semanticPath: SemanticPath): PathID | null {
    return getPathMap(language)[semanticPath] ?? null;
}

/**
 * @returns the URL for viewing the content at the given path
 */
export function getUrl(language: Language, semanticPath: SemanticPath): string {
    const fragmentInfo = getUrlFragment(semanticPath, true, language);

    if (fragmentInfo.portionToReplace) {
        return '/' + semanticPath.replace(`/${fragmentInfo.portionToReplace}`, `#${fragmentInfo.fragment}`);
    } else {
        return '/' + semanticPath;
    }
}

/**
 * @returns the URL fragment (i.e. that which comes after '#') for the content at the given path, or `undefined` if no fragment is necessary
 */
export function getUrlFragment(
    semanticPath: SemanticPath,
    acknowledgeFinalContent: boolean,
    language: Language,
): {
    portionToReplace: string | undefined;
    fragment: string | undefined;
} {
    const { isParagraph, paragraphNumber } = isParagraphSemanticPath(semanticPath, language);

    const highLevelFragment = getHighLevelUrlFragment(semanticPath, language);
    if (highLevelFragment) {
        const fragment = isParagraph ? `${paragraphNumber}` : highLevelFragment;
        return {
            portionToReplace: highLevelFragment,
            fragment,
        };
    } else {
        const portionToReplace = getLowLevelUrlFragment(semanticPath, acknowledgeFinalContent, language);
        const fragment = isParagraph ? `${paragraphNumber}` : portionToReplace;

        return {
            portionToReplace,
            fragment,
        };
    }
}

export function getLanguageFromPathname(pathname: string): Language | null {
    // Look for `/en/`, where the slashes are optional
    const firstSegment = /(^|\/)([a-z]+)(\/?)/.exec(pathname)?.[2] ?? '';
    return getLanguage(firstSegment);
}

export function getParagraphNumberRedirectionUrl(url: URL): string | null {
    const paragraphNumber = getParagraphNumber(url.pathname);

    if (paragraphNumber) {
        const language = getLanguageFromPathname(url.pathname) ?? DEFAULT_LANGUAGE;
        const newPathname = getParagraphUrlMap(language)[paragraphNumber] ?? null;

        if (newPathname) {
            return new URL(newPathname, url.origin).href;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

/**
 * @returns the paragraph number from the given URL pathname, or `null` if the given URL pathname contains no paragraph number
 */
export function getParagraphNumber(urlPathname: string): number | null {
    // Look for a series of digits at the end of the string that either begin at the start of the string or follow a slash
    const regex = /(^|\/)(\d+)$/;
    const potentialNumber = regex.exec(urlPathname)?.[2];
    const numberValue = Number(potentialNumber);
    return !isNaN(numberValue) && numberValue > 0 ? numberValue : null;
}

function getParagraphUrlMap(language: Language): ParagraphNumberUrlMap {
    return paragraphUrlMaps[language];
}

function getHighLevelUrlFragment(semanticPath: SemanticPath, language: Language): string | undefined {
    /*
        These regular expressions are intended to find the first instance of `highLevelContent-1` within the given path that is not followed
        by a `highLevelContent-n` instance, where `n` > 1 and `highLevelContent` is one of 'section', 'chapter', 'article', or 'article-paragraph'.
        The only differences between them are the language-specific words.
    */
    let regex = /\/(section|chapter|article|article-paragraph)-1(?=\/|$)(?!.*(\/chapter|\/article|\/article-paragraph)-(\d{2,}|[2-9]))/;
    /*              ^                                          ^         ^
                    |                                          |         |
                    |                                          |         there cannot be any following high-level content items that are not the first child of their parent (i.e. their number is greater than 1)
                    |                                          |
                    |                                          the content type must be followed by `-1` and the end of the string, or `-1/`
                    |
                    the first high-level content type that is the first child of its parent
    */

    if (Language.LATIN === language) {
        regex =
            /\/(sectio|caput|articulus|articulus-paragraphus)-1(?=\/|$)(?!.*(\/caput|\/articulus|\/articulus-paragraphus)-(\d{2,}|[2-9]))/;
    } else if (Language.SPANISH === language) {
        regex = /\/(seccion|capitulo|articulo|articulo-parrafo)-1(?=\/|$)(?!.*(\/capitulo|\/articulo|\/articulo-parrafo)-(\d{2,}|[2-9]))/;
    }

    const match = semanticPath.match(regex);
    return match && match.index ? semanticPath.slice(match.index + 1) : undefined;
}

function getLowLevelUrlFragment(
    semanticPath: SemanticPath,
    acknowledgeFinalContent: boolean,
    language: Language,
): string | undefined {
    const fragmentStarts = [
        'in-brief',
        'subarticle-',
        // This is for both `ParagraphGroup`s and `Paragraph`s
        'paragraph-',
    ].map((start) => translate(start, language))
        .map((start) => '/' + start);

    if (acknowledgeFinalContent) {
        fragmentStarts.push('/' + translate('final-content', language));
    }

    const fragmentIndices = fragmentStarts
        .map((fs) => semanticPath.indexOf(fs))
        .filter((i) => i > 0);

    const firstFragmentIndex = fragmentIndices.length > 0 ? Math.min(...fragmentIndices) : null;

    return firstFragmentIndex ? semanticPath.slice(firstFragmentIndex + 1) : undefined;
}

function isParagraphSemanticPath(
    semanticPath: SemanticPath,
    language: Language,
): { isParagraph: boolean; paragraphNumber: number | null } {
    /*
        These regular expressions are intended to determine if the given SemanticPath specifies a Paragraph
    */
    let regex = /\/paragraph-[0-9]+$/;

    if (Language.LATIN === language) {
        regex = /\/paragraphus-[0-9]+$/;
    } else if (Language.SPANISH === language) {
        regex = /\/parrafo-[0-9]+$/;
    }

    const match = semanticPath.match(regex);
    if (match) {
        const index = semanticPath.lastIndexOf('-');
        const paragraphNumber = Number(semanticPath.slice(index + 1));

        return {
            isParagraph: true,
            paragraphNumber,
        };
    } else {
        return {
            isParagraph: false,
            paragraphNumber: null,
        };
    }
}
