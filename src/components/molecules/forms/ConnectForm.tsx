import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '../../../../stitches.config';
import { useAuth } from '../../../lib/auth';
import { ConnectionResponse } from '../../../lib/types';
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

export const ConnectForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(null);
	const { register, handleSubmit } = useForm();
	const { connect } = useAuth();

	const submitFormFunction = async (values: any) => {
		try {
			setIsLoading(true);
			const res = await fetch(
				`https://ez03ozr0ha.execute-api.us-east-1.amazonaws.com/dev/tesis/validateUser?${new URLSearchParams(
					values
				)}`,
				{
					method: 'GET',
					headers: {
						origin: '*',
					},
				}
			);

			const resBody: ConnectionResponse = await res.json();

			if (resBody.rowCount == 1) {
				connect({
					username: resBody.username,
					publicAddress: resBody.address,
				});
			} else {
				throw new Error('Invalid credentials');
			}
			setIsLoading(false);
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
			<Flex css={{ marginTop: 16, justifyContent: 'flex-end' }}>
				<Button aria-label="submit form" size="medium" type="submit">
					{isLoading ? (
						'Loading...'
					) : (
						<>
							Connect
							<ArrowRightIcon />
						</>
					)}
				</Button>
			</Flex>
		</Form>
	);
};
