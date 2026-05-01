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
          DEFAULT: "#fafafa",
          muted: "#f4f4f5",
        },
        ink: {
          DEFAULT: "#18181b",
          muted: "#52525b",
          subtle: "#a1a1aa",
        },
        accent: {
          DEFAULT: "#2563eb",
          hover: "#1d4ed8",
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
