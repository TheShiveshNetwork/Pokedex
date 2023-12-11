/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Define Gameboy-style colors
        // Example:
        'gameboy-bg': "#0f380f",
        'gameboy-text': "#8bac0f",
        'gameboy-card': "#306230",
        'gameboy-border': "#9bbc0f",
        'home-bg': '#9CE7CC',
        'home-midbg': '#D4F699',
        'home-endbg': '#5EFC9C',
        'home-text': '#000',
        'home-card': '#D6C6F8',
        'home-border': '#9bbc0f',
      },
    },
    plugins: [
      function ({ addVariant, e }) {
        addVariant("gb", ({ modifySelectors, separator }) => {
          modifySelectors(({ className }) => {
            return `.gb${separator}${className}`;
          });
        });
      },
    ],
  },
};
