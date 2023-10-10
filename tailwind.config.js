/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"media",
  theme: {
    extend: {
      colors:{
        primary:"#f2f2f2",
        "secondary-1":"#202329",
        "secondary-2":"#2B2F39",
      }
    },
  },
  plugins: [],
}