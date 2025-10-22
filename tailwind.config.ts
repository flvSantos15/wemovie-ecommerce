/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.tsx",
    "./components/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#009edd',
        secondary: '#0073a1',
        tertiary: '#039b00',

        'background': '#2f2e41',

        'gray-100': '#f2f2f2',
        'gray-200': '#e6e5e5',
        'gray-300': '#d9d9d9',
        'gray-400': '#cccccc',
        'gray-500': '#bfbfbf',
        'gray-600': '#999999',
        'gray-700': '#666666',
        'gray-800': '#333333',
        'gray-900': '#171717',

        'text-dark': '#333333',
        'text-light': '#ededed',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

