/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		screens: {
			'xxxs': '1px',
			'xxs': '300px',
			'xs': '475px',
			...defaultTheme.screens,
		  },
	},
	plugins: [require("daisyui")],
};
