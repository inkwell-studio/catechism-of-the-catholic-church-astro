import fs from 'node:fs';

import {
    Artifact,
    Language,
    NumberOrNumberRange,
    ParagraphCrossReferenceContentMap,
    ParagraphNumberPathIdMap,
    ParagraphNumberUrlMap,
    PathIdContentMap,
    PathIdLanguageUrlMap,
    RenderableNodeMap,
    SemanticPathPathIdMap,
    TableOfContentsType,
} from '@catechism/source/types/types.ts';

export function getContentMap(language: Language): PathIdContentMap {
    return getArtifact(Artifact.RENDERABLE_PATH_ID_TO_CONTENT, language);
}

export function getRenderableNodeMap(language: Language): RenderableNodeMap {
    return getArtifact(Artifact.PATH_ID_TO_RENDERABLE_NODES, language);
}

export function getParagraphCrossReferenceContentMap(language: Language): ParagraphCrossReferenceContentMap {
    return getArtifact(Artifact.PARAGRAPH_CROSS_REFERENCE_TO_CONTENT, language);
}

export function getParagraphNumberUrlMap(language: Language): ParagraphNumberUrlMap {
    return getArtifact(Artifact.PARAGRAPH_NUMBER_TO_URL, language);
}

export function getParagraphPathIdMap(language: Language): ParagraphNumberPathIdMap {
    return getArtifact(Artifact.PARAGRAPH_NUMBER_TO_RENDERABLE_PATH_ID, language);
}

export function getPathIdLanguageUrlMap(): PathIdLanguageUrlMap {
    return getArtifact(Artifact.PATH_ID_TO_LANGUAGE_TO_URL);
}

export function getSemanticPathPathIdMap(language: Language): SemanticPathPathIdMap {
    return getArtifact(Artifact.SEMANTIC_PATH_TO_RENDERABLE_PATH_ID, language);
}

export function getAllCrossReferences(language: Language): Array<NumberOrNumberRange> {
    const map = getArtifact(Artifact.PARAGRAPH_CROSS_REFERENCE_TO_CONTENT, language);
    return Object.keys(map) as Array<NumberOrNumberRange>;
}

export function getAllParagraphNumbers(language: Language): Array<number> {
    const map = getArtifact(Artifact.PARAGRAPH_NUMBER_TO_URL, language);
    return Object.keys(map).map((n) => Number(n));
}

export function getTableOfContents(language: Language): TableOfContentsType {
    return getArtifact(Artifact.TABLE_OF_CONTENTS, language);
}

// deno-lint-ignore no-explicit-any
function getArtifact(artifact: Artifact, language?: Language): any {
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
