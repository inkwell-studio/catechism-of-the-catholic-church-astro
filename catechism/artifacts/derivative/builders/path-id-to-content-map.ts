import { CatechismStructure, PathIdContentMap, SemanticPathPathIdMap } from '../../../source/types/types.ts';
import { getContentForRendering } from '../../../../website/source/logic/rendering.ts';

export function build(renderablePathMap: SemanticPathPathIdMap, catechism: CatechismStructure): PathIdContentMap {
    const contentMap: PathIdContentMap = {};

    const pathIDs = Object.values(renderablePathMap);
    for (const originalPathID of pathIDs) {
        const content = getContentForRendering(originalPathID, catechism);

        if (!contentMap[originalPathID]) {
            contentMap[originalPathID] = content;
        }
    }

    return contentMap;
}
