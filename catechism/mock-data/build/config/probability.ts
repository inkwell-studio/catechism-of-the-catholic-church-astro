export const Probability = {
    article: {
        // The probability that an Article contains solely ArticleParagraphs
        useArticleParagraphs: 0.20,
        // The probability that an Article contains solely Subarticles, given that it doesn't already contain ArticleParagraphs
        useSubarticles: 0.70,
        // The probability that final content will be included, given that it is logically possible
        includeFinalContent: 0.2,
    },
    chapter: {
        // The probability of using exclusively Articles instead of using exclusively Subarticles for the main content
        useArticles: 0.75,
        // The probability of creating an InBrief object at the end of a Chapter
        inBrief: 0.1,
    },
    crossReference: {
        // The probability of creating a Paragraph cross reference from a Text object
        create: 0.5,
        // The probability that multiple cross references will be created instead of a single one
        multiple: 0.20,
        // The probability that a cross reference will reference a range paragraphs instead of a single one
        range: 0.15,
    },
    part: {
        hasOpeningContent: 0.3,
        multipleSections: 0.75,
    },
    references: {
        // The probability that a list of References will contain the following number of references
        count: {
            one: 0.36,
            two: 0.20,
            three: 0.07,
        },
        bible: {
            // The probability that a Bible reference contains auxillary text (see §1202)
            auxillaryText: 0.05,
        },
    },
    section: {
        // The probability of using exclusively Chapters instead of using exclusively Articles for the main content
        useChapters: 0.8,
        multipleChapters: 0.75,
        hasOpeningText: 0.5,
        hasInBrief: 0.15,
    },
    subarticle: {
        // The probability that a content item will be a ParagraphGroup
        paragraphGroup: 0.75,
    },
    textBlock: {
        // The probability that a TextBlock will be designated as "supplementary"
        supplementary: 0.20,
    },
    textContent: {
        // The probability that desired TextContent is a BlockQuote object instead of a TextBlock object
        blockQuote: 0.25,
    },
    text: {
        strong: 0.1,
        emphasis: 0.1,
        smallCaps: 0.05,
    },
} as const;
