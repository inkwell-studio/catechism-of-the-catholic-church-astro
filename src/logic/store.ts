import { atom } from 'nanostores';

import { DARK_MODE_MEDIA_QUERY, LOCAL_STORAGE_KEY_THEME, onThemeSelection, Theme, updateTailwindClass } from './theme.ts';
import { IS_BROWSER } from './utils.ts';

export const $count = atom(0);
export const $theme = atom(getThemeValue());

export function modifyCount(n: number): void {
    $count.set($count.get() + n);
}

function getThemeValue(): Theme {
    if (IS_BROWSER) {
        return (globalThis.localStorage.getItem(LOCAL_STORAGE_KEY_THEME) ?? Theme.SYSTEM) as Theme;
    } else {
        return Theme.SYSTEM;
    }
}

export function watchForThemeChanges(): void {
    // Respond to changes triggered by UI interactions
    $theme.subscribe((themeValue) => onThemeSelection(themeValue));

    // Respond to changes in the client's OS preference
    const mediaQueryList = globalThis.matchMedia(DARK_MODE_MEDIA_QUERY);
    mediaQueryList.onchange = (event) => {
        if (Theme.SYSTEM === $theme.get()) {
            updateTailwindClass(event.matches);
        }
    };
}
