import { Limit } from '../config/limit.ts';
import { Probability } from '../config/probability.ts';
import { chance, indexLimits, randomBoolean, randomInt } from '../utils.ts';
import { getLanguage } from '../../language-state.ts';
import { getContentTitle } from '../../../artifact-builders/utils.ts';
import {
    BibleBook,
    BibleReference,
    Content,
    Language,
    NumberOrNumberRange,
    OtherReference,
    OtherSourceEnum,
    Reference,
    ReferenceCollection,
    ReferenceEnum,
} from '../../../source/types/types.ts';

export function getTitleText(contentType: Content, num: number): string {
    const language = getLanguage();
    return getContentTitle(language, contentType) + ' ' + num;
}

export function buildReferenceCollection(): ReferenceCollection {
    const language = getLanguage();

    return {
        // This will be set later, after all content is created
        referenceNumber: 0,
        references: buildReferences(language),
    };
}

function buildReferences(language: Language): Array<Reference> {
    const references = [];
    let numReferences = 0;

    if (chance(Probability.references.count.one)) {
        numReferences = 1;
    }
    if (chance(Probability.references.count.two)) {
        numReferences = 2;
    }
    if (chance(Probability.references.count.three)) {
        numReferences = 3;
    }

    for (let i = 0; i < numReferences; i++) {
        const reference = randomBoolean() ? buildBibleReference() : buildOtherReference(language);
        references.push(reference);
    }

    return references;
}

function buildBibleReference(): BibleReference {
    const books = [
        BibleBook.GENESIS,
        BibleBook.PSALMS,
        BibleBook.MICAH,
        BibleBook.JOHN,
        BibleBook.ACTS_OF_THE_APOSTLES,
        BibleBook.EPHESIANS,
        BibleBook.HEBREWS,
    ];

    let verses: NumberOrNumberRange = randomInt(Limit.bibleReference.verses);
    const multipleVerses = randomBoolean();
    if (multipleVerses) {
        const upperVerse = verses + randomInt(Limit.bibleReference.verseRangeSize);
        verses = `${verses}–${upperVerse}`;
    }

    const auxillaryText = chance(Probability.references.bible.auxillaryText) ? 'Vulgate' : null;

    return {
        referenceType: ReferenceEnum.BIBLE,
        direct: randomBoolean(),
        book: books[randomInt(indexLimits(books))],
        chapter: randomInt(Limit.bibleReference.chapter),
        verses,
        auxillaryText,
    };
}

function buildOtherReference(language: Language): OtherReference {
    const sources = [
        OtherSourceEnum.CHRISTIFIDELES_LAICI,
        OtherSourceEnum.GAUDIUM_ET_SPES,
        OtherSourceEnum.HUMANAE_VITAE,
    ];

    return {
        referenceType: ReferenceEnum.OTHER,
        direct: randomBoolean(),
        source: sources[randomInt(indexLimits(sources))],
        pointer: getPointer(language),
    };
}

function getPointer(language: Language): string | null {
    const pointers = getPointers(language);
    return pointers[randomInt(indexLimits(pointers))];
}

function getPointers(language: Language): Array<string | null> {
    switch (language) {
        case Language.ENGLISH:
            return getPointersEnglish();
        case Language.LATIN:
            return getPointersLatin();
        case Language.SPANISH:
            return getPointersSpanish();
    }
}

function getPointersEnglish(): Array<string | null> {
    return [
        null,
        '398–401',
        '742',
        'Ch. IX, p.4',
        'Article VII, 8, 3, 1-2',
    ];
}

function getPointersLatin(): Array<string | null> {
    return [
        null,
        '22–23',
        '342',
    ];
}

function getPointersSpanish(): Array<string | null> {
    return [
        null,
        '424–438',
        '32',
    ];
}
