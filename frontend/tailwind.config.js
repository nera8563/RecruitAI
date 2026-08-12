/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        success: {
          100: "#49de50",
          200: "#42c748",
        },
        destructive: {
          100: "#f75353",
          200: "#c44141",
        },
        primary: {
          100: "#dddfff",
          200: "#cac5fe",
        },
        light: {
          100: "#d6e0ff",
          400: "#6870a6",
          600: "#4f557d",
          800: "#24273a",
        },
        dark: {
          100: "#020408",
          200: "#27282f",
          300: "#242633",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "mona-sans": ["Mona Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
