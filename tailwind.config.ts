import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        surface: {
          DEFAULT: "#fcfaf7",
          muted: "#f5efe7",
          card: "#fffdf9",
        },
        ink: {
          DEFAULT: "#2a2118",
          muted: "#5c4f42",
          subtle: "#9a8a7a",
        },
        accent: {
          DEFAULT: "#9f5f2f",
          hover: "#844a21",
          soft: "#ebd5be",
        },
      },
      maxWidth: {
        measure: "65ch",
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
