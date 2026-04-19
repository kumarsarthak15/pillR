import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        pillr: {
          red: "#DC191E",
          "red-dark": "#A00D11",
          "red-light": "#FF4D52",
          black: "#000000",
          card: "#111111",
          section: "#1A1A1A",
          light: "#F4F4F4",
          muted: "#9CA3AF"
        },
        whatsapp: "#25D366",
        verified: "#16A34A",
        razorpay: "#072654"
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
        heading: ["var(--font-nunito)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      fontSize: {
        hero: ["clamp(2.75rem, 8vw, 6rem)", { lineHeight: "0.95", letterSpacing: "0.01em" }],
        stat: ["clamp(4rem, 10vw, 6rem)", { lineHeight: "1" }]
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        xl: "20px"
      },
      boxShadow: {
        card: "0 4px 16px rgba(220,25,30,0.08)",
        hover: "0 8px 32px rgba(220,25,30,0.25)",
        cta: "0 4px 24px rgba(37,211,102,0.35)",
        "card-light": "0 8px 24px rgba(0,0,0,0.12)"
      },
      transitionDuration: {
        fast: "150ms",
        base: "300ms",
        slow: "500ms"
      },
      maxWidth: {
        container: "1280px"
      }
    }
  },
  plugins: []
};

export default config;
