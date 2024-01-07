/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        white:{
          100: '#FFFFFF10',
          200: '#FFFFFF20',
          300: '#FFFFFF30',
          400: '#FFFFFF40',
          500: '#FFFFFF50',
          600: '#FFFFFF60',
          700: '#FFFFFF70',
          800: '#FFFFFF80',
          900: '#FFFFFF90',
        },
        appgreen: "#001812",
        appgreenlight: "#00C28C",
        // white: '#FFFFFF'
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
