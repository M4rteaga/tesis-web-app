import { styled } from '../../../stitches.config';

export const Text = styled('p', {
	all: 'unset',
	variants: {
		size: {
			xxxl: {
				fontSize: '$8',
				lineHeight: '1.2',
				letterSpacing: '-0.02em',
			},
			xxl: {
				fontSize: '$7',
				lineHeight: '1.2',
				letterSpacing: '-0.02em',
			},
			xl: {
				fontSize: '$6',
				letterSpacing: '-0.02em',
			},
			lg: {
				fontSize: '$5',
			},
			md: {
				fontSize: '$4',
			},
			base: {
				fontSize: '$3',
			},
			sm: {
				fontSize: '$2',
				letterSpacing: '0.1em',
			},
			xs: {
				fontSize: '$1',
				letterSpacing: '0.1em',
			},
		},

		fontWeight: {
			semibold: {
				fontWeight: '600',
			},
			bold: {
				fontWeight: 'bold',
			},
			thin: {
				fontWeight: '100',
			},
		},
	},

	defaultVariants: {
		size: 'base',
	},
});
