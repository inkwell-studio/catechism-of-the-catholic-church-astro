import { buildArticle } from './article.ts';
import { getTitleText } from './general.ts';
import { buildInBrief } from './in-brief.ts';
import { buildSubarticle } from './subarticle.ts';
import { buildTextContent } from './text-content.ts';
import { getLimits } from '../../config/limits.ts';
import { Probability } from '../../config/probability.ts';
import { chance, getContentCounts, intArrayOfRandomLength, randomBoolean } from '../../utils.ts';
import { Article, Chapter, Content, ContentBase, InBrief, Subarticle, TextContent } from '../../../source/types/types.ts';

export function buildChapter(chapterNumber: number): Chapter {
    const inBrief = buildInBriefHelper();

    const openingContent = randomBoolean() ? buildOpeningContent() : [];
    const mainContent = buildMainContent(openingContent, !!inBrief);

    return {
        contentType: Content.CHAPTER,
        // This will be set later, after all content is created
        pathID: '0',
        // This will be set later, after all content is created
        semanticPath: '',
        chapterNumber,
        title: getTitleText(Content.CHAPTER, chapterNumber),
        openingContent,
        mainContent,
        finalContent: [],
        inBrief,
    };
}

function buildOpeningContent(): Array<TextContent> {
    return intArrayOfRandomLength(getLimits().chapter.openingContent.textContent).map(() => buildTextContent(true));
}

function buildMainContent(
    precedingContent: Array<ContentBase>,
    hasInBrief: boolean,
): Array<Article> | Array<Subarticle> {
    const contentCounts = getContentCounts(precedingContent);

    if (hasInBrief) {
        // Chapters with an In Brief item contain no Articles
        const offset = contentCounts.get(Content.SUB_ARTICLE) ?? 0;
        return intArrayOfRandomLength(getLimits().chapter.subarticle).map((i) => buildSubarticle(i + offset));
    } else {
        const useArticles = chance(Probability.chapter.useArticles);
        if (useArticles) {
            const offset = contentCounts.get(Content.ARTICLE) ?? 0;
            return intArrayOfRandomLength(getLimits().chapter.article).map((i) => buildArticle(i + offset));
        } else {
            const offset = contentCounts.get(Content.SUB_ARTICLE) ?? 0;
            return intArrayOfRandomLength(getLimits().chapter.subarticle).map((i) => buildSubarticle(i + offset));
        }
    }
}

function buildInBriefHelper(): InBrief | null {
    return chance(Probability.chapter.inBrief) ? buildInBrief() : null;
}
