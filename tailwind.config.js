/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/primitives/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		fontFamily: {
			sans: ['Barlow', 'ui-sans-serif', 'system-ui'],
			mono: ['Ubuntu Mono', 'ui-monospace', 'SFMono-Regular'],
		},
		extend: {
			animation: {
				inputAppear: 'inputAppear 0.3s ease',
				bounce: 'bounce 0.5s',
			},
			keyframes: {
				inputAppear: {
					'0%': { transform: 'scale(0.85)', opacity: 0 },
					'100%': { transform: 'scale(1)', opacity: 1 },
				},
				bounce: {
					'0%': {
						transform: 'translateX(0px)',
						'timing-function': ' ease-in',
					},
					'37%': {
						transform: 'translateX(5px)',
						'timing-function': ' ease-out',
					},
					'55%': {
						transform: 'translateX(-5px)',
						'timing-function': ' ease-in',
					},
					'73%': {
						transform: 'translateX(4px)',
						'timing-function': ' ease-out',
					},
					'82%': {
						transform: 'translateX(-4px)',
						'timing-function': ' ease-in',
					},
					'91%': {
						transform: 'translateX(2px)',
						'timing-function': ' ease-out',
					},
					'96%': {
						transform: 'translateX(-2px)',
						'timing-function': ' ease-in',
					},
					'100%': {
						transform: 'translateX(0px)',
						'timing-function': 'ease-in',
					},
				},
			},
		},
	},
	plugins: [],
};
