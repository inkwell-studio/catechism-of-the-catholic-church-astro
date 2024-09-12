import {
    Article,
    CatechismStructure,
    Container,
    ContentBase,
    ContentContainer,
    InBriefContainer,
    Language,
    Mutable,
    PathID,
} from '@catechism/source/types/types.ts';
import {
    hasInBrief,
    isArticle,
    isArticleParagraph,
    isChapter,
    isInBrief,
    isPart,
    isPrologue,
    isSection,
} from '@catechism/source/utils/content.ts';
import {
    getContainerInfo,
    getPartialDescendentPathID,
    getRoot,
    getTopNumber,
    hasChildren,
    isPrologueContent,
} from '@catechism/source/utils/path-id.ts';

import { getContentMap } from './artifacts.ts';

export function loadContent(language: Language, pathID: PathID): ContentContainer {
    try {
        const contentMap = getContentMap(language);
        return contentMap[pathID];
    } catch (error) {
        throw new Error(`Failed to load content (${language}: ${pathID})`, error);
    }
}

export function getContentForRendering(pathID: PathID, catechism: CatechismStructure): ContentContainer {
    // If anything in the Prologue is requested, return the entire Prologue
    const isInPrologue = isPrologueContent(pathID);
    if (isInPrologue) {
        return catechism.prologue;
    } else {
        const partNumber = getTopNumber(pathID);
        const part = catechism.parts[partNumber - 1];

        if (partNumber === Number(pathID)) {
            return trimContentForRendering(part, TrimMode.FULL);
        } else {
            return getDescendentForRendering(part, pathID);
        }
    }
}

enum TrimMode {
    FULL = 'FULL',
    BYPASS = 'BYPASS',
    KEEP_ENDING = 'KEEP_ENDING',
}

function getDescendentForRendering(contentContainer: ContentContainer, pathID: PathID): ContentContainer {
    const { leaf, ancestors, articleTrimMode } = getRenderableLeaf(contentContainer, pathID);
    const content = getGreatestDirectParent(leaf, ancestors);
    return trimContentForRendering(content, articleTrimMode);
}

function getRenderableLeaf(
    potentialLeaf: ContentContainer,
    pathID: PathID,
): { leaf: ContentContainer; ancestors: Array<ContentContainer>; articleTrimMode: TrimMode } {
    const ancestors: Array<ContentContainer> = [];
    let articleTrimMode = TrimMode.FULL;

    let partialPathID = pathID;
    let childExists = hasChildren(partialPathID);
    let renderableLeafReached = isRenderableLeaf(potentialLeaf);

    while (childExists && !renderableLeafReached) {
        ancestors.push(potentialLeaf);

        const nextPartialPathID = getPartialDescendentPathID(partialPathID);
        if (nextPartialPathID) {
            partialPathID = nextPartialPathID;

            // Except for Articles, only the first main child of an item may be a renderable leaf if the item itself is not.
            // The ArticleParagraphs within an Article are renderable leaves so long as they are not the first main child.
            if (!isArticle(potentialLeaf)) {
                potentialLeaf = getNextChild(potentialLeaf, partialPathID) as ContentContainer;
                renderableLeafReached = isRenderableLeaf(potentialLeaf);
            } else {
                const articleHasMultipleArticleParagraphs = potentialLeaf.mainContent.filter((c) => isArticleParagraph(c)).length > 1;

                const child = getNextChild(potentialLeaf, partialPathID);
                const isFinalContent = isFinalContentChild(child.pathID);

                if (isFinalContent) {
                    articleTrimMode = articleHasMultipleArticleParagraphs ? TrimMode.KEEP_ENDING : TrimMode.BYPASS;
                } else {
                    if (isArticleParagraph(child)) {
                        if (!articleHasMultipleArticleParagraphs) {
                            articleTrimMode = TrimMode.BYPASS;
                        } else {
                            const isFirstChild = isFirstMainChild(child.pathID);
                            const isLastChild = isLastMainChild(child.pathID, potentialLeaf);
                            const articleHasInBrief = !!(potentialLeaf as InBriefContainer).inBrief;
                            const articleHasFinalContent = potentialLeaf.finalContent.length > 0;

                            if (isFirstChild) {
                                articleTrimMode = TrimMode.FULL;
                            } else if (isLastChild && (articleHasInBrief || articleHasFinalContent)) {
                                articleTrimMode = TrimMode.KEEP_ENDING;
                            } else {
                                potentialLeaf = child;
                            }
                        }
                    } else if (isInBrief(child)) {
                        articleTrimMode = articleHasMultipleArticleParagraphs ? TrimMode.KEEP_ENDING : TrimMode.BYPASS;
                    } else {
                        articleTrimMode = articleHasMultipleArticleParagraphs ? TrimMode.FULL : TrimMode.BYPASS;
                    }
                }
                renderableLeafReached = true;
            }

            childExists = hasChildren(partialPathID);
        } else {
            childExists = false;
        }
    }

    return {
        leaf: potentialLeaf,
        ancestors,
        articleTrimMode,
    };
}

/**
 * @param leaf
 * @param ancestors the list of nodes that are ancestors of `leaf`, in descending order (i.e. the last ancestor in the list is the parent of `leaf`)
 * @returns The highest parent of `leaf` of which `leaf` and all intermediaries are a "direct" descendent of (i.e. the first main-content child). If no such parent exists, `leaf` is returned
 */
