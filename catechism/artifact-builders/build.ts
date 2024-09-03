import { build as buildCrossReferenceParagraphMap } from './paragraph-cross-reference-to-content-map.ts';
import { build as buildParagraphContentMap } from './paragraph-number-to-content-map.ts';
import { build as buildParagraphUrlMap } from './paragraph-number-to-url-map.ts';
import { build as buildRenderableNodeMap } from './path-id-to-renderable-nodes.ts';
import { build as buildContentMap } from './path-id-to-content-map.ts';

import { build as buildParagraphNumberRenderablePathIdMap } from './paragraph-number-to-renderable-path-id-map.ts';

import { build as buildSemanticMap } from './semantic-path-to-renderable-path-id-map.ts';
import { build as buildTableOfContents } from './table-of-contents.ts';
import { Artifact, Language, ParagraphNumberContentMap, ParagraphNumberUrlMap, RenderableNodeMap } from '../source/types/types.ts';
import { getCatechism } from '../source/utils/content.ts';
import { getSupportedLanguages } from '../source/utils/language.ts';
import {
    CatechismStructure,
    ParagraphCrossReferenceContentMap,
    ParagraphNumberPathIdMap,
    PathIdContentMap,
    SemanticPathPathIdMap,
    TableOfContentsType,
} from '../source/types/types.ts';

getSupportedLanguages().forEach(([languageKey, language]) => {
    getCatechism(language)
        .then((catechism) => buildArtifacts(catechism))
        .catch((error) => console.error(`Could not retrieve the Catechism JSON for ${languageKey}`, error));
});

function buildArtifacts(catechism: CatechismStructure): void {
    console.log(`\nBuilding artifacts (${catechism.language}) ...`);

    console.log('\ttable of contents ...');
    const tableOfContents = buildTableOfContents(catechism);
    writeJson(tableOfContents, Artifact.TABLE_OF_CONTENTS, catechism.language);

    console.log('\tparagraph number to renderable PathID map ...');
    const paragraphNumberPathIdMap = buildParagraphNumberRenderablePathIdMap(tableOfContents);
    writeJson(paragraphNumberPathIdMap, Artifact.PARAGRAPH_NUMBER_TO_RENDERABLE_PATH_ID, catechism.language);

    console.log('\tparagraph number to content map ...');
    const paragraphContentMap = buildParagraphContentMap(catechism);
    writeJson(paragraphContentMap, Artifact.PARAGRAPH_NUMBER_TO_CONTENT, catechism.language);

    console.log('\tparagraph number to URL map ...');
    const paragraphUrlMap = buildParagraphUrlMap(catechism);
    writeJson(paragraphUrlMap, Artifact.PARAGRAPH_NUMBER_TO_URL, catechism.language);

    console.log('\tparagraph cross-reference to content map ...');
    const crossReferenceParagraphMap = buildCrossReferenceParagraphMap(catechism, paragraphContentMap);
    writeJson(crossReferenceParagraphMap, Artifact.PARAGRAPH_CROSS_REFERENCE_TO_CONTENT, catechism.language);

    console.log('\tPathID to RenderableNode map ...');
    const renderableNodeMap = buildRenderableNodeMap(tableOfContents);
    writeJson(renderableNodeMap, Artifact.PATH_ID_TO_RENDERABLE_NODES, catechism.language);

    console.log('\tSemanticPath to renderable PathID map ...');
    const renderablePathMap = buildSemanticMap(tableOfContents);
    writeJson(renderablePathMap, Artifact.SEMANTIC_PATH_TO_RENDERABLE_PATH_ID, catechism.language);

    console.log('\trenderable PathID to content map ...');
    const contentMap = buildContentMap(renderablePathMap, catechism);
    writeJson(contentMap, Artifact.RENDERABLE_PATH_ID_TO_CONTENT, catechism.language);
}

function writeJson(
    object:
        | ParagraphCrossReferenceContentMap
        | ParagraphNumberContentMap
        | ParagraphNumberPathIdMap
        | ParagraphNumberUrlMap
        | PathIdContentMap
        | RenderableNodeMap
        | SemanticPathPathIdMap
        | TableOfContentsType,
    filename: string,
    language: Language,
): void {
    Deno.writeTextFileSync(
        `catechism/artifacts/${filename}-${language}.json`,
        JSON.stringify(object, undefined, '  ') + '\n',
    );
}
