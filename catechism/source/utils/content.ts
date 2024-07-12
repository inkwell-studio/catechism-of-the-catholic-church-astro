import {
    CatechismStructure,
    Content,
    ContentBase,
    ContentContainer,
    InBrief,
    InBriefContainer,
    Language,
    NumberOrNumberRange,
    Paragraph,
    PathID,
    Reference,
    SemanticPath,
    TextWrapper,
} from '../types/types.ts';

export async function getCatechism(language: Language): Promise<CatechismStructure> {
    /*
        A more idiomatic approach would be to use a dynamic JSON import, but this causes problems with Fresh 1.6.5+
        e.g.
            const catechism = await import('./catechism-${language}.json`, { with: { type: 'json' } });
    */
    const filepath = `./catechism/content/catechism-${language}.json`;
    const catechism = await Deno.readTextFile(filepath);
    return JSON.parse(catechism);
}

export function hasFinalContent(content: ContentBase): boolean {
    return 'finalContent' in content && Array.isArray(content.finalContent);
}

export function hasMainContent(content: ContentBase): boolean {
    return 'mainContent' in content && Array.isArray(content.mainContent);
}

export function hasOpeningContent(content: ContentBase): boolean {
    return 'openingContent' in content && Array.isArray(content.openingContent);
}

export function hasInBrief(content: ContentBase): boolean {
    return 'inBrief' in content && !!content.inBrief;
}

/**
 * @returns the opening content of the argument if it has any; otherwise an empty array
 */
export function getOpeningContent(c: ContentBase | ContentContainer): Array<ContentBase> {
    return hasOpeningContent(c) ? (c as ContentContainer).openingContent : [];
}

/**
 * @returns the main content of the argument if it has any; otherwise an empty array
 */
export function getMainContent(c: ContentBase | ContentContainer): Array<ContentBase> {
    return hasMainContent(c) ? (c as ContentContainer).mainContent : [];
}

/**
 * @returns the final content of the argument if it has any; otherwise an empty array
 */
export function getFinalContent(c: ContentBase | ContentContainer): Array<ContentBase> {
    return hasFinalContent(c) ? (c as ContentContainer).finalContent : [];
}

/**
 * @returns the In Brief content of the argument if it has any; otherwise null
 */
export function getInBrief(c: ContentBase | InBriefContainer): InBrief | null {
    return hasInBrief(c) ? (c as InBriefContainer).inBrief : null;
}

export function getAllChildContent(c: ContentBase): Array<ContentBase> {
    const childContent = [
        ...getOpeningContent(c),
        ...getMainContent(c),
    ];

    const inBrief = getInBrief(c);
    if (inBrief) {
        childContent.push(inBrief);
    }

    childContent.push(...getFinalContent(c));

    return childContent;
}

export function getAllContent(catechism: CatechismStructure): Array<ContentContainer> {
    return [catechism.prologue, ...catechism.parts];
}

/**
 * @returns the `Paragraph`s of the Catechism in their listed order
 */
export function getAllParagraphs(catechism: CatechismStructure): Array<Paragraph> {
    const allContent = getAllContent(catechism);
    return getParagraphs(allContent);
}

export function getParagraphs(content: Array<ContentBase>): Array<Paragraph> {
    return getAll(content, Content.PARAGRAPH);
}

/**
 * @returns an array of paragraph numbers for all the paragraphs specified by `references`.
 * Paragraph ranges are split up into individual numbers; e.g. `'12-15'` becomes `[12, 13, 14, 15]`.
 */
export function getParagraphNumbers(reference: NumberOrNumberRange): Array<number> {
    if ('number' === typeof reference) {
        return [reference];
    } else {
        if (reference.includes('–')) {
            const [low, high] = reference.split('–').map((v) => Number(v));

            const numbers: Array<number> = [];
            if ('number' === typeof low && 'number' === typeof high) {
                for (let i = low; i <= high; i++) {
                    numbers.push(i);
                }
                return numbers;
            } else {
                throw new Error(`Failed to parse a paragraph cross-reference value: ${reference}`);
            }
        } else {
            const num = Number(reference);
            return num ? [num] : [];
        }
    }
}

export function getReferences(catechism: CatechismStructure): Array<Reference> {
    const content = getAllContent(catechism);
    const textWrappers = getAll<TextWrapper>(content, Content.TEXT_WRAPPER);
    return textWrappers
        .filter((tw) => !!tw.referenceCollection)
        .flatMap((tw) => tw.referenceCollection?.references) as Array<Reference>;
}

/**
 * @returns all items of the given content type, in the order that they are listed
 */
export function getAll<T extends ContentBase>(allContent: Array<ContentBase>, contentType: Content): Array<T> {
    return helper([], allContent, contentType);

    function helper(
        items: Array<T>,
        content: Array<ContentBase>,
        contentType: Content,
    ): Array<T> {
        content.forEach((c) => {
            if (c.contentType === contentType) {
                items.push(c as unknown as T);
            } else {
                const childContent = getAllChildContent(c);
                if (childContent.length > 0) {
                    helper(items, childContent, contentType);
                }
            }
        });

        return items;
    }
}

export function getAllPathIDs(catechism: CatechismStructure): Array<PathID> {
    const content = getAllContent(catechism);
    return getAllOfProperty<PathID>('pathID', content);
}

export function getAllSemanticPaths(catechism: CatechismStructure): Array<SemanticPath> {
    const content = getAllContent(catechism);
    return getAllOfProperty<SemanticPath>('semanticPath', content);
}

export function getAllOfProperty<T>(propertyName: keyof ContentBase, allContent: Array<ContentBase>): Array<T> {
    return allContent.flatMap((content) => helper(content));

    function helper(content: ContentBase): Array<T> {
        if (hasMainContent(content)) {
            const children = getAllChildContent(content);
            return [
                content[propertyName] as T,
                ...children.flatMap((child) => helper(child)),
            ];
        } else {
            return [content[propertyName] as T];
        }
    }
}
