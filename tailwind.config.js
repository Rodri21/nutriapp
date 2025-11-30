/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Routes for the Pages Router
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Shared components
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Routes for the App Router (the main focus)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

