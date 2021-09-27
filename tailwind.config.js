module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      '1/2': '50%',
      '3/5': '60%',
      '3/4': '75%',
    },
    extend: {
      backgroundImage: {
        hero: "url('/hero.webp')",
      },
      height: (theme) => ({
        header: '60px',
        body: 'calc(100vh - 60px)',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-debug-screens'),
  ],
}
