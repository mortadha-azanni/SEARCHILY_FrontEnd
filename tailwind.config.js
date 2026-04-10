import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'ui-sans-serif', 'system-ui', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      boxShadow: {
        mistral: 'rgba(127, 99, 21, 0.12) -8px 16px 39px, rgba(127, 99, 21, 0.1) -33px 64px 72px, rgba(127, 99, 21, 0.06) -73px 144px 97px, rgba(127, 99, 21, 0.02) -129px 255px 115px, rgba(127, 99, 21, 0) -202px 399px 127px',
      },
      colors: {
        mistral: {
          orange: '#fa520f',
          flame: '#fb6424',
          black: '#1f1f1f',
        },
        block: {
          orange: '#ff8105',
          gold: '#ffe295',
        },
        sunshine: {
          900: '#ff8a00',
          700: '#ffa110',
          500: '#ffb83e',
          300: '#ffd06a',
        },
        warm: {
          ivory: '#fffaeb',
        },
        cream: '#fff0c2',
      },
      letterSpacing: {
        'display': '-2.05px',
      },
      typography: (theme) => ({
        mistral: {
          css: {
            '--tw-prose-body': theme('colors.mistral.black'),
            '--tw-prose-headings': theme('colors.mistral.black'),
            '--tw-prose-lead': theme('colors.mistral.black'),
            '--tw-prose-links': theme('colors.mistral.orange'),
            '--tw-prose-bold': theme('colors.mistral.black'),
            '--tw-prose-counters': theme('colors.mistral.orange'),
            '--tw-prose-bullets': theme('colors.mistral.orange'),
            '--tw-prose-hr': theme('colors.mistral.black / 0.1'),
            '--tw-prose-quotes': theme('colors.mistral.black'),
            '--tw-prose-quote-borders': theme('colors.mistral.orange'),
            '--tw-prose-captions': theme('colors.mistral.black / 0.6'),
            '--tw-prose-code': theme('colors.mistral.orange'),
            '--tw-prose-pre-code': theme('colors.warm.ivory'),
            '--tw-prose-pre-bg': theme('colors.mistral.black'),
            '--tw-prose-th-borders': theme('colors.mistral.black / 0.2'),
            '--tw-prose-td-borders': theme('colors.mistral.black / 0.1'),
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
}

