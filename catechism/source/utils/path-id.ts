import { Container, PathID } from '../types/types.ts';

// See the declaration of the `PathID` type for the definitive definition of the format of valid `PathID` values
export function isValid(pathID: PathID): boolean {
    if (!pathID) {
        return false;
    } else if (typeof pathID !== 'string') {
        return false;
    } else if (pathID.includes('-') || pathID.includes('___')) {
        return false;
    }

    const num = Number(pathID);
    if (isNaN(num)) {
        return /^\d+((__[fmo]\.\d+)|(__i))+$/.test(pathID);
    } else {
        return !pathID.includes('.');
    }
}

export function isPrologueContent(pathID: PathID): boolean {
    return pathID[0] === '0';
}

export function hasChildren(pathID: PathID): boolean {
    return pathID.includes('__');
}

export function getRoot(pathID: PathID): PathID {
    const firstSeparatorIndex = getFirstChildSeparatorIndex(pathID);
    if (firstSeparatorIndex > 0) {
        return pathID.slice(0, firstSeparatorIndex) as PathID;
    } else {
        return pathID;
    }
}

export function getTopNumber(pathID: PathID): number {
    function fail(invalidInput: PathID): number {
        throw new Error(`invalid pathID encountered: ${invalidInput}`);
    }

    try {
        const valid = isValid(pathID);
        if (valid) {
            const firstSeparatorIndex = getFirstChildSeparatorIndex(pathID);
            if (firstSeparatorIndex > 0) {
                const topIndex = pathID.slice(0, firstSeparatorIndex);
                return Number(topIndex);
            } else if (firstSeparatorIndex < 0) {
                return Number(pathID);
            } else {
                return fail(pathID);
            }
        } else {
            return fail(pathID);
        }
    } catch {
        return fail(pathID);
    }
}

/**
 * @returns the `PathID` from `pathID` with the top node removed, and `null` if there is only one node (and therefore no children)
 */
export function getPartialDescendentPathID(pathID: PathID): PathID | null {
    const firstSeparatorIndex = getFirstChildSeparatorIndex(pathID);
    if (firstSeparatorIndex > 0) {
        return pathID.slice(firstSeparatorIndex + 2) as PathID;
    } else {
        return null;
    }
}

/**
 * @returns the number or 'i' from the leaf node of `pathID`
 */
export function getLeafPathIdNumber(pathID: PathID): number | 'i' {
    const leafPathID = getLeafPathID(pathID);
    if ('i' === leafPathID) {
        return 'i';
    } else if (leafPathID.includes('.')) {
        return Number(leafPathID.split('.')[1]);
    } else {
        return Number(leafPathID);
    }
}

/**
 * @returns the `Container` of the leaf element of `pathID`, and the index of the element within its parent container
 */
export function getContainerInfo(pathID: PathID): { container: Container; index: number | null } | null {
    const node = getLeafPathID(pathID);

    const rootAsNumber = Number(node);
    if (isNaN(rootAsNumber)) {
        if ('i' === node[0]) {
            return {
                container: Container.IN_BRIEF,
                index: null,
            };
        } else {
            const [designator, indexString] = node.split('.');
            const container = getContainerFromDesignator(designator);
            const index = Number(indexString);

            const validContainer = !!container && Object.keys(Container).includes(container);
            const validIndex = typeof index === 'number';
            if (!validContainer || !validIndex) {
                throw new Error(
                    `Container info could not be derived from PathID ${pathID}. Derived container: ${container}. Derived index: ${index}`,
                );
            }

            return {
                container,
                index,
            };
        }
    } else {
        return null;
    }
}

export function getContainerDesignator(container: Container): 'o' | 'm' | 'f' | 'i' {
    switch (container) {
        case Container.OPENING:
            return 'o';
        case Container.MAIN:
            return 'm';
        case Container.FINAL:
            return 'f';
        case Container.IN_BRIEF:
            return 'i';
    }
}

function getContainerFromDesignator(designator: 'o' | 'm' | 'f' | 'i' | string): Container | null {
    switch (designator) {
        case 'o':
            return Container.OPENING;
        case 'm':
            return Container.MAIN;
        case 'f':
            return Container.FINAL;
        case 'i':
            return Container.IN_BRIEF;
        default:
            return null;
    }
}

/**
 * @returns the leaf node of `pathID`
 */
function getLeafPathID(pathID: PathID): PathID {
    const lastSeparatorIndex = getLastChildSeparatorIndex(pathID);
    if (lastSeparatorIndex >= 0) {
        return pathID.slice(lastSeparatorIndex + 2) as PathID;
    } else {
        return pathID;
    }
}

function getFirstChildSeparatorIndex(pathID: PathID): number {
    return pathID.indexOf('__');
}

function getLastChildSeparatorIndex(pathID: PathID): number {
    return pathID.lastIndexOf('__');
}
