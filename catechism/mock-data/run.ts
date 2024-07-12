import { buildMockData } from './build/build.ts';
import { setLanguage } from './language-state.ts';
import { getSupportedLanguages } from '../source/utils/language.ts';
import { CatechismStructure } from '../source/types/types.ts';

getSupportedLanguages().forEach(([_key, language]) => {
    setLanguage(language);

    console.log(`\nBuilding mock data (${language})...`);
    const catechism = buildMockData();

    writeToDisk(catechism);
});

function writeToDisk(catechism: CatechismStructure): void {
    const json = JSON.stringify(catechism, undefined, '  ');
    Deno.writeTextFileSync(`catechism/content/catechism-${catechism.language}.json`, json + '\n');
}
