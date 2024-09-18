import { type Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme.js';

export default {
    content: ['./source/**/*.{astro,tsx}'],
    darkMode: 'selector',
    theme: {
        fontFamily: {
            // See `source/styles.css` for the `@font-face` definitions
            sans: ['PTSans', ...defaultTheme.fontFamily.sans],
            mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
        },
        animation: {
            'fade-in': 'fade-in 500ms ease 300ms forwards',
        },
        keyframes: {
            'fade-in': {
                'from': { opacity: '0' },
                'to': { opacity: '1' },
            },
        },
    },
    plugins: [],
} satisfies Config;
