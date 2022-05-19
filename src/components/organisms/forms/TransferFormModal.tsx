import { useAtom } from 'jotai';
import { useAuth } from '../../../lib/auth';
import { transaction } from '../../../lib/solana';
import { FormFields } from '../../../lib/types';
import { userAtom } from '../../../store';
import { Button } from '../../atoms';
import { FormModal } from '../../molecules';

const formfields = {
	receiverAddress: {
		name: 'receiverAddress',
		id: 'receiverAddress',
		label: 'Receiver Address',
		type: 'text',
	},
	amount: {
		name: 'amount',
		id: 'amount',
		label: 'Amount',
		type: 'number',
		placeholder: 'amount',
	},
	currency: {
		name: 'currency',
		label: 'lamports',
		type: 'radio',
		options: ['lamports', 'sol'],
	},
} as FormFields;

export const TransferFormModal = () => {
	const [user] = useAtom(userAtom);
	const submitFormFunction = async (values: any) => {
		const res = await transaction(
			user!.publicAddress,
			values.amount,
			values.receiverAddress,
			values.currency
		);

		// alert(JSON.stringify(values));
	};
	return (
		<>
			<FormModal
				messages={{
					onErrorMessage: 'Something went wrong',
					onSuccessMessage: 'Successfully transfered',
				}}
				fields={formfields}
				trigger={<Button size="small">Transaction</Button>}
				title="Transfer"
				description="Enter the amount to transfer"
				func={submitFormFunction}
			/>
		</>
	);
};
