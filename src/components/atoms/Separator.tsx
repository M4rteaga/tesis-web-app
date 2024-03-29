import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { styled } from '../../../stitches.config';

const StyledSeparator = styled(SeparatorPrimitive.Root, {
	backgroundColor: '$gray8',
	'&[data-orientation=horizontal]': { height: 1, width: '100%' },
	'&[data-orientation=vertical]': { height: '100%', width: 1 },
});

export const Separator = StyledSeparator;
