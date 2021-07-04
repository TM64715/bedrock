// eslint-disable-next-line import/no-extraneous-dependencies
const plugin = require('tailwindcss/plugin');
const heroPatterns = require('tailwindcss-hero-patterns');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter',
      },
      ringWidth: {
        3: '3px',
      },
      zIndex: {
        '-10': '-10',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      const buttons = {
        '.btn': {
          padding: `${theme('spacing.1')} ${theme('spacing.3')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.500'),
          cursor: 'pointer',
          fontSize: theme('fontSize.lg'),
        },
        '.btn-indigo': {
          backgroundColor: theme('colors.indigo.500'),
          color: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.indigo.600'),
          },
        },
        '.btn-outline': {
          border: `${theme('borderWidth.DEFAULT')} solid ${theme('colors.white')}`,
          color: theme('colors.white'),
          '&:hover': {
            textDecoration: 'underline',
          },
        },
        '.link': {
          '&:hover': {
            textDecoration: 'underline',
          },
        },
        '.box-select': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: theme('spacing.32'),
          height: theme('spacing.32'),
          padding: `${theme('spacing.4')} ${theme('spacing.1')}`,
          marginTop: theme('spacing.4'),
          backgroundColor: theme('colors.gray.200'),
          cursor: 'pointer',

        },
        '.tab-control': {
          width: theme('width["10/12"]'),
          padding: `${theme('spacing.6')} ${theme('spacing.4')}`,
          textAlign: 'center',
          borderRadius: theme('borderRadius.2xl'),
          backgroundImage: 'linear-gradient(to top, #DFE9F3 0%, #ffffff 100%)',
          opacity: '0.85',
          '@apply shadow-none': {},
          color: theme('colors.gray-800'),
          fontWeight: theme('fontWeight.medium'),
          '@apply brightness-95': {},
        },
        '.tab-control-active': {
          opacity: '.95',
          '@apply shadow-3xl': {},
          '@apply brightness-150': {},
        },
      };

      addComponents(buttons);
    }), heroPatterns],
};
