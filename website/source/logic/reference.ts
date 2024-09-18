import { BibleBook, BibleReference, Language, OtherReference, OtherSourceEnum } from '@catechism/source/types/types.ts';

export function getBibleReferenceUrl(reference: BibleReference, language: Language): string {
    const book = getBibleReferenceUrlBook(reference.book);

    let bibleNumber = '';
    let languageTag = '';
    if (Language.ENGLISH === language) {
        bibleNumber = '2015';
        languageTag = 'NRSV-CI';
    } else if (Language.LATIN === language) {
        bibleNumber = '823';
        languageTag = 'VULG';
    } else if (Language.SPANISH === language) {
        bibleNumber = '52';
        languageTag = 'DHH94I';
    }

    return `https://www.bible.com/bible/${bibleNumber}/${book}.${reference.chapter}.${languageTag}`;
}

export function getBibleReferenceUrlBook(book: BibleBook): string {
    // TODO: Add cases for the remaining books when the destination URL has been finalized
    switch (book) {
        case BibleBook.GENESIS:
            return 'GEN';
        case BibleBook.PSALMS:
            return 'PSA';
        case BibleBook.MICAH:
            return 'MIC';
        case BibleBook.JOHN:
            return 'JHN';
        case BibleBook.ACTS_OF_THE_APOSTLES:
            return 'ACT';
        case BibleBook.EPHESIANS:
            return 'EPH';
        case BibleBook.HEBREWS:
            return 'HEB';
        default: {
            console.warn(`Unknown Bible book encountered: ${book}`);
            return '';
        }
    }
}

export function getOtherReferenceUrl(reference: OtherReference, language: Language): string {
    switch (reference.source) {
        case OtherSourceEnum.CHRISTIFIDELES_LAICI:
            return `https://www.vatican.va/content/john-paul-ii/${language}/apost_exhortations/documents/hf_jp-ii_exh_30121988_christifideles-laici.html`;
        case OtherSourceEnum.GAUDIUM_ET_SPES: {
            switch (language) {
                case Language.ENGLISH:
                    return 'https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651207_gaudium-et-spes_en.html';
                case Language.LATIN:
                    return 'https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651207_gaudium-et-spes_lt.html';
                case Language.SPANISH:
                    return 'https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651207_gaudium-et-spes_sp.html';
                default: {
                    console.warn(`Unhandled language encountered: ${language}`);
                    return '';
                }
            }
        }
        case OtherSourceEnum.HUMANAE_VITAE:
            return `https://www.vatican.va/content/paul-vi/${language}/encyclicals/documents/hf_p-vi_enc_25071968_humanae-vitae.html`;
    }
}
