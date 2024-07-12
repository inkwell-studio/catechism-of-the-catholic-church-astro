import {
    Artifact,
    Language,
    ParagraphNumberContentMap,
    ParagraphNumberUrlMap,
    PathIdContentMap,
    RenderableNodeMap,
    SemanticPathPathIdMap,
    TableOfContentsType,
} from '../../source/types/types.ts';

export function getContentMap(language: Language): Promise<PathIdContentMap> {
    return getArtifact(Artifact.RENDERABLE_PATH_ID_TO_CONTENT, language);
}

export function getRenderableNodeMap(language: Language): Promise<RenderableNodeMap> {
    return getArtifact(Artifact.PATH_ID_TO_RENDERABLE_NODES, language);
}

export function getRenderablePathMap(language: Language): Promise<SemanticPathPathIdMap> {
    return getArtifact(Artifact.SEMANTIC_PATH_TO_RENDERABLE_PATH_ID, language);
}

export function getParagraphNumberContentMap(language: Language): Promise<ParagraphNumberContentMap> {
    return getArtifact(Artifact.PARAGRAPH_NUMBER_TO_CONTENT, language);
}

export function getParagraphNumberUrlMap(language: Language): Promise<ParagraphNumberUrlMap> {
    return getArtifact(Artifact.PARAGRAPH_NUMBER_TO_URL, language);
}

export function getTableOfContents(language: Language): Promise<TableOfContentsType> {
    return getArtifact(Artifact.TABLE_OF_CONTENTS, language);
}

// deno-lint-ignore no-explicit-any
async function getArtifact(artifact: Artifact, language: Language): Promise<any> {
    const filepath = `./catechism/artifacts/${artifact}-${language}.json`;

    try {
        const artifact = await Deno.readTextFile(filepath);
        return JSON.parse(artifact);
    } catch (error) {
        throw new Error(`Failed to load artifact: ${filepath}`, error);
    }
}
