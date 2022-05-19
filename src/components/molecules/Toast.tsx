import * as React from 'react';
import { styled } from '../../../stitches.config';
import { keyframes } from '@stitches/react';
import { violet, blackA, mauve, slate, green } from '@radix-ui/colors';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { Button } from '../atoms';

const VIEWPORT_PADDING = 25;

const hide = keyframes({
	'0%': { opacity: 1 },
	'100%': { opacity: 0 },
});

const slideIn = keyframes({
	from: { transform: `translateY(calc( -${VIEWPORT_PADDING}px))` },
	to: { transform: 'translateX(0)' },
});

const swipeOut = keyframes({
	from: { transform: '-translateY(var(--radix-toast-swipe-end-x))' },
	to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
});

const StyledViewport = styled(ToastPrimitive.Viewport, {
	position: 'fixed',
	top: 0,
	left: '50%',
	display: 'flex',
	flexDirection: 'column',
	padding: 0,
	gap: 10,
	width: 390,
	maxWidth: '100vw',
	marginLeft: -440 / 2,
	listStyle: 'none',
	zIndex: 2147483647,
	outline: 'none',
});

const StyledToast = styled(ToastPrimitive.Root, {
	fontFamily: '$RedHatMono',
	backgroundColor: 'white',
	borderRadius: 6,
	boxShadow:
		'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
	padding: 15,
	display: 'grid',
	gridTemplateAreas: '"title action" "description action"',
	gridTemplateColumns: 'auto max-content',
	columnGap: 15,
	alignItems: 'center',

	'@media (prefers-reduced-motion: no-preference)': {
		'&[data-state="open"]': {
			animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
		},
		'&[data-state="closed"]': {
			animation: `${hide} 100ms ease-in forwards`,
		},
		'&[data-swipe="move"]': {
			transform: 'translateX(var(--radix-toast-swipe-move-x))',
		},
		'&[data-swipe="cancel"]': {
			transform: 'translateX(0)',
			transition: 'transform 200ms ease-out',
		},
		'&[data-swipe="end"]': {
			animation: `${swipeOut} 100ms ease-out forwards`,
		},
	},
});

const StyledTitle = styled(ToastPrimitive.Title, {
	gridArea: 'title',
	marginBottom: 5,
	fontWeight: 500,
	color: '$DefaultTextColor',
	fontSize: 16,
});

const StyledDescription = styled(ToastPrimitive.Description, {
	gridArea: 'description',
	margin: 0,
	color: '$gray11',
	fontSize: 13,
	lineHeight: 1.3,
});

const StyledAction = styled(ToastPrimitive.Action, {
	gridArea: 'action',
});

// Exports
export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = StyledViewport;
export const ToastRoot = StyledToast;
export const ToastTitle = StyledTitle;
export const ToastDescription = StyledDescription;
export const ToastAction = StyledAction;
export const ToastClose = ToastPrimitive.Close;

// Your app...
const Box = styled('div', {});
const ButtonWithoutStyles = styled('button', {
	all: 'unset',
});

function oneWeekAway(date: Date) {
	const now = new Date();
	const inOneWeek = now.setDate(now.getDate() + 7);
	return new Date(inOneWeek);
}

function prettyDate(date: Date) {
	return new Intl.DateTimeFormat('en-US', {
		dateStyle: 'full',
		timeStyle: 'short',
	}).format(date);
}

interface ToastProps {
	trigger: JSX.Element;
	toastTitle: string;
	toastContent: string;
}
export const Toast: React.FC<ToastProps> = ({
	trigger,
	toastTitle,
	toastContent,
}) => {
	const [open, setOpen] = React.useState(false);
	const timerRef = React.useRef(0);

	React.useEffect(() => {
		return () => clearTimeout(timerRef.current);
	}, []);

	return (
		<ToastProvider swipeDirection="right">
			<ButtonWithoutStyles
				onClick={() => {
					setOpen(false);
					window.clearTimeout(timerRef.current);
					timerRef.current = window.setTimeout(() => {
						setOpen(true);
					}, 100);
				}}
			>
				{trigger}
			</ButtonWithoutStyles>

			<ToastRoot open={open} onOpenChange={setOpen}>
				<ToastTitle>{toastTitle}</ToastTitle>
				<ToastDescription>{toastContent}</ToastDescription>
				<ToastAction asChild altText="Close toast">
					<Button color="green" size="xs">
						Close
					</Button>
				</ToastAction>
			</ToastRoot>
			<ToastViewport />
		</ToastProvider>
	);
};
