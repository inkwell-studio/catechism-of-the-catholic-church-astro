import { getTitleText } from './general.ts';
import { buildParagraph } from './paragraph.ts';
import { buildParagraphGroup } from './paragraph-group.ts';
import { Limit } from '../config/limit.ts';
import { Probability } from '../config/probability.ts';
import { chance, getContentCounts, intArrayOfRandomLength, randomInt } from '../utils.ts';
import { Content, Paragraph, ParagraphGroup, Subarticle } from '../../../source/types/types.ts';

export function buildSubarticle(subarticleNumber: number): Subarticle {
    return {
        contentType: Content.SUB_ARTICLE,
        // This will be set later, after all content is created
        pathID: '0',
        // This will be set later, after all content is created
        semanticPath: '',
        subarticleNumber,
        title: getTitleText(Content.SUB_ARTICLE, subarticleNumber),
        openingContent: [],
        mainContent: buildMainContent(),
        finalContent: [],
    };
}

function buildMainContent(): Array<ParagraphGroup | Paragraph> {
    const numItems = randomInt(Limit.subarticle.contentItem);

    const items = [];
    let paragraphGroupIndex = 0;
    for (let i = 0; i < numItems; i++) {
        const contentCounts = getContentCounts(items);
        const contentOffset = contentCounts.get(Content.PARAGRAPH_GROUP) ?? 0;

        const createParagraphGroup = chance(Probability.subarticle.paragraphGroup);
        if (createParagraphGroup) {
            items.push(buildParagraphGroup(paragraphGroupIndex + 1 + contentOffset));
            paragraphGroupIndex++;
        } else {
            const textContent = intArrayOfRandomLength(Limit.subarticle.textContent).map(() => buildParagraph());
            items.push(...textContent);
        }
    }

    return items;
}
