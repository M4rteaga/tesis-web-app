import React from 'react';
import { styled } from '../../../stitches.config';
import { keyframes } from '@stitches/react';
import { PlusIcon } from '@radix-ui/react-icons';
import { violet, blackA } from '@radix-ui/colors';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Text } from '../atoms';
import { Toast } from './Toast';

const slideUpAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateY(2px)' },
	'100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateX(-2px)' },
	'100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateY(-2px)' },
	'100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateX(2px)' },
	'100%': { opacity: 1, transform: 'translateX(0)' },
});

const StyledContent = styled(TooltipPrimitive.Content, {
	fontFamily: '$RedHatMono',
	borderRadius: 4,
	padding: '10px 15px',
	fontSize: 15,
	lineHeight: 1,
	color: '$gray11',
	backgroundColor: 'white',
	boxShadow:
		'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
	'@media (prefers-reduced-motion: no-preference)': {
		animationDuration: '400ms',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		animationFillMode: 'forwards',
		willChange: 'transform, opacity',
		'&[data-state="delayed-open"]': {
			'&[data-side="top"]': { animationName: slideDownAndFade },
			'&[data-side="right"]': { animationName: slideLeftAndFade },
			'&[data-side="bottom"]': { animationName: slideUpAndFade },
			'&[data-side="left"]': { animationName: slideRightAndFade },
		},
	},
});

const StyledArrow = styled(TooltipPrimitive.Arrow, {
	fill: 'white',
});

// Exports
export const Provider = TooltipPrimitive.Provider;
export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipContent = StyledContent;

// Your app...
const IconButton = styled('button', {
	all: 'unset',
	fontFamily: 'inherit',
	borderRadius: '100%',
	height: 35,
	width: 35,
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: violet.violet11,
	backgroundColor: 'white',
	boxShadow: `0 2px 10px ${blackA.blackA7}`,
	'&:hover': { backgroundColor: violet.violet3 },
	'&:focus': { boxShadow: `0 0 0 2px black` },
});

const Span = styled('span', {
	all: 'unset',
	fontFamily: '$RedHatMono',
	display: 'inline-block',
	backgroundColor: '$colors$gray3',
	padding: '1px 4px',
	borderRadius: '4px',
	width: '80px',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	marginLeft: '8px',
	marginRight: '8px',
	verticalAlign: 'middle',
});

interface TooltipProps {
	trigger: JSX.Element;
	content: string;
}

export const Tooltip = ({ trigger, content }: TooltipProps) => {
	// const copyInfo = () => {
	// 	navigator.clipboard.writeText(info);
	// };

	return (
		<TooltipRoot delayDuration={150}>
			<TooltipTrigger asChild>{trigger}</TooltipTrigger>
			<StyledContent sideOffset={5}>
				{content}
				<StyledArrow />
			</StyledContent>
		</TooltipRoot>
	);
};

export const TooltipWithToast = (props: TooltipProps) => (
	<Toast
		trigger={Tooltip(props)}
		toastTitle={'copied'}
		toastContent="Public key copied to clipboard"
	/>
);
