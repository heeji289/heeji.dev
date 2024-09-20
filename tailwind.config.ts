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
        base: colors.stone,
        info: colors.sky,
        warn: colors.yellow,
        error: colors.red,
        success: colors.green,
      },
    },
    fontFamily: {
      pretendard: ['Pretendard'],
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;

export default config;
