import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        leather: {
          50: "#faf6f1",
          100: "#f0e6d6",
          200: "#e0ccad",
          300: "#cda97a",
          400: "#bf8d55",
          500: "#b17a42",
          600: "#9a6336",
          700: "#7d4d2e",
          800: "#68402b",
          900: "#583627",
          950: "#321b13",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
