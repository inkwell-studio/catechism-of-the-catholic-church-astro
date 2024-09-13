import { DEFAULT_LANGUAGE, Language } from '@catechism/source/types/types.ts';
import { getSupportedLanguages } from '@catechism/source/utils/language.ts';
import { getTopLevelUrls } from '@catechism/source/utils/table-of-contents.ts';

import { getAllCrossReferencesSync, getAllParagraphNumbersSync, getTableOfContentsSync } from '../logic/artifacts.ts';
import { path as joinPaths } from '../logic/navigation-utils.ts';

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

export function getCrossReferencePartialRoutes(): Array<CrossReferenceRoute> {
    return getSupportedLanguages()
        .map(([_languageKey, language]) => language)
        .flatMap((language) =>
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

export function getIndexPageRoutes(): Array<ContentRoute> {
    return getSupportedLanguages()
        .map(([_languageKey, language]) => language)
        .filter((language) => DEFAULT_LANGUAGE !== language)
        .flatMap((language) => ({ params: { language, path: `/${language}` } }));
}

export function getParagraphNumberRoutes(): Array<ContentRoute> {
    return getSupportedLanguages().flatMap(([_languageKey, language]) =>
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
    return getSupportedLanguages().flatMap(([_languageKey, language]) => {
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
