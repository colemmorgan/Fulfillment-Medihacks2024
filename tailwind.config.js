/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#e9edf9",
        secondary: "#6d90ec",
        main: "#9195F6",
        opaque:"rgba(145, 149, 246,0.6)",
        black: "#242424",
        borderColor: "#CACADD",
        pink: "#FB88B4"
      }
    },
  },
  plugins: [],
};
