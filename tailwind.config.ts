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
          DEFAULT: "#fcfcfb",
          muted: "#f7f4f0",
          card: "#ffffff",
        },
        ink: {
          DEFAULT: "#241f1a",
          muted: "#4f463d",
          subtle: "#8d8072",
        },
        accent: {
          DEFAULT: "#8a4f28",
          hover: "#744220",
          soft: "#f1e2d2",
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
