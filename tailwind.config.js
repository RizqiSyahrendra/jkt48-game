/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary1: "#FFF3E2",
        primary2: "#FFE5CA",
        primary3: "#FA9884",
        primary4: "#E74646"
      }
    },
  },
  plugins: [],
}

