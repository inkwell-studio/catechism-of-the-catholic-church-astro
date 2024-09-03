import { NumberOrNumberRange } from './number-or-number-range.ts';
import { Paragraph } from './paragraph.ts';

export type ParagraphCrossReferenceContentMap = Record<NumberOrNumberRange, Array<Paragraph>>;
