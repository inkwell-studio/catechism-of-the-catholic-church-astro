import {
    Artifact,
    Glossary,
    Language,
    ParagraphCrossReferenceContentMap,
    ParagraphNumberContentMap,
    ParagraphNumberPathIdMap,
    ParagraphNumberUrlMap,
    PathIdContentMap,
    PathIdLanguageUrlMap,
    RenderableNodeMap,
    SemanticPathPathIdMap,
    TableOfContentsType,
} from '../../source/types/types.ts';

export function getContentMap(language: Language): Promise<PathIdContentMap> {
    return getArtifact(Artifact.RENDERABLE_PATH_ID_TO_CONTENT, language);
}

export function getGlossary(language: Language): Promise<Glossary> {
    return getArtifact(Artifact.GLOSSARY, language);
}

export function getRenderableNodeMap(language: Language): Promise<RenderableNodeMap> {
    return getArtifact(Artifact.PATH_ID_TO_RENDERABLE_NODES, language);
}

export function getRenderablePathMap(language: Language): Promise<SemanticPathPathIdMap> {
    return getArtifact(Artifact.SEMANTIC_PATH_TO_RENDERABLE_PATH_ID, language);
}

export function getParagraphCrossReferenceContentMap(language: Language): Promise<ParagraphCrossReferenceContentMap> {
    return getArtifact(Artifact.PARAGRAPH_CROSS_REFERENCE_TO_CONTENT, language);
}

export function getParagraphNumberContentMap(language: Language): Promise<ParagraphNumberContentMap> {
    return getArtifact(Artifact.PARAGRAPH_NUMBER_TO_CONTENT, language);
}

export function getParagraphNumberPathMap(language: Language): Promise<ParagraphNumberPathIdMap> {
    return getArtifact(Artifact.PARAGRAPH_NUMBER_TO_RENDERABLE_PATH_ID, language);
}

export function getParagraphNumberUrlMap(language: Language): Promise<ParagraphNumberUrlMap> {
    return getArtifact(Artifact.PARAGRAPH_NUMBER_TO_URL, language);
}

export function getPathIdLanguageUrlMap(): Promise<PathIdLanguageUrlMap> {
    return getArtifact(Artifact.PATH_ID_TO_LANGUAGE_TO_URL);
}

export function getTableOfContents(language: Language): Promise<TableOfContentsType> {
    return getArtifact(Artifact.TABLE_OF_CONTENTS, language);
}

// deno-lint-ignore no-explicit-any
async function getArtifact(artifact: Artifact, language?: Language): Promise<any> {
    // deno-fmt-ignore
    const filepath = language
        ? `${Deno.cwd()}/catechism/artifacts/${artifact}-${language}.json`
        : `${Deno.cwd()}/catechism/artifacts/${artifact}.json`;

    try {
        const artifactJson = await import(filepath, { with: { type: 'json' } });
        return artifactJson.default;
    } catch (error) {
        throw new Error(`Failed to load artifact: ${filepath}`, error);
    }
}
