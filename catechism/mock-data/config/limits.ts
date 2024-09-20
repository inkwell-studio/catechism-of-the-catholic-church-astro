//#region top-level items
export function setLimits(size: LimitsSize): void {
    limitsSize = size;
}

export function getLimits(): Limits {
    switch (limitsSize) {
        case LimitsSize.MINIMAL:
            return limitsMinimal;

        case LimitsSize.TINY:
            return limitsTiny;

        case LimitsSize.MEDIUM:
            return limitsMedium;
    }
}

export enum LimitsSize {
    MINIMAL = 'minimal',
    TINY = 'tiny',
    MEDIUM = 'medium',
}

export interface Limit {
    min: number;
    max: number;
}

interface Limits {
    article: {
        // The number of Article > ArticleParagraphs
        articleParagraph: Limit;
        paragraph: Limit;
        paragraphGroup: Limit;
        subarticle: Limit;
        textContent: Limit;
    };
    articleParagraph: {
        // The number of ArticleParagraph > Subarticles
        subarticle: Limit;
    };
    bibleReference: {
        chapter: Limit;
        verses: Limit;
        verseRangeSize: Limit;
    };
    blockQuote: {
        text: Limit;
    };
    chapter: {
        article: Limit;
        subarticle: Limit;
        openingContent: {
            subarticle: Limit;
            textContent: Limit;
        };
    };
    glossary: {
        entries: Limit;
        entry: {
            paragraphReferences: Limit;
            seeAlso: Limit;
        };
    };
    inBrief: {
        paragraph: Limit;
    };
    paragraph: {
        crossReference: {
            // The number of cross-references to build when building multiple
            count: Limit;
            // The size of the verse range to build to when building a range-type cross-reference (e.g. §1147-1149)
            range: Limit;
        };
        textBlock: Limit;
    };
    paragraphGroup: {
        text: Limit;
    };
    paragraphSubitem: {
        textBlock: Limit;
    };
    paragraphSubitemContainer: {
        subitem: Limit;
    };
    part: {
        openingContent: Limit;
        multipleSections: Limit;
    };
    prologue: {
        text: Limit;
        subarticle: Limit;
    };
    section: {
        article: Limit;
        paragraphGroup: Limit;
        multipleChapter: Limit;
        openingContent: Limit;
    };
    subarticle: {
        contentItem: Limit;
        textContent: Limit;
    };
    textBlock: {
        textWrapper: Limit;
    };
    textWrapper: {
        part: Limit;
    };
}

let limitsSize: LimitsSize = LimitsSize.MINIMAL;
//#endregion

//#region the actual limits
const limitsMinimal: Limits = {
    article: {
        articleParagraph: { min: 1, max: 1 },
        paragraph: { min: 1, max: 1 },
        paragraphGroup: { min: 1, max: 1 },
        subarticle: { min: 1, max: 1 },
        textContent: { min: 1, max: 1 },
    },
    articleParagraph: {
        subarticle: { min: 1, max: 1 },
    },
    bibleReference: {
        chapter: { min: 1, max: 1 },
        verses: { min: 1, max: 1 },
        verseRangeSize: { min: 1, max: 1 },
    },
    blockQuote: {
        text: { min: 1, max: 1 },
    },
    chapter: {
        article: { min: 1, max: 1 },
        subarticle: { min: 1, max: 1 },
        openingContent: {
            subarticle: { min: 1, max: 1 },
            textContent: { min: 1, max: 1 },
        },
    },
    glossary: {
        entries: { min: 1, max: 1 },
        entry: {
            paragraphReferences: { min: 1, max: 1 },
            seeAlso: { min: 1, max: 1 },
        },
    },
    inBrief: {
        paragraph: { min: 1, max: 1 },
    },
    paragraph: {
        crossReference: {
            count: { min: 1, max: 1 },
            range: { min: 1, max: 1 },
        },
        textBlock: { min: 1, max: 1 },
    },
    paragraphGroup: {
        text: { min: 1, max: 1 },
    },
    paragraphSubitem: {
        textBlock: { min: 1, max: 1 },
    },
    paragraphSubitemContainer: {
        subitem: { min: 1, max: 1 },
    },
    part: {
        openingContent: { min: 1, max: 1 },
        multipleSections: { min: 1, max: 1 },
    },
    prologue: {
        text: { min: 1, max: 1 },
        subarticle: { min: 1, max: 1 },
    },
    section: {
        article: { min: 1, max: 1 },
        paragraphGroup: { min: 1, max: 1 },
        multipleChapter: { min: 1, max: 1 },
        openingContent: { min: 1, max: 1 },
    },
    subarticle: {
        contentItem: { min: 1, max: 1 },
        textContent: { min: 1, max: 1 },
    },
    textBlock: {
        textWrapper: { min: 1, max: 1 },
    },
    textWrapper: {
        part: { min: 1, max: 1 },
    },
};

