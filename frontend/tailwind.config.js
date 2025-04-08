/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Adapter selon ton projet
      "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}" // Important pour Flowbite
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('flowbite/plugin') // Active Flowbite
    ],
  };
  