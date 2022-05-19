import { styled } from '../../../stitches.config';

export const Message = styled('div', {
	display: 'flex',
	width: 'fit-content',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '6px 40px',
	borderRadius: 9999999999,
	fontSize: '$1',

	variants: {
		type: {
			success: {
				backgroundColor: '$green3',
				color: '$green11',
				border: '1px solid $green6',
			},
			error: {
				backgroundColor: '$red3',
				color: '$red11',
				border: '1px solid $red6',
			},
		},
	},
});
