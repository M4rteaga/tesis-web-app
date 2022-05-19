import { useAtom } from 'jotai';
import React from 'react';
import { styled } from '../../../stitches.config';
import { formatDate } from '../../lib/utils';
import { userAtom } from '../../store';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { TooltipWithToast } from '../molecules/Tooltip';

const Table = styled('table', {
	width: '100%',
	borderCollapse: 'collapse',
	borderSpacing: 0,
	border: '1px solid $gray2',
	backgroundColor: '$backgroundColor',
	marginTop: '1rem',
	color: '$defaultTextColor',

	'& table, th, td': {
		border: '1px solid $gray8',
		borderCollapse: 'collapse',
	},

	'& th': {
		padding: '1rem',
		textAlign: 'left',
		fontSize: '$2',
		backgroundColor: '$gray2',
	},

	'& td': {
		padding: '1rem',
		textAlign: 'left',
		fontSize: '$2',
	},
});

const Span = styled('span', {
	all: 'unset',
	display: 'inline-block',
	width: '80px',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
});

const TableHeader = styled('th', {
	textAlign: 'center !important',
});

const HashContainer = styled('div', {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	gap: 5,
	width: 'fit-content',
	padding: '2px 4px',
	borderRadius: '4px',
	backgroundColor: '$indigo3',
	cursor: 'pointer',

	'&:hover': {
		backgroundColor: '$indigo4',
		color: '$indigo11',
	},
});

interface HistoryTableProps {
	transactionHistory: {
		id: string;
		address_from: string;
		address_to: string;
		created_at: string;
		lamports: string;
		hash: string;
	}[];
}

export const HistoryTable: React.FC<HistoryTableProps> = ({
	transactionHistory,
}) => {
	const [user] = useAtom(userAtom);

	const proccessedHistory = transactionHistory.map((transaction) => ({
		id: transaction.id,
		address_from:
			transaction.address_from === user?.publicAddress
				? '@me'
				: transaction.address_from,
		address_to:
			transaction.address_to === user?.publicAddress
				? '@me'
				: transaction.address_to,
		created_at: formatDate(new Date(transaction.created_at)),
		lamports: transaction.lamports,
		hash: transaction.hash,
	}));

	return (
		//create table in html with 6 columns
		<Table>
			<thead>
				<tr>
					<TableHeader colSpan={6}>Transactions History</TableHeader>
				</tr>
			</thead>
			<thead>
				<tr>
					<th>ID</th>
					<th>Sender</th>
					<th>Receiver</th>
					<th>Date</th>
					<th>Amount</th>
					<th>Hash</th>
				</tr>
			</thead>
			<tbody>
				{proccessedHistory.map((transaction, key) => (
					<tr key={key}>
						<td>{transaction.id}</td>
						<td>{transaction.address_from}</td>
						<td>{transaction.address_to}</td>
						<td>{formatDate(new Date(transaction.created_at))}</td>
						<td>{transaction.lamports}</td>
						<td>
							<HashContainer
								onClick={() =>
									window.open(
										`https://explorer.solana.com/tx/${transaction.hash}?cluster=devnet`
									)
								}
							>
								<Span>{transaction.hash}</Span>
								<TooltipWithToast
									trigger={<ExternalLinkIcon />}
									content={'Open transaction in explorer'}
								/>
							</HashContainer>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};
