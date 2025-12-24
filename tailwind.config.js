/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'devops-dark': '#0f172a',
        'devops-darker': '#020617',
        'devops-blue': '#3b82f6',
        'devops-green': '#10b981',
        'devops-red': '#ef4444',
        'devops-yellow': '#f59e0b',
        'devops-gray': '#1e293b',
        'devops-light-gray': '#334155',
      },
    },
  },
  plugins: [],
}

