import { build as buildCrossReferenceParagraphMap } from './paragraph-cross-reference-to-content-map.ts';
import { build as buildParagraphContentMap } from './paragraph-number-to-content-map.ts';
import { build as buildParagraphUrlMap } from './paragraph-number-to-url-map.ts';
import { build as buildRenderableNodeMap } from './path-id-to-renderable-nodes.ts';
import { build as buildContentMap } from './path-id-to-content-map.ts';
import { build as buildParagraphNumberRenderablePathIdMap } from './paragraph-number-to-renderable-path-id-map.ts';
import { build as buildPathIdLanguageUrlMap } from './path-id-to-language-to-url-map.ts';
import { build as buildSemanticMap } from './semantic-path-to-renderable-path-id-map.ts';
import { build as buildTableOfContents } from './table-of-contents.ts';

import {
    Artifact,
    Language,
    ParagraphNumberContentMap,
    ParagraphNumberUrlMap,
    PathIdLanguageUrlMap,
    RenderableNodeMap,
} from '../source/types/types.ts';

import { getCatechisms } from '../source/utils/content.ts';
import { getSupportedLanguages } from '../source/utils/language.ts';
import {
    CatechismStructure,
    ParagraphCrossReferenceContentMap,
    ParagraphNumberPathIdMap,
    PathIdContentMap,
    SemanticPathPathIdMap,
    TableOfContentsType,
} from '../source/types/types.ts';

build();

async function build(): Promise<void> {
    console.log('\nBuilding artifacts ...');

    const allTableOfContents: Array<TableOfContentsType> = [];

    const languages = getSupportedLanguages().map(([_languageKey, language]) => language);
    const catechisms = getCatechisms(languages);

    for await (const catechism of catechisms) {
        console.log(`\n\t[${catechism.language}]`);
        const { tableOfContents } = buildArtifacts(catechism);
        allTableOfContents.push(tableOfContents);
    }

    console.log('\n\tPathID to Language to URL map ...');
    const pathIdLanguageUrlMap = buildPathIdLanguageUrlMap(allTableOfContents);
    writeJson(pathIdLanguageUrlMap, Artifact.PATH_ID_TO_LANGUAGE_TO_URL);
}

function buildArtifacts(catechism: CatechismStructure): { tableOfContents: TableOfContentsType } {
    console.log('\t\ttable of contents ...');
    const tableOfContents = buildTableOfContents(catechism);
    writeJson(tableOfContents, Artifact.TABLE_OF_CONTENTS, catechism.language);

    console.log('\t\tparagraph number to renderable PathID map ...');
    const paragraphNumberPathIdMap = buildParagraphNumberRenderablePathIdMap(tableOfContents);
    writeJson(paragraphNumberPathIdMap, Artifact.PARAGRAPH_NUMBER_TO_RENDERABLE_PATH_ID, catechism.language);

    console.log('\t\tparagraph number to content map ...');
    const paragraphContentMap = buildParagraphContentMap(catechism);
    writeJson(paragraphContentMap, Artifact.PARAGRAPH_NUMBER_TO_CONTENT, catechism.language);

    console.log('\t\tparagraph number to URL map ...');
    const paragraphUrlMap = buildParagraphUrlMap(catechism);
    writeJson(paragraphUrlMap, Artifact.PARAGRAPH_NUMBER_TO_URL, catechism.language);

    console.log('\t\tparagraph cross-reference to content map ...');
    const crossReferenceParagraphMap = buildCrossReferenceParagraphMap(catechism, paragraphContentMap);
    writeJson(crossReferenceParagraphMap, Artifact.PARAGRAPH_CROSS_REFERENCE_TO_CONTENT, catechism.language);

    console.log('\t\tPathID to RenderableNode map ...');
    const renderableNodeMap = buildRenderableNodeMap(tableOfContents);
    writeJson(renderableNodeMap, Artifact.PATH_ID_TO_RENDERABLE_NODES, catechism.language);

    console.log('\t\tSemanticPath to renderable PathID map ...');
    const renderablePathMap = buildSemanticMap(tableOfContents);
    writeJson(renderablePathMap, Artifact.SEMANTIC_PATH_TO_RENDERABLE_PATH_ID, catechism.language);

    console.log('\t\trenderable PathID to content map ...');
    const contentMap = buildContentMap(renderablePathMap, catechism);
    writeJson(contentMap, Artifact.RENDERABLE_PATH_ID_TO_CONTENT, catechism.language);

    return { tableOfContents };
}

function writeJson(
    object:
        | ParagraphCrossReferenceContentMap
        | ParagraphNumberContentMap
        | ParagraphNumberPathIdMap
        | ParagraphNumberUrlMap
        | PathIdContentMap
        | PathIdLanguageUrlMap
        | RenderableNodeMap
        | SemanticPathPathIdMap
        | TableOfContentsType,
    filename: string,
    language?: Language,
): void {
    // deno-fmt-ignore
    const filepath = language
        ? `catechism/artifacts/${filename}-${language}.json`
        : `catechism/artifacts/${filename}.json`;

    Deno.writeTextFileSync(
        filepath,
        JSON.stringify(object, undefined, '  ') + '\n',
    );
}
