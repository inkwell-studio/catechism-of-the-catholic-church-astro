import { assert, assertStrictEquals } from '$std/assert';
import { RenderableNode } from '../source/types/renderable-node.ts';
import { RenderableNodeMap } from '../source/types/types.ts';
import { getRenderableNodeMap } from '../source/utils/artifacts.ts';
import { getLanguages } from '../source/utils/language.ts';

type MapEntry = {
    here: RenderableNode;
    next: RenderableNode | null;
    previous: RenderableNode | null;
};

console.log('\nPathID to RenderableNodes map ...');
for await (const [key, language] of getLanguages()) {
    const renderableNodeMap = await getRenderableNodeMap(language);
    runTests(key, renderableNodeMap);
}

function runTests(
    languageKey: string,
    map: RenderableNodeMap,
): void {
    const entries: Array<MapEntry> = Object.values(map);
    const keys = Object.keys(map);

    function nodeIsSound(entry: MapEntry, nullNext = false, nullPrevious = false): boolean {
        let nextIsSound = false;
        if (nullNext) {
            nextIsSound = entry.next === null;
        } else {
            nextIsSound = !!entry.next?.pathID && !!entry.next.url;
        }

        let previousIsSound = false;
        if (nullPrevious) {
            previousIsSound = entry.previous === null;
        } else {
            previousIsSound = !!entry.previous?.pathID && !!entry.previous.url;
        }

        return nextIsSound && previousIsSound && !!entry.here.pathID && !!entry.here.url;
    }

    Deno.test(`[${languageKey}] an entry for the Prologue exists`, () => {
        const prologueKeys = keys.filter((k) => k === '0');
        assert(prologueKeys.length === 1, `${prologueKeys.length} Prologue entries exist`);

        const prologueEntry = entries.find((e) => e.here.pathID === '0');
        assert(prologueEntry);
        assert(nodeIsSound(prologueEntry, false, true), `the Prologue entry is unsound`);
    });

    Deno.test(`[${languageKey}] only the Prologue has a null \`previous\` value`, () => {
        const prologueEntry = entries.find((e) => e.here.pathID === '0');
        assert(prologueEntry);
        assertStrictEquals(
            prologueEntry.previous,
            null,
            `the Prologue's entry should have a null \`previous\` value, but has: ${prologueEntry.previous}`,
        );

        const otherEntriesWithNullPreviousValue = entries.filter((e) => e.here.pathID !== '0').filter((e) => !e.previous);
        assert(
            otherEntriesWithNullPreviousValue.length === 0,
            `${otherEntriesWithNullPreviousValue.length} entries other than the Prologue have a null \`previous\` value`,
        );
    });

    Deno.test(`[${languageKey}] only a single entry has a null \`next\` value`, () => {
        const entriesWithNullNextValue = entries.filter((e) => e.next === null);
        assert(
            entriesWithNullNextValue.length === 1,
            `${entriesWithNullNextValue.length} entries have a null \`next\` value`,
        );
    });

    Deno.test(`[${languageKey}] every entry has a populated \`here\` value`, () => {
        const unsoundEntries = entries.filter((e) => !e.here || !e.here.pathID || !e.here.url);
        assert(unsoundEntries.length === 0, `${unsoundEntries.length} entries have an unpopulated \`here\` value`);
    });

    Deno.test(`[${languageKey}] all the \`next\` and \`previous\` value of entries are properly correlated`, () => {
        const unsoundlyCorrelatedEntries: Array<MapEntry> = [];

        for (const entry of entries) {
            let unsound = false;

            const thisID = entry.here.pathID;
            const nextID = entry.next?.pathID;
            const previousID = entry.previous?.pathID;

            if (nextID) {
                const next = map[nextID];
                if (next?.previous?.pathID !== thisID) {
                    unsound = true;
                }
            }

            if (previousID) {
                const previous = map[previousID];
                if (previous?.next?.pathID !== thisID) {
                    unsound = true;
                }
            }

            if (unsound) {
                unsoundlyCorrelatedEntries.push(entry);
            }
        }

        assert(
            unsoundlyCorrelatedEntries.length === 0,
            `${unsoundlyCorrelatedEntries.length} unsoundly-correlated entries exist`,
        );
    });
}
