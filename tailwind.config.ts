import { type Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme.js';

export default {
    content: ['**/*.{astro,tsx}'],
    darkMode: 'selector',
    theme: {
        fontFamily: {
            // See `src/styles.css` for the `@font-face` definitions
            sans: ['PTSans', ...defaultTheme.fontFamily.sans],
            mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
        },
        extend: {},
    },
    plugins: [],
} satisfies Config;
