/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',

    // NextUI
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#aecff3',
            foreground: '#45659c',
            default: {
              600: '#45659c',
              DEFAULT: '#f7f6ea',
              foreground: '#45659c',
            },
            primary: {
              DEFAULT: '#aecff3',
              foreground: '#adadb1',
            },
            secondary: {
              DEFAULT: '#3e5ba0',
              foreground: '#f7f6ea',
            },
            success: {
              DEFAULT: '#69b981',
              foreground: '#f7f6ea',
            },
            warning: {
              DEFAULT: '#e7a949',
              foreground: '#f7f6ea',
            },
            danger: {
              DEFAULT: '#f44336',
              foreground: '#f7f6ea',
            },
          },
        },
      },
    }),
  ],
}