function getGreatestDirectParent(leaf: ContentContainer, ancestors: Array<ContentContainer>): ContentContainer {
    let content = leaf;

    let useAncestor = isFirstMainChild(content.pathID);
    while (useAncestor) {
        const ancestor = ancestors.pop();
        if (ancestor) {
            content = ancestor;
            useAncestor = isFirstMainChild(content.pathID);
        } else {
            throw new Error(
                `An ancestor could not be found where expected. PathID: ${content.pathID}`,
            );
        }
    }

    return content;
}

function trimContentForRendering(content: ContentContainer, articleTrimMode: TrimMode): ContentContainer {
    if (TrimMode.BYPASS === articleTrimMode) {
        return content;
    } else {
        return trim(content, articleTrimMode);
    }
}

function trim(content: ContentContainer, articleTrimMode: TrimMode): ContentContainer {
    const shouldTrimContent = contentShouldBeTrimmed(content, articleTrimMode);

    if (shouldTrimContent) {
        content = structuredClone(content);
        trimHelper(content, articleTrimMode);
    }

    return content;

    function trimHelper(c: Mutable<ContentContainer>, articleTrimMode: TrimMode): void {
        if (!isArticle(c) || TrimMode.FULL === articleTrimMode) {
            c.mainContent = c.mainContent.slice(0, 1);
            c.finalContent = [];

            const hasInBriefContent = hasInBrief(c);
            if (hasInBriefContent) {
                (c as Mutable<InBriefContainer>).inBrief = null;
            }
        } else if (TrimMode.KEEP_ENDING === articleTrimMode) {
            (c as Mutable<Article>).openingContent = [];
            (c as Mutable<Article>).mainContent = c.mainContent.slice(-1);
        }

        const trimContent = contentShouldBeTrimmed(c.mainContent[0] as ContentContainer, articleTrimMode);
        if (trimContent) {
            trimHelper(c.mainContent[0] as ContentContainer, articleTrimMode);
        }
    }
}

function contentShouldBeTrimmed(c: ContentContainer, articleTrimMode: TrimMode): boolean {
    const child = getFirstMainChild(c);

    const isHighLevelContent = isPrologue(c) || isPart(c);

    const isSectionWithHighLevelContent = isSection(c) && (isChapter(child) || isArticle(child));

    const isChapterWithArticles = isChapter(c) && isArticle(child);

    const isArticleWithArticleParagraphs = isArticle(c) && isArticleParagraph(child);

    return isHighLevelContent || isSectionWithHighLevelContent || isChapterWithArticles ||
        (isArticleWithArticleParagraphs && TrimMode.BYPASS !== articleTrimMode);
}

/**
 * @param content the parent
 * @param partialPathID the `PathID` of the child, with the beginning portion that is common with the parent omitted
 * @returns the child specified by `partialPathID` of `content`
 */
function getNextChild(content: ContentContainer, partialPathID: PathID): ContentBase {
    const root = getRoot(partialPathID);
    const info: ReturnType<typeof getContainerInfo> = getContainerInfo(root);

    if (info) {
        const container = info.container;
        const index = info.index;

        if (Container.IN_BRIEF === container) {
            const inBrief = (content as InBriefContainer).inBrief;
            if (inBrief) {
                return inBrief;
            } else {
                throw fail();
            }
        } else if (index !== null && index >= 0) {
            switch (container) {
                case Container.OPENING:
                    return content.openingContent[index];
                case Container.MAIN:
                    return content.mainContent[index];
                case Container.FINAL:
                    return content.finalContent[index];
                default:
                    throw fail();
            }
        } else {
            throw fail();
        }
    } else {
        throw fail();
    }

    function fail(): Error {
        return new Error(
            `Content could not be found. Parent PathID: ${content.pathID}, child info: ${JSON.stringify(info)}`,
        );
    }
}

/**
 * @returns `true` if the content item specified by the PathID is the first child of its parent's main content
 */
function isFirstMainChild(pathID: PathID): boolean {
    const info = getContainerInfo(pathID);
    return info?.container === Container.MAIN && info?.index === 0;
}

/**
 * @returns `true` if the content item specified by the PathID is the last child of its parent's main content
 */
function isLastMainChild(pathID: PathID, parent: ContentContainer): boolean {
    const info = getContainerInfo(pathID);
    return info?.container === Container.MAIN && info?.index === parent.mainContent.length - 1;
}

/**
 * @returns `true` if the content item specified by the PathID is a child of its parent's final content
 */
function isFinalContentChild(pathID: PathID): boolean {
    const info = getContainerInfo(pathID);
    return info?.container === Container.FINAL;
}

/**
 * @returns `true` if the content is a renderable item with no renderable children
 */
function isRenderableLeaf(content: ContentBase): boolean {
    if (isSection(content)) {
        const hasChildChapter = content.mainContent.some((child) => isChapter(child));
        const hasChildArticle = content.mainContent.some((child) => isArticle(child));
        return !hasChildChapter && !hasChildArticle;
    } else if (isChapter(content)) {
        const hasChildArticle = content.mainContent.some((child) => isArticle(child));
        return !hasChildArticle;
    } else if (isArticle(content)) {
        const hasNonInitialArticleParagraph = content.mainContent.slice(1).some((subsequentChild) => isArticleParagraph(subsequentChild));
        return !hasNonInitialArticleParagraph;
    } else if (isArticleParagraph(content)) {
        const isFirstChild = isFirstMainChild(content.pathID);
        if (isFirstChild) {
            throw new Error(
                `An unexpected content structure was encountered: neither an item or any of its children are renderable leafs. Content type: ${content.contentType}. PathID ${content.pathID}`,
            );
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function getFirstMainChild(content: ContentContainer): ContentBase {
    return content.mainContent[0];
}
