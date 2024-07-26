import fs from 'node:fs';

import { Artifact, DEFAULT_LANGUAGE, Language } from '@catechism/source/types/types.ts';
import { getSupportedLanguages } from '@catechism/source/utils/language.ts';
import { getTopLevelUrls } from '@catechism/source/utils/table-of-contents.ts';

export function getTableOfContentsUrls(
    languageSelection: 'onlyDefaultLanguage' | 'excludeDefaultLanguage',
): Array<{ language: Language; url: string }> {
    return getSupportedLanguages()
        .filter(([_languageKey, language]) =>
            'onlyDefaultLanguage' === languageSelection && DEFAULT_LANGUAGE === language ||
            'excludeDefaultLanguage' === languageSelection && DEFAULT_LANGUAGE !== language
        )
        .flatMap(([_languageKey, language]) => {
            const filepath = `../catechism/artifacts/${Artifact.TABLE_OF_CONTENTS}-${language}.json`;
            const table = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf8' }));
            const urls = getTopLevelUrls(table);
            return urls.map((url) => ({ language, url }));
        });
}
