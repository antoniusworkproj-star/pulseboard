/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#08090F",
          panel: "#10121C",
          raised: "#161927",
          line: "#242840",
        },
        cyan: {
          glow: "#00F0FF",
        },
        magenta: {
          glow: "#FF2E7E",
        },
        ink: {
          DEFAULT: "#E7E9F5",
          dim: "#8991AC",
          faint: "#545B75",
        },
        urgency: {
          low: "#39D98A",
          medium: "#FFC145",
          high: "#FF8A3D",
          critical: "#FF3B5C",
        },
      },
      fontFamily: {
        display: ["var(--font-rajdhani)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        glowCyan: "0 0 0 1px rgba(0,240,255,0.35), 0 0 22px rgba(0,240,255,0.12)",
        glowMagenta: "0 0 0 1px rgba(255,46,126,0.35), 0 0 22px rgba(255,46,126,0.12)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(0,240,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "36px 36px",
      },
    },
  },
  plugins: [],
};
