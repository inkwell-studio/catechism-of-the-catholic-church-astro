// deno-lint-ignore-file
import { getLimits } from './config/limits.ts';
import { Probability } from './config/probability.ts';
import { buildPart } from './parts/part.ts';
import { buildPrologue } from './parts/prologue.ts';
import { chance, intArrayOfRandomLength, MinMax, randomInt } from './utils.ts';
import { getLanguage, setLanguage } from '../language/language-state.ts';

import {
    CatechismStructure,
    Container,
    Content,
    ContentBase,
    Language,
    NumberOrNumberRange,
    PathID,
    SemanticPathSource,
    TextWrapper,
} from '../../source/types/types.ts';

import {
    getAllChildContent,
    getAllContent,
    getAllCrossReferences,
    getAllParagraphs,
    getParagraphNumbers,
    hasFinalContent,
    hasInBrief,
    hasMainContent,
    hasOpeningContent,
} from '../../source/utils/content.ts';

import { getContainerDesignator } from '../../source/utils/path-id.ts';
import { buildSemanticPath, getSemanticPathSource } from '../../source/utils/semantic-path.ts';

import { getUrl } from '../../../website/src/logic/routing.ts';

//#region top-level functions
export function buildMockData(): CatechismStructure {
    let catechism: CatechismStructure = {
        language: getLanguage(),
        prologue: buildPrologue('0'),
        parts: [
            buildPart(1),
            buildPart(2),
            buildPart(3),
        ],
    };

    catechism = setPathIDs(catechism);
    catechism = setParagraphNumbers(catechism);
    catechism = setReferenceNumbers(catechism);
    catechism = setSemanticPaths(catechism);
    catechism = setParagraphUrls(catechism);

    const results = buildParagraphCrossReferences(catechism);
    catechism = results.catechism;

    console.log('Validating mock data ...');
    const valid = validateCatechism(catechism);
    if (!valid) {
        console.log('\nExited without writing data.');
        Deno.exit(-1);
    }

    const paragraphCount = getAllParagraphs(catechism).length;
    console.log(`\t... built and validated ${paragraphCount} paragraphs with ${results.crossReferenceCount} cross-references\n`);

    return catechism;
}
//#endregion

//#region helper functions
export function setPathIDs(catechism: CatechismStructure): CatechismStructure {
    catechism = structuredClone(catechism);

    const prologuePathID = '0';
    (catechism.prologue as any).pathID = prologuePathID;

    (catechism.prologue as any).openingContent = setPathIDsHelper(
        Container.OPENING,
        catechism.prologue.openingContent,
        prologuePathID,
    );
    (catechism.prologue as any).mainContent = setPathIDsHelper(
        Container.MAIN,
        catechism.prologue.mainContent,
        prologuePathID,
    );
    (catechism.prologue as any).finalContent = setPathIDsHelper(
        Container.FINAL,
        catechism.prologue.finalContent,
        prologuePathID,
    );

    catechism.parts.forEach((part, index) => {
        const pathID: PathID = `${index + 1}`;
        (part as any).pathID = pathID;

        (part as any).openingContent = setPathIDsHelper(Container.OPENING, part.openingContent, pathID);
        (part as any).mainContent = setPathIDsHelper(Container.MAIN, part.mainContent, pathID);
        (part as any).finalContent = setPathIDsHelper(Container.FINAL, part.finalContent, pathID);
    });

    return catechism;
}

function setPathIDsHelper<T extends ContentBase>(
    container: Container,
    content: Array<T>,
    parentPathID: PathID,
): Array<T> {
    content.forEach((c, index) => {
        const pathID = getPathID(container, index, parentPathID);
        (c as any).pathID = pathID;

        if (hasOpeningContent(c)) {
            (c as any).openingContent = setPathIDsHelper(Container.OPENING, (c as any).openingContent, pathID);
        }

        if (hasMainContent(c)) {
            (c as any).mainContent = setPathIDsHelper(Container.MAIN, (c as any).mainContent, pathID);
        }

        if (hasFinalContent(c)) {
            (c as any).finalContent = setPathIDsHelper(Container.FINAL, (c as any).finalContent, pathID);
        }

        if (hasInBrief(c)) {
            (c as any).inBrief = setPathIDsHelper(Container.IN_BRIEF, [(c as any).inBrief], pathID)[0];
        }
    });

    return content;
}

function getPathID(
    container: Container,
    index: number,
    parentPathID: PathID,
): PathID {
    const containerDesignator = getContainerDesignator(container);

    if (Container.IN_BRIEF === container) {
        return parentPathID + '__' + containerDesignator as PathID;
    } else {
        return parentPathID + '__' + containerDesignator + '.' + index as PathID;
    }
}

function setParagraphNumbers(catechism: CatechismStructure): CatechismStructure {
    catechism = structuredClone(catechism);

    const prologueResults = setParagraphNumbersHelper([catechism.prologue], 1);
    (catechism as any).prologue = prologueResults.content[0];

    const partsResults = setParagraphNumbersHelper(catechism.parts, prologueResults.nextParagraphNumber);
    (catechism as any).parts = partsResults.content;

    return catechism;
}

