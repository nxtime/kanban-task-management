/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: "#635FC7",
        "accent-hover": "#A8A4FF",
        black: "#000112",
        "black-highlight": "#20212C",
        "dark-gray": "#2B2C37",
        gray: "#828FA3",
        "lines-dark": "#3E3F4E",
        "lines-light": "#E4EBFA",
        "light-gray": "#F4F7FD",
        danger: "#EA5555",
        "danger-hover": "#FF9898",
      },
      fontSize: {
        "heading-xl": "24px",
        "heading-lg": "18px",
        "heading-md": "15px",
        "heading-sm": "12px",
        "body-lg": "13px",
        "body-md": "12px"
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
