import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3B82F6',
          DEFAULT: '#2563EB',
          dark: '#1E40AF',
        },
        secondary: {
          light: '#FB923C',
          DEFAULT: '#F97316',
          dark: '#EA580C',
        },
        error: {
          DEFAULT: '#DC2626',
        },
        success: {
          DEFAULT: '#16A34A',
        },
        background: {
          light: '#FFF7ED',
          DEFAULT: '#FDE68A',
          dark: '#F59E0B',
        },
        text: {
          primary: '#1E293B',
          secondary: '#475569',
          disabled: '#94A3B8',
        },
      },
    },
  },
  plugins: [],
};

export default config;