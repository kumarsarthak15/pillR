import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        medigrab: {
          teal: "#1DB89A",
          "teal-dark": "#169478",
          "teal-light": "#3ECFB0",
          navy: "#0D1F33",
          card: "#13293D",
          section: "#1A2E40",
          frost: "#F0FAF7",
          muted: "#6B7280",
          amber: "#F59E0B",
          "body-gray": "#354D60",
          "teal-tint": "#D1FAF0"
        },
        whatsapp: "#25D366",
        verified: "#16A34A",
        razorpay: "#072654"
      },
      fontFamily: {
        display: ["var(--font-syne)", "Impact", "sans-serif"],
        heading: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"]
      },
      fontSize: {
        hero: ["clamp(2.75rem, 8vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        stat: ["clamp(4rem, 10vw, 6rem)", { lineHeight: "1" }]
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        xl: "20px"
      },
      boxShadow: {
        card: "0 4px 16px rgba(29,184,154,0.10)",
        hover: "0 8px 32px rgba(29,184,154,0.28)",
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
