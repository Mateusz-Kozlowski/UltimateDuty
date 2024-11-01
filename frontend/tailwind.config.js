import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
		themes: [
			{
				UltimateDuty: {
					primary: "#0A66C2", // Blue (for buttons or highlights)
          			secondary: "#1E1E1E", // Dark gray for card backgrounds
          			accent: "#7FC15E", // Green (for accents)
          			neutral: "#FFFFFF", // White text color
          			"base-100": "#121212", // Very dark background color
          			info: "#A9A9A9", // Light gray for secondary text
          			success: "#00A86B", // Green for success messages
          			warning: "#FFCC00", // Yellow for warnings
          			error: "#FF0033", // Red for errors
				},
			},
		],
	}
}
