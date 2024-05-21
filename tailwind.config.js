/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          'base-100': 'rgb(38, 38, 38)',
          'base-200': 'rgb(23, 23, 23)',
          'base-300': 'rgb(10, 10, 10)',
        },
      },
    ],
  },
};
