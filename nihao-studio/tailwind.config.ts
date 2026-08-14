import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F2E8DA",
        canvas: "#E6D7C5",
        ink: "#171717",
        muted: "#6C5C4F",
        accent: "#7A4A3E",
        olive: "#6E7056"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(23, 23, 23, 0.08)"
      },
      letterSpacing: {
        editorial: "0.18em"
      }
    }
  },
  plugins: []
};

export default config;
