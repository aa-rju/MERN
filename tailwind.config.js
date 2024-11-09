/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },
    colors: {
      white: "#fff",
      black: "#000",
      transparent: "#ffffff00",
      richblack: {
        5: "#F1F2FF",
        10: "#E6E7FF",
        50: "#333447",
        100: "#000814",
      },
      richblue: {
        5: "#E0ECFF",
        10: "#C2D9FF",
        50: "#00509E",
        100: "#001F54",
      },
      gray: {
        5: "#F9F9F9",
        10: "#F1F1F1",
        50: "#B0B0B0",
        100: "#606060",
      },
      red: {
        5: "#FFE5E5",
        10: "#FFCCCC",
        50: "#FF6666",
        100: "#CC0000",
      },
      green: {
        5: "#E6FFE6",
        10: "#CCFFCC",
        50: "#66CC66",
        100: "#339933",
      },
      blue: {
        5: "#E5F3FF",
        10: "#CCEBFF",
        50: "#3399FF",
        100: "#0066CC",
      },
      yellow: {
        5: "#FFF9E6",
        10: "#FFF2CC",
        50: "#FFD966",
        100: "#CC9900",
      },
    },
    extend: {},
  },

  plugins: [],
};
