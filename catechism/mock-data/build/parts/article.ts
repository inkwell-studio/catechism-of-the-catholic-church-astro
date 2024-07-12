import { buildArticleParagraph } from './article-paragraph.ts';
import { getTitleText } from './general.ts';
import { buildInBrief } from './in-brief.ts';
import { buildParagraph } from './paragraph.ts';
import { buildParagraphGroup } from './paragraph-group.ts';
import { buildSubarticle } from './subarticle.ts';
import { buildTextContent } from './text-content.ts';
import { Limit } from '../config/limit.ts';
import { Probability } from '../config/probability.ts';
import { chance, getContentCounts, intArrayOfRandomLength } from '../utils.ts';
import {
    Article,
    ArticleParagraph,
    Content,
    ContentBase,
    Paragraph,
    ParagraphGroup,
    Subarticle,
    TextContent,
} from '../../../source/types/types.ts';

export function buildArticle(articleNumber: number): Article {
    const useArticleParagraphs = chance(Probability.article.useArticleParagraphs);

    const openingContent = buildOpeningContent();
    const mainContent = buildMainContent(openingContent, useArticleParagraphs);

    // Articles with Article Paragraphs have no In Brief content or final content
    const inBrief = useArticleParagraphs ? null : buildInBrief();
    const finalContent = useArticleParagraphs ? [] : buildFinalContent([...openingContent, ...mainContent]);

    return {
        contentType: Content.ARTICLE,
        // This will be set later, after all content is created
        pathID: '0',
        // This will be set later, after all content is created
        semanticPath: '',
        articleNumber,
        title: getTitleText(Content.ARTICLE, articleNumber),
        openingContent,
        mainContent,
        finalContent,
        inBrief,
    };
}

function buildOpeningContent(): Array<TextContent> {
    return intArrayOfRandomLength(Limit.article.textContent).map(() => buildTextContent(false));
}

function buildMainContent(
    precedingContent: Array<ContentBase>,
    useArticleParagraphs: boolean,
): Array<ArticleParagraph> | Array<Subarticle> | Array<ParagraphGroup | Paragraph> {
    const contentCounts = getContentCounts(precedingContent);

    if (useArticleParagraphs) {
        return intArrayOfRandomLength(Limit.article.articleParagraph).map((i) => {
            const offset = contentCounts.get(Content.ARTICLE_PARAGRAPH) ?? 0;
            return buildArticleParagraph(i + offset);
        });
    } else {
        const useSubarticles = chance(Probability.article.useSubarticles);
        if (useSubarticles) {
            const offset = contentCounts.get(Content.SUB_ARTICLE) ?? 0;
            return intArrayOfRandomLength(Limit.article.subarticle).map((i) => buildSubarticle(i + offset));
        } else {
            const offset = contentCounts.get(Content.PARAGRAPH_GROUP) ?? 0;
            const paragraphs = intArrayOfRandomLength(Limit.article.paragraph).map(() => buildParagraph());
            const paragraphGroups = intArrayOfRandomLength(Limit.article.paragraphGroup).map((i) => buildParagraphGroup(i + offset));

            return [...paragraphs, ...paragraphGroups];
        }
    }
}

function buildFinalContent(precedingContent: Array<ContentBase>): Array<ParagraphGroup> {
    const includeFinalContent = chance(Probability.article.includeFinalContent);
    if (includeFinalContent) {
        const offset = getContentCounts(precedingContent).get(Content.PARAGRAPH_GROUP) ?? 0;
        return [buildParagraphGroup(1 + offset)];
    } else {
        return [];
    }
}
