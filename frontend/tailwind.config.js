/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Circular",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: ['"Source Code Pro"', "Office Code Pro", "Menlo", "monospace"],
      },
      colors: {
        brand: {
          green: "var(--brand-green)",
          link: "var(--brand-link)",
          border: "var(--brand-border)",
        },
        surface: {
          black: "var(--surface-black)",
          dark: "var(--surface-dark)",
          glass: "var(--surface-glass)",
        },
        border: {
          subtle: "var(--border-subtle)",
          dark: "var(--border-dark)",
          mid: "var(--border-mid)",
          light: "var(--border-light)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          dark: "var(--text-dark)",
        },
      },
    },
  },
  plugins: [],
};
