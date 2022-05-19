import { styled } from '../../../../stitches.config';

export const Input = styled('input', {
	all: 'unset',
	width: '100%',
	flex: '1',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: 4,
	padding: '0 10px',
	fontSize: 15,
	lineHeight: 1,
	color: 'Black',
	boxShadow: `0 0 0 1px $colors$gray6`,
	height: 30,

	'&:focus': {
		boxShadow: `0 0 0 1px $colors$gray8`,
	},
});
