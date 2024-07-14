/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#f8f8f8",
        light: "#e9edf9",
        secondary: "#6d90ec",
        main: "#AAADF8", // changed for better contrast, previously #9195F6
        opaque: "rgba(145, 149, 246,0.6)",
        black: "#242424",
        borderColor: "#CACADD",
        pink: "#FB88B4",
        offWhite: "#f2f4f5",
      },
    },
  },
  plugins: [],
};
