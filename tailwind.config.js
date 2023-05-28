/** @type {import('tailwindcss').Config} */

const { tailwindColors } = require("tailwindcss/colors");
const colorSafeList = [];

// Skip these to avoid a load of deprecated warnings when tailwind starts up
const deprecated = [
  "lightBlue",
  "warmGray",
  "trueGray",
  "coolGray",
  "blueGray",
];

for (const colorName in tailwindColors) {
  if (deprecated.includes(colorName)) {
    continue;
  }

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  const pallette = tailwindColors[colorName];

  if (typeof pallette === "object") {
    shades.forEach((shade) => {
      if (shade in pallette) {
        colorSafeList.push(`text-${colorName}-${shade}`);
        colorSafeList.push(`bg-${colorName}-${shade}`);
        colorSafeList.push(`shadown-${colorName}-${shade}`);
        colorSafeList.push(`outline-${colorName}-${shade}`);
        colorSafeList.push(`checked:bg-${colorName}-${shade}`);
        colorSafeList.push(`hover:bg-${colorName}-${shade}`);
      }
    });
  }
}
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: colorSafeList,
  theme: {
    extend: {
      colors: {
        ...tailwindColors,
        core: "#e9ecef",
        green: {
          500: "#7AE497",
          700: "#2BC86A",
        },
        purple: {
          200: "#F3E3FD",
        },
        orange: {
          200: "#F7C09A",
          300: "#FEA181",
        },
        blue: {
          400: "#67EAEB",
          600: "#1886F4",
        },
        red: {
          600: "#EA2A35",
        },
        yellow: {
          600: "#F2BE2D",
        },
        pink: {
          300: "#FF7C7F",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-pink":
          "linear-gradient(132deg, rgba(255,124,127,1) 30%, rgba(255,124,127,1) 68%, rgba(250,101,105,1) 92%)",
        "gradient-red":
          "linear-gradient(225deg, rgba(255,70,74,1) 51%, rgba(255,116,97,1) 83%, rgba(255,116,97,1) 97%)",
        "gradient-yellow":
          "linear-gradient(225deg, rgba(238,207,60,1) 31%, rgba(240,222,57,1) 74%, rgba(247,234,72,1) 97%)",
        "gradient-green":
          "linear-gradient(225deg, rgba(43,200,106,1) 31%, rgba(122,228,151,1) 74%, rgba(122,228,151,1) 97%)",
        "gradient-blue":
          "linear-gradient(225deg, rgba(24,165,244,1) 30%, rgba(103,214,235,1) 74%, rgba(103,228,235,1) 97%)",
        "gradient-orange":
          "linear-gradient(262deg, rgba(253,158,127,1) 30%, rgba(254,159,127,1) 74%, rgba(255,164,135,1) 97%)",
        "gradient-black":
          "linear-gradient(335deg, rgba(34,34,34,1) 30%, rgba(54,54,54,1) 72%, rgba(71,71,71,1) 92%)",
        "gradient-gray":
          "linear-gradient(335deg, rgba(217,217,217,1) 30%, rgba(223,223,223,1) 72%, rgba(237,237,237,1) 92%);",
        "gradient-white":
          "linear-gradient(347deg, rgba(233,233,233,1) 30%, rgba(254,254,254,1) 68%, rgba(255,255,255,1) 92%)",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
