import { buildReferenceCollection } from './general.ts';
import { buildText } from './text.ts';
import { Limit } from '../config/limit.ts';
import { intArrayOfRandomLength } from '../utils.ts';
import { Content, Text, TextWrapper } from '../../../source/types/types.ts';

export function buildTextWrapper(): TextWrapper {
    return {
        contentType: Content.TEXT_WRAPPER,
        // This will be set later, after all content is created
        pathID: '0',
        // This will be set later, after all content is created
        semanticPath: '',
        openingContent: [],
        mainContent: buildContent(),
        finalContent: [],
        referenceCollection: buildReferenceCollection(),
        // These are set later, after all content is created
        paragraphReferences: [],
    };
}

function buildContent(): Array<Text> {
    return intArrayOfRandomLength(Limit.textWrapper.part).map(() => buildText());
}
