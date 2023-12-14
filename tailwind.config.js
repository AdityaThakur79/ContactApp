/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        gray:"#5A5959",
        yellow:"#FFEAEE",
        "dark-yellow":"#FCCA3F",
        orange:"#F6820C"

      },
    },
  },
  plugins: [],
}
