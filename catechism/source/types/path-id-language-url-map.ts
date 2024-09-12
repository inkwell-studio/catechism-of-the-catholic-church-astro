import { Language } from './language.ts';
import { PathID } from './path-id.ts';

export type PathIdLanguageUrlMap = Record<PathID, Record<Language, string>>;
