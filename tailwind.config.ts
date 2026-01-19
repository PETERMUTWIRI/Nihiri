import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'], // ← NEW
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
          // dark-scheme overrides
          'dark-bg': '#0b132b',
          'dark-text': '#f3f4f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;