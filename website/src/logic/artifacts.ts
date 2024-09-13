import fs from 'node:fs';

import {
    Artifact,
    Language,
    NumberOrNumberRange,
    ParagraphCrossReferenceContentMap,
    ParagraphNumberContentMap,
    ParagraphNumberPathIdMap,
    ParagraphNumberUrlMap,
    PathIdContentMap,
    PathIdLanguageUrlMap,
    RenderableNodeMap,
    SemanticPathPathIdMap,
    TableOfContentsType,
} from '@catechism/source/types/types.ts';

export function getContentMapSync(language: Language): PathIdContentMap {
    return getArtifactSync(Artifact.RENDERABLE_PATH_ID_TO_CONTENT, language);
}

export function getRenderableNodeMapSync(language: Language): RenderableNodeMap {
    return getArtifactSync(Artifact.PATH_ID_TO_RENDERABLE_NODES, language);
}

export function getParagraphCrossReferenceContentMapSync(language: Language): ParagraphCrossReferenceContentMap {
    return getArtifactSync(Artifact.PARAGRAPH_CROSS_REFERENCE_TO_CONTENT, language);
}

export function getParagraphNumberUrlMapSync(language: Language): ParagraphNumberUrlMap {
    return getArtifactSync(Artifact.PARAGRAPH_NUMBER_TO_URL, language);
}

export function getParagraphContentMapSync(language: Language): ParagraphNumberContentMap {
    return getArtifactSync(Artifact.PARAGRAPH_NUMBER_TO_CONTENT, language);
}

export function getParagraphPathIdMapSync(language: Language): ParagraphNumberPathIdMap {
    return getArtifactSync(Artifact.PARAGRAPH_NUMBER_TO_RENDERABLE_PATH_ID, language);
}

export function getPathIdLanguageUrlMapSync(): PathIdLanguageUrlMap {
    return getArtifactSync(Artifact.PATH_ID_TO_LANGUAGE_TO_URL);
}

export function getSemanticPathPathIdMapSync(language: Language): SemanticPathPathIdMap {
    return getArtifactSync(Artifact.SEMANTIC_PATH_TO_RENDERABLE_PATH_ID, language);
}

export function getAllCrossReferencesSync(language: Language): Array<NumberOrNumberRange> {
    const map = getArtifactSync(Artifact.PARAGRAPH_CROSS_REFERENCE_TO_CONTENT, language);
    return Object.keys(map) as Array<NumberOrNumberRange>;
}

export function getAllParagraphNumbersSync(language: Language): Array<number> {
    const map = getArtifactSync(Artifact.PARAGRAPH_NUMBER_TO_URL, language);
    return Object.keys(map).map((n) => Number(n));
}

export function getTableOfContentsSync(language: Language): TableOfContentsType {
    return getArtifactSync(Artifact.TABLE_OF_CONTENTS, language);
}

// deno-lint-ignore no-explicit-any
function getArtifactSync(artifact: Artifact, language?: Language): any {
    // deno-fmt-ignore
    const filepath = language
        ? `../catechism/artifacts/${artifact}-${language}.json`
        : `../catechism/artifacts/${artifact}.json`;

    try {
        return JSON.parse(fs.readFileSync(filepath, { encoding: 'utf8' }));
    } catch (error) {
        throw new Error(`Failed to load artifact: ${filepath}`, error);
    }
}
