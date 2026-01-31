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
        // CSS Variable-based colors for theming
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // Brand colors
        brand: {
          light: '#faf59e',
          primary: '#f3ec59',
          dark: '#9f972a',
          text: '#655c13',
          neutral: '#5b6662',
          background: '#fcfcf5',
          cyan: '#06b6d4',
          'dark-bg': '#0f172a',
          'dark-text': '#f8fafc',
          'dark-card': '#1e293b',
          'dark-border': '#334155',
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