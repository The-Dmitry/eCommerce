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
        appearance: {
          '0%': { opacity: '0' },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
      animation: {
        burger: 'slideFromRight 0.5s ease',
        fadeInBackground: 'fadeInBackground 0.5s ease-out',
        fromTransparent: 'appearance 0.3s linear',
        shimmer: 'shimmer 2s infinite',
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
