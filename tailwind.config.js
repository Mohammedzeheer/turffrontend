/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       colors:{
        "dark-purple":"#072a4d",
        'light-white': 'rgba(255,255,255,0.18)',
        customBlue: '#0b2239ff',
        customGreen: '#24945e',
       
      }
    },
  },
  plugins: [],
}


