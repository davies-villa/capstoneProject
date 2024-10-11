module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jost: ['Jost', 'sans-serif'], // Adding Jost font
      },
      boxShadow: {
        'custom-black': '2px 2px 5px rgba(0, 0, 0, 0.3)',    // Black shadow
      },
      fontWeight: {
        extraBold: 800,
        semiBold: 600,
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9))',
      },
      colors: {
        'custom-brown': '#C38144', 
        'custom-sub': '#D9B189',
      },
    },
  },
  plugins: [],
}
