import { getTitleText } from './general.ts';
import { buildInBrief } from './in-brief.ts';
import { buildSubarticle } from './subarticle.ts';
import { Limit } from '../config/limit.ts';
import { intArrayOfRandomLength } from '../utils.ts';
import { ArticleParagraph, Content, Subarticle } from '../../../source/types/types.ts';

export function buildArticleParagraph(articleParagraphNumber: number): ArticleParagraph {
    return {
        contentType: Content.ARTICLE_PARAGRAPH,
        // This will be set later, after all content is created
        pathID: '0',
        // This will be set later, after all content is created
        semanticPath: '',
        articleParagraphNumber,
        title: getTitleText(Content.ARTICLE_PARAGRAPH, articleParagraphNumber),
        openingContent: [],
        mainContent: buildMainContent(),
        finalContent: [],
        inBrief: buildInBrief(),
    };
}

function buildMainContent(): Array<Subarticle> {
    return intArrayOfRandomLength(Limit.articleParagraph.subarticle).map((i) => buildSubarticle(i));
}
