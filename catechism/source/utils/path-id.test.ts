import { assert, assertEquals, assertStrictEquals, assertThrows } from '$std/assert';

import {
    getContainerDesignator,
    getContainerInfo,
    getLeafPathIdNumber,
    getPartialDescendentPathID,
    getRoot,
    getTopNumber,
    hasChildren,
    isPrologueContent,
    isValid,
} from './path-id.ts';
import { Container, PathID } from '../types/types.ts';

console.log('\nPathID logic ...');
Deno.test('isValid(): invalid PathIDs', () => {
    [
        null,
        undefined,
        1,
        '',
        '-0',
        '-1',
        '-100',
        '1.2',
        '1_m.2',
        '1__2.m',
        '1__2',
        '1__m.',
        '1__m',
        '1__m2',
        '1__m.2_',
        '1__m.2__',
        '1__m.2__i.',
        '1__m.2__i.2',
        '1__m.2__0',
        '1__m.2_o.3',
        '1__m.2___o.3',
    ].forEach((t: unknown) => {
        assert(!isValid(t as PathID), `should be considered as invalid: ${t}`);
    });
});

Deno.test('isValid(): valid PathIDs', () => {
    [
        '0',
        '1',
        '123',
        '1__i',
        '0__m.0',
        '0__o.0',
        '123__o.0',
        '123__o.0__i',
        '123__o.0__i__m.2',
        '123__o.0__i__m.2__o.7',
        '3__f.0',
        '0__m.3',
        '1__f.7__o.3__m.4',
        '1__f.7__o.3__m.4__i',
    ].forEach((t: unknown) => {
        assert(isValid(t as PathID), `should be considered as valid: ${t}`);
    });
});

Deno.test('isPrologueContent(): Prologue content', () => {
    const tests = ['0', '0__o.0', '0__o.3', '0__m.0', '0__m.3'];
    tests.forEach((pathID) => assert(isPrologueContent(pathID), `PathID ${pathID} should be considered as Prologue content`));
});

Deno.test('isPrologueContent(): non-Prologue content', () => {
    const tests = ['1', '1__o.0', '2__o.3', '3__m.0', '4__m.3'];
    tests.forEach((pathID) => assert(!isPrologueContent(pathID), `PathID ${pathID} should not be considered as Prologue content`));
});

Deno.test('hasChildren(): has children', () => {
    assertStrictEquals(hasChildren('0__m.0'), true);
    assertStrictEquals(hasChildren('0__f.0__o.1'), true);
});

Deno.test('hasChildren(): no children', () => {
    assertStrictEquals(hasChildren('0'), false);
    assertStrictEquals(hasChildren('1'), false);
    assertStrictEquals(hasChildren('10'), false);
    assertStrictEquals(hasChildren('01'), false);
});

Deno.test('getRoot()', () => {
    const tests: Array<[PathID, PathID]> = [
        [
            '0',
            '0',
        ],
        [
            '3',
            '3',
        ],
        [
            '1__m.0',
            '1',
        ],
        [
            'i__m.2',
            'i',
        ],
        [
            'f.7__o.3',
            'f.7',
        ],
        [
            'f.7__o.3__m.4__f.1',
            'f.7',
        ],
    ];

    tests.forEach(([input, expectedResult]) => {
        const result = getRoot(input);
        assertStrictEquals(result, expectedResult, `in: ${input}, expected: ${expectedResult}, received: ${result}`);
    });
});

Deno.test('getTopNumber(): positive integers', () => {
    const tests: Array<[PathID, number]> = [
        ['0', 0],
        ['1', 1],
        ['100', 100],
    ];

    tests.forEach(([input, expectedResult]) => {
        const result = getTopNumber(input);
        assertStrictEquals(result, expectedResult, `in: ${input}, expected: ${expectedResult}, received: ${result}`);
    });
});

