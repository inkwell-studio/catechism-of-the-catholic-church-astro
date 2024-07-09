import data from './_data.json' with { type: 'json' };

export function getDataFromJson(n: number): string {
    // deno-fmt-ignore
    return n
        ? (data as Record<string, string>)[n]
        : `(no data for input ${n})`;
}
