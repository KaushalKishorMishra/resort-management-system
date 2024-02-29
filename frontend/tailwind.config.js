/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "1rem",
		},
		extend: {
			colors: {
				"custom-accent": "#e87030",
				"custom-bg-dark": "#2c2421",
				"custom-bg-light": "#fcf7f1",
			},
			fontFamily: {
				maconda: "Maconda, cursive",
				ostwald: "Oswald, sans-serif",
				kalam: "Kalam, cursive",
			},
			fontSize: {
				"clamp-sm": "clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)",
				"clamp-base": "clamp(1rem, 0.34vw + 0.91rem, 1.19rem)",
				"clamp-lg": "clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)",
				"clamp-xl": "clamp(1.56rem, 1vw + 1.31rem, 2.11rem)",
				"clamp-2xl": "clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)",
				"clamp-3xl": "clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem)",
				"clamp-4xl": "clamp(3.05rem, 3.54vw + 2.17rem, 5rem)",
				"clamp-5xl": "clamp(3.81rem, 5.18vw + 2.52rem, 6.66rem)",
				"clamp-6xl": "clamp(4.77rem, 7.48vw + 2.9rem, 8.88rem)",
			},
		},
	},
	plugins: [daisyui, typography],
	daisyui: {
		themes: ["light", "dark", "halloween"],
	},
};
