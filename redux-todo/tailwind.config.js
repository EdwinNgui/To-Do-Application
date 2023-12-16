/** @type {import('tailwindcss').Config} */

// Content prop of the tailwind file checks for the ts and tsx files that I have
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
