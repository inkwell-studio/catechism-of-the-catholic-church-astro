import { APIRoute } from 'astro';

import { getSupportedLanguages } from '@catechism/source/utils/language.ts';
import { Language } from '@catechism/source/types/types.ts';

import { getAllParagraphNumbersSync, getParagraphContentMapSync } from '../../../../logic/artifacts.ts';

interface Route {
    params: {
        language: Language;
        paragraphNumber: number;
    };
}

export function getStaticPaths(): Array<Route> {
    return getSupportedLanguages().flatMap(([_languageKey, language]) =>
        getAllParagraphNumbersSync(language)
            .map((paragraphNumber) => ({ params: { language, paragraphNumber } }))
    );
}

export const GET: APIRoute = ({ params }) => {
    const paragraphMap = getParagraphContentMapSync(params.language as Language);
    const paragraph = paragraphMap[Number(params.paragraphNumber)];

    return new Response(JSON.stringify(paragraph));
};
