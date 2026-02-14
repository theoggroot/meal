import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 8px 32px rgba(31, 38, 135, 0.37)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        aurora: "aurora 20s linear infinite",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translateX(0%) translateY(0%)" },
          "50%": { transform: "translateX(8%) translateY(-8%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
