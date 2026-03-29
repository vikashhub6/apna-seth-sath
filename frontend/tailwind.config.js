/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6C3CE1",
        "primary-dark": "#5229C8",
        accent: "#00C896",
        "accent-light": "#E6FFF8",
        surface: "#F8F9FC",
        card: "#FFFFFF",
        muted: "#8892A4",
        border: "#E8ECF4",
        danger: "#FF4757",
        // Dark mode colors for premium design
        "dark-bg": "#0F0F1A",
        "dark-surface": "#1A1A2E",
        "dark-card": "rgba(255, 255, 255, 0.05)",
        "dark-text": "rgba(255, 255, 255, 0.7)",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Clash Display", "DM Sans", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 20px rgba(108,60,225,0.08)",
        "card-hover": "0 8px 40px rgba(108,60,225,0.15)",
        glow: "0 0 20px rgba(108, 60, 225, 0.5)",
        "glow-accent": "0 0 30px rgba(0, 200, 150, 0.4)",
        "glow-lg": "0 0 50px rgba(108, 60, 225, 0.3)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        "border-glow": {
          "0%, 100%": {
            "box-shadow":
              "0 0 10px rgba(108, 60, 225, 0.5), inset 0 0 10px rgba(108, 60, 225, 0.1)",
          },
          "50%": {
            "box-shadow":
              "0 0 20px rgba(108, 60, 225, 0.8), inset 0 0 20px rgba(108, 60, 225, 0.2)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            "box-shadow": "0 0 0 0 rgba(108, 60, 225, 0.7)",
          },
          "50%": { "box-shadow": "0 0 0 10px rgba(108, 60, 225, 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-30px)" },
        },
        "heart-burst": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "underline-expand": {
          from: { width: "0" },
          to: { width: "100%" },
        },
        tilt: {
          "0%, 100%": { transform: "rotateX(0deg) rotateY(0deg)" },
          "50%": { transform: "rotateX(10deg) rotateY(10deg)" },
        },
        "spin-glow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "border-glow": "border-glow 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s infinite",
        float: "float 3s ease-in-out infinite",
        "float-slow": "float-slow 4s ease-in-out infinite",
        "heart-burst": "heart-burst 0.6s ease-out forwards",
        "slide-down": "slide-down 0.3s ease-out forwards",
        "underline-expand": "underline-expand 0.4s ease-out forwards",
        tilt: "tilt 3s ease-in-out infinite",
        "spin-glow": "spin-glow 3s linear infinite",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
};
