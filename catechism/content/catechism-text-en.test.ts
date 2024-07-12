import Catechism from './catechism-en.json' with { type: 'json' };

import { assertNotMatch, assertStrictEquals, assertStringIncludes } from '$std/assert';

import { errorMessage, getText, testCharacters, testLines } from './test-utils.ts';
import { CatechismStructure, Language, PathID } from '../source/types/types.ts';

const catechismText = getText(Catechism as CatechismStructure);

const expectedCharacters = 'abcdefghijklmnopqrstuvwxyz' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    '0123456789' +
    ' ,.:;?' +
    '“”‘’' +
    `'` +
    '—-_…()';

console.log('\nEnglish text fragments ...');

Deno.test('the correct Catechism is loaded', () => {
    const actual = (Catechism as CatechismStructure).language;
    const expected = Language.ENGLISH;
    assertStrictEquals(actual, expected, `found [${actual}] instead of [${expected}]`);
});

Deno.test('contain only expected characters', () => {
    testCharacters(catechismText, (character, lineKey) =>
        assertStringIncludes(
            expectedCharacters,
            character,
            `\n\n[${lineKey}] unexpected character ${character}\n`,
        ));
});

Deno.test('do not contain any British English spellings ("ou")', () => {
    // Fail if any words are found containg "ou" unless they are found in the `allowedWords` list
    const ouFalsePositives = [
        'about',
        'bound',
        'country',
        'group',
        'mountain',
        'mouth',
        'thoroughly',
        'throughout',
        'yourselves',
    ];

    const regex = /\b[a-zA-Z]+ou[a-zA-Z]+\b/;
    testLines(catechismText, (line, pathID) => {
        const ouPotentials = line.toLowerCase().match(regex);

        if (ouPotentials) {
            const matches = ouPotentials.filter((word) => !ouFalsePositives.includes(word.toLowerCase()));
            assertStrictEquals(matches.length, 0, errorMessage(pathID, 'contains a British spelling: ' + matches[0]));
        }
    });
});

Deno.test('do not contain any British English spellings (whole words)', () => {
    const alternateSpellings = [
        ['fulfil', 'fulfill'],
        ['fulfils', 'fulfills'],
        ['fulfilment', 'fulfillment'],
    ];

    testLines(catechismText, (line, pathID) => {
        alternateSpellings.forEach((alternate) => {
            const britishSpelling = alternate[0];
            const regex = new RegExp('\\b' + britishSpelling + '\\b');
            assertNotMatch(
                line.toLowerCase(),
                regex,
                errorMessage(pathID, `uses the British spelling ${britishSpelling} instead of ${alternate[1]}`),
            );
        });
    });
});

Deno.test('closing single-quotes are preceded by the proper puncuation', () => {
    const regex = /[^…\.,!]’/;
    testLines(catechismText, (line, pathID) =>
        assertNotMatch(
            line,
            regex,
            errorMessage(pathID, 'closing single-quote preceded by a character other than a period or ellipsis'),
        ));
});

Deno.test('closing double-quotes are preceded by the proper punctuation', () => {
    const exceptions: Array<PathID> = [];

    const regex = /[^…\.,!]”/;
    testLines(catechismText, (line, pathID) => {
        if (!exceptions.includes(pathID)) {
            assertNotMatch(
                line,
                regex,
                errorMessage(pathID, 'closing double-quote preceded by a character other than a period or ellipsis'),
            );
        }
    });
});

Deno.test('closing single-quotes are not followed by by punctuation', () => {
    const regex = /’[…\.,!]/;
    testLines(
        catechismText,
        (line, pathID) => assertNotMatch(line, regex, errorMessage(pathID, 'closing single-quote followed by a period or ellipsis')),
    );
});

Deno.test('closing double-quotes are not followed by by punctuation', () => {
    const regex = /”[…\.,!]/;
    testLines(
        catechismText,
        (line, pathID) => assertNotMatch(line, regex, errorMessage(pathID, 'closing double-quote followed by a period or ellipsis')),
    );
});
