import { ComposeForm } from '../../molecules';
import { ConnectForm } from '../../molecules/forms/ConnectForm';
import { SignUpForm } from '../../molecules/forms/SignUpForm';

interface ConnectFormModalProps {
	trigger: JSX.Element;
}

export const ConnectFormModal: React.FC<ConnectFormModalProps> = ({
	trigger,
}) => {
	return (
		<>
			<ComposeForm
				trigger={trigger}
				tabs={[
					{
						name: 'Connect',
						description: 'Connect to your account',
						content: ConnectForm(),
					},
					{
						name: 'Sign up',
						description: 'Sign up for a new account',
						content: SignUpForm(),
					},
				]}
			/>
		</>
	);
};
