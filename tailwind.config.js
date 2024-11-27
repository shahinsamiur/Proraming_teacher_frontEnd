/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
      extend: {
        animation: {
          fade: "fade 3s linear infinite",
          wave: "wave 1s ease-in-out infinite",
        },
        keyframes: {
          fade: {
            "0%, 100%": { opacity: "1" },
            "50%": { opacity: "0.3" },
          },
           wave: {
            "0%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-5px)" }, // Reduced distance for testing
            "100%": { transform: "translateY(0)" },
          },
          
        },
      },
    },
  
  plugins: [],
}
