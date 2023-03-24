/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        width: {
          128: "32rem",
        },
        keyframes: {
          rotateX: {
            "0%": {
              transform: "rotateX(0deg)",
            },
            "100%": {
              transform: "rotateX(360deg)",
            },
          },
        },
      },
    },
    plugins: [],
  };
  