function setParagraphNumbersHelper(
    content: Array<ContentBase>,
    nextParagraphNumber: number,
): { content: Array<ContentBase>; nextParagraphNumber: number } {
    content.forEach((c) => {
        if (Content.PARAGRAPH === c.contentType) {
            (c as any).paragraphNumber = nextParagraphNumber++;
        } else if (hasMainContent(c)) {
            const childContent = getAllChildContent(c);
            const results = setParagraphNumbersHelper(childContent, nextParagraphNumber);
            nextParagraphNumber = results.nextParagraphNumber;

            return {
                content: results.content,
                nextParagraphNumber,
            };
        }
    });

    return { content, nextParagraphNumber };
}

function setReferenceNumbers(catechism: CatechismStructure): CatechismStructure {
    catechism = structuredClone(catechism);

    const prologueResults = setReferenceNumbersHelper([catechism.prologue], 1);
    (catechism as any).prologue = prologueResults.content[0];

    const partsResults = setReferenceNumbersHelper(catechism.parts, 1);
    (catechism as any).parts = partsResults.content;

    return catechism;
}

function setReferenceNumbersHelper(
    content: Array<ContentBase>,
    nextReferenceNumber: number,
): { content: Array<ContentBase>; nextReferenceNumber: number } {
    content.forEach((c) => {
        if (Content.SECTION === c.contentType || Content.CHAPTER === c.contentType) {
            nextReferenceNumber = 1;
        }

        if (Content.TEXT_WRAPPER === c.contentType) {
            const refs = (c as TextWrapper).referenceCollection;
            if (refs) {
                (refs as any).referenceNumber = nextReferenceNumber++;
            }
        } else if (hasMainContent(c)) {
            const childContent = getAllChildContent(c);
            const results = setReferenceNumbersHelper(childContent, nextReferenceNumber);
            nextReferenceNumber = results.nextReferenceNumber;

            return {
                content: results.content,
                nextReferenceNumber,
            };
        }
    });

    return { content, nextReferenceNumber };
}

/**
 * This depends on all `Paragraph.paragraphNumber` values being properly set
 */
export function setSemanticPaths(catechism: CatechismStructure): CatechismStructure {
    catechism = structuredClone(catechism);

    getAllContent(catechism).forEach((topLevelContent) => {
        const semanticPathSource = getSemanticPathSource(topLevelContent, false);
        (topLevelContent as any).semanticPath = buildSemanticPath(catechism.language, semanticPathSource, []);

        (topLevelContent as any).openingContent = setSemanticPathsHelper(
            topLevelContent.openingContent,
            [semanticPathSource],
            false,
        );
        (topLevelContent as any).mainContent = setSemanticPathsHelper(
            topLevelContent.mainContent,
            [semanticPathSource],
            false,
        );
        (topLevelContent as any).finalContent = setSemanticPathsHelper(
            topLevelContent.finalContent,
            [semanticPathSource],
            false,
        );
    });

    return catechism;
}

function setSemanticPathsHelper(
    content: Array<ContentBase>,
    ancestors: Array<SemanticPathSource>,
    isFinalContent: boolean,
): Array<ContentBase> {
    const language = getLanguage();

    content.forEach((c) => {
        const semanticPathSource = getSemanticPathSource(c, isFinalContent);
        (c as any).semanticPath = buildSemanticPath(language, semanticPathSource, ancestors);
        const childAncestors = [...ancestors, semanticPathSource];

        if (hasOpeningContent(c)) {
            (c as any).openingContent = setSemanticPathsHelper((c as any).openingContent, childAncestors, false);
        }
        if (hasMainContent(c)) {
            (c as any).mainContent = setSemanticPathsHelper((c as any).mainContent, childAncestors, false);
        }
        if (hasFinalContent(c)) {
            (c as any).finalContent = setSemanticPathsHelper((c as any).finalContent, childAncestors, true);
        }

        if (hasInBrief(c)) {
            const inBriefSource = getSemanticPathSource((c as any).inBrief, isFinalContent);
            (c as any).inBrief.semanticPath = buildSemanticPath(language, inBriefSource, childAncestors);

            if (hasOpeningContent((c as any).inBrief)) {
                (c as any).inBrief.openingContent = setSemanticPathsHelper(
                    (c as any).inBrief.openingContent,
                    [...childAncestors, inBriefSource],
                    false,
                );
            }
            if (hasMainContent((c as any).inBrief)) {
                (c as any).inBrief.mainContent = setSemanticPathsHelper(
                    (c as any).inBrief.mainContent,
                    [...childAncestors, inBriefSource],
                    false,
                );
            }
            if (hasFinalContent((c as any).inBrief)) {
                (c as any).inBrief.finalContent = setSemanticPathsHelper(
                    (c as any).inBrief.finalContent,
                    [...childAncestors, inBriefSource],
                    true,
                );
            }
        }
    });

    return content;
}

