/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#306ee8",
        "background-light": "#f6f6f8",
        "background-dark": "#111621",
      },
    },
  },
  plugins: [],
}
