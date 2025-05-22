/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*{html, js, jsx}',
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        spacegrotesk_light: ['"spacegrotesk-light"', 'sans-serif'],
        spacegrotesk_regular: ['"spacegrotesk-regular"', 'sans-serif'],
        spacegrotesk_medium: ['"spacegrotesk-medium"', 'sans-serif'],
        spacegrotesk_semibold: ['"spacegrotesk-semibold"', 'sans-serif'],
        spacegrotesk_bold: ['"spacegrotesk-bold"', 'sans-serif'],
        benzgrotesk: ['"benz-grotesk"', 'sans-serif'],
        amidone: ['"amidone"', 'sans-serif'],
      },
      colors: {
        primary: '#3182ce',
        secondary: '#f1c40f',
      },
    },
  },
  plugins: [],
}