Deno.test('getTopNumber(): PathIDs with children', () => {
    const tests: Array<[PathID, number]> = [
        ['0__m.0', 0],
        ['0__o.0', 0],
        ['3__f.0', 3],
        ['0__m.3', 0],
        ['1__f.7__o.3__m.4', 1],
    ];

    tests.forEach(([input, expectedResult]) => {
        const result = getTopNumber(input);
        assertStrictEquals(result, expectedResult, `in: ${input}, expected: ${expectedResult}, received: ${result}`);
    });
});

Deno.test('getTopNumber(): throws an error for invalid PathIDs', () => {
    const tests = [
        null,
        undefined,
        1,
        '',
        '-0',
        '-1',
        '-100',
        '1.2',
        '1_m.2',
        '1__2.m',
        '1__2',
        '1__m.',
        '1__m',
        '1__m2',
        '1__m.2_',
        '1__m.2__',
        '1__m.2__0',
        '1__m.2_o.3',
        '1__m.2___o.3',
    ];

    tests.forEach((input) => {
        assertThrows(() => {
            getTopNumber(input as unknown as PathID);
        });
    });
});

Deno.test('getPartialDescendentPathID(): returns the child portion of a PathID', () => {
    const tests: Array<[PathID, PathID]> = [
        ['1__o.2', 'o.2'],
        ['2__f.3__m.1', 'f.3__m.1'],
        ['789__m.123__o.456__f.904', 'm.123__o.456__f.904'],
    ];

    tests.forEach(([input, expectedResult]) => {
        const result = getPartialDescendentPathID(input);
        assertStrictEquals(result, expectedResult, `in: ${input}, expected: ${expectedResult}, received ${result}`);
    });
});

Deno.test('getPartialDescendentPathID(): returns null for a PathID with no children', () => {
    const input = '23';
    const result = getPartialDescendentPathID(input);
    assertStrictEquals(result, null, `in: ${input}, expected: null, received ${result}`);
});

Deno.test('getLeafPathIdNumber()', () => {
    const tests: Array<[PathID, number | 'i']> = [
        [
            '0',
            0,
        ],
        [
            '2',
            2,
        ],
        [
            '1__f.0',
            0,
        ],
        [
            '2__m.44__m.7__f.33',
            33,
        ],
        [
            '2__m.44__o.1__i',
            'i',
        ],
    ];

    tests.forEach(([input, expectedResult]) => {
        const result = getLeafPathIdNumber(input);
        assertStrictEquals(result, expectedResult, `in: ${input}, expected: ${expectedResult}, received ${result}`);
    });
});

Deno.test('getContainerInfo()', () => {
    const tests: Array<[PathID, unknown]> = [
        [
            '0',
            null,
        ],
        [
            '3',
            null,
        ],
        [
            '1__m.0',
            { container: Container.MAIN, index: 0 },
        ],
        [
            'i',
            { container: Container.IN_BRIEF, index: null },
        ],
        [
            'i__m.2',
            { container: Container.MAIN, index: 2 },
        ],
        [
            'f.7',
            { container: Container.FINAL, index: 7 },
        ],
        [
            'f.7__i',
            { container: Container.IN_BRIEF, index: null },
        ],
        [
            'f.7__o.3',
            { container: Container.OPENING, index: 3 },
        ],
        [
            'f.7__o.3__m.4__f.1',
            { container: Container.FINAL, index: 1 },
        ],
    ];

    tests.forEach(([input, expectedResult]) => {
        const result = getContainerInfo(input);
        assertEquals(
            result,
            expectedResult,
            `in: ${input}\n\texpected: ${JSON.stringify(expectedResult)}\n\treceived: ${JSON.stringify(result)}`,
        );
    });
});

Deno.test('getContainerDesignator()', () => {
    const tests: Array<[Container, string]> = [
        [Container.OPENING, 'o'],
        [Container.MAIN, 'm'],
        [Container.FINAL, 'f'],
        [Container.IN_BRIEF, 'i'],
    ];

    tests.forEach(([input, expectedResult]) => {
        const result = getContainerDesignator(input);
        assertStrictEquals(
            result,
            expectedResult,
            `The container ${result} was returned instead of ${expectedResult} for input ${input}`,
        );
    });
});
