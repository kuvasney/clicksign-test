import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white-00': '#FFFFFF',
        'blue-00': '#1C1930',
        'blue-01': '#1F1283',
        'blue-02': '#695CCD',
        'gray-00': '#717171',
        'gray-01': '#F4F2FF',
      },
      height: {
        header: '80px',
      },
      boxShadow: {
        'header': '0px 4px 4px 0px #00000040',
      },
      fontFamily: {
        sans: ['"Encode Sans Semi Expanded"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
