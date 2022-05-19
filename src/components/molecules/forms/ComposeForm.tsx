import { styled, keyframes } from '@stitches/react';
import { whiteA, blackA, mauve, red } from '@radix-ui/colors';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { TabsMenu } from './FormTabs';

const overlayShow = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

const contentShow = keyframes({
	'0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
	'100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
	backgroundColor: blackA.blackA9,
	position: 'fixed',
	inset: 0,
	'@media (prefers-reduced-motion: no-preference)': {
		animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
	},
});

const StyledContent = styled(DialogPrimitive.Content, {
	backgroundColor: 'white',
	borderRadius: 6,
	boxShadow:
		'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'fit-content',
	height: 'fit-content',
	'@media (prefers-reduced-motion: no-preference)': {
		animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
	},
	'&:focus': { outline: 'none' },
});

function Content({ children, ...props }: { children: React.ReactNode }) {
	return (
		<DialogPrimitive.Portal>
			<StyledOverlay />
			<StyledContent {...props}>{children}</StyledContent>
		</DialogPrimitive.Portal>
	);
}

const StyledTitle = styled(DialogPrimitive.Title, {
	margin: 0,
	fontWeight: 500,
	color: mauve.mauve12,
	fontSize: 17,
	textAlign: 'center',
});

const StyledDescription = styled(DialogPrimitive.Description, {
	margin: '10px 0 20px',
	color: mauve.mauve11,
	fontSize: 15,
	lineHeight: 1.5,
	textAlign: 'center',
});

// Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

const IconButton = styled('button', {
	all: 'unset',
	fontFamily: 'inherit',
	borderRadius: '100%',
	height: 25,
	width: 25,
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: '$gray11',
	position: 'absolute',
	top: 10,
	right: 10,

	'&:hover': { backgroundColor: red.red4, color: red.red11 },
	'&:focus': { boxShadow: `0 0 0 1px ${red.red7}` },
});

interface TestDialogProps {
	trigger: JSX.Element;
	tabs: {
		name: string;
		description?: string;
		content: JSX.Element;
	}[];
}

export const ComposeForm: React.FC<TestDialogProps> = ({ trigger, tabs }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<TabsMenu tabs={tabs} />
				<DialogClose asChild>
					<IconButton>
						<Cross2Icon />
					</IconButton>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};
