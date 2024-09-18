import { assertNotMatch, assertNotStrictEquals, assertStrictEquals, fail } from '$std/assert';

import { CatechismText, getText } from './test-utils.ts';
import { PathID } from '../source/types/types.ts';
import { Language } from '../source/types/language.ts';
import { getLanguages } from '../source/utils/language.ts';
import { getCatechism } from '../source/utils/content.ts';

//#region tests
console.log(`\nAll text fragments ...`);

const allTexts = new Map<Language, CatechismText>();
for await (const [key, language] of getLanguages()) {
    const catechism = await getCatechism(language);
    const text = getText(catechism);

    if (text.length === 0) {
        throw new Error(`could not retrieve Catechism text for ${key}`);
    }

    allTexts.set(language, text);

    console.log(`[${key}] ${text.length} text fragments`);
    runTests(key, language);
}

function runTests(languageKey: string, language: Language): void {
    Deno.test(`[${languageKey}] contain no consecutive spaces`, () => {
        testLines(language, (languageArg, line, lineKey) =>
            assertNotMatch(
                line,
                / {2}/,
                errorMessage(languageArg, lineKey, 'consecutive spaces'),
            ));
    });

    Deno.test(`[${languageKey}] contain no consecutive periods`, () => {
        testLines(language, (languageArg, line, lineKey) =>
            assertNotMatch(
                line,
                /\.\./,
                errorMessage(languageArg, lineKey, 'consecutive periods'),
            ));
    });

    Deno.test(`[${languageKey}] contain no consecutive commas`, () => {
        testLines(language, (languageArg, line, lineKey) =>
            assertNotMatch(
                line,
                /,,/,
                errorMessage(languageArg, lineKey, 'consecutive commas'),
            ));
    });

    Deno.test(`[${languageKey}] contain no consecutive colons`, () => {
        testLines(language, (languageArg, line, lineKey) =>
            assertNotMatch(
                line,
                /::/,
                errorMessage(languageArg, lineKey, 'consecutive colons'),
            ));
    });

    Deno.test(`[${languageKey}] contain no consecutive semicolons`, () => {
        testLines(language, (languageArg, line, lineKey) =>
            assertNotMatch(
                line,
                /;;/,
                errorMessage(languageArg, lineKey, 'consecutive semicolons'),
            ));
    });

    Deno.test(`[${languageKey}] ellipses are not written using three consecutive periods (the U+2026 unicode character should be used instead)`, () => {
        testLines(language, (_languageArg, line, lineKey) =>
            assertNotMatch(
                line,
                /\.\.\./,
                errorMessage(
                    language,
                    lineKey,
                    'ellipsis written with three consecutive periods (use the U+2026 unicode character instead: …)',
                ),
            ));
    });

    Deno.test(`[${languageKey}] ellipses are not written using multiple spaced-out periods (the U+2026 unicode character should be used instead)`, () => {
        testLines(language, (_languageArg, line, lineKey) =>
            assertNotMatch(
                line,
                /\. \./,
                errorMessage(
                    language,
                    lineKey,
                    'ellipsis written with three consecutive periods (use the U+2026 unicode character instead: …)',
                ),
            ));
    });

    Deno.test(`[${languageKey}] ellipses are not preceded by a space`, () => {
        testLines(language, (languageArg, line, lineKey) =>
            assertNotMatch(
                line,
                / …/,
                errorMessage(languageArg, lineKey, 'ellipsis preceded by a space'),
            ));
    });

    Deno.test(`[${languageKey}] ellipses are followed by a space or are at the end of a quotation or text fragment`, () => {
        testLines(language, (languageArg, line, lineKey) =>
            assertNotMatch(
                line,
                /…[^\s‘“’”]+/,
                errorMessage(languageArg, lineKey, 'ellipsis not followed by a space'),
            ));
    });

    Deno.test(`[${languageKey}] em-dashes are surrounded by spaces`, () => {
        const regex = /[^\s]—|—[^\s]/;
        testLines(language, (languageArg, line, lineKey) => {
            assertNotMatch(line, regex, errorMessage(languageArg, lineKey, 'em-dash not surrounded by spaces'));
        });
    });

    Deno.test(`[${languageKey}] hyphens are surrounded by non-space characters`, () => {
        const regex = /(\s-)|(-\s)/;
        testLines(language, (languageArg, line, lineKey) => {
            assertNotMatch(line, regex, errorMessage(languageArg, lineKey, 'hyphen bordered by a space'));
        });
    });

    Deno.test(`[${languageKey}] are not empty`, () => {
        testLines(
            language,
            (languageArg, line, lineKey) => assertNotStrictEquals(line, '', errorMessage(languageArg, lineKey, 'empty string')),
        );
    });

    Deno.test(`[${languageKey}] do not contain only whitespace`, () => {
        testLines(
            language,
            (languageArg, line, lineKey) =>
                assertNotStrictEquals(line.trim(), '', errorMessage(languageArg, lineKey, 'whitespace-only string')),
        );
    });

    Deno.test(`[${languageKey}] do not begin with whitespace`, () => {
        testLines(language, (languageArg, line, lineKey) =>
            assertNotMatch(
                line,
                /^ /,
                errorMessage(languageArg, lineKey, 'fragment begins with whitespace'),
            ));
    });

    Deno.test(`[${languageKey}] do not end with whitespace`, () => {
        testLines(language, (languageArg, line, lineKey) =>
            assertNotMatch(
                line,
                / $/,
                errorMessage(languageArg, lineKey, 'fragment ends with whitespace'),
            ));
    });

    Deno.test(`[${languageKey}] begin with a letter, opening quote, or em-dash`, () => {
        const regex = /[a-zA-Z“‘—]/;
        const test = (line: string) => line[0].match(regex);

        testLines(language, (_languageArg, line, lineKey) => {
            let valid = test(line);
            if (!valid) {
                // Remove any formatting characters to ensure that only content characters are being tested
                line = line.replaceAll('_', '');
                valid = test(line);
                if (!valid) {
                    fail(
                        errorMessage(
                            language,
                            lineKey,
                            `begins with the character ${line[0]} instead of a letter, opening quote, or em-dash`,
                        ),
                    );
                }
            }
        });
    });

    Deno.test(`[${languageKey}] quotations do not begin with whitespace`, () => {
        testLines(language, (languageArg, line, lineKey) =>
            assertNotMatch(
                line,
                /[‘“] /,
                errorMessage(languageArg, lineKey, 'quotation begins with whitespace'),
            ));
    });

    Deno.test(`[${languageKey}] quotations do not end with whitespace`, () => {
        testLines(language, (languageArg, line, lineKey) =>
            assertNotMatch(
                line,
                / [’”]/,
                errorMessage(languageArg, lineKey, 'quotation ends with whitespace'),
            ));
    });

    Deno.test(`[${languageKey}] do not contain empty single-quotes`, () => {
        const regex = /‘(\s)*’/;
        testLines(language, (languageArg, line, lineKey) => {
            assertNotMatch(line, regex, errorMessage(languageArg, lineKey, 'contains empty single-quotes'));
        });
    });

    Deno.test(`[${languageKey}] do not contain empty double-quotes`, () => {
        const regex = /“(\s)*”/;
        testLines(language, (languageArg, line, lineKey) => {
            assertNotMatch(line, regex, errorMessage(languageArg, lineKey, 'contains empty double-quotes'));
        });
    });

    Deno.test(`[${languageKey}] have the same number of opening and closing single-quotes`, () => {
        testLines(language, (languageArg, line, lineKey) => {
            const numOpening = countOccurrences(line, '‘');
            const numClosing = countOccurrences(line, '’');
            assertStrictEquals(
                numOpening,
                numClosing,
                errorMessage(
                    languageArg,
                    lineKey,
                    `single-quote mismatch: ${numOpening} opening, ${numClosing} closing`,
                ),
            );
        });
    });

    Deno.test(`[${languageKey}] have the same number of opening and closing double-quotes`, () => {
        testLines(language, (languageArg, line, lineKey) => {
            const numOpening = countOccurrences(line, '“');
            const numClosing = countOccurrences(line, '”');
            assertStrictEquals(
                numOpening,
                numClosing,
                errorMessage(
                    languageArg,
                    lineKey,
                    `double-quote mismatch: ${numOpening} opening, ${numClosing} closing`,
                ),
            );
        });
    });

    Deno.test(`[${languageKey}] do not have an opening single-quote without a closing single-quote`, () => {
        // TODO: Implement
    });

    Deno.test(`[${languageKey}] do not have an opening double-quote without a closing double-quote`, () => {
        // TODO: Implement
    });

    Deno.test(`[${languageKey}] do not have a closing single-quote appear before an opening single-quote`, () => {
        // TODO: Implement
    });

    Deno.test(`[${languageKey}] do not have a closing double-quote appear before an opening double-quote`, () => {
        // TODO: Implement
    });
}
//#endregion

//#region helpers
function errorMessage(language: Language, pathID: PathID, message: string): string {
    return `\n\n[${language}] [${pathID}] ${message}\n`;
}

function testLines(
    language: Language,
    func: (languageParam: Language, textParam: string, PathIDParam: PathID) => void,
): void {
    const texts = allTexts.get(language) ?? [];

    for (const { pathID, text } of texts) {
        func(language, text, pathID);
    }
}

function countOccurrences(line: string, testString: string): number {
    return line.split(testString).length - 1;
}
//#endregion
