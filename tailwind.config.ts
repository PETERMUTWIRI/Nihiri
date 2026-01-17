import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-light': '#faf59e',
        'brand-primary': '#f3ec59',
        'brand-dark': '#9f972a',
        'brand-text': '#655c13',
        'brand-neutral': '#5b6662',
        'brand-background': '#fcfcf5',
        'brand-cyan': '#06b6d4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;