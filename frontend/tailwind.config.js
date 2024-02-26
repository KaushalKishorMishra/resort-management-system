/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"custom-accent": "#e87030",
				"custom-bg-dark": "#2c2421",
				"custom-bg-light": "#fcf7f1",
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: ["light", "dark", "halloween"],
	},
};
