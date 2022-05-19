import { styled, keyframes } from '@stitches/react';
import { AvatarIcon, GearIcon } from '@radix-ui/react-icons';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Button, CustomLink } from '../atoms';
import { useAuth } from '../../lib/auth';
import { useAtom } from 'jotai';
import { userAtom } from '../../store';

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

const StyledContent = styled(DropdownMenuPrimitive.Content, {
	minWidth: 220,
	backgroundColor: '$gray3',
	borderRadius: 6,
	padding: 5,
	boxShadow:
		'0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
	'@media (prefers-reduced-motion: no-preference)': {
		animationDuration: '400ms',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		animationFillMode: 'forwards',
		willChange: 'transform, opacity',
		'&[data-state="open"]': {
			'&[data-side="top"]': { animationName: slideDownAndFade },
			'&[data-side="right"]': { animationName: slideLeftAndFade },
			'&[data-side="bottom"]': { animationName: slideUpAndFade },
			'&[data-side="left"]': { animationName: slideRightAndFade },
		},
	},
});

const itemStyles = {
	all: 'unset',
	fontSize: 14,
	lineHeight: 1,
	borderRadius: 6,
	display: 'flex',
	alignItems: 'center',
	height: 25,
	padding: '0 5px',
	position: 'relative',
	paddingLeft: 25,
	userSelect: 'none',

	'&[data-disabled]': {
		color: '$gray.8',
		pointerEvents: 'none',
	},

	'&:focus': {
		backgroundColor: '$gray10',
		color: '$overBlackTextColor',
	},
};

const StyledItem = styled(DropdownMenuPrimitive.Item, { ...itemStyles });
const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, {
	...itemStyles,
});
const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem, {
	...itemStyles,
});
const StyledTriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
	'&[data-state="open"]': {
		backgroundColor: '$gray4',
		color: '$gray11',
	},
	...itemStyles,
});

const StyledLabel = styled(DropdownMenuPrimitive.Label, {
	paddingLeft: 25,
	fontSize: 12,
	lineHeight: '25px',
	color: '$DefaultTextColor',
});

const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
	height: 1,
	backgroundColor: '$gray8',
	margin: 5,
});

const StyledItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
	position: 'absolute',
	left: 0,
	width: 25,
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
	fill: '$gray3',
});

// Exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = StyledContent;
export const DropdownMenuItem = StyledItem;
export const DropdownMenuCheckboxItem = StyledCheckboxItem;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuRadioItem = StyledRadioItem;
export const DropdownMenuItemIndicator = StyledItemIndicator;
export const DropdownMenuTriggerItem = StyledTriggerItem;
export const DropdownMenuLabel = StyledLabel;
export const DropdownMenuSeparator = StyledSeparator;
export const DropdownMenuArrow = StyledArrow;

// Your app...
const Box = styled('div', {});

const RightSlot = styled('div', {
	marginLeft: 'auto',
	paddingLeft: 20,
	color: '$gray11',
	':focus > &': { color: '$overBlackTextColor' },
	'[data-disabled] &': { color: '$gray8' },
});

export const UserPlaceholder = () => {
	const { disconnect } = useAuth();
	const [user] = useAtom(userAtom);

	return (
		<Box>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button aria-label="user menu" color="gradient" size="small">
						{user?.username}
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent sideOffset={5}>
					<CustomLink to={'/profile'} replace>
						<DropdownMenuItem>
							Profile
							<RightSlot>
								<AvatarIcon />
							</RightSlot>
						</DropdownMenuItem>
					</CustomLink>

					<DropdownMenuItem>
						Settings
						<RightSlot>
							<GearIcon />
						</RightSlot>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => disconnect()}>
						Disconnect
					</DropdownMenuItem>
					<DropdownMenuArrow />
				</DropdownMenuContent>
			</DropdownMenu>
		</Box>
	);
};
