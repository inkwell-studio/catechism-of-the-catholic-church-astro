import { build as buildMockGlossary } from './build/artifacts/glossary.ts';
import { buildMockData } from './build/build.ts';
import { LIMITS_SIZE } from './build/config/defaults.ts';
import { setLimits } from './build/config/limits.ts';
import { setLanguage } from './language/language-state.ts';
import { translateCatechism } from './language/translate.ts';

import { CatechismStructure, DEFAULT_LANGUAGE, Glossary } from '../source/types/types.ts';
import { getLanguages } from '../source/utils/language.ts';

run();

function run(): void {
    console.log('\nBuilding mock data...');
    setLimits(LIMITS_SIZE);

    const catechism = buildMockData();
    const translatedCatechisms = getTranslatedCatechisms(catechism);

    const allCatechisms = [catechism, ...translatedCatechisms];
    writeCatechismsToDisk(allCatechisms);

    const artifacts = buildMockArtifacts(allCatechisms);
    writeArtifactsToDisk(artifacts);
}

function getTranslatedCatechisms(catechism: CatechismStructure): Array<CatechismStructure> {
    return getLanguages()
        .filter(([_languageKey, language]) => DEFAULT_LANGUAGE !== language)
        .map(([languageKey, language]) => {
            console.log(`Translating [${languageKey}] ...`);
            return translateCatechism(catechism, language);
        });
}

function buildMockArtifacts(catechisms: Array<CatechismStructure>): Array<{ artifact: Glossary; filepath: string }> {
    console.log('\nBuilding mock artifacts...\n');

    return catechisms.flatMap((c) => {
        setLanguage(c.language);
        const glossary = buildMockGlossary(c);

        return [
            { artifact: glossary, filepath: `catechism/artifacts/glossary-${c.language}.json` },
        ];
    });
}

function writeCatechismsToDisk(catechisms: Array<CatechismStructure>): void {
    catechisms.forEach((catechism) => writeToDisk(catechism, `catechism/content/catechism-${catechism.language}.json`));
}

function writeArtifactsToDisk(artifactsData: ReturnType<typeof buildMockArtifacts>): void {
    artifactsData.forEach((data) => writeToDisk(data.artifact, data.filepath));
}

function writeToDisk(o: object, filepath: string): void {
    const json = JSON.stringify(o, undefined, '  ');
    Deno.writeTextFileSync(filepath, json + '\n');
}
