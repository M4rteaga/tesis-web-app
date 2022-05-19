import { styled } from '../../../stitches.config';

export const Button = styled('button', {
	all: 'unset',
	display: 'inline-flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '6px',
	cursor: 'pointer',
	gap: '8px',
	fontFamily: '$RedHatMono',
	width: 'fit-content',
	//make the svg icon more thick

	'& svg': {
		fontWeight: 'bold',
		strokeWidth: '10px',
	},

	'&:hover svg': {
		transform: 'translateX(5px)',
		transition: 'all 0.1s ease-in-out',
	},
	variants: {
		size: {
			xs: {
				padding: '5px 10px',
				fontSize: '$1',

				'& svg': {
					height: '12px',
					width: '12px',
				},
			},
			small: {
				padding: '6px 20px',
				fontSize: '$3',

				'& svg': {
					height: '20px',
					width: '20px',
				},
			},
			medium: {
				padding: '10px 20px',
				fontSize: '$4',
				'& svg': {
					height: '22px',
					width: '22px',
				},
			},
			large: {
				padding: '18px 52px',
				fontSize: '$4',
				fontWeight: 'bold',
				'& svg': {
					height: '25px',
					width: '25px',
				},
			},
		},
		color: {
			black: {
				backgroundColor: '$BlackBg',
				color: '$overBlackTextColor',
				'&:hover': {
					backgroundColor: '$gray12',
				},
			},
			transparent: {
				backgroundColor: 'transparent',
				color: '$DefaultTextColor',
			},
			green: {
				backgroundColor: '$green3',
				border: '1px solid $green6',
				color: '$green12',
				'&:hover': {
					backgroundColor: '$green4',
				},
				'&:focus': {
					boxShadow: '0 0 0 1px $colors$green8',
				},
			},
			gradient: {
				background: `linear-gradient(50.7deg, rgb(21, 50, 38) -14.34%, rgb(23, 23, 23) 114.76%)`,
				color: 'white',
			},
		},
	},

	defaultVariants: {
		size: 'large',
		color: 'black',
	},
});
