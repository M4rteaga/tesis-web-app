import { styled } from '../../../../stitches.config';

export const RadioInput = styled('input', {
	all: 'unset',
	padding: '5px 10px',
	borderRadius: '999999999999px',
	fontSize: '$1',
	cursor: 'pointer',
	'&::before': {
		content: 'attr(id)',
		display: 'inline-block',
	},

	border: '1px solid $indigo6',
	color: '$indigo11',
	'&:hover': {},

	'&:focus': {
		border: '1px solid $indigo8',
	},

	'&:checked': {
		backgroundColor: '$indigo3',
		border: '1px solid $indigo6',
		color: '$indigo11',
	},
});
