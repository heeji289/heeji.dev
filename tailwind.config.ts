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
        background: '#ffffff',
        base: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#adb5bd',
          500: '#868e96',
          600: '#495057',
          700: '#343a40',
          800: '#191919',
          900: '#212529',
        },
        info: { 400: '#f8f9fa', 500: '#212529', 600: '#212529' },
        warn: colors.yellow,
        error: colors.red,
        success: colors.green,
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        gray: {
          css: {
            '--tw-prose-body': theme('colors.base.900'),
            '--tw-prose-headings': theme('colors.base.900'),
            '--tw-prose-links': '#5167f4',
            '--tw-prose-invert-body': theme('colors.base.50'),
            '--tw-prose-invert-headings': theme('colors.base.50'),
            '--tw-prose-invert-links': '#8bc3ff',
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
