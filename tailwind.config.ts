export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        runtime: ["Runtime", "serif"],
        body: ["Inter", "sans-serif"],
        gothic: ["UnifrakturMaguntia", "regular"],
      },
    },
  },
  plugins: [],
};
