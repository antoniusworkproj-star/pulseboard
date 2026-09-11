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
          DEFAULT: "#0B0714",
          panel: "#140F24",
          raised: "#1C1533",
          line: "#332856",
        },
        violet: {
          glow: "#A78BFA",
        },
        azure: {
          glow: "#38BDF8",
        },
        ink: {
          DEFAULT: "#E9E7F7",
          dim: "#9C93BE",
          faint: "#5F5680",
        },
        urgency: {
          low: "#39D98A",
          medium: "#FFC145",
          high: "#FF8A3D",
          critical: "#F43F6E",
        },
      },
      fontFamily: {
        display: ["var(--font-chakra)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      boxShadow: {
        glowViolet: "0 0 0 1px rgba(167,139,250,0.35), 0 0 22px rgba(167,139,250,0.14)",
        glowAzure: "0 0 0 1px rgba(56,189,248,0.35), 0 0 22px rgba(56,189,248,0.14)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(167,139,250,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "36px 36px",
      },
    },
  },
  plugins: [],
};