const limitsTiny: Limits = {
    article: {
        articleParagraph: { min: 1, max: 3 },
        paragraph: { min: 1, max: 1 },
        paragraphGroup: { min: 1, max: 1 },
        subarticle: { min: 1, max: 1 },
        textContent: { min: 1, max: 1 },
    },
    articleParagraph: {
        subarticle: { min: 1, max: 1 },
    },
    bibleReference: {
        chapter: { min: 1, max: 1 },
        verses: { min: 1, max: 1 },
        verseRangeSize: { min: 1, max: 1 },
    },
    blockQuote: {
        text: { min: 1, max: 1 },
    },
    chapter: {
        article: { min: 1, max: 3 },
        subarticle: { min: 1, max: 1 },
        openingContent: {
            subarticle: { min: 1, max: 1 },
            textContent: { min: 1, max: 1 },
        },
    },
    glossary: {
        entries: { min: 400, max: 400 },
        entry: {
            paragraphReferences: { min: 1, max: 3 },
            seeAlso: { min: 1, max: 3 },
        },
    },
    inBrief: {
        paragraph: { min: 1, max: 1 },
    },
    paragraph: {
        crossReference: {
            count: { min: 1, max: 1 },
            range: { min: 1, max: 1 },
        },
        textBlock: { min: 1, max: 1 },
    },
    paragraphGroup: {
        text: { min: 1, max: 1 },
    },
    paragraphSubitem: {
        textBlock: { min: 1, max: 1 },
    },
    paragraphSubitemContainer: {
        subitem: { min: 1, max: 1 },
    },
    part: {
        openingContent: { min: 1, max: 1 },
        multipleSections: { min: 1, max: 3 },
    },
    prologue: {
        text: { min: 1, max: 1 },
        subarticle: { min: 1, max: 3 },
    },
    section: {
        article: { min: 1, max: 3 },
        paragraphGroup: { min: 1, max: 3 },
        multipleChapter: { min: 1, max: 3 },
        openingContent: { min: 1, max: 1 },
    },
    subarticle: {
        contentItem: { min: 1, max: 1 },
        textContent: { min: 1, max: 1 },
    },
    textBlock: {
        textWrapper: { min: 1, max: 1 },
    },
    textWrapper: {
        part: { min: 1, max: 1 },
    },
};

const limitsMedium: Limits = {
    article: {
        articleParagraph: { min: 3, max: 3 },
        paragraph: { min: 1, max: 3 },
        paragraphGroup: { min: 1, max: 3 },
        subarticle: { min: 2, max: 3 },
        textContent: { min: 1, max: 3 },
    },
    articleParagraph: {
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
    glossary: {
        entries: { min: 400, max: 400 },
        entry: {
            paragraphReferences: { min: 1, max: 4 },
            seeAlso: { min: 1, max: 3 },
        },
    },
    inBrief: {
        paragraph: { min: 3, max: 5 },
    },
    paragraph: {
        crossReference: {
            count: { min: 2, max: 3 },
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
};
//#endregion
