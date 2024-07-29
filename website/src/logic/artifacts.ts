import fs from 'node:fs';

import {
    Artifact,
    DEFAULT_LANGUAGE,
    Language,
    PathIdContentMap,
    SemanticPathPathIdMap,
    TableOfContentsType,
} from '@catechism/source/types/types.ts';
import { getSupportedLanguages } from '@catechism/source/utils/language.ts';
import { getTopLevelUrls } from '@catechism/source/utils/table-of-contents.ts';

export function getTableOfContentsUrls(
    languageSelection: 'allLanguages' | 'onlyDefaultLanguage' | 'excludeDefaultLanguage',
): Array<{ language: Language; url: string }> {
    return getSupportedLanguages()
        .filter(([_languageKey, language]) =>
            'allLanguages' === languageSelection ||
            'onlyDefaultLanguage' === languageSelection && DEFAULT_LANGUAGE === language ||
            'excludeDefaultLanguage' === languageSelection && DEFAULT_LANGUAGE !== language
        )
        .flatMap(([_languageKey, language]) => {
            const table = getTableOfContents(language);
            const urls = getTopLevelUrls(table);
            return urls.map((url) => ({ language, url }));
        });
}

export function getTableOfContents(language: Language): TableOfContentsType {
    return getArtifact(Artifact.TABLE_OF_CONTENTS, language);
}

export function getContentMap(language: Language): PathIdContentMap {
    return getArtifact(Artifact.RENDERABLE_PATH_ID_TO_CONTENT, language);
}

export function getPathMap(language: Language): SemanticPathPathIdMap {
    return getArtifact(Artifact.SEMANTIC_PATH_TO_RENDERABLE_PATH_ID, language);
}

// deno-lint-ignore no-explicit-any
function getArtifact(artifact: Artifact, language: Language): any {
    const filepath = `../catechism/artifacts/${artifact}-${language}.json`;

    try {
        return JSON.parse(fs.readFileSync(filepath, { encoding: 'utf8' }));
    } catch (error) {
        throw new Error(`Failed to load artifact: ${filepath}`, error);
    }
}
