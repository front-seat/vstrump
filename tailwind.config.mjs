/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        darkest: "#1B1D1E",
        dark: "#262729",
        "less-dark": "#393A3E",
        medium: "#6E6E6E",
        sun: "#FFE24C",
        // white: "#FFFFFF",
      },
      fontFamily: {
        plein: ["Plein", "sans-serif"],
        switzer: ["Switzer", "sans-serif"],
      },
      screens: {
        md: '768px',
        lg: '960px',
      }
    },
  },
  plugins: [],
}
