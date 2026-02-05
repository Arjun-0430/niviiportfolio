/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Portfolio palette: Deep Space Blue theme
        space: {
          DEFAULT: '#0a192f',
          light: '#112240',
          lighter: '#233554',
        },
        accent: {
          cyan: '#64ffda',
          purple: '#8b5cf6',
        },
        slate: {
          DEFAULT: '#8892b0',
          light: '#ccd6f6',
          bright: '#e6f1ff',
        },
        // Legacy compatibility
        apple: {
          black: '#0a192f',
          white: '#e6f1ff',
          blue: '#64ffda',
          gray: '#112240',
          'gray-light': '#233554',
          'gray-medium': '#8892b0',
          'blue-light': '#64ffda',
        },
        primary: {
          50: '#ccd6f6',
          100: '#8892b0',
          500: '#64ffda',
          600: '#52e0c4',
          700: '#0a192f',
          900: '#020c1b',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-cyan': 'glowCyan 2s ease-in-out infinite',
      },
      keyframes: {
        glowCyan: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(100, 255, 218, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(100, 255, 218, 0.6)' },
        },
      },
      backdropBlur: {
        'apple': '20px',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(100, 255, 218, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 255, 218, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}
