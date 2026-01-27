import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#faf59e',
          primary: '#f3ec59',
          dark: '#9f972a',
          text: '#655c13',
          neutral: '#5b6662',
          background: '#fcfcf5',
          cyan: '#06b6d4',
          'dark-bg': '#0b132b',
          'dark-text': '#f3f4f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.brand.text'),
            '--tw-prose-headings': theme('colors.brand.text'),
            '--tw-prose-links': theme('colors.brand.cyan'),
            '--tw-prose-bold': theme('colors.brand.text'),
            '--tw-prose-counters': theme('colors.brand.neutral'),
            '--tw-prose-bullets': theme('colors.brand.neutral'),
            '--tw-prose-hr': theme('colors.gray.200'),
            '--tw-prose-quotes': theme('colors.brand.text'),
            '--tw-prose-quote-borders': theme('colors.brand.primary'),
            '--tw-prose-captions': theme('colors.brand.neutral'),
            '--tw-prose-code': theme('colors.pink.600'),
            '--tw-prose-pre-code': theme('colors.gray.100'),
            '--tw-prose-pre-bg': theme('colors.gray.900'),
            '--tw-prose-th-borders': theme('colors.gray.300'),
            '--tw-prose-td-borders': theme('colors.gray.200'),
            maxWidth: 'none',
          },
        },
        // Custom modifier for brand styling
        brand: {
          css: {
            '--tw-prose-body': theme('colors.brand.text'),
            '--tw-prose-headings': theme('colors.brand.text'),
            '--tw-prose-links': theme('colors.brand.cyan'),
            '--tw-prose-bold': theme('colors.brand.text'),
            '--tw-prose-counters': theme('colors.brand.neutral'),
            '--tw-prose-bullets': theme('colors.brand.neutral'),
            '--tw-prose-hr': theme('colors.gray.200'),
            '--tw-prose-quotes': theme('colors.brand.text'),
            '--tw-prose-quote-borders': theme('colors.brand.primary'),
            '--tw-prose-captions': theme('colors.brand.neutral'),
            '--tw-prose-code': theme('colors.pink.600'),
            '--tw-prose-pre-code': theme('colors.gray.100'),
            '--tw-prose-pre-bg': theme('colors.gray.900'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // ← ADD THIS
  ],
};

export default config;