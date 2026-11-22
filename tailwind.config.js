/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        saint: {
          dark: "#0B0C10",
          surface: "#1F2833",
          primary: "#45A29E",
          secondary: "#66FCF1",
          accent: "#C5C6C7"
        },
        aurora: {
          blue: "#3b82f6",
          purple: "#8b5cf6",
          teal: "#14b8a6"
        }
      },
      backgroundImage: {
        'kinetic-grid': `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                         linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
      },
      keyframes: {
        'aurora-shift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'grid-pan': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(32px)' },
        }
      },
      animation: {
        'aurora-1': 'aurora-shift 12s ease-in-out infinite',
        'aurora-2': 'aurora-shift 15s ease-in-out infinite reverse',
        'aurora-3': 'aurora-shift 18s ease-in-out infinite',
        'grid-flow': 'grid-pan 3s linear infinite',
      }
    },
  },
  plugins: [],
}
