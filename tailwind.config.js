/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kraft: {
          50: '#FBF9F5',
          100: '#F6F2EB',
          200: '#EDE4D6',
          300: '#DECDBD',
          400: '#C8B29C',
          500: '#AD947D',
          600: '#8C745E',
          700: '#6C5846',
          800: '#4D3E32',
          900: '#2F261F',
        },
        token: {
          haldi: '#F59E0B',
          kesar: '#F97316',
          gulmohar: '#EF4444',
          mehendi: '#84CC16',
          jaipur: '#3B82F6',
          jamun: '#8B5CF6',
          chai: '#A16207',
        },
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'receipt': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'box': '0 20px 40px -15px rgba(60, 40, 20, 0.15)',
        'capsule': '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}

