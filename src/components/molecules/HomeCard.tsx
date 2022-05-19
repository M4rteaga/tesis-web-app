import { styled } from '../../../stitches.config';
import { NoneWorld } from '../atoms/Logo/NoneWorld';

const Box = styled('div', {
	display: 'flex',
	width: 450,
	height: 400,
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	background: 'url(/meshgradient.jpg) center/cover',
	borderRadius: 20,
});

export const HomeCard = () => {
	return (
		<Box>
			<NoneWorld />
		</Box>
	);
};
