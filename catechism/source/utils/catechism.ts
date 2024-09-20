import { CatechismStructure, Language } from '../types/types.ts';

export async function getCatechism(language: Language): Promise<CatechismStructure> {
    const catechismJson = await import(`../../../catechism/content/catechism-${language}.json`, { with: { type: 'json' } });
    return catechismJson.default;
}

export async function* getCatechisms(languages: Array<Language>): AsyncGenerator<CatechismStructure> {
    for (const language of languages) {
        try {
            yield getCatechism(language);
        } catch (error) {
            console.error(`Could not retrieve the Catechism JSON for [${language}]`, error);
        }
    }
}
