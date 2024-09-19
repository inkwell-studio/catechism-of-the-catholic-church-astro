import { DEFAULT_LANGUAGE, Language } from '@catechism/source/types/types.ts';
import { getLanguages } from '@catechism/source/utils/language.ts';
import { getTopLevelUrls } from '@catechism/source/utils/table-of-contents.ts';

import { getAllCrossReferencesSync, getAllParagraphNumbersSync, getTableOfContentsSync } from '../logic/artifacts.ts';
import { path as joinPaths } from '../logic/navigation-utils.ts';

const languages = getLanguages().map(([_languageKey, language]) => language);

export interface ContentRoute {
    params: {
        language: Language;
        path: string;
    };
}

export interface CrossReferenceRoute {
    params: {
        language: Language;
        reference: string;
    };
}

export enum BasicPath {
    APOSTOLIC_CONSTITUTION = 'apostolic-constitution',
    APOSTOLIC_LETTER = 'apostolic-letter',
    GLOSSARY = 'glossary',
    INDEX_CITATIONS = 'index-citations',
    INDEX_TOPICS = 'index-topics',
}

export const basicPaths = Object.values(BasicPath);

export function getBasicRoutes(): Array<ContentRoute> {
    return basicPaths.flatMap((basicPath) =>
        languages.map((language) => {
            const prefix = DEFAULT_LANGUAGE === language ? '' : language;
            const path = joinPaths('/', prefix, basicPath);

            return { params: { language, path } };
        })
    );
}

export function getCrossReferencePartialRoutes(): Array<CrossReferenceRoute> {
    return languages.flatMap((language) =>
        getAllCrossReferencesSync(language).flatMap((reference) => {
            /*
                For robustness, build an endpoint for each cross-reference specifying
                multiple paragraphs with an en dash and a hyphen (e.g. `/101–105` and `/101-105`)
                */

            const withEnDash = reference.toString();
            const withHyphen = reference.toString().replace('–', '-');

            return [
                { params: { language, reference: withEnDash } },
                { params: { language, reference: withHyphen } },
            ];
        })
    );
}

export function getLandingPageRoutes(): Array<ContentRoute> {
    return languages
        .filter((language) => DEFAULT_LANGUAGE !== language)
        .flatMap((language) => ({ params: { language, path: `/${language}` } }));
}

export function getParagraphNumberRoutes(): Array<ContentRoute> {
    return languages.flatMap((language) =>
        getAllParagraphNumbersSync(language)
            .map((n) =>
                // deno-fmt-ignore
                DEFAULT_LANGUAGE === language
                    ? joinPaths('/', n)
                    : joinPaths('/', language, n)
            )
            .map((path) => ({ params: { language, path } }))
    );
}

export function getTableOfContentsRoutes(): Array<ContentRoute> {
    return languages.flatMap((language) => {
        const table = getTableOfContentsSync(language);
        return getTopLevelUrls(table)
            .map((path) =>
                // deno-fmt-ignore
                DEFAULT_LANGUAGE === language
                    ? joinPaths('/', path)
                    : joinPaths('/', language, path)
            )
            .map((path) => ({ params: { language, path } }));
    });
}