function setParagraphUrls(catechism: CatechismStructure): CatechismStructure {
    catechism = structuredClone(catechism);

    const content = getAllContent(catechism);
    setParagraphUrlHelper(content, catechism.language);

    return catechism;
}

function setParagraphUrlHelper(content: Array<ContentBase>, language: Language): void {
    content.forEach((c) => {
        if (Content.PARAGRAPH === c.contentType) {
            (c as any).url = getUrl(language, c.semanticPath);
        } else if (hasMainContent(c)) {
            const childContent = getAllChildContent(c);
            setParagraphUrlHelper(childContent, language);
        }
    });
}

function validateCatechism(catechism: CatechismStructure): boolean {
    function fail(message: string): false {
        console.log(`\nVALIDATION FAILURE: ${message}`);
        return false;
    }

    const paragraphNumbers = getAllParagraphs(catechism).map((p) => p.paragraphNumber);
    const uniqueParagraphNumbers = new Set(paragraphNumbers);

    const numParagraphs = paragraphNumbers.length;
    const numUniqueParagraphNumbers = uniqueParagraphNumbers.size;
    if (numParagraphs !== numUniqueParagraphNumbers) {
        return fail(
            `Duplicate paragraph numbers exist (${numParagraphs} paragraphs, but only ${numUniqueParagraphNumbers} paragraph numbers)`,
        );
    }

    const finalParagraphNumber = Math.max(...uniqueParagraphNumbers);
    if (finalParagraphNumber !== numParagraphs) {
        return fail(
            `The final paragraph number is incorrect: expected ${numParagraphs}, found ${finalParagraphNumber}`,
        );
    }

    const crossReferences = getAllCrossReferences(catechism);
    const highestParagraphCrossReferenceValue = Math.max(
        ...crossReferences.flatMap((reference) => getParagraphNumbers(reference)),
    );
    if (highestParagraphCrossReferenceValue > finalParagraphNumber) {
        return fail(
            `A cross-reference was created for a non-existent paragraph ${highestParagraphCrossReferenceValue} (the final paragraph is ${finalParagraphNumber})`,
        );
    }

    return true;
}

function buildParagraphCrossReferences(
    catechism: CatechismStructure,
): { catechism: CatechismStructure; crossReferenceCount: number } {
    catechism = structuredClone(catechism);

    const paragraphNumbers = getAllParagraphs(catechism).map((p) => p.paragraphNumber);
    const maxParagraphNumber = Math.max(...paragraphNumbers);

    const prologueResults = helper([catechism.prologue], maxParagraphNumber, 0);
    (catechism as any).prologue = prologueResults.content[0];

    const partsResults = helper(catechism.parts, maxParagraphNumber, prologueResults.crossReferenceCount);
    (catechism as any).parts = partsResults.content;

    return {
        catechism,
        crossReferenceCount: partsResults.crossReferenceCount,
    };

    function helper(
        content: Array<ContentBase>,
        maxParagraphNumber: number,
        crossReferenceCount: number,
    ): { content: Array<ContentBase>; crossReferenceCount: number } {
        content.forEach((c) => {
            // Only build cross-references for paragraphs outside of the "In Brief" sections
            const properContent = Content.PARAGRAPH_GROUP === c.contentType || Content.TEXT_WRAPPER === c.contentType;
            if (properContent && chance(Probability.crossReference.create)) {
                const references = buildReferences(maxParagraphNumber);
                (c as any)['paragraphReferences'] = references;
                crossReferenceCount += references.length;
            } else if (Content.IN_BRIEF !== c.contentType && hasMainContent(c)) {
                const childContent = getAllChildContent(c);

                const results = helper(
                    childContent,
                    maxParagraphNumber,
                    crossReferenceCount,
                );
                crossReferenceCount = results.crossReferenceCount;

                return results;
            }
        });

        return { content, crossReferenceCount };
    }

    function buildReferences(maxParagraphNumber: number): Array<NumberOrNumberRange> {
        return chance(Probability.crossReference.multiple)
            ? buildMultipleReferences(maxParagraphNumber)
            : [buildReference(maxParagraphNumber)];
    }

    function buildMultipleReferences(maxParagraphNumber: number): Array<NumberOrNumberRange> {
        const references = intArrayOfRandomLength(getLimits().paragraph.crossReference.count).map(() => buildReference(maxParagraphNumber));

        // Ensure there are no duplicate cross-references
        return Array.from(new Set(references));
    }

    function buildReference(maxParagraphNumber: number): NumberOrNumberRange {
        const buildRange = chance(Probability.crossReference.range);
        const paragraphLimits: MinMax = { min: 1, max: maxParagraphNumber };

        if (buildRange) {
            const num1 = randomInt(paragraphLimits);
            let num2 = num1 + randomInt(getLimits().paragraph.crossReference.range);

            while (num2 > maxParagraphNumber) {
                num2--;
            }

            // deno-fmt-ignore
            return  num2 > num1
                ? `${num1}–${num2}`
                : num1;
        } else {
            return randomInt(paragraphLimits);
        }
    }
}
//#endregion
