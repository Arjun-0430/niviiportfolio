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
        // Apple-inspired color system
        apple: {
          black: '#0A0A0A',
          white: '#F9FAFB',
          blue: '#007AFF',
          gray: '#1C1C1E',
          'gray-light': '#2C2C2E',
          'gray-medium': '#3A3A3C',
          'blue-light': '#0A84FF',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#007AFF',
          600: '#0066CC',
          700: '#0052A3',
          900: '#003d7a',
        },
      },
      fontFamily: {
        // Apple typography system
        display: ['-apple-system', 'SF Pro Display', 'system-ui', 'sans-serif'],
        body: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      backdropBlur: {
        'apple': '20px',
      },
    },
  },
  plugins: [],
}
