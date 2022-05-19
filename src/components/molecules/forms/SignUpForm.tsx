import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '../../../../stitches.config';
import { Button, Fieldset, Input, Label, Message } from '../../atoms';

const Form = styled('form', {
	display: 'flex',
	padding: '0 4rem 25px 4rem',
	flexDirection: 'column',
	gap: 24,
});

const MessageSection = styled('section', {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	width: '100%',
});

const Flex = styled('div', { display: 'flex' });

export const SignUpForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(null);
	const [success, setSuccess] = useState(false);
	const { register, handleSubmit } = useForm();

	const clearStates = async () => {
		setIsError(null);
		setIsLoading(false);
		setSuccess(false);
	};

	const submitFormFunction = async (values: any) => {
		try {
			await clearStates();
			setIsLoading(true);
			const res = await fetch(
				'https://ez03ozr0ha.execute-api.us-east-1.amazonaws.com/dev/tesis/createUser',
				// 'https://api-endpoint.deno.dev',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						origin: '*',
					},
					body: JSON.stringify({
						username: values.username,
						password: values.password,
					}),
				}
			);
			const resData = await res.json();
			console.log(resData);
			console.log(res);

			if (!res.ok) {
				throw new Error('F*ck something went wrong');
			}
			setIsLoading(false);
			setSuccess(true);
		} catch (error: any) {
			setIsLoading(false);
			setIsError(error.message);
			console.log(error);
		}
	};

	return (
		<Form onSubmit={handleSubmit(submitFormFunction)}>
			<MessageSection>
				{isError ? <Message type={'error'}>{isError}</Message> : null}
				{success ? (
					<Message type={'success'}>Successfully created</Message>
				) : null}
			</MessageSection>
			<Fieldset>
				<Label>Username</Label>
				<Input type={'text'} {...register('username')} required={true}></Input>
			</Fieldset>
			<Fieldset>
				<Label>Password</Label>
				<Input
					type={'password'}
					{...register('password')}
					required={true}
				></Input>
			</Fieldset>
			<Fieldset>
				<Label>Confirm Password</Label>
				<Input
					type={'password'}
					{...register('confirm password')}
					required={true}
				></Input>
			</Fieldset>
			<Flex css={{ marginTop: 16, justifyContent: 'flex-end' }}>
				<Button aria-label="submit form" size={'medium'} type="submit">
					{isLoading ? (
						'Loading...'
					) : (
						<>
							Sign Up
							<ArrowRightIcon />
						</>
					)}
				</Button>
			</Flex>
		</Form>
	);
};
