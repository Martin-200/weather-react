const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            'title': ['Protest Riot', 'sans-serif'],
            'text': ['Lato', 'sans-serif'],
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            inherit: 'inherit',
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            red: colors.red,
            green: colors.green,
            blue: colors.blue,
            sky: colors.sky,
            indigo: colors.indigo,
        },
        extend: {
            backgroundColor: {
                'initial': 'initial'
            },
            padding: {
                '5%': '5%',
            },
            minHeight: {
                'hero': 'min(75dvh, 1024px)'
            },
            maxHeight: {
                'hero': '75dvh'
            },
            right: {
                'unset': 'unset'
            }
        },
    },
    plugins: [],
}