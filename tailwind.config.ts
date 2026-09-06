import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#060811",
          900: "#0b0f1f",
          800: "#12182e",
          700: "#1a223f",
          600: "#273259",
        },
        mystic: {
          950: "#110920",
          900: "#1a0e33",
          800: "#2a1552",
          700: "#441d80",
          600: "#602ba8",
          500: "#8342d6",
          400: "#a86cf0",
          300: "#c79ef7",
        },
        gold: {
          600: "#b38f26",
          500: "#d4af37",
          400: "#e6c35c",
          300: "#f3d987",
          200: "#fbf0bc",
        },
        ethereal: {
          100: "#f8fafc",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(ellipse at 50% 0%, rgba(68, 29, 128, 0.25) 0%, rgba(6, 8, 17, 0.95) 75%)',
        'gold-glow': 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(145deg, rgba(26, 34, 63, 0.6) 0%, rgba(18, 24, 46, 0.4) 100%)',
        'card-hover': 'linear-gradient(145deg, rgba(42, 21, 82, 0.7) 0%, rgba(20, 26, 51, 0.6) 100%)',
      },
      boxShadow: {
        'mystic-glow': '0 0 25px -5px rgba(131, 66, 214, 0.35)',
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
