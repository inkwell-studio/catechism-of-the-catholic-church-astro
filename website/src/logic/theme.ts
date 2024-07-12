// The logic and constant values of this script must be kept in sync with those of the inline script in the `<head>` element of `base.astro`.

// By default, Tailwind looks for the 'dark' class when using the `class` strategy for dark mode (this can be set in tailwind.config.ts)
export const DARK_MODE_CLASS = 'dark';
export const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';
export const LOCAL_STORAGE_KEY_THEME = 'theme';

export enum Theme {
    LIGHT = 'LIGHT',
    DARK = 'DARK',
    SYSTEM = 'SYSTEM',
}

export function onThemeSelection(themeValue: Theme): void {
    globalThis.localStorage.setItem(LOCAL_STORAGE_KEY_THEME, themeValue);

    const darkModeEnabled = isDarkModeEnabled(themeValue);
    updateTailwindClass(darkModeEnabled);
}

export function updateTailwindClass(darkModeEnabled: boolean): void {
    if (darkModeEnabled) {
        document.documentElement.classList.add(DARK_MODE_CLASS);
    } else {
        document.documentElement.classList.remove(DARK_MODE_CLASS);

        /*
        Remove the `class` attribute if it is empty to prevent the `class` attribute
        being present without a value, which is invalid HTML (i.e. `<html class>`)
        */
        if (document.documentElement.classList.length === 0) {
            document.documentElement.removeAttribute('class');
        }
    }
}

function isDarkModeEnabled(themeValue: Theme): boolean {
    if (Theme.SYSTEM === themeValue) {
        return globalThis.matchMedia(DARK_MODE_MEDIA_QUERY).matches;
    } else {
        return Theme.DARK === themeValue;
    }
}
