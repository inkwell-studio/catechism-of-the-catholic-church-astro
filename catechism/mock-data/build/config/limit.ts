export const Limit = {
    article: {
        // The number of Article > ArticleParagraphs
        articleParagraph: { min: 3, max: 3 },
        paragraph: { min: 1, max: 3 },
        paragraphGroup: { min: 1, max: 3 },
        subarticle: { min: 2, max: 3 },
        textContent: { min: 1, max: 3 },
    },
    articleParagraph: {
        // The number of ArticleParagraph > Subarticles
        subarticle: { min: 2, max: 3 },
    },
    bibleReference: {
        chapter: { min: 1, max: 3 },
        verses: { min: 1, max: 3 },
        verseRangeSize: { min: 1, max: 3 },
    },
    blockQuote: {
        text: { min: 1, max: 3 },
    },
    chapter: {
        article: { min: 1, max: 3 },
        subarticle: { min: 1, max: 3 },
        openingContent: {
            subarticle: { min: 1, max: 3 },
            textContent: { min: 1, max: 3 },
        },
    },
    inBrief: {
        paragraph: { min: 3, max: 5 },
    },
    paragraph: {
        crossReference: {
            // The number of cross references to build when building multiple
            count: { min: 2, max: 3 },
            // The size of the verse range to build to when building a range-type cross reference (e.g. §1147-1149)
            range: { min: 2, max: 3 },
        },
        textBlock: { min: 1, max: 3 },
    },
    paragraphGroup: {
        text: { min: 1, max: 3 },
    },
    paragraphSubitem: {
        textBlock: { min: 1, max: 3 },
    },
    paragraphSubitemContainer: {
        subitem: { min: 2, max: 7 },
    },
    part: {
        openingContent: { min: 1, max: 3 },
        multipleSections: { min: 2, max: 3 },
    },
    prologue: {
        text: { min: 3, max: 3 },
        subarticle: { min: 3, max: 3 },
    },
    section: {
        article: { min: 2, max: 3 },
        paragraphGroup: { min: 2, max: 3 },
        multipleChapter: { min: 2, max: 3 },
        openingContent: { min: 1, max: 3 },
    },
    subarticle: {
        contentItem: { min: 2, max: 3 },
        textContent: { min: 1, max: 3 },
    },
    textBlock: {
        textWrapper: { min: 1, max: 3 },
    },
    textWrapper: {
        part: { min: 1, max: 3 },
    },
} as const;
