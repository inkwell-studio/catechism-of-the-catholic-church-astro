import { atom } from 'nanostores';

import { DARK_MODE_MEDIA_QUERY, LOCAL_STORAGE_KEY_THEME, onThemeSelection, Theme, updateTailwindClass } from '../theme.ts';

export const $theme = atom(getThemeValue());

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

function getThemeValue(): Theme {
    const isBrowser = !!globalThis.window;
    if (isBrowser) {
        return (globalThis.localStorage.getItem(LOCAL_STORAGE_KEY_THEME) ?? Theme.SYSTEM) as Theme;
    } else {
        return Theme.SYSTEM;
    }
}
