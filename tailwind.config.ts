import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        slideFromRight: {
          '0%': { transform: 'translateX(100%)' },
        },
        fadeInBackground: {
          '0%': { backgroundColor: 'transparent' },
        },
      },
      animation: {
        burger: 'slideFromRight 0.5s ease',
        fadeInBackground: 'fadeInBackground 0.5s ease-out',
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundOpacity: ['active'],
    },
  },
};
export default config;
