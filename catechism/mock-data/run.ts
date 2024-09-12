import { buildMockData } from './build/build.ts';
import { getTranslations } from './language/translate.ts';

import { CatechismStructure } from '../source/types/types.ts';
import { LimitsSize, setLimits } from '@catechism/mock-data/build/config/limits.ts';

console.log(`\nBuilding mock data...`);
setLimits(LimitsSize.TINY);
const catechism = buildMockData();
writeToDisk(catechism);

const translations = getTranslations(catechism);
for await (const translatedCatechism of translations) {
    writeToDisk(translatedCatechism);
}

function writeToDisk(catechism: CatechismStructure): void {
    const json = JSON.stringify(catechism, undefined, '  ');
    Deno.writeTextFileSync(`catechism/content/catechism-${catechism.language}.json`, json + '\n');
}
