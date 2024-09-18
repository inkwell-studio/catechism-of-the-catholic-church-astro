import { getLimits } from '../config/limits.ts';
import { Probability } from '../config/probability.ts';
import { getText, getUniqueWords } from '../parts/text-samples.ts';
import { chance, indexLimits, intArrayOfRandomLength, randomInt } from '../utils.ts';

import {
    CatechismStructure,
    Glossary,
    GlossaryEntry,
    Language,
    Mutable,
    ParagraphReference,
    ReferenceBase,
    ReferenceEnum,
    TextSimple,
} from '../../../source/types/types.ts';
import { getAllParagraphs } from '@catechism/source/utils/content.ts';

export function build(catechism: CatechismStructure): Glossary {
    const paragraphNumbers = getAllParagraphs(catechism).map((p) => p.paragraphNumber);
    const maxParagraphNumber = Math.max(...paragraphNumbers);

    const numberOfEntries = getLimits().glossary.entries.max;

    let entries = getArray(numberOfEntries).map((_n, index) => buildEntry(index, numberOfEntries, maxParagraphNumber, catechism.language));
    entries = populateSeeAlsoFields(entries);

    return entries;
}

function getArray(size: number): Array<null> {
    return new Array(size).fill(null);
}

function buildEntry(index: number, numberOfEntries: number, maxParagraphNumber: number, language: Language): GlossaryEntry {
    const uniqueWords = getUniqueWords(language);

    if (uniqueWords.length < numberOfEntries) {
        throw new Error(`Not enough unique words provided: ${numberOfEntries} needed, ${uniqueWords.length} provided`);
    }

    const term = uniqueWords[index];

    // deno-fmt-ignore
    const seeAlso = chance(Probability.glossary.seeAlso)
        ? buildSeeAlsoArray()
        : []

    // deno-fmt-ignore
    const content = seeAlso.length === 0 || chance(Probability.glossary.hasTextIfHasSeeAlso)
        ? buildContent(maxParagraphNumber)
        : [];

    return {
        term,
        content,
        seeAlso,
    };
}

function buildContent(maxParagraphNumber: number): Array<TextSimple | ReferenceBase> {
    const text = {
        content: getText(),
        strong: false,
        emphasis: false,
        smallCaps: false,
    };

    const paragraphReferences = buildParagraphReferences(maxParagraphNumber);

    return [text, ...paragraphReferences];
}

function buildParagraphReferences(maxParagraphNumber: number): Array<ParagraphReference> {
    const references: Array<ParagraphReference> = [];

    if (chance(Probability.glossary.paragraphReference)) {
        intArrayOfRandomLength(getLimits().glossary.entry.paragraphReferences).forEach(() => {
            references.push({
                referenceType: ReferenceEnum.CATECHISM_PARAGRAPH,
                direct: true,
                folio: false,
                paragraphNumber: randomInt({ min: 1, max: maxParagraphNumber }),
            });
        });
    }

    return references;
}

function buildSeeAlsoArray(): Array<string> {
    // The actual values will be set after the entire glossary is built
    return intArrayOfRandomLength(getLimits().glossary.entry.seeAlso).map(() => '(placeholder)');
}

function populateSeeAlsoFields(glossary: Mutable<Glossary>): Glossary {
    glossary = structuredClone(glossary);

    const termsUsed = glossary.map((entry) => entry.term);

    for (const entry of glossary) {
        entry.seeAlso = entry.seeAlso.map(() => buildSeeAlsoItem(termsUsed, entry.term));
    }

    return glossary;
}

function buildSeeAlsoItem(termBank: Array<string>, termToExclude: string): string {
    let seeAlsoTerm = '';

    while (!seeAlsoTerm || seeAlsoTerm === termToExclude) {
        seeAlsoTerm = termBank[randomInt(indexLimits(termBank))];
    }

    return seeAlsoTerm;
}
