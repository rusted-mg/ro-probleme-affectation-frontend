import type { Config } from 'tailwindcss';

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            primary: '#3b82f6', 
        },
    },
  },
  plugins: [],
} satisfies Config;