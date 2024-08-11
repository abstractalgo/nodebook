import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "!./src/nodebook/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        m1: "max-content 1fr",
      },
    },
  },
  plugins: [],
};

export default config;
