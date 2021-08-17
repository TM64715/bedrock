// eslint-disable-next-line import/no-extraneous-dependencies
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        gray: {
          100: 'hsla(210, 10%, 96%, 1)',
          200: 'hsla(220, 13%, 91%, 1)',
          300: 'hsla(212, 11%, 80%, 1)',
          400: 'hsla(212, 10%, 65%, 1)',
          500: 'hsla(212, 10%, 48%, 1)',
          600: '#hsla(210, 7%, 35%, 1)',
          700: 'hsla(210, 10%, 22%, 1)',
          800: 'hsla(210, 20%, 19%, 1)',
          900: 'hsla(210, 19%, 13%, 1)',
        },
        blue: {
          100: 'hsla(214, 95%, 93%, 1)',
          200: 'hsla(213, 97%, 87%, 1)',
          300: 'hsla(212, 96%, 78%, 1)',
          400: 'hsla(216, 81%, 67%, 1)',
          500: 'hsla(218, 70%, 50%, 1)',
          600: 'hsla(220, 80%, 39%, 1)',
          700: 'hsla(223, 80%, 27%, 1)',
          800: 'hsla(221, 90%, 15%, 1)',
          900: 'hsla(223, 70%, 11%, 1)',
        },
        orange: 'hsla(32, 95%, 47, 1)',
        pink: colors.pink,
        purple: colors.purple,
      },
    },
  },
  variants: {
    extend: {
    },
  },
};
