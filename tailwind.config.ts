import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0B',
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E5C97A',
          dark: '#A8892F',
        },
        surface: '#111113',
        'border-custom': '#1F1F23',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
