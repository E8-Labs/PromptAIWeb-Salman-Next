import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        red: "red",
        
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
        appgreenlight700: "#00C28C70",
        // appgreenlight: {
        //   1000: "#00C28C",
        //   200: "#00C28C20"
        // },
        // white: '#FFFFFF'
      },
      fontFamily: {
        rubik: ['Rubik'],
      },
    },
  },
  plugins: [],
}
export default config
