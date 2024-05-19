import {Colors} from './src/common/constant/color.constant'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./newtab.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        inputHover: Colors.draculaPink[300].val,
        xbase: '#00000036'
      }
    },
  },
  plugins: [],
}