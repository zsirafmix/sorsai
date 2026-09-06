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
      fontFamily: {
        serif: ["var(--font-cinzel)", "Cinzel", "Cinzel Decorative", "Georgia", "serif"],
        cinzel: ["var(--font-cinzel)", "Cinzel", "serif"],
        cormorant: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(ellipse at 50% 0%, rgba(96, 43, 168, 0.35) 0%, rgba(26, 14, 51, 0.6) 40%, rgba(6, 8, 17, 0.98) 85%)',
        'gold-glow': 'radial-gradient(circle at center, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
        'nebula-radial': 'radial-gradient(ellipse at 50% 40%, rgba(131, 66, 214, 0.3) 0%, rgba(30, 27, 75, 0.45) 45%, rgba(6, 8, 17, 0.98) 80%)',
        'sacred-altar': 'radial-gradient(ellipse at 50% 100%, rgba(212, 175, 55, 0.15) 0%, rgba(26, 14, 51, 0.85) 50%, rgba(6, 8, 17, 0.98) 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(26, 14, 51, 0.75) 0%, rgba(11, 15, 31, 0.85) 100%)',
        'card-hover': 'linear-gradient(145deg, rgba(42, 21, 82, 0.9) 0%, rgba(20, 26, 51, 0.85) 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.25), transparent)',
        'filigree-border': 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.6), transparent)',
      },
      boxShadow: {
        'mystic-glow': '0 0 35px -5px rgba(131, 66, 214, 0.45)',
        'gold-glow': '0 0 30px -5px rgba(212, 175, 55, 0.45)',
        'cosmic-ring': '0 0 50px 0 rgba(168, 108, 240, 0.2), inset 0 0 25px 0 rgba(212, 175, 55, 0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
        'altar': '0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 30px -5px rgba(212, 175, 55, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'spin-slow': 'spin 90s linear infinite',
        'spin-reverse-slow': 'spin-reverse 75s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
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
