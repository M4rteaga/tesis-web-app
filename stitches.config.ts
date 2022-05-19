import { createStitches, globalCss } from '@stitches/react';
import {
	gray,
	green,
	plum,
	indigo,
	greenDark,
	indigoDark,
	plumDark,
	grayDark,
	blackA,
	whiteA,
	red,
	redDark,
} from '@radix-ui/colors';

export const { styled, createTheme, theme } = createStitches({
	theme: {
		colors: {
			...gray,
			...indigo,
			...plum,
			...green,
			...blackA,
			...whiteA,
			...red,

			BlackBg: '#030303',
			overBlackTextColor: 'white',
			DefaultTextColor: '#030303',
			AppBg: '$gray1',
		},
		fontSizes: {
			1: '12px',
			2: '14px',
			3: '16px',
			4: '20px',
			5: '24px',
			6: '32px',
			7: '48px',
			8: '64px',
		},
		fonts: {
			RedHatMono: '"Red Hat Mono", monospace',
		},
	},
});

export const darkTheme = createTheme({
	colors: {
		...grayDark,
		...indigoDark,
		...plumDark,
		...greenDark,
		...whiteA,
		...blackA,
		...redDark,

		WhiteBg: 'white',
		overWhiteTextColor: '#030303',

		BlackBg: '$WhiteBg',
		overBlackTextColor: '$overWhiteTextColor',
		DefaultTextColor: 'white',

		AppBg: '$gray1',
	},
});
