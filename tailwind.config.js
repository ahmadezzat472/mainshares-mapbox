/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "16px",
        lg: "40px",
        // xl: '5rem',
        // '2xl': '6rem',
      },
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        customPrimary: '#374140', // A custom primary color
        customPrimaryDark: '#132527', // A custom primary color
        customPrimaryLight: '#727C7A', // A custom primary color
        customSecondary: '#FCFBF8', // A custom primary color
        customSecondaryDark: '#F2F1EC', // A custom primary color
        customAccent: "#E3E3DE",
        customAccentDark: "#E3E2DE",
        customThird: "#CE6A45",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
