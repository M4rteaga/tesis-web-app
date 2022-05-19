import { useAtom } from 'jotai';
import { fundAccount } from '../../../lib/solana';
import { userAtom } from '../../../store';
import { Button } from '../../atoms';
import { FormModal } from '../../molecules';

const formfields = {
	amount: {
		label: 'Amount',
		type: 'number',
		placeholder: 'amount',
		id: 'amount',
		name: 'amount',
	},
	currency: {
		name: 'currency',
		label: 'lamports',
		type: 'radio',
		options: ['lamports', 'sol'],
	},
};

export const FundFormModal = () => {
	const [user] = useAtom(userAtom);
	const submitFormFunction = async (values: any) => {
		let res = await fundAccount(
			user!.publicAddress,
			values.amount,
			values.currency
		);
		return res;

		// alert(JSON.stringify(values));
	};

	return (
		<>
			<FormModal
				messages={{
					onErrorMessage: 'Something went wrong',
					onSuccessMessage: 'Successfully funded account',
				}}
				fields={formfields}
				trigger={<Button size="small">Fund</Button>}
				title="Fund"
				description="Enter the amount you want to fund"
				func={submitFormFunction}
			/>
		</>
	);
};
