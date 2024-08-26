/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "calc-100vh-64": "calc(100vh - 64px)",
      },
      fontFamily: {
        sans: ["lsRg"],
        lsBd: ["lsBd"],
        lsTh: ["lsTh"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        "1vw": "1vw",
        "2vw": "2vw",
        "5vw": "5vw",
      },
      colors: {
        menuColor: "#F7F7F7",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in forwards",
      },
    },
  },
  plugins: [require("daisyui")],
};
