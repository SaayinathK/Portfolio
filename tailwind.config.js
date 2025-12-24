/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // all files in the app folder
    "./pages/**/*.{js,ts,jsx,tsx}",     // only if you have pages folder
    "./components/**/*.{js,ts,jsx,tsx}" // all components
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7c6bff",
        purple: "#c084fc",
        cyan: "#22d3ee",
        codegreen: "#22c55e",
        codeorange: "#f59e0b",
        secondary: "#0b1224",
        card: "#0f172a",
        border: "#1f2937",
        foreground: "#e5e7eb",
        muted: "#9ca3af",
        "muted-foreground": "#9ca3af",
        background: "#050914",
      },
    },
  },
  plugins: [],
};
