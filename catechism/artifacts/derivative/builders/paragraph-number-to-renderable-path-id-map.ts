import { ParagraphNumberPathIdMap, TableOfContentsType } from '../../../source/types/types.ts';
import { getTopLevelEntries } from '../../../source/utils/table-of-contents.ts';

export function build(tableOfContents: TableOfContentsType): ParagraphNumberPathIdMap {
    const map: ParagraphNumberPathIdMap = {};

    const topLevelEntries = getTopLevelEntries(tableOfContents);

    topLevelEntries.forEach((entry) => {
        for (let i = entry.firstParagraphNumber; i <= entry.lastParagraphNumber; i++) {
            map[i] = entry.pathID;
        }
    });

    return map;
}
