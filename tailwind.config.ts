import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
        base: {
          ...colors.stone,
          50: '#f8fafc',
          800: '#202125',
          900: '#020817',
        },
        info: colors.sky,
        warn: colors.yellow,
        error: colors.red,
        success: colors.green,
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        stone: {
          css: {
            '--tw-prose-body': theme('colors.base.900'),
            '--tw-prose-headings': theme('colors.base.900'),
            '--tw-prose-invert-body': theme('colors.base.50'),
            '--tw-prose-invert-headings': theme('colors.base.50'),
          },
        },
      }),
      keyframes: {
        'caret-blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.1s steps(1) infinite',
      },
    },
    fontFamily: {
      pretendard: ['var(--font-pretendard)', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;

export default config;
