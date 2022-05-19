import React, { createRef, useEffect, useRef, useState } from 'react';
import { styled, keyframes } from '@stitches/react';
import { violet, blackA, mauve, tomatoA, tomato, red } from '@radix-ui/colors';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useForm, Controller } from 'react-hook-form';
import {
	Button,
	Label,
	Input,
	Fieldset,
	Message,
	RadioInput,
} from '../../atoms';
import { objectKeys } from '../../../lib/utils';
import { inferObjectFirstLevel, FormFields } from '../../../lib/types';
import { render } from 'react-dom';

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
	width: '90vw',
	maxWidth: '450px',
	maxHeight: '85vh',
	padding: 25,
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

const Flex = styled('div', { display: 'flex' });

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

const Form = styled('form', {
	display: 'flex',
	padding: '0 2rem 0 2rem',
	flexDirection: 'column',
	gap: 24,
});

const MessageSection = styled('section', {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	width: '100%',
});

interface TestDialogProps {
	messages: {
		onSuccessMessage: string;
		onErrorMessage: string;
	};
	fields: FormFields;
	trigger: JSX.Element;
	title: string;
	description?: string;
	func: (values: inferObjectFirstLevel<FormFields>) => Promise<void> | void;
}

export const FormModal: React.FC<TestDialogProps> = ({
	messages,
	fields,
	trigger,
	title,
	description,
	func,
}) => {
	const [loading, setLoading] = useState(false);
	const [isError, setIsError] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const clearStates = async () => {
		setIsError(null);
		setLoading(false);
		setIsSuccess(false);
	};

	let formInitialValues: inferObjectFirstLevel<typeof fields> = {};

	objectKeys(fields).forEach((field) => (formInitialValues[field] = ''));

	const { control, handleSubmit, reset } = useForm<
		inferObjectFirstLevel<typeof fields>
	>({
		defaultValues: {
			...formInitialValues,
		},
	});

	const onSubmit = async (data: inferObjectFirstLevel<typeof fields>) => {
		try {
			await clearStates();
			setLoading(true);
			await func(data);
			setLoading(false);
			setIsSuccess(true);
		} catch (error: any) {
			setLoading(false);
			setIsError(error.message);
			console.log(error);
		}
		reset();
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<MessageSection>
						{isError && (
							<Message type="error">{messages.onErrorMessage}</Message>
						)}
						{isSuccess && (
							<Message type="success">{messages.onSuccessMessage}</Message>
						)}
					</MessageSection>
					{objectKeys(fields).map((field, index) => (
						<Fieldset key={index}>
							<Controller
								name={field as string}
								control={control}
								rules={{ required: true }}
								render={(aux) => {
									return (
										<>
											{fields[field].type == 'radio' ? (
												<Flex
													css={{
														flexDirection: 'row',
														width: '100%',
														justifyContent: 'end',
														gap: 6,
													}}
												>
													{fields[field].options?.map((option, index) => (
														<RadioInput
															key={index}
															{...aux.field}
															id={option}
															name={fields[field].name}
															type={fields[field].type}
															value={option}
														/>
													))}
												</Flex>
											) : (
												<>
													<Label htmlFor={field as string}>
														{fields[field].label}
													</Label>
													<Input
														{...aux.field}
														id={field as string}
														name={field as string}
														type={fields[field].type}
														placeholder={fields[field].placeholder}
													/>
												</>
											)}
										</>
									);
								}}
							/>
						</Fieldset>
					))}
					<Flex css={{ marginTop: 10, justifyContent: 'flex-end' }}>
						<Button aria-label="Fund" size={'small'} type="submit">
							{loading ? 'loading...' : title}
						</Button>
					</Flex>
				</Form>

				<DialogClose asChild>
					<IconButton>
						<Cross2Icon />
					</IconButton>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};
