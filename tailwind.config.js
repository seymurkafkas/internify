module.exports = {
  purge: ["./src/pages/**/*.{js,ts, jsx, tsx}", "./src/components/**/*.{js,ts, jsx, tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "auth-background": "url('../images/AuthBackground.svg')",
      }),
      spacing: {
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
