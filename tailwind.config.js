/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050B18',
          900: '#0B1B33',
          800: '#123159',
          700: '#173F70',
        },
        brand: {
          400: '#5B9BF2',
          500: '#2E7BEF',
          600: '#1D5FD6',
          700: '#1548A8',
        },
        cyan: {
          300: '#7EE8F0',
          400: '#34D4E0',
        },
        amber: {
          400: '#F7B84B',
          500: '#F5A524',
          600: '#DB8A0E',
        },
        ink: {
          900: '#0A1930',
          600: '#3E4C63',
          400: '#6B7A90',
        },
        mist: {
          50: '#F5F8FC',
          100: '#EBF1F9',
        },
      },
      fontFamily: {
        display: ['var(--font-sora)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(1100px 480px at 85% -8%, rgba(52,212,224,0.16) 0%, transparent 60%), radial-gradient(900px 500px at 10% 10%, rgba(46,123,239,0.25) 0%, transparent 55%), linear-gradient(160deg, #050B18, #0B1B33 55%, #123159)',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(10, 25, 48, 0.08)',
        card: '0 18px 40px rgba(10, 25, 48, 0.12)',
        glow: '0 0 0 1px rgba(52,212,224,0.25), 0 20px 45px rgba(46,123,239,0.25)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        marquee: 'marquee 26s linear infinite',
      },
    },
  },
  plugins: [],
};
