/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accentblue: "var(--accentblue)",
        backgroundlight: "var(--backgroundlight)",
        ctaorange: "var(--ctaorange)",
        primarytext: "var(--primarytext)",
        secondarygreen: "var(--secondarygreen)",
      },
    },
  },
  plugins: [],
};
