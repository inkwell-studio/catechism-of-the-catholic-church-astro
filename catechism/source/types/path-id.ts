/**
 * This is used to identify each node in the `CatechismStructure` tree,
 * and to provide the traversal path from the root of a `CatechismStructure` object to the node.
 *
 * Each `PathID` value is an a single number, optionally followed by a sequence of <bucket, index> tuples that specify
 * the "bucket" on the parent that the item belongs to, and the 0-based index of the item within said bucket.
 *
 * A "bucket" is one of the `openingContent`, `mainContent`, or `finalContent` properties of
 * the `ContentContainer` interface (referred to by the values "o", "m", and "f", respectively).
 *
 * For example, the `PathID` `1__m.0__o.3__f.2` refers to:
 *
 *          Part-1.mainContent[0].openingContent[3].finalContent[2]
 *             |             |                 |               |
 *             1          __m.0             __o.3           __f.2
 *
 * The initial number refers to the following:
 *
 *      0: CatechismStructure.prologue
 *      >= 1: CatechismStructure.parts[i - 1] (so 1 = Part 1, 3 = Part 3, etc.)
 *
 * The `PathID` of a parent can be determined from its childrens' `PathID` values: the last <bucket, index> tuple is removed from the child's `PathID` to derive the parent's `PathID`.
 *
 * `PathID` values may be incomplete: a full `PathID` that has the root index and one or more parent tuples removed is still a valid `PathID` (e.g. `m.3` or `m.3__o.2` are both valid).
 *
 * This syntax may be expressed through the following types (these are not used because the resulting computations are too burdensom for the language server)
 *      export type PathID =
 *          | `${Index}`
 *          | `${Parent | ''}${Child}`
 *          | `${Parent | ''}${Parent}${Child}`
 *          | `${Parent | ''}${Parent}${Parent}${Child}`
 *          etc.

 *      type Index = number;
 *      type InBrief = 'i';
 *      type Parent = `${Index}${ChildSeparator}` | `${Child}${ChildSeparator}`;
 *      type Child = `${Bucket}${Dot}${Index}` | InBrief;

 *      type ChildSeparator = '__';
 *      type Dot = '.';
 *      // These represent the `openingContent`, `mainContent`, and `finalContent` properties of the `ContentContainer` interface, respectively
 *      type Bucket = 'o' | 'm' | 'f';
 */
export type PathID = string;
