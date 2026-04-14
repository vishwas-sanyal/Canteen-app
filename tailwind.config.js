/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New custom color palette
        'primary': {
          50: '#f0f5e8',
          100: '#e1ebd1',
          200: '#c3d7a3',
          300: '#a5c375',
          400: '#94b85a',
          500: '#88B361',
          600: '#76a154',
          700: '#648f47',
          800: '#527d3a',
          900: '#406b2d',
        },
        'secondary': {
          50: '#ffffff',
          100: '#ffffff',
          200: '#ffffff',
          300: '#ffffff',
          400: '#ffffff',
          500: '#FFFFFF',
          600: '#f5f5f5',
          700: '#eeeeee',
          800: '#e0e0e0',
          900: '#bdbdbd',
        },
        'accent': {
          50: '#f5f5f5',
          100: '#eeeeee',
          200: '#e0e0e0',
          300: '#bdbdbd',
          400: '#9e9e9e',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        'dark': {
          50: '#f5f5f5',
          100: '#eeeeee',
          200: '#e0e0e0',
          300: '#bdbdbd',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#424242',
          700: '#212121',
          800: '#1a1a1a',
          900: '#000000',
        },
      },
      borderRadius: {
        'xl': '1.5rem',
        '2xl': '2rem',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in',
        'bounce-subtle': 'bounceSubtle 1s infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      boxShadow: {
        'inner-glow': 'inset 0 0 20px rgba(0, 0, 0, 0.1)',
        'lg-food': '0 10px 40px rgba(249, 122, 28, 0.15)',
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
    },
  },
  plugins: [],
}
