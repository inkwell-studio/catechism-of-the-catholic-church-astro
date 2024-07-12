import { ContentContainer } from './content-container.ts';
import { InBrief } from './in-brief.ts';

export interface InBriefContainer extends ContentContainer {
    // When extended by other interfaces, this property may be typed as simply `InBrief` (i.e. without `null` allowed)
    readonly inBrief: InBrief | null;
}